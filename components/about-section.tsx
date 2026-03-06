"use client"

import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Users, Award } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/motion"

const features = [
  {
    icon: Shield,
    title: "Sécurité Maximale",
    description:
      "Notre technologie garantit un voyage sans risque avec retour garanti à votre époque.",
  },
  {
    icon: Clock,
    title: "Précision Temporelle",
    description:
      "Arrivez exactement au moment et lieu choisi grâce à notre calibration quantique.",
  },
  {
    icon: Users,
    title: "Guides Experts",
    description:
      "Des historiens certifiés vous accompagnent pour une immersion authentique.",
  },
  {
    icon: Award,
    title: "Expérience Premium",
    description:
      "Hébergement d'époque, costumes authentiques et gastronomie historique inclus.",
  },
]

const stats = [
  { value: "2,847", label: "Voyageurs satisfaits" },
  { value: "12", label: "Époques disponibles" },
  { value: "99.9%", label: "Taux de retour sécurisé" },
  { value: "4.9/5", label: "Note moyenne" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Notre Agence
          </Badge>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Pionniers du voyage temporel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Depuis 2089, TimeTravel Agency révolutionne le tourisme en offrant des
            expériences uniques à travers les âges. Notre mission : rendre
            l{"'"}histoire accessible et vivante.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20" staggerDelay={0.1}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
