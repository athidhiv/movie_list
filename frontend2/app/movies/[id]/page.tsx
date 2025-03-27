"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Heart, Plus, Share, MessageSquare, ThumbsUp } from "lucide-react"
import { popularMovies, trendingMovies, newReleases } from "../../data/movies"
import type { Movie } from "../../types/movie"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the movie in our mock data
    const allMovies = [...popularMovies, ...trendingMovies, ...newReleases]
    const foundMovie = allMovies.find((m) => m.id === Number.parseInt(params.id))

    if (foundMovie) {
      setMovie(foundMovie)
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Movie Hero */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <img src="/placeholder.svg?height=800&width=1600" alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <img
                src={movie.poster || "/placeholder.svg?height=300&width=200"}
                alt={movie.title}
                className="w-40 rounded-lg shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {movie.title} <span className="text-gray-400">({movie.year})</span>
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-400 mr-2" />
                    <div>
                      <span className="text-2xl font-bold">{movie.rating.toFixed(1)}</span>
                      <span className="text-gray-400 text-sm">/10</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button>
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to List
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
          <TabsList className="bg-gray-900 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="similar">Similar Movies</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-gray-300 mb-8">{movie.plot}</p>

                <h2 className="text-2xl font-bold mb-4">Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <h3 className="text-gray-400 mb-1">Director</h3>
                    <p>{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 mb-1">Release Date</h3>
                    <p>March 15, {movie.year}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 mb-1">Runtime</h3>
                    <p>{movie.runtime} minutes</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 mb-1">Budget</h3>
                    <p>$185,000,000</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Awards & Recognition</h2>
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <p>Academy Award for Best Visual Effects</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <p>BAFTA Award for Best Cinematography</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <p>Golden Globe Nomination for Best Director</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Rate & Review</h3>
                  <div className="flex items-center justify-center mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <Textarea placeholder="Write your review..." className="mb-4" />
                  <Button className="w-full">Submit Review</Button>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Where to Watch</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Netflix</span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Amazon Prime</span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Disney+</span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cast">
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {movie.cast.map((actor, index) => (
                <div key={index} className="text-center">
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=A${index}`}
                    alt={actor.name}
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium">{actor.name}</h3>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">Crew</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=Director"
                  alt={movie.director}
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium">{movie.director}</h3>
                <p className="text-sm text-gray-400">Director</p>
              </div>
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=Writer"
                  alt="Screenplay"
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium">Jane Smith</h3>
                <p className="text-sm text-gray-400">Screenplay</p>
              </div>
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=DP"
                  alt="Cinematographer"
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium">Roger Deakins</h3>
                <p className="text-sm text-gray-400">Cinematographer</p>
              </div>
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=Composer"
                  alt="Composer"
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium">Hans Zimmer</h3>
                <p className="text-sm text-gray-400">Composer</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Discussions</h2>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Popular Threads</h3>
                  <Button>Start New Discussion</Button>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${i}`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">User{i}</h4>
                          <p className="text-xs text-gray-400">2 days ago</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        {i === 1
                          ? `The ending of ${movie.title} explained`
                          : i === 2
                            ? `${movie.director}'s visual style in this film`
                            : `Character analysis: The protagonist's journey`}
                      </h3>
                      <p className="text-gray-300 mb-3">
                        {i === 1
                          ? "I've been thinking about the ending and I believe it represents..."
                          : i === 2
                            ? "The use of color and framing in this film is reminiscent of..."
                            : "The character arc throughout the film shows a classic hero's journey where..."}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {12 + i * 5} replies
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {24 + i * 8} likes
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Reviews</h2>

              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-gray-800 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=R${i}`} />
                        <AvatarFallback>R{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium mr-2">Reviewer{i}</h4>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star
                                key={j}
                                className={`h-4 w-4 ${j < (9 - i) / 2 ? "text-yellow-400" : "text-gray-600"}`}
                                fill={j < (9 - i) / 2 ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">1 week ago</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      {i === 1
                        ? "A masterpiece of modern cinema"
                        : i === 2
                          ? "Solid film with a few flaws"
                          : "Entertaining but forgettable"}
                    </h3>
                    <p className="text-gray-300 mb-3">
                      {i === 1
                        ? `${movie.title} is a triumph in every sense. The direction is impeccable, the performances are stellar, and the screenplay is tight and engaging throughout.`
                        : i === 2
                          ? `While ${movie.title} has many strengths, particularly in its visual style and lead performances, the pacing issues in the middle act hold it back from greatness.`
                          : `${movie.title} offers some entertainment value, but ultimately fails to leave a lasting impression. The plot is predictable and the characters lack depth.`}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({14 - i * 4})
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Your Rating</label>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-gray-600 cursor-pointer hover:text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">Review Title</label>
                    <Input placeholder="Summarize your thoughts" />
                  </div>
                  <div>
                    <label className="block mb-2">Your Review</label>
                    <Textarea placeholder="What did you think of the movie?" className="min-h-[150px]" />
                  </div>
                  <Button>Submit Review</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="similar">
            <h2 className="text-2xl font-bold mb-6">Similar Movies You Might Enjoy</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {popularMovies.slice(0, 10).map((similarMovie) => (
                <div key={similarMovie.id} className="text-center">
                  <Link href={`/movies/${similarMovie.id}`}>
                    <img
                      src={similarMovie.poster || "/placeholder.svg?height=270&width=180"}
                      alt={similarMovie.title}
                      className="w-full aspect-[2/3] object-cover rounded-lg mb-2 transition-transform hover:scale-105"
                    />
                  </Link>
                  <h3 className="font-medium line-clamp-1">{similarMovie.title}</h3>
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">{similarMovie.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

