import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useUIStore } from "@/lib/ui-store"
import { Button } from "@/components/ui/button"

const QUICK_CHIPS = ["Кто ты?", "Покажи работы", "Чем занимаешься?"]

const RESPONSES: Record<string, string> = {
  "Кто ты?": "Я цифровой двойник. Не настоящий ИИ, но знаю о хозяине всё. Хочешь узнать больше — просто спроси!",
  "Покажи работы": "Загружаю галерею... там есть кое-что интересное 👾",
  "Чем занимаешься?": "Разрабатываю крутые штуки. Код, дизайн, идеи — всё в деле. Загляни в резюме!",
}

const ACTION_RESPONSES: Record<string, { response: string; action: string }> = {
  "открой арт": { response: "⚡ Запускаю галерею...", action: "art" },
  "покажи арт": { response: "⚡ Открываю арт-раздел!", action: "art" },
  "покажи работы": { response: "⚡ Загружаю работы...", action: "art" },
  "открой резюме": { response: "📄 Открываю резюме...", action: "resume" },
  "покажи резюме": { response: "📄 Вот моё резюме!", action: "resume" },
  "открой обо мне": { response: "🧬 Загружаю данные...", action: "about" },
  "покажи обо мне": { response: "🧬 Рассказываю о себе!", action: "about" },
  "открой статьи": { response: "✍️ Открываю статьи...", action: "writings" },
  "покажи статьи": { response: "✍️ Вот статьи!", action: "writings" },
}

type AppType = "about" | "resume" | "writings" | "art"

export function ChatPanel() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { openOS } = useUIStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const addBotMessage = (text: string, delay = 600) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { text, isUser: false }])
    }, delay)
  }

  const handleChipClick = (chip: string) => {
    const response = RESPONSES[chip] || "Интересный вопрос! Дай подумать..."
    setMessages((prev) => [...prev, { text: chip, isUser: true }])
    addBotMessage(response)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }])

    const lowerMessage = userMessage.toLowerCase()
    const actionMatch = Object.keys(ACTION_RESPONSES).find((key) => lowerMessage.includes(key))

    if (actionMatch) {
      const { response, action } = ACTION_RESPONSES[actionMatch]
      addBotMessage(response)
      setTimeout(() => { openOS(action as AppType) }, 1500)
    } else {
      addBotMessage("Понял! Попробуй написать «покажи работы», «открой резюме» или «обо мне» — покажу всё интересное 🚀")
    }
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
        {isTyping && (
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
            className="flex-1 px-4 py-3 rounded-xl text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all"
            style={{ background: 'var(--bg-card2)', border: '1px solid rgba(168,85,247,0.3)', focusRingColor: 'var(--neon-purple)' } as React.CSSProperties}
          />
          <button
            type="submit"
            className="px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
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
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(168,85,247,0.12)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.3)' }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
