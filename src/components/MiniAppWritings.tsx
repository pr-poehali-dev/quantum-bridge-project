const POSTS = [
  {
    title: "Будущее CreativeAI",
    date: "Дек 2024",
    tag: "AI",
    excerpt: "Как нейросети меняют креативную индустрию и что это значит для разработчиков.",
    color: "#a855f7",
  },
  {
    title: "Дизайн-системы с нуля",
    date: "Ноя 2024",
    tag: "UI/UX",
    excerpt: "Практические уроки из создания масштабируемых дизайн-систем для командной разработки.",
    color: "#22d3ee",
  },
  {
    title: "Код как искусство",
    date: "Окт 2024",
    tag: "Dev",
    excerpt: "Почему программирование — это творческое занятие и как писать элегантный код.",
    color: "#f72585",
  },
]

export function MiniAppWritings() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>СТАТЬИ</h2>
        <div className="h-0.5 w-24" style={{ background: 'linear-gradient(to right, #f72585, transparent)' }} />
      </div>

      <div className="space-y-4">
        {POSTS.map((post, i) => (
          <article
            key={i}
            className="p-6 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: `rgba(${hexToRgb(post.color)},0.07)`, border: `1px solid rgba(${hexToRgb(post.color)},0.25)` }}
          >
            <div className="flex items-start justify-between mb-3 gap-3">
              <h3 className="text-lg font-bold text-white">{post.title}</h3>
              <div className="flex gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `rgba(${hexToRgb(post.color)},0.2)`, color: post.color, border: `1px solid rgba(${hexToRgb(post.color)},0.4)` }}>
                  {post.tag}
                </span>
                <span className="text-xs text-gray-500 self-center">{post.date}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
          </article>
        ))}
      </div>

      <button
        className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #f72585, #a855f7)', boxShadow: '0 0 20px rgba(247,37,133,0.3)' }}
      >
        Все статьи
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
