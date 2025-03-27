"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, X, Film, User, Heart, List, LogOut } from "lucide-react"

interface NavbarProps {
  isLoggedIn: boolean
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Film className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold">FilmSocial</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/movies" className="text-gray-300 hover:text-white px-3 py-2">
              Movies
            </Link>
            <Link href="/lists" className="text-gray-300 hover:text-white px-3 py-2">
              Lists
            </Link>
            <Link href="/community" className="text-gray-300 hover:text-white px-3 py-2">
              Community
            </Link>
          </nav>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {showSearch ? (
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search movies, users..."
                  className="w-64 bg-gray-800 border-gray-700 focus:border-primary"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowSearch(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    <img src="/placeholder.svg?height=32&width=32&text=U" alt="User" className="rounded-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <List className="mr-2 h-4 w-4" />
                    <span>My Lists</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {!showMobileMenu && (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)} className="mr-2">
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden py-2 px-4">
            <Input type="text" placeholder="Search movies, users..." className="w-full bg-gray-800 border-gray-700" />
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              <Link href="/movies" className="text-gray-300 hover:text-white px-4 py-2">
                Movies
              </Link>
              <Link href="/lists" className="text-gray-300 hover:text-white px-4 py-2">
                Lists
              </Link>
              <Link href="/community" className="text-gray-300 hover:text-white px-4 py-2">
                Community
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="text-gray-300 hover:text-white px-4 py-2">
                    Profile
                  </Link>
                  <Link href="/lists" className="text-gray-300 hover:text-white px-4 py-2">
                    My Lists
                  </Link>
                  <Link href="/favorites" className="text-gray-300 hover:text-white px-4 py-2">
                    Favorites
                  </Link>
                  <Button variant="ghost" className="justify-start px-4">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4 pt-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

