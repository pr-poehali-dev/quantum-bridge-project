import { useUIStore } from "@/lib/ui-store"
import Icon from "@/components/ui/icon"

type AppType = "about" | "resume" | "writings" | "art"

const DOCK_ITEMS: Array<{ id: AppType; label: string; icon: string; color: string }> = [
  { id: "about", label: "Обо мне", icon: "User", color: "#a855f7" },
  { id: "resume", label: "Резюме", icon: "FileText", color: "#22d3ee" },
  { id: "writings", label: "Статьи", icon: "PenTool", color: "#f72585" },
  { id: "art", label: "Арт", icon: "Palette", color: "#4361ee" },
]

export function Dock() {
  const { openOS } = useUIStore()

  return (
    <div className="flex gap-3 px-5 py-3 rounded-2xl" style={{ background: 'rgba(18,18,26,0.8)', border: '1px solid rgba(168,85,247,0.2)', backdropFilter: 'blur(20px)', boxShadow: '0 0 40px rgba(168,85,247,0.15)' }}>
      {DOCK_ITEMS.map(({ id, label, icon, color }) => (
        <button
          key={id}
          onClick={() => openOS(id)}
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
          style={{ background: `rgba(${hexToRgb(color)},0.15)`, border: `1px solid rgba(${hexToRgb(color)},0.3)` }}
          aria-label={label}
          title={label}
        >
          <Icon name={icon} size={20} style={{ color }} />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" style={{ background: 'rgba(18,18,26,0.9)', border: '1px solid rgba(168,85,247,0.3)' }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
