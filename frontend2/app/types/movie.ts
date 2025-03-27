export interface Movie {
  id: number
  title: string
  year: number
  poster: string
  rating: number
  plot: string
  director: string
  genres: string[]
  runtime: number
  cast: {
    name: string
    character: string
  }[]
}

