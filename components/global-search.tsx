"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export function GlobalSearch() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState([
    "Stanford University",
    "Computer Science programs",
    "TOEFL requirements",
  ])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (searchTerm.length > 2) {
      const mockResults = [
        {
          id: 1,
          title: "Stanford University",
          type: "School",
          description: "Private research university in California",
          url: "/schools/stanford",
        },
        {
          id: 2,
          title: "Computer Science Programs",
          type: "Program",
          description: "Top-ranked CS programs worldwide",
          url: "/programs/computer-science",
        },
        {
          id: 3,
          title: "Personal Statement Guide",
          type: "Resource",
          description: "How to write compelling personal statements",
          url: "/help/personal-statement",
        },
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setResults(mockResults)
    } else {
      setResults([])
    }
  }, [searchTerm])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative w-64 justify-start text-muted-foreground"
      >
        <Search className="h-4 w-4 mr-2" />
        Search...
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          ⌘K
        </kbd>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center border-b px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schools, programs, resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                autoFocus
              />
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {searchTerm.length === 0 ? (
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchTerm(search)}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["MIT", "Harvard", "Engineering", "MBA Programs", "Scholarships"].map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-secondary/80"
                          onClick={() => setSearchTerm(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={() => setIsOpen(false)}
                      className="block p-3 hover:bg-muted rounded-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{result.title}</h3>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        <Badge variant="outline">{result.type}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No results found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
