import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, UserPlus, Settings, Image, FileText } from "lucide-react"

// Mock user data
const user = {
  id: 100,
  name: "Jordan Smith",
  username: "@jordansmith",
  bio: "Digital designer and photographer. Love to travel and explore new places.",
  avatar: "/placeholder.svg?height=120&width=120",
  coverPhoto: "/placeholder.svg?height=300&width=800",
  followers: 1243,
  following: 567,
  posts: [
    {
      id: 1,
      content: "Just visited the new art exhibition downtown. Absolutely mind-blowing!",
      image: "/placeholder.svg?height=300&width=400",
      likes: 89,
      comments: 12,
      time: "2 days ago",
    },
    {
      id: 2,
      content: "Working on some new designs for an upcoming project. Stay tuned!",
      likes: 56,
      comments: 8,
      time: "5 days ago",
    },
    {
      id: 3,
      content: "Beautiful sunset at the beach today.",
      image: "/placeholder.svg?height=300&width=400",
      likes: 124,
      comments: 18,
      time: "1 week ago",
    },
  ],
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            ConnectHub
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/feed">
              <Button variant="ghost" size="sm">
                Feed
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="relative">
        <div className="h-48 md:h-64 bg-gray-200 w-full">
          <img src={user.coverPhoto || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4">
          <div className="relative -mt-16 sm:-mt-24 mb-4 flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white"
            />
            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500">{user.username}</p>
              <p className="mt-2">{user.bio}</p>
              <div className="flex gap-4 mt-3">
                <div>
                  <span className="font-semibold">{user.followers}</span>{" "}
                  <span className="text-gray-500">Followers</span>
                </div>
                <div>
                  <span className="font-semibold">{user.following}</span>{" "}
                  <span className="text-gray-500">Following</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="posts" className="max-w-3xl mx-auto">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">
              <FileText className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="photos">
              <Image className="h-4 w-4 mr-2" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            {user.posts.map((post) => (
              <Card key={post.id} className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-10 w-10 rounded-full" />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{post.time}</div>
                    </div>
                  </div>
                  <p className="mb-3">{post.content}</p>
                  {post.image && (
                    <img src={post.image || "/placeholder.svg"} alt="Post content" className="rounded-md w-full" />
                  )}
                  <div className="flex gap-4 mt-4">
                    <Button variant="ghost" size="sm">
                      Like ({post.likes})
                    </Button>
                    <Button variant="ghost" size="sm">
                      Comment ({post.comments})
                    </Button>
                    <Button variant="ghost" size="sm">
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="photos">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {user.posts
                .filter((post) => post.image)
                .map((post) => (
                  <div key={post.id} className="aspect-square">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="User photo"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">About {user.name}</h3>
                <p>{user.bio}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <span className="font-medium">Location:</span>
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Joined:</span>
                    <span>January 2023</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium">Website:</span>
                    <a href="#" className="text-primary hover:underline">
                      jordansmith.design
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

