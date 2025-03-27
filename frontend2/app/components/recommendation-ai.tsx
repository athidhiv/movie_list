"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send } from "lucide-react"

export default function RecommendationAI() {
  const [prompt, setPrompt] = useState("")
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your love for sci-fi thrillers, I recommend 'Inception' - a mind-bending journey through dreams within dreams.",
        "You might enjoy 'The Grand Budapest Hotel' - it has the quirky humor and visual style similar to your favorite Wes Anderson films.",
        "Try 'Parasite' - it blends social commentary with suspense in a way that matches your interest in thought-provoking cinema.",
        "Since you enjoyed character-driven dramas, 'The Shawshank Redemption' would be perfect for your next watch.",
      ]

      setRecommendation(responses[Math.floor(Math.random() * responses.length)])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">FilmMind AI</h3>
      </div>

      <p className="text-sm text-gray-300 mb-4">
        Your personal movie companion. Ask for recommendations or insights about films.
      </p>

      {recommendation && (
        <div className="bg-gray-800 p-3 rounded-lg mb-4">
          <p className="text-sm">{recommendation}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What should I watch tonight?"
          className="bg-gray-800 border-gray-700"
        />
        <Button type="submit" size="icon" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

