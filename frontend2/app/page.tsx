"use client"

import { useState } from "react"
import Navbar from "./components/navbar"
import MovieCarousel from "./components/movie-carousel"
import PopularUsers from "./components/popular-users"
import RecommendationAI from "./components/recommendation-ai"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bell, Film, TrendingUp, Users } from "lucide-react"
import NotificationPanel from "./components/notification-panel"
import { popularMovies, trendingMovies, newReleases } from "./data/movies"

export default function HomePage() {
  const [showNotifications, setShowNotifications] = useState(false)
  const isLoggedIn = true // This would normally be determined by auth state

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="relative mb-12 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <img
            src="/placeholder.svg?height=500&width=1200"
            alt="Featured movie"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 p-8 z-20 max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Discover, Share, Discuss</h1>
            <p className="text-xl mb-6">
              Your personal movie community awaits. Connect with film lovers and find your next favorite movie.
            </p>
            <div className="flex gap-4">
              <Button size="lg">Explore Movies</Button>
              <Button variant="outline" size="lg">
                Join Community
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Movie Content */}
          <div className="flex-1">
            <Tabs defaultValue="discover" className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-gray-900">
                  <TabsTrigger value="discover" className="data-[state=active]:bg-primary">
                    <Film className="mr-2 h-4 w-4" />
                    Discover
                  </TabsTrigger>
                  <TabsTrigger value="trending" className="data-[state=active]:bg-primary">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:bg-primary">
                    <Users className="mr-2 h-4 w-4" />
                    Community
                  </TabsTrigger>
                </TabsList>

                {isLoggedIn && (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-2 z-50">
                        <NotificationPanel />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <TabsContent value="discover" className="space-y-12">
                <MovieCarousel title="Popular Now" movies={popularMovies} />
                <MovieCarousel title="New Releases" movies={newReleases} />
                <MovieCarousel title="Recommended For You" movies={trendingMovies} />
              </TabsContent>

              <TabsContent value="trending" className="space-y-12">
                <MovieCarousel title="Trending This Week" movies={trendingMovies} />
                <MovieCarousel title="Rising in Popularity" movies={popularMovies.slice().reverse()} />
              </TabsContent>

              <TabsContent value="community" className="space-y-12">
                <h2 className="text-2xl font-bold mb-6">Popular Discussions</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={`/placeholder.svg?height=40&width=40&text=U${i}`}
                          alt="User"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">User{i}</h3>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      <h4 className="font-semibold mb-2">Thoughts on the new Dune movie?</h4>
                      <p className="text-gray-300">Just watched it last night and was blown away by the visuals...</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-400">
                        <span>24 replies</span>
                        <span>67 likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-80 space-y-8">
            {isLoggedIn && <RecommendationAI />}

            <PopularUsers />

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Your Movie Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Movies Watched</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span>Reviews Written</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between">
                  <span>Lists Created</span>
                  <span className="font-medium">7</span>
                </div>
                <div className="flex justify-between">
                  <span>Favorite Genre</span>
                  <span className="font-medium">Sci-Fi</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Stats
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

