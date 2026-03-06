const EXPERIENCE = [
  {
    role: "Ведущий Frontend-разработчик",
    company: "Stellar Tech",
    period: "2022 — сейчас",
    desc: "Разработка React/TypeScript продуктов, интеграция AI-инструментов, построение дизайн-систем.",
    color: "#a855f7",
  },
  {
    role: "Full Stack разработчик",
    company: "Nova Labs",
    period: "2020 — 2022",
    desc: "Создание веб-приложений от концепта до деплоя, работа с REST API и PostgreSQL.",
    color: "#22d3ee",
  },
]

const PROJECTS = [
  {
    name: "AI Design Tool",
    stack: "React · Python · OpenAI",
    desc: "Генерация и итерация дизайн-концептов с помощью нейросетей.",
    color: "#f72585",
  },
  {
    name: "Collab Platform",
    stack: "Next.js · WebSockets · PostgreSQL",
    desc: "Платформа для совместной работы команд в реальном времени.",
    color: "#4361ee",
  },
]

export function MiniAppResume() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>РЕЗЮМЕ</h2>
        <div className="h-0.5 w-24" style={{ background: 'linear-gradient(to right, #22d3ee, transparent)' }} />
      </div>

      {/* Experience */}
      <div className="p-6 rounded-2xl space-y-5" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.2)' }}>
        <h3 className="text-lg font-bold text-white">Опыт работы</h3>
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className="pl-4" style={{ borderLeft: `3px solid ${exp.color}` }}>
            <h4 className="text-base font-bold text-white">{exp.role}</h4>
            <p className="text-sm font-medium mb-1" style={{ color: exp.color }}>{exp.company} · {exp.period}</p>
            <p className="text-sm text-gray-400">{exp.desc}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="p-6 rounded-2xl" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)' }}>
        <h3 className="text-lg font-bold text-white mb-4">Проекты</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((proj, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: `rgba(${hexToRgb(proj.color)},0.08)`, border: `1px solid rgba(${hexToRgb(proj.color)},0.25)` }}>
              <h4 className="font-bold mb-1" style={{ color: proj.color }}>{proj.name}</h4>
              <p className="text-xs text-gray-500 mb-2 font-mono">{proj.stack}</p>
              <p className="text-sm text-gray-300">{proj.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #22d3ee, #4361ee)', boxShadow: '0 0 20px rgba(34,211,238,0.3)' }}
      >
        Скачать PDF
      </button>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
