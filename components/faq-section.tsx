"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"

const faqItems = [
  {
    question: "Comment fonctionne le voyage dans le temps ?",
    answer:
      "Notre technologie propriétaire de distorsion temporelle permet de créer des portails sécurisés vers des époques spécifiques. Vous serez accompagné par un guide expert tout au long de votre voyage et équipé d'un dispositif de retour instantané pour garantir votre sécurité.",
  },
  {
    question: "Est-ce que le voyage temporel est sûr ?",
    answer:
      "Absolument. Nous avons effectué plus de 10 000 voyages sans incident majeur. Chaque voyageur est équipé d'un bouclier temporel personnel et d'un traducteur universel. Notre équipe médicale surveille en permanence vos constantes vitales.",
  },
  {
    question: "Puis-je interagir avec les habitants de l'époque ?",
    answer:
      "Oui, l'interaction est encouragée ! Cependant, vous devez suivre notre Protocole de Non-Interférence Historique (PNIH) pour éviter tout paradoxe temporel. Votre guide vous expliquera les règles spécifiques à chaque époque visitée.",
  },
  {
    question: "Que dois-je emporter pour mon voyage ?",
    answer:
      "Nous fournissons des vêtements d'époque authentiques et tout l'équipement nécessaire. Vous n'avez besoin d'apporter que vos médicaments personnels (si applicable) et votre sens de l'aventure ! Les appareils électroniques modernes sont interdits.",
  },
  {
    question: "Combien de temps dure un voyage ?",
    answer:
      "La durée varie selon la destination. L'Égypte Ancienne propose des séjours de 3 à 7 jours, l'Europe Médiévale de 4 à 10 jours, et la Renaissance Italienne de 5 à 14 jours. Le temps passé dans le passé correspond au même temps dans le présent.",
  },
  {
    question: "Quelles sont les conditions d'annulation ?",
    answer:
      "Annulation gratuite jusqu'à 30 jours avant le départ. Entre 30 et 15 jours, 50% du montant est retenu. Moins de 15 jours, aucun remboursement n'est possible. Une assurance voyage temporel optionnelle est disponible pour couvrir les imprévus.",
  },
  {
    question: "Y a-t-il des restrictions de santé ?",
    answer:
      "Le voyage temporel est déconseillé aux personnes souffrant de problèmes cardiaques graves, aux femmes enceintes et aux enfants de moins de 12 ans. Un certificat médical datant de moins de 3 mois est requis pour tous les voyageurs.",
  },
  {
    question: "Comment réserver un voyage ?",
    answer:
      "Vous pouvez réserver directement sur notre site en sélectionnant votre destination, vos dates et le nombre de voyageurs. Un acompte de 30% est demandé à la réservation, le solde étant dû 45 jours avant le départ.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tout ce que vous devez savoir avant de voyager dans le temps
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <StaggerContainer staggerDelay={0.08}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <StaggerItem key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-border/50 bg-card/50 px-6 mb-3 rounded-lg border"
                  >
                    <AccordionTrigger className="text-foreground text-base md:text-lg font-medium hover:no-underline py-5">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
