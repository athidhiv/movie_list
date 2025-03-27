import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2 } from "lucide-react"

// Mock data for posts
const posts = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just finished a great hike in the mountains! The view was breathtaking.",
    image: "/placeholder.svg?height=400&width=600",
    likes: 24,
    comments: 5,
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Working on a new project. Can't wait to share it with everyone!",
    likes: 18,
    comments: 3,
    time: "4 hours ago",
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Jamie Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just had the most amazing dinner at that new restaurant downtown. Highly recommend!",
    image: "/placeholder.svg?height=400&width=600",
    likes: 32,
    comments: 7,
    time: "6 hours ago",
  },
]

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            ConnectHub
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/messages">
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="rounded-full">
                <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="h-8 w-8 rounded-full" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <img src="/placeholder.svg?height=40&width=40" alt="Your profile" className="h-10 w-10 rounded-full" />
                <Input placeholder="What's on your mind?" className="flex-1" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Post</Button>
            </CardFooter>
          </Card>

          {posts.map((post) => (
            <Card key={post.id} className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Link href={`/profile/${post.user.id}`}>
                    <img
                      src={post.user.avatar || "/placeholder.svg"}
                      alt={post.user.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </Link>
                  <div>
                    <Link href={`/profile/${post.user.id}`} className="font-medium hover:underline">
                      {post.user.name}
                    </Link>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="mb-3">{post.content}</p>
                {post.image && (
                  <img src={post.image || "/placeholder.svg"} alt="Post content" className="rounded-md w-full" />
                )}
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-5 w-5 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

