export type PlayerEvent = {
  data: number
  target: {
    playVideo: () => void
  }
}

export type PlayerOptions = {
  width: string
  height: string
  videoId: string | null
  playerVars: Record<string, number>
  events: {
    onReady: (event: PlayerEvent) => void
    onStateChange: (event: PlayerEvent) => void
    onError: (event: { data: number }) => void
  }
}

export type YouTubePlayerInstance = {
  playVideo: () => void
  destroy?: () => void
}

export type YTGlobal = {
  Player: new (elementId: string, options: PlayerOptions) => YouTubePlayerInstance
  PlayerState: {
    PLAYING: number
    PAUSED: number
    ENDED: number
  }
}
