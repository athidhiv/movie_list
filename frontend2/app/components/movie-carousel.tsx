"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./movie-card"
import MovieDetailsModal from "./movie-details-modal"
import type { Movie } from "../types/movie"

interface MovieCarouselProps {
  title: string
  movies: Movie[]
}

export default function MovieCarousel({ title, movies }: MovieCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>

      {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  )
}

