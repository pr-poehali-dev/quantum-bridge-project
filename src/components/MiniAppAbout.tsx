const SKILLS = ["React", "TypeScript", "Python", "AI/ML", "UI/UX", "Figma", "Node.js", "WebGL"]

const STATS = [
  { label: "Проектов", value: "12+" },
  { label: "Лет опыта", value: "3" },
  { label: "Технологий", value: "20+" },
]

export function MiniAppAbout() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          ОБОМНЕ
        </h2>
        <div className="h-0.5 w-24" style={{ background: 'linear-gradient(to right, #a855f7, transparent)' }} />
      </div>

      {/* Main card */}
      <div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-[60px]" style={{ background: '#a855f7' }} />
        <h3 className="text-2xl font-bold text-white mb-4">Привет! Я — цифровой человек 👾</h3>
        <p className="text-gray-300 leading-relaxed mb-3">
          Разрабатываю приложения, которые сочетают крутой дизайн и технологии. 
          Работаю на стыке frontend-разработки, AI и визуального контента.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Вне кода — изучаю арт, пишу статьи и экспериментирую с нейросетями.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map(({ label, value }) => (
          <div key={label} className="p-4 rounded-xl text-center" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.2)' }}>
            <div className="text-3xl font-black text-glow-cyan" style={{ color: '#22d3ee', fontFamily: 'Orbitron' }}>{value}</div>
            <div className="text-xs text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="p-6 rounded-2xl" style={{ background: 'rgba(67,97,238,0.07)', border: '1px solid rgba(67,97,238,0.2)' }}>
        <h3 className="text-lg font-bold text-white mb-4">Стек и навыки</h3>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(168,85,247,0.15)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.3)' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
