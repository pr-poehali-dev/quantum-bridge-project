import { useEffect } from "react"
import { useUIStore } from "@/lib/ui-store"
import { OrbSlot } from "./OrbSlot"
import { PersonaToggle } from "./PersonaToggle"
import { MiniAppAbout } from "./MiniAppAbout"
import { MiniAppResume } from "./MiniAppResume"
import { MiniAppWritings } from "./MiniAppWritings"
import { MiniAppArt } from "./MiniAppArt"
import Icon from "@/components/ui/icon"

type AppType = "about" | "resume" | "writings" | "art"

const APP_COMPONENTS: Record<AppType, React.ComponentType> = {
  about: MiniAppAbout,
  resume: MiniAppResume,
  writings: MiniAppWritings,
  art: MiniAppArt,
}

const APP_ICONS: Record<AppType, string> = {
  about: "User",
  resume: "FileText",
  writings: "PenTool",
  art: "Palette",
}

const APP_LABELS: Record<AppType, string> = {
  about: "Обо мне",
  resume: "Резюме",
  writings: "Статьи",
  art: "Арт",
}

const APP_COLORS: Record<AppType, string> = {
  about: "#a855f7",
  resume: "#22d3ee",
  writings: "#f72585",
  art: "#4361ee",
}

export function OSOverlay() {
  const { osOpen, activeApp, closeOS, setActiveApp } = useUIStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && osOpen) closeOS()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [osOpen, closeOS])

  if (!osOpen) return null

  const ActiveComponent = activeApp ? APP_COMPONENTS[activeApp as AppType] : null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none" style={{ background: 'var(--neon-purple)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-[100px] pointer-events-none" style={{ background: 'var(--neon-cyan)' }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 relative z-10" style={{ borderBottom: '1px solid rgba(168,85,247,0.2)', background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-4">
          <OrbSlot size="sm" />
          <h1 className="text-xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.1em' }}>
            ORBIT OS
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <PersonaToggle />
          <button
            onClick={closeOS}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
            style={{ background: 'rgba(247,37,133,0.2)', border: '1px solid rgba(247,37,133,0.4)' }}
            aria-label="Закрыть"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <nav className="w-56 p-4 flex flex-col gap-2 relative z-10" style={{ borderRight: '1px solid rgba(168,85,247,0.15)', background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(20px)' }}>
          {(Object.keys(APP_COMPONENTS) as AppType[]).map((key) => {
            const isActive = activeApp === key
            const color = APP_COLORS[key]

            return (
              <button
                key={key}
                onClick={() => setActiveApp(key)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={isActive
                  ? { background: `rgba(${hexToRgb(color)},0.2)`, color: color, border: `1px solid ${color}`, boxShadow: `0 0 20px rgba(${hexToRgb(color)},0.2)` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#888', border: '1px solid rgba(255,255,255,0.06)' }
                }
              >
                <Icon name={APP_ICONS[key]} size={18} />
                {APP_LABELS[key]}
              </button>
            )
          })}
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8 relative z-10">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-4xl font-black mb-3 text-white text-glow-purple" style={{ fontFamily: 'Orbitron' }}>ORBIT OS</h2>
                <p className="text-gray-500">Выбери раздел в боковом меню</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
