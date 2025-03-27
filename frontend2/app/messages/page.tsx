"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ArrowLeft } from "lucide-react"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    lastMessage: "Hey, how's it going?",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
    },
    lastMessage: "Did you see that new movie?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Jamie Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    lastMessage: "Let's meet up this weekend!",
    time: "2 days ago",
    unread: 0,
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
    },
    lastMessage: "Thanks for the help with the project!",
    time: "3 days ago",
    unread: 0,
  },
]

// Mock messages for a conversation
const mockMessages = [
  {
    id: 1,
    senderId: 101,
    text: "Hey there! How are you doing today?",
    time: "10:30 AM",
  },
  {
    id: 2,
    senderId: 100, // Current user
    text: "I'm doing great, thanks for asking! Just working on some new designs.",
    time: "10:32 AM",
  },
  {
    id: 3,
    senderId: 101,
    text: "That sounds awesome! Can you share some of your work?",
    time: "10:33 AM",
  },
  {
    id: 4,
    senderId: 100,
    text: "Sure, I'll send you some previews once I'm done with the current batch.",
    time: "10:35 AM",
  },
  {
    id: 5,
    senderId: 101,
    text: "Looking forward to it! By the way, are you going to the design meetup next week?",
    time: "10:36 AM",
  },
  {
    id: 6,
    senderId: 100,
    text: "Yes, I'm planning to attend. It should be a great opportunity to network and learn new things.",
    time: "10:38 AM",
  },
  {
    id: 7,
    senderId: 101,
    text: "Great! Maybe we can go together?",
    time: "10:39 AM",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [isMobile, setIsMobile] = useState(false)

  // Find the selected conversation
  const conversation = conversations.find((c) => c.id === selectedConversation)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      senderId: 100, // Current user ID
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setMessageInput("")
  }

  const handleSelectConversation = (id: number) => {
    setSelectedConversation(id)
    setIsMobile(true)
  }

  const handleBackToList = () => {
    setIsMobile(false)
  }

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
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="rounded-full">
                <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="h-8 w-8 rounded-full" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="max-w-5xl mx-auto">
          <CardContent className="p-0">
            <div className="flex h-[70vh]">
              <div className={`w-full md:w-1/3 border-r ${isMobile ? "hidden md:block" : "block"}`}>
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">Messages</h2>
                </div>
                <ScrollArea className="h-[calc(70vh-57px)]">
                  {conversations.map((convo) => (
                    <div
                      key={convo.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedConversation === convo.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() => handleSelectConversation(convo.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={convo.user.avatar || "/placeholder.svg"}
                            alt={convo.user.name}
                            className="h-12 w-12 rounded-full"
                          />
                          {convo.user.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">{convo.user.name}</h3>
                            <span className="text-xs text-gray-500">{convo.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                            {convo.unread > 0 && (
                              <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {convo.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              <div
                className={`w-full md:w-2/3 flex flex-col ${!isMobile && !selectedConversation ? "hidden md:flex" : "flex"}`}
              >
                {selectedConversation ? (
                  <>
                    <div className="p-4 border-b flex items-center gap-3">
                      {isMobile && (
                        <Button variant="ghost" size="icon" onClick={handleBackToList} className="md:hidden">
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                      )}
                      <img
                        src={conversation?.user.avatar || "/placeholder.svg"}
                        alt={conversation?.user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{conversation?.user.name}</h3>
                        <p className="text-xs text-gray-500">{conversation?.user.online ? "Online" : "Offline"}</p>
                      </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === 100 ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                message.senderId === 100 ? "bg-primary text-primary-foreground" : "bg-gray-100"
                              }`}
                            >
                              <p>{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.senderId === 100 ? "text-primary-foreground/70" : "text-gray-500"
                                }`}
                              >
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="p-4 border-t">
                      <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1"
                        />
                        <Button type="submit" size="icon">
                          <Send className="h-5 w-5" />
                        </Button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                      <p className="text-gray-500">Choose a conversation from the list to start chatting</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

