const ARTWORKS = [
  { title: "Цифровые пейзажи", medium: "Генеративное искусство", year: "2024", from: "#a855f7", to: "#4361ee" },
  { title: "Абстрактные формы", medium: "p5.js", year: "2024", from: "#f72585", to: "#a855f7" },
  { title: "Интерактивные объекты", medium: "WebGL", year: "2023", from: "#22d3ee", to: "#4361ee" },
  { title: "Визуализация данных", medium: "D3.js", year: "2023", from: "#4361ee", to: "#f72585" },
  { title: "Алгоритмические паттерны", medium: "Processing", year: "2022", from: "#a855f7", to: "#22d3ee" },
  { title: "Нейросетевое искусство", medium: "AI Generated", year: "2022", from: "#f72585", to: "#22d3ee" },
]

export function MiniAppArt() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>ГАЛЕРЕЯ</h2>
        <div className="h-0.5 w-24" style={{ background: 'linear-gradient(to right, #4361ee, transparent)' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ARTWORKS.map((art, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] group"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div
              className="aspect-square flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${art.from}33, ${art.to}33)` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${art.from}22, ${art.to}22)` }} />
              <div
                className="w-16 h-16 rounded-full opacity-60 group-hover:opacity-90 transition-all group-hover:scale-110"
                style={{ background: `radial-gradient(circle, ${art.from}, ${art.to})`, boxShadow: `0 0 40px ${art.from}80` }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1">{art.title}</h3>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{art.medium}</p>
                <span className="text-xs font-mono" style={{ color: art.from }}>{art.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #4361ee, #a855f7)', boxShadow: '0 0 20px rgba(67,97,238,0.3)' }}
      >
        Полное портфолио
      </button>
    </div>
  )
}
