import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

const INDUSTRIES = [
  { title: "Banking & Financial Institutions", route: "/industries/banking",    img: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400&q=80" },
  { title: "Telecoms",                         route: "/industries/telecom",    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80" },
  { title: "Government & Public Sector",       route: "/industries/government", img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80" },
  { title: "Enterprise & Corporates",          route: "/industries/enterprise", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
  { title: "Retail Industries",                route: "/industries/retail",     img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" },
  { title: "Logistics & Supply Chain",         route: "/industries/logistics",  img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80" },
  { title: "Insurance",                        route: "/industries/insurance",  img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80" },
  { title: "Education",                        route: "/industries/education",  img: "/education.png" },
];

interface FlipCardProps {
  industry: typeof INDUSTRIES[0];
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  onClick: () => void;
  isDark: boolean;
}

const IMG_WIDTH  = 115;
const IMG_HEIGHT = 152;

function FlipCard({ industry, target, onClick, isDark }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x:       target.x,
        y:       target.y,
        rotate:  target.rotation,
        scale:   target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 22, mass: 0.8 }}
      style={{
        position: "absolute",
        width:  IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        willChange: "transform",
      }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front — image + overlay */}
        <div
          className={`absolute inset-0 h-full w-full rounded-xl overflow-hidden ring-1 ${isDark ? 'ring-white/10' : 'ring-black/10'}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={industry.img}
            alt={industry.title}
            className="h-full w-full object-cover"
          />
          {/* dark scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          {/* title */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <p
              className="font-normal text-white leading-tight"
              style={{ fontSize: "13px", letterSpacing: "-0.01em" }}
            >
              {industry.title}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const TOTAL_IMAGES = INDUSTRIES.length;
const MAX_SCROLL   = 3000;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

interface IntroAnimationProps {
  isDark?: boolean;
}

export default function IntroAnimation({ isDark = true }: IntroAnimationProps) {
  const navigate = useNavigate();
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    setContainerSize({
      width:  containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  const virtualScroll  = useMotionValue(0);
  const scrollTarget   = useRef(0);
  const scrollCurrent  = useRef(0);

  // Lerped scroll RAF — decouples input from motion value for buttery smoothness
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const cur  = scrollCurrent.current;
      const tgt  = scrollTarget.current;
      const next = lerp(cur, tgt, 0.16);
      if (Math.abs(next - cur) > 0.01) {
        scrollCurrent.current = next;
        virtualScroll.set(next);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [virtualScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const tgt = scrollTarget.current;
      if ((tgt >= MAX_SCROLL && e.deltaY > 0) || (tgt <= 0 && e.deltaY < 0)) return;
      e.preventDefault();
      scrollTarget.current = Math.min(Math.max(tgt + e.deltaY * 0.8, 0), MAX_SCROLL);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove  = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY  = e.touches[0].clientY;
      scrollTarget.current = Math.min(Math.max(scrollTarget.current + deltaY, 0), MAX_SCROLL);
    };

    container.addEventListener("wheel",      handleWheel,      { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    return () => {
      container.removeEventListener("wheel",      handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove",  handleTouchMove);
    };
  }, [virtualScroll]);

  const morphProgress      = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph        = useSpring(morphProgress, { stiffness: 90, damping: 30, mass: 0.5 });
  const scrollRotate       = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 90, damping: 30, mass: 0.5 });

  const mouseX       = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 20, damping: 22, mass: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase("line"),   300);
    const t2 = setTimeout(() => setIntroPhase("circle"), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scatterPositions = useMemo(() =>
    Array.from({ length: TOTAL_IMAGES }).map(() => ({
      x:        (Math.random() - 0.5) * 1500,
      y:        (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale:    0.6,
      opacity:  0,
    })), []);

  const [morphValue,    setMorphValue]    = useState(0);
  const [rotateValue,   setRotateValue]   = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);
  const [orbitAngle,    setOrbitAngle]    = useState(0);
  const orbitRef = useRef(0);
  const morphRef = useRef(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change",        (v) => { setMorphValue(v); morphRef.current = v; });
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change",       setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Slow shuttle orbit — active only in circle phase, fades out as user scrolls
  useEffect(() => {
    if (introPhase !== "circle") return;
    let rafId: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const speed = Math.max(0, 1 - morphRef.current * 4); // slows to 0 once morph starts
      orbitRef.current += dt * 0.004 * speed;              // ~0.004 deg/ms → full orbit ≈ 90s
      setOrbitAngle(orbitRef.current);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [introPhase]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY       = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">
      <div
        className="flex h-full w-full flex-col items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Intro text */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: isDark ? '#FAFAFA' : '#0A0A0A',
            }}
          >
            Unlocking the <span className="heading-accent">Potential.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.5 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            className={`mt-4 text-xs font-bold tracking-[0.2em] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            SCROLL TO EXPLORE
          </motion.p>
        </div>

        {/* Arc content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2 className={`text-3xl md:text-5xl font-semibold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Unlocking the Potential
          </h2>
          <p className={`text-sm md:text-base max-w-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            We build enterprise software for banks, financial institutions, and large-scale organizations.{" "}
            <br className="hidden md:block" />
            Streamlining complexity so the institutions that power economies can move faster.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {INDUSTRIES.map((industry, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing    = 110;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              target = { x: i * lineSpacing - lineTotalWidth / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile     = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);
              const circleRadius = Math.min(minDimension * 0.36, 300);
              const circleAngle  = (i / TOTAL_IMAGES) * 360 + orbitAngle;
              const circleRad    = (circleAngle * Math.PI) / 180;
              const circlePos    = {
                x:        Math.cos(circleRad) * circleRadius,
                y:        Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius  = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius   = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY    = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY  = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle  = -90 - spreadAngle / 2;
              const step        = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress  = Math.min(Math.max(rotateValue / 360, 0), 1);
              const boundedRotation = -scrollProgress * spreadAngle * 0.8;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad          = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x:        Math.cos(arcRad) * arcRadius + parallaxValue,
                y:        Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale:    isMobile ? 1.1 : 1.4,
              };

              target = {
                x:        lerp(circlePos.x,        arcPos.x,        morphValue),
                y:        lerp(circlePos.y,        arcPos.y,        morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale:    lerp(1,                  arcPos.scale,    morphValue),
                opacity:  1,
              };
            }

            return (
              <FlipCard
                key={i}
                industry={industry}
                phase={introPhase}
                target={target}
                onClick={() => navigate(industry.route)}
                isDark={isDark}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
