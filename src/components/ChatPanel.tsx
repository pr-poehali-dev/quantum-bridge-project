import { useState, useEffect, useRef } from "react"
import type { FormEvent } from "react"
import { useUIStore } from "@/lib/ui-store"

const CHAT_URL = "https://functions.poehali.dev/82f30671-d720-4891-bade-7842b458b8c1"
const QUICK_CHIPS = ["Кто ты?", "Покажи работы", "Чем занимаешься?"]

type AppType = "about" | "resume" | "writings" | "art"

export function ChatPanel() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { openOS } = useUIStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return
    setMessages((prev) => [...prev, { text, isUser: true }])
    setIsLoading(true)
    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { text: data.reply, isUser: false }])
      if (data.action) setTimeout(() => openOS(data.action as AppType), 1000)
    } catch {
      setMessages((prev) => [...prev, { text: "Упс, что-то пошло не так. Попробуй ещё раз 🛸", isUser: false }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleChipClick = (chip: string) => sendMessage(chip)

  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    sendMessage(inputValue.trim())
    setInputValue("")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Messages */}
      <div className="mb-4 space-y-2 h-36 overflow-y-auto scroll-smooth px-1">
        {messages.length === 0 && (
          <div className="flex justify-start">
            <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm font-medium" style={{ background: 'var(--bg-card2)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.3)' }}>
              Привет! Я здесь чтобы рассказать о моём хозяине. Спроси что-нибудь ↓
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-medium ${
                msg.isUser
                  ? "rounded-br-sm text-white"
                  : "rounded-tl-sm"
              }`}
              style={msg.isUser
                ? { background: 'linear-gradient(135deg, #a855f7, #4361ee)', boxShadow: '0 0 15px rgba(168,85,247,0.3)' }
                : { background: 'var(--bg-card2)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.3)' }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: 'var(--bg-card2)', border: '1px solid rgba(168,85,247,0.3)' }}>
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--neon-purple)', animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--neon-purple)', animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--neon-purple)', animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleInputSubmit} className="mb-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напиши сообщение..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl text-sm font-medium text-white placeholder-gray-600 focus:outline-none transition-all disabled:opacity-50"
            style={{ background: 'var(--bg-card2)', border: '1px solid rgba(168,85,247,0.3)' }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #a855f7, #4361ee)', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}
          >
            ↗
          </button>
        </div>
      </form>

      {/* Quick Chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => handleChipClick(chip)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{ background: 'rgba(168,85,247,0.12)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.3)' }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}