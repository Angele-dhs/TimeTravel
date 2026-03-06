"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const faqResponses: Record<string, string> = {
  prix: "Nos voyages varient entre 9 800€ et 12 500€ selon la destination et la durée. Ce prix comprend le transport temporel, l'hébergement d'époque, les repas, les costumes et un guide expert.",
  securite:
    "Votre sécurité est notre priorité absolue. Notre technologie de voyage temporel a un taux de retour de 99.9%. Vous êtes accompagné d'un guide formé aux protocoles d'urgence et équipé d'un dispositif de rappel instantané.",
  destination:
    "Nous proposons actuellement 3 destinations phares : l'Égypte Ancienne (2500 av. J.-C.), l'Europe Médiévale (1200 ap. J.-C.) et la Renaissance Italienne (1500 ap. J.-C.). D'autres époques seront bientôt disponibles !",
  reservation:
    "Pour réserver, sélectionnez votre destination, choisissez vos dates et remplissez le formulaire. Un acompte de 30% est demandé à la réservation. Vous pouvez annuler gratuitement jusqu'à 30 jours avant le départ.",
  duree:
    "Nos voyages durent entre 5 et 7 jours selon la destination. Grâce à notre technologie, vous pouvez passer une semaine dans le passé et revenir seulement quelques heures après votre départ !",
  vetements:
    "Des costumes d'époque authentiques sont fournis et inclus dans le prix. Nous vous conseillons cependant d'apporter des sous-vêtements confortables et des médicaments personnels.",
}

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("prix") || lowerMessage.includes("cout") || lowerMessage.includes("tarif")) {
    return faqResponses.prix
  }
  if (lowerMessage.includes("securite") || lowerMessage.includes("danger") || lowerMessage.includes("risque")) {
    return faqResponses.securite
  }
  if (lowerMessage.includes("destination") || lowerMessage.includes("epoque") || lowerMessage.includes("ou")) {
    return faqResponses.destination
  }
  if (lowerMessage.includes("reserver") || lowerMessage.includes("reservation") || lowerMessage.includes("annul")) {
    return faqResponses.reservation
  }
  if (lowerMessage.includes("duree") || lowerMessage.includes("combien de temps") || lowerMessage.includes("jours")) {
    return faqResponses.duree
  }
  if (lowerMessage.includes("vetement") || lowerMessage.includes("emporter") || lowerMessage.includes("valise")) {
    return faqResponses.vetements
  }

  return "Je suis là pour vous aider ! Vous pouvez me poser des questions sur nos destinations, les prix, la sécurité, les réservations ou ce qu'il faut emporter. Comment puis-je vous aider ?"
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Bonjour ! Je suis votre assistant TimeTravel. Comment puis-je vous aider à planifier votre voyage dans le temps ?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] shadow-2xl border-border">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Assistant TimeTravel
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-lg px-3 py-2 text-sm text-secondary-foreground">
                    <span className="flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
