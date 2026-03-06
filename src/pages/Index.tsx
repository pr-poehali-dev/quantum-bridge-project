import { AnimatedRobot } from "@/components/AnimatedRobot"
import { ChatPanel } from "@/components/ChatPanel"
import { Dock } from "@/components/Dock"
import { OSOverlay } from "@/components/OSOverlay"

export default function HomePage() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
        {/* Animated gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, #f72585, transparent)' }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #a855f7 1px, transparent 1px),
              linear-gradient(to bottom, #a855f7 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-bg pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 max-w-lg w-full gap-6">
          {/* Robot + Title */}
          <div className="flex flex-col items-center gap-4">
            <AnimatedRobot />
            <div className="text-center">
              <h1 className="text-5xl font-black text-white text-glow-purple" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '-0.02em' }}>
                HEY THERE.
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--neon-cyan)', fontFamily: 'Space Grotesk' }}>
                // спроси меня что угодно
              </p>
            </div>
          </div>

          {/* Chat Panel */}
          <ChatPanel />
        </div>

        <div className="relative z-10 pb-4">
          <Dock />
        </div>
      </div>

      <OSOverlay />
    </>
  )
}
