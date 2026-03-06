"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Clock className={`w-8 h-8 transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`} />
            <span className={`font-serif text-xl md:text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}>
              TimeTravel
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#destinations"
              className={`transition-colors duration-300 ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`}
            >
              Destinations
            </Link>
            <Link
              href="/#about"
              className={`transition-colors duration-300 ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`}
            >
              Notre Agence
            </Link>
            <Link
              href="/#contact"
              className={`transition-colors duration-300 ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`}
            >
              Contact
            </Link>
            <Button>Réserver</Button>
          </div>

          <button
            className={`md:hidden transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              <Link
                href="/#destinations"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                href="/#about"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notre Agence
              </Link>
              <Link
                href="/#contact"
                className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4">
                <Button className="w-full">Réserver</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
