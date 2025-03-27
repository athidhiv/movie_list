import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageSquare, Film } from "lucide-react"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "like",
    user: "FilmCritic101",
    content: 'liked your review of "Dune"',
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40&text=FC",
  },
  {
    id: 2,
    type: "comment",
    user: "MovieBuff",
    content: "commented on your discussion about Christopher Nolan films",
    time: "5 hours ago",
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
  },
  {
    id: 3,
    type: "recommendation",
    user: "CinemaExplorer",
    content: 'recommended "The Godfather" to you',
    time: "1 day ago",
    avatar: "/placeholder.svg?height=40&width=40&text=CE",
  },
]

export default function NotificationPanel() {
  return (
    <Card className="w-80 bg-gray-900 border-gray-800 text-white">
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <img
                    src={notification.avatar || "/placeholder.svg"}
                    alt={notification.user}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{notification.user}</span>
                    {notification.type === "like" && <Heart className="h-3 w-3 text-red-500" />}
                    {notification.type === "comment" && <MessageSquare className="h-3 w-3 text-blue-500" />}
                    {notification.type === "recommendation" && <Film className="h-3 w-3 text-green-500" />}
                  </div>
                  <p className="text-sm text-gray-300">{notification.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

