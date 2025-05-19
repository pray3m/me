export interface AccessTokenResponseProps {
  access_token: string
}

export interface SongProps {
  is_playing: boolean
  item: {
    album: {
      name: string
      images: {
        width: number
        url: string
      }[]
    }
    artists: {
      name: string
    }[]
    external_urls: {
      spotify: string
    }
    name: string
  }
}

export interface NowPlayingResponseProps {
  status: number
  isPlaying: boolean
  data: {
    album: string
    albumImageUrl: string | undefined
    artist: string
    songUrl: string
    title: string
  } | null
}
