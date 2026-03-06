import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { BookingForm } from "@/components/booking-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Star, Clock, Shield, Users } from "lucide-react"

const destinations = {
  "egypte-ancienne": {
    name: "Égypte Ancienne",
    era: "2500 av. J.-C.",
    image: "/images/ancient-egypt.jpg",
    description:
      "Plongez au cœur de la civilisation égyptienne à son apogée. Assistez à la construction des grandes pyramides de Gizeh, naviguez sur le Nil sacré et découvrez les secrets des pharaons. Une expérience unique qui vous transportera 4500 ans dans le passé.",
    longDescription:
      "L'Égypte Ancienne représente l'une des civilisations les plus fascinantes de l'histoire humaine. Durant votre séjour, vous aurez l'opportunité exceptionnelle d'observer les techniques de construction des pyramides, de participer aux rituels quotidiens des temples, et de découvrir la vie quotidienne des Égyptiens de l'Ancien Empire.",
    highlights: [
      "Construction des Pyramides de Gizeh",
      "Visite de la Vallée des Rois",
      "Navigation sur le Nil",
      "Découverte de Memphis",
      "Rencontre avec les scribes",
      "Cérémonie au temple de Karnak",
    ],
    itinerary: [
      { day: 1, title: "Arrivée à Memphis", description: "Acclimatation et visite de la capitale de l'Ancien Empire." },
      { day: 2, title: "Les Pyramides", description: "Observation du chantier de construction de Khéops." },
      { day: 3, title: "Le Sphinx", description: "Découverte du Grand Sphinx et des temples funéraires." },
      { day: 4, title: "Navigation sur le Nil", description: "Croisière traditionnelle vers Saqqarah." },
      { day: 5, title: "Vie quotidienne", description: "Immersion dans un village égyptien typique." },
      { day: 6, title: "Temples sacrés", description: "Visite des temples et cérémonies religieuses." },
      { day: 7, title: "Retour", description: "Dernières découvertes et retour à votre époque." },
    ],
    duration: "7 jours",
    rating: 4.9,
    reviews: 847,
    price: 12500,
    includes: [
      "Transport temporel aller-retour",
      "Hébergement en résidence d'époque",
      "Tous les repas inclus",
      "Costumes et accessoires authentiques",
      "Guide historien expert",
      "Assurance voyage temporel",
    ],
  },
  "europe-medievale": {
    name: "Europe Médiévale",
    era: "1200 ap. J.-C.",
    image: "/images/medieval-europe.jpg",
    description:
      "Vivez l'âge des chevaliers et des châteaux forts. Participez à des tournois légendaires, explorez des forteresses imprenables et découvrez la vie médiévale authentique. Une aventure épique au cœur du Moyen Âge.",
    longDescription:
      "Le Moyen Âge européen est une période riche en aventures et en découvertes. Vous serez immergé dans la vie féodale, entre châteaux majestueux et villages pittoresques. Assistez à des tournois de chevalerie, découvrez l'art des forgerons et vivez le quotidien d'une époque fascinante.",
    highlights: [
      "Tournoi de chevalerie",
      "Visite de châteaux forts",
      "Marchés médiévaux",
      "Banquet seigneurial",
      "Atelier d'armurerie",
      "Chasse au faucon",
    ],
    itinerary: [
      { day: 1, title: "Arrivée au château", description: "Installation et découverte de votre demeure médiévale." },
      { day: 2, title: "Vie de château", description: "Immersion dans le quotidien de la noblesse." },
      { day: 3, title: "Le grand tournoi", description: "Participation au tournoi de chevalerie." },
      { day: 4, title: "Le village", description: "Exploration des marchés et ateliers d'artisans." },
      { day: 5, title: "Retour", description: "Banquet d'adieu et retour à votre époque." },
    ],
    duration: "5 jours",
    rating: 4.8,
    reviews: 623,
    price: 9800,
    includes: [
      "Transport temporel aller-retour",
      "Hébergement en château",
      "Festins médiévaux inclus",
      "Armure et costumes d'époque",
      "Guide historien expert",
      "Assurance voyage temporel",
    ],
  },
  "renaissance-italienne": {
    name: "Renaissance Italienne",
    era: "1500 ap. J.-C.",
    image: "/images/renaissance-italy.jpg",
    description:
      "Découvrez l'âge d'or de l'art et de la pensée. Rencontrez les plus grands génies de l'histoire, admirez la création de chefs-d'œuvre immortels et vivez la splendeur de la Renaissance italienne.",
    longDescription:
      "La Renaissance italienne marque l'un des sommets de la créativité humaine. Visitez les ateliers des plus grands maîtres, assistez à la création d'œuvres qui traverseront les siècles, et plongez dans l'effervescence intellectuelle et artistique de Florence et Venise.",
    highlights: [
      "Atelier de Léonard de Vinci",
      "Florence des Médicis",
      "Venise romantique",
      "Galeries d'art",
      "Palais somptueux",
      "Carnaval vénitien",
    ],
    itinerary: [
      { day: 1, title: "Arrivée à Florence", description: "Découverte de la cité des Médicis." },
      { day: 2, title: "Les ateliers", description: "Visite des ateliers d'artistes renommés." },
      { day: 3, title: "Art et culture", description: "Galeries, églises et palais florentins." },
      { day: 4, title: "Voyage à Venise", description: "Découverte de la Sérénissime." },
      { day: 5, title: "Venise romantique", description: "Gondoles, palais et places vénitiennes." },
      { day: 6, title: "Retour", description: "Dernières merveilles et retour à votre époque." },
    ],
    duration: "6 jours",
    rating: 4.9,
    reviews: 712,
    price: 11200,
    includes: [
      "Transport temporel aller-retour",
      "Hébergement en palazzo",
      "Gastronomie italienne authentique",
      "Costumes Renaissance",
      "Guide historien de l'art",
      "Assurance voyage temporel",
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(destinations).map((slug) => ({ slug }))
}

interface DestinationPageProps {
  params: Promise<{ slug: string }>
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params
  const destination = destinations[slug as keyof typeof destinations]

  if (!destination) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/#destinations">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux destinations
              </Link>
            </Button>
            <Badge className="mb-4">{destination.era}</Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{destination.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent" />
                <span>{destination.rating} ({destination.reviews} avis)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>À partir de {destination.price.toLocaleString()} €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  À propos de ce voyage
                </h2>
                <p className="text-muted-foreground mb-4">{destination.description}</p>
                <p className="text-muted-foreground">{destination.longDescription}</p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Points forts
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                    >
                      <Star className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Itinéraire jour par jour
                </h2>
                <div className="space-y-4">
                  {destination.itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="flex gap-4 p-4 rounded-lg bg-card border border-border"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                        J{item.day}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Ce qui est inclus
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.includes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingForm
                  destination={destination.name}
                  price={destination.price}
                  duration={destination.duration}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
