"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User, Sparkles, RotateCcw } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const SUGGESTED_QUESTIONS = [
  "Quelles destinations proposez-vous ?",
  "Combien coûte un voyage ?",
  "Est-ce sécurisé ?",
  "Comment réserver ?",
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Bonjour ! 🌟 Je suis votre assistant IA TimeTravel. Posez-moi vos questions sur nos voyages dans le temps, je suis là pour vous guider !",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isAIMode, setIsAIMode] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = useCallback(
    async (messageText: string) => {
      if (!messageText.trim() || isTyping) return

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: messageText.trim(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsTyping(true)
      setShowSuggestions(false)

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage]
              .filter((m) => m.role === "user" || m.role === "assistant")
              .slice(-10) // Keep last 10 messages for context
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        })

        if (!response.ok) {
          throw new Error("API request failed")
        }

        const data = await response.json()

        if (data.fallback && isAIMode) {
          setIsAIMode(false)
        } else if (!data.fallback && !isAIMode) {
          setIsAIMode(true)
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content || "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
        }
        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "⚠️ Désolé, je rencontre un problème technique. Veuillez réessayer dans quelques instants ou consulter notre FAQ pour des réponses immédiates.",
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
    },
    [messages, isTyping, isAIMode]
  )

  const handleSend = () => {
    sendMessage(input)
  }

  const handleSuggestionClick = (question: string) => {
    sendMessage(question)
  }

  const resetChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Bonjour ! 🌟 Je suis votre assistant IA TimeTravel. Posez-moi vos questions sur nos voyages dans le temps, je suis là pour vous guider !",
      },
    ])
    setShowSuggestions(true)
  }

  return (
    <>
      {/* Floating chat button with pulse animation */}
      <Button
        id="chatbot-toggle-button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-violet-500/25"
        size="icon"
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <MessageCircle className="h-6 w-6 text-white" />
        {/* Pulse ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-40 animate-ping" />
      </Button>

      {isOpen && (
        <Card
          id="chatbot-panel"
          className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] shadow-2xl border-border/50 backdrop-blur-sm overflow-hidden"
          style={{
            animation: "chatSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header with gradient */}
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border/50 bg-gradient-to-r from-violet-600/10 to-indigo-600/10">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="relative">
                <Bot className="h-5 w-5 text-violet-500" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 border border-background" />
              </div>
              <span>Assistant TimeTravel</span>
              {isAIMode && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-full">
                  <Sparkles className="h-2.5 w-2.5" />
                  IA
                </span>
              )}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                id="chatbot-reset-button"
                variant="ghost"
                size="icon"
                onClick={resetChat}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="Nouvelle conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button
                id="chatbot-close-button"
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages area */}
            <div className="h-[360px] overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  style={{
                    animation: "messageSlideIn 0.3s ease-out",
                  }}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center shrink-0 ring-1 ring-violet-500/20">
                      <Bot className="h-4 w-4 text-violet-500" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-md"
                        : "bg-secondary/80 text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 ring-1 ring-border">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5 justify-start" style={{ animation: "messageSlideIn 0.3s ease-out" }}>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center shrink-0 ring-1 ring-violet-500/20">
                    <Bot className="h-4 w-4 text-violet-500 animate-pulse" />
                  </div>
                  <div className="bg-secondary/80 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-secondary-foreground">
                    <span className="flex gap-1.5 items-center">
                      <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" />
                      <span
                        className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-violet-400 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </span>
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {showSuggestions && messages.length <= 1 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-muted-foreground font-medium px-1">💡 Questions fréquentes :</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(question)}
                        className="text-xs px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 hover:bg-violet-500/15 hover:border-violet-500/40 transition-all duration-200 cursor-pointer"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-border/50 bg-gradient-to-r from-violet-600/5 to-indigo-600/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  id="chatbot-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 border-border/50 bg-background/50 focus-visible:ring-violet-500/30 rounded-full px-4"
                  disabled={isTyping}
                />
                <Button
                  id="chatbot-send-button"
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shrink-0"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </form>
              <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
                {isAIMode ? "Propulsé par IA • Groq + LLaMA 3.3" : "Mode FAQ • Réponses prédéfinies"}
              </p>
            </div>
          </CardContent>

          {/* Inline animations */}
          <style jsx>{`
            @keyframes chatSlideIn {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes messageSlideIn {
              from {
                opacity: 0;
                transform: translateY(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </Card>
      )}
    </>
  )
}
