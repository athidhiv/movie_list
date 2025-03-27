"use client"

import { Star } from "lucide-react"
import type { Movie } from "../types/movie"

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div className="flex-shrink-0 w-[180px] cursor-pointer transition-transform hover:scale-105" onClick={onClick}>
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={movie.poster || "/placeholder.svg?height=270&width=180"}
          alt={movie.title}
          className="w-full h-[270px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm">{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <h3 className="mt-2 font-medium line-clamp-1">{movie.title}</h3>
      <p className="text-sm text-gray-400">{movie.year}</p>
    </div>
  )
}

