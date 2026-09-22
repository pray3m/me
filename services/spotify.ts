import { URLSearchParams } from "node:url"
import {
  AccessTokenResponseProps,
  NowPlayingResponseProps,
  SongProps,
  TopTracksResponseProps,
  TrackProps,
} from "@/common/types/spotify"
import { env } from "@/lib/env"
import { resilientFetch } from "@/lib/http"
import { logger } from "@/lib/logger"

const CLIENT_ID = env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN

const TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing"
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`

const getAccessToken = async (): Promise<string> => {
  const response = await resilientFetch(TOKEN_ENDPOINT, {
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

  const body: AccessTokenResponseProps = await response.json()

  if (!response.ok || !body.access_token) {
    logger.error("spotify token refresh failed", {
      status: response.status,
      error: body.error,
      description: body.error_description,
    })
    throw new Error(
      `Spotify token refresh failed (${response.status} ${body.error ?? "unknown"})`
    )
  }

  return body.access_token
}

export const getNowPlaying = async (): Promise<NowPlayingResponseProps> => {
  const accessToken = await getAccessToken()

  const request = await resilientFetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (request.status === 204) {
    return { isPlaying: false, data: null }
  }

  if (!request.ok) {
    logger.error("spotify now-playing request failed", {
      status: request.status,
    })
    throw new Error(`Spotify now-playing failed (${request.status})`)
  }

  const song: SongProps = await request.json()

  if (!song.item) {
    return { isPlaying: false, data: null }
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

export const getTopTracks = async (): Promise<TopTracksResponseProps> => {
  const accessToken = await getAccessToken()

  const request = await resilientFetch(`${TOP_TRACKS_ENDPOINT}?limit=10`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (request.status === 204) {
    return { data: [] }
  }

  if (!request.ok) {
    logger.error("spotify top-tracks request failed", {
      status: request.status,
    })
    throw new Error(`Spotify top tracks failed (${request.status})`)
  }

  const getData = await request.json()

  const tracks: TrackProps[] = getData.items.map(
    (track: SongProps["item"]) => ({
      album: {
        name: track.album.name,
        image: track.album.images.find(
          (image: { width: number }) => image.width === 64
        ),
      },
      artist: track.artists
        .map((artist: { name: string }) => artist.name)
        .join(", "),
      songUrl: track.external_urls.spotify,
      title: track.name,
    })
  )

  return { data: tracks }
}
