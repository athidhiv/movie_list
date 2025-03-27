import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

// Mock popular users data
const popularUsers = [
  { id: 1, name: "CinemaExplorer", avatar: "/placeholder.svg?height=40&width=40&text=CE", followers: 1243, lists: 32 },
  { id: 2, name: "FilmCritic101", avatar: "/placeholder.svg?height=40&width=40&text=FC", followers: 987, lists: 27 },
  { id: 3, name: "MovieBuff", avatar: "/placeholder.svg?height=40&width=40&text=MB", followers: 756, lists: 19 },
  { id: 4, name: "DirectorsFan", avatar: "/placeholder.svg?height=40&width=40&text=DF", followers: 542, lists: 15 },
]

export default function PopularUsers() {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Popular Film Enthusiasts</h3>
      <div className="space-y-4">
        {popularUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-10 w-10 rounded-full" />
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-xs text-gray-400">
                  {user.followers} followers • {user.lists} lists
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full mt-4">
        View All
      </Button>
    </div>
  )
}

