"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Plus, Share, X, MessageSquare } from "lucide-react"
import type { Movie } from "../types/movie"

interface MovieDetailsModalProps {
  movie: Movie
  onClose: () => void
}

export default function MovieDetailsModal({ movie, onClose }: MovieDetailsModalProps) {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] bg-gray-900 text-white border-gray-800">
        <DialogHeader className="flex items-start justify-between">
          <DialogTitle className="text-2xl">{movie.title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={handleClose} className="mt-0">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img
              src={movie.poster || "/placeholder.svg?height=400&width=270"}
              alt={movie.title}
              className="w-full rounded-lg"
            />

            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-medium">{movie.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">{movie.year}</span>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button variant="ghost" size="icon">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cast">Cast</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <p className="text-gray-300">{movie.plot}</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400">Director</h4>
                    <p>{movie.director}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Genre</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {movie.genres.map((genre) => (
                        <span key={genre} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Runtime</h4>
                    <p>{movie.runtime} minutes</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cast" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {movie.cast.map((actor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={`/placeholder.svg?height=50&width=50&text=A${index}`}
                        alt={actor.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{actor.name}</p>
                        <p className="text-sm text-gray-400">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="discussions" className="mt-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-800 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={`/placeholder.svg?height=40&width=40&text=U${i}`}
                          alt="User"
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium">User{i}</h4>
                          <p className="text-xs text-gray-400">2 days ago</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">
                        {i === 1
                          ? `The cinematography in ${movie.title} was absolutely stunning. Every frame could be a painting.`
                          : i === 2
                            ? `I thought the pacing was a bit off in the middle, but the ending made up for it.`
                            : `${movie.director}'s direction was masterful as always. Can't wait for their next project!`}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <button className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {12 + i}
                        </button>
                        <button className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Join the discussion
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

