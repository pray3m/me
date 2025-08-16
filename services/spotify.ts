import { URLSearchParams } from "node:url"
import {
  AccessTokenResponseProps,
  NowPlayingResponseProps,
  SongProps,
} from "@/common/types/spotify"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing"

const getAccessToken = async (): Promise<AccessTokenResponseProps> => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN ?? "",
    }),
  })
  return response.json()
}

export const getNowPlaying = async (): Promise<NowPlayingResponseProps> => {
  const { access_token } = await getAccessToken()

  console.log("============> got the access token", access_token)

  const request = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  console.log("===========request => ", request)

  const status = request.status

  console.log("===========>after status", status)

  if (status === 204 || status > 400) {
    return { status, isPlaying: false, data: null }
  }

  const song: SongProps = await request.json()

  if (!song.item) {
    return { status, isPlaying: false, data: null }
  }

  const isPlaying: boolean = song.is_playing
  const album: string = song.item.album.name ?? ""
  const albumImageUrl: string | undefined =
    song.item.album.images.find((image) => image.width === 64)?.url ?? undefined
  const artist: string =
    song.item.artists.map((artist) => artist.name).join(", ") ?? ""
  const songUrl: string = song.item.external_urls.spotify ?? ""
  const title: string = song.item.name ?? ""

  return {
    status,
    isPlaying,
    data: {
      album,
      albumImageUrl,
      artist,
      songUrl,
      title,
    },
  }
}
