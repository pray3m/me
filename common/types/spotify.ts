export interface AccessTokenResponseProps {
  access_token?: string
  error?: string
  error_description?: string
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

export interface TrackProps {
  album: {
    name: string
    image: {
      width: number
      url: string
    }
  }
  artist: string
  songUrl: string
  title: string
}

export interface NowPlayingResponseProps {
  isPlaying: boolean
  data: {
    album: string
    albumImageUrl: string | undefined
    artist: string
    songUrl: string
    title: string
  } | null
}

export interface TopTracksResponseProps {
  data: TrackProps[]
}
