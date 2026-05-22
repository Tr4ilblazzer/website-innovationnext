const css = `
  @keyframes ab-orb1 {
    0%,100% { transform: translate(0px,   0px)   scale(1);    }
    30%     { transform: translate(70px,  -50px)  scale(1.12); }
    65%     { transform: translate(-40px,  40px)  scale(0.92); }
  }
  @keyframes ab-orb2 {
    0%,100% { transform: translate(0px,   0px)   scale(1);    }
    35%     { transform: translate(-60px,  50px)  scale(1.08); }
    70%     { transform: translate(50px,  -60px)  scale(1.14); }
  }
  @keyframes ab-orb3 {
    0%,100% { transform: translate(0px,   0px)   scale(1);    }
    50%     { transform: translate(35px,  -70px)  scale(1.18); }
  }
`

interface AnimatedBackgroundProps {
  /** Tune opacity of all orbs — default 1 */
  intensity?: number
}

export function AnimatedBackground({ intensity = 1 }: AnimatedBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      <style>{css}</style>

      {/* Orb 1 — large white, top-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: '55%',
          paddingBottom: '55%',
          top: '-25%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)',
          animation: 'ab-orb1 14s ease-in-out infinite',
          opacity: intensity,
        }}
      />

      {/* Orb 2 — medium cyan, bottom-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: '45%',
          paddingBottom: '45%',
          bottom: '-20%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(13,255,255,0.14) 0%, transparent 65%)',
          animation: 'ab-orb2 18s ease-in-out infinite',
          opacity: intensity,
        }}
      />

      {/* Orb 3 — small white, top-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: '30%',
          paddingBottom: '30%',
          top: '10%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)',
          animation: 'ab-orb3 11s ease-in-out infinite',
          opacity: intensity,
        }}
      />
    </div>
  )
}
