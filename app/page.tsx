import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { DestinationsGallery } from "@/components/destinations-gallery"
import { AboutSection } from "@/components/about-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DestinationsGallery />
      <AboutSection />
      <FaqSection />
      <Footer />
      <Chatbot />
    </main>
  )
}
