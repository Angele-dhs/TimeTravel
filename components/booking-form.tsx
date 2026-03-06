"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, Users, CreditCard, CheckCircle } from "lucide-react"

interface BookingFormProps {
  destination: string
  price: number
  duration: string
}

export function BookingForm({ destination, price, duration }: BookingFormProps) {
  const [travelers, setTravelers] = useState(1)
  const [departureDate, setDepartureDate] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalPrice = price * travelers

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!departureDate) {
      newErrors.date = "Veuillez sélectionner une date de départ"
    } else {
      const selectedDate = new Date(departureDate)
      const minDate = new Date()
      minDate.setDate(minDate.getDate() + 30)

      if (selectedDate < minDate) {
        newErrors.date = "La réservation doit être faite au moins 30 jours à l'avance"
      }
    }

    if (travelers < 1 || travelers > 10) {
      newErrors.travelers = "Le nombre de voyageurs doit être entre 1 et 10"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitted(true)
    }
  }

  const getMinDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date.toISOString().split("T")[0]
  }

  if (isSubmitted) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="pt-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">
            Réservation confirmée !
          </h3>
          <p className="text-muted-foreground mb-4">
            Votre voyage vers {destination} a été réservé avec succès.
            Vous recevrez un email de confirmation sous peu.
          </p>
          <div className="bg-secondary/50 rounded-lg p-4 text-left space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Destination:</span>{" "}
              <span className="text-foreground font-medium">{destination}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Date de départ:</span>{" "}
              <span className="text-foreground font-medium">
                {new Date(departureDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Voyageurs:</span>{" "}
              <span className="text-foreground font-medium">{travelers}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Total:</span>{" "}
              <span className="text-foreground font-medium">{totalPrice.toLocaleString()} €</span>
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => setIsSubmitted(false)}
          >
            Nouvelle réservation
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-serif text-xl">Réserver ce voyage</CardTitle>
        <CardDescription>
          {duration} • À partir de {price.toLocaleString()} € / personne
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date de départ
            </Label>
            <Input
              id="date"
              type="date"
              min={getMinDate()}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className={errors.date ? "border-destructive" : ""}
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Nombre de voyageurs
            </Label>
            <Input
              id="travelers"
              type="number"
              min={1}
              max={10}
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
              className={errors.travelers ? "border-destructive" : ""}
            />
            {errors.travelers && (
              <p className="text-sm text-destructive">{errors.travelers}</p>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {price.toLocaleString()} € x {travelers} voyageur{travelers > 1 ? "s" : ""}
              </span>
              <span className="text-foreground">{totalPrice.toLocaleString()} €</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{totalPrice.toLocaleString()} €</span>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <CreditCard className="w-4 h-4 mr-2" />
            Réserver maintenant
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Acompte de 30% à la réservation. Annulation gratuite jusqu{"'"}à 30 jours avant le départ.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
