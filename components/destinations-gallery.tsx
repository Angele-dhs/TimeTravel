"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star, ArrowRight } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/motion"

const destinations = [
  {
    id: "egypte-ancienne",
    name: "Égypte Ancienne",
    era: "2500 av. J.-C.",
    image: "/images/ancient-egypt.jpg",
    description:
      "Assistez à la construction des pyramides et découvrez les secrets des pharaons.",
    highlights: ["Pyramides de Gizeh", "Vallée des Rois", "Nil légendaire"],
    duration: "7 jours",
    rating: 4.9,
    price: "12 500",
  },
  {
    id: "europe-medievale",
    name: "Europe Médiévale",
    era: "1200 ap. J.-C.",
    image: "/images/medieval-europe.jpg",
    description:
      "Vivez l'âge des chevaliers, des châteaux forts et des grandes épopées.",
    highlights: ["Tournois de chevalerie", "Châteaux forts", "Marchés médiévaux"],
    duration: "5 jours",
    rating: 4.8,
    price: "9 800",
  },
  {
    id: "renaissance-italienne",
    name: "Renaissance Italienne",
    era: "1500 ap. J.-C.",
    image: "/images/renaissance-italy.jpg",
    description:
      "Rencontrez les plus grands artistes et penseurs de l'histoire.",
    highlights: ["Florence artistique", "Atelier de Léonard", "Venise romantique"],
    duration: "6 jours",
    rating: 4.9,
    price: "11 200",
  },
]

export function DestinationsGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="destinations" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Nos Destinations
          </Badge>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Choisissez votre époque
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Trois périodes emblématiques de l{"'"}histoire vous attendent. Chaque
            voyage est une immersion totale dans le passé.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {destinations.map((destination) => (
            <StaggerItem key={destination.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Card
                  className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 h-full"
                  onMouseEnter={() => setHoveredId(destination.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className={`object-cover transition-transform duration-700 ease-out ${
                        hoveredId === destination.id ? "scale-110" : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      {destination.era}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {destination.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent" />
                        <span>{destination.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{destination.price} €</span>
                      </div>
                    </div>

                    <Button asChild className="w-full group/btn">
                      <Link href={`/destinations/${destination.id}`}>
                        Découvrir
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
