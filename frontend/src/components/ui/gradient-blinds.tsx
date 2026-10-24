'use client'

import { useEffect, useRef, useState } from 'react'

const MAX_COLORS = 8
const MAX_WAVES = 4
const INTRO_SECONDS = 1.8
const RIPPLE_SECONDS = 1.6

const VERTEX = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uShineFlip;
uniform vec3 uColors[8];
uniform int uColorCount;
uniform float uShine;
uniform float uRelief;
uniform float uGlow;
uniform float uSway;
uniform float uSwayTime;
uniform float uHover;
uniform vec4 uWaves[4];
uniform float uIntro;
uniform float uGrainTime;
uniform vec3 uLightColor;

out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

vec2 rotate2D(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec2 blindSpace(vec2 uv0) {
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv0 * 2.0 - 1.0;
  p.x *= aspect;
  vec2 pr = rotate2D(p, uAngle);
  pr.x /= aspect;
  return pr * 0.5 + 0.5;
}

vec3 gradientColor(float t) {
  float tt = clamp(t, 0.0, 1.0);
  int count = max(uColorCount, 2);
  float scaled = tt * float(count - 1);
  int seg = min(int(floor(scaled)), count - 2);
  float f = scaled - float(seg);
  if (tt >= 1.0) return uColors[count - 1];
  return mix(uColors[seg], uColors[seg + 1], f);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv0 = frag / uResolution;
  vec2 uvMod = blindSpace(uv0);

  float count = max(uBlindCount, 1.0);
  float stripePhase = uvMod.x * count;

  vec3 base = gradientColor(uvMod.x);

  vec2 offset = uMouse / uResolution;
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float spot = (1.0 - 2.0 * pow(d / r, uSpotlightSoftness)) * uSpotlightOpacity;

  float slat = floor(stripePhase);
  float s = stripePhase - slat;
  float stripeAA = clamp(count * 1.25 / min(uResolution.x, uResolution.y), 0.001, 0.12);
  float edgeBlend = 1.0 - smoothstep(0.0, stripeAA, min(s, 1.0 - s));
  float across = mix(s, 0.5, edgeBlend);
  float ramp = uShineFlip > 0.5 ? 1.0 - across : across;

  float unit = min(uResolution.x, uResolution.y);
  float reach = max(uSpotlightRadius, 0.05) * unit;
  vec2 toLight = uMouse - frag;
  float nearLight = exp(-dot(toLight, toLight) / (reach * reach));

  float tilt = 0.0;
  float pulse = 0.0;
  if (uSway > 0.0) {
    tilt += uSway * 0.5 * sin(uSwayTime * 0.9 + slat * 0.55) * (0.6 + 0.4 * sin(uSwayTime * 0.37 + slat * 0.21));
  }
  tilt += uHover * nearLight * 0.7;
  for (int i = 0; i < 4; i++) {
    vec4 wave = uWaves[i];
    if (wave.w <= 0.0) continue;
    float age = uTime - wave.z;
    if (age < 0.0 || age > ${RIPPLE_SECONDS.toFixed(2)}) continue;
    float life = age / ${RIPPLE_SECONDS.toFixed(2)};
    vec2 origin = blindSpace(wave.xy / uResolution);
    float slats = abs(slat + 0.5 - origin.x * count);
    float front = age * max(count, 4.0) * 0.95;
    float k = (slats - front) / (0.8 + life * 1.2);
    float along = (uvMod.y - origin.y) / max(0.42 + life * 0.5, 0.01);
    float fade = (1.0 - life) * (1.0 - life);
    float ring = exp(-k * k) * exp(-along * along) * fade * smoothstep(0.0, 0.2, age);
    tilt += ring * 0.9;
    pulse += ring;
  }
  if (uIntro < 1.0) {
    float settle = smoothstep(0.0, 1.0, clamp(uIntro * 1.5 - uv0.x * 0.5, 0.0, 1.0));
    tilt -= (1.0 - settle) * 1.2;
  }

  float edge = ramp;
  float calm = 1.0 - 0.6 * clamp(spot, 0.0, 1.0);
  ramp = pow(clamp(ramp, 0.0, 1.0), exp(tilt * 0.9));
  ramp *= 1.0 - 0.3 * min(pulse, 1.0) * calm;
  float crease = uRelief * 0.38 * smoothstep(0.62, 1.0, ramp);
  float sheen = uShine * exp(-pow((edge - 0.035) / 0.07, 2.0)) * (0.3 + 0.7 * nearLight) * (1.0 - edgeBlend);

  vec3 lit = spot > 0.0 ? uLightColor * spot : vec3(spot);
  lit += uLightColor * min(pulse, 1.0) * 0.35 * calm;
  vec3 col = lit + base - vec3(ramp + crease);

  vec3 haze = base * uGlow * 0.4 * smoothstep(0.0, 1.0, spot) * (0.4 + 0.6 * ramp);
  col += haze + mix(base, uLightColor, 0.45) * sheen * 0.7;
  vec3 over = max(col - 0.8, 0.0);
  col = min(col, vec3(0.8)) + 0.2 * (1.0 - exp(-over / 0.2));
  float luma = dot(clamp(col, 0.0, 1.0), vec3(0.2126, 0.7152, 0.0722));
  float grain = 0.5 * (hash(frag + uGrainTime) + hash(frag.yx + uGrainTime * 1.7)) - 0.5;
  col += grain * uNoise * (0.45 + 0.55 * smoothstep(0.0, 0.5, luma));

  col *= smoothstep(0.0, 0.65, uIntro);
  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

const link = (gl: WebGL2RenderingContext) => {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
  const program = gl.createProgram()
  if (!vertex || !fragment || !program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {}
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i)
    if (!info) continue
    const name = info.name.replace(/\[0\]$/, '')
    uniforms[name] = gl.getUniformLocation(program, name)
  }
  return { program, uniforms }
}

const hexToRGB = (hex: string) => {
  const c = String(hex || '').replace('#', '').padEnd(6, '0')
  return [parseInt(c.slice(0, 2), 16) / 255 || 0, parseInt(c.slice(2, 4), 16) / 255 || 0, parseInt(c.slice(4, 6), 16) / 255 || 0]
}

const prepStops = (stops: string[]) => {
  const base = stops.slice(0, MAX_COLORS)
  if (base.length === 1) base.push(base[0])
  while (base.length < MAX_COLORS) base.push(base[base.length - 1])
  const flat = new Float32Array(MAX_COLORS * 3)
  for (let i = 0; i < MAX_COLORS; i++) flat.set(hexToRGB(base[i]), i * 3)
  return { flat, count: Math.max(2, Math.min(MAX_COLORS, stops.length)) }
}

interface GradientBlindsProps {
  className?: string
  gradientColors: string[]
  angle?: number
  noise?: number
  blindCount?: number
  blindMinWidth?: number
  mouseDampening?: number
  spotlightRadius?: number
  lightColor?: string
  shine?: number
  relief?: number
  glow?: number
  sway?: number
  hoverTilt?: number
  /** Ambient drift/sway runs this long after mount, then the loop idles until the pointer returns. */
  ambientSeconds?: number
}

export default function GradientBlinds({
  className = '',
  gradientColors,
  angle = 20,
  noise = 0.15,
  blindCount = 16,
  blindMinWidth = 60,
  mouseDampening = 0.15,
  spotlightRadius = 0.5,
  lightColor = '#ffffff',
  shine = 0.4,
  relief = 0.5,
  glow = 0.4,
  sway = 0.25,
  hoverTilt = 0.6,
  ambientSeconds = 6,
}: GradientBlindsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const colorKey = gradientColors.join(',')
  const settingsRef = useRef({
    colorKey, gradientColors, angle, noise: clamp(noise, 0, 2), blindCount: Math.max(1, blindCount), blindMinWidth,
    mouseDampening: Math.max(0, mouseDampening), spotlightRadius, lightColor, shine: clamp(shine, 0, 2),
    relief: clamp(relief, 0, 1), glow: clamp(glow, 0, 2), sway: clamp(sway, 0, 1), hoverTilt: clamp(hoverTilt, 0, 1.5),
    ambientSeconds,
  })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return undefined
    // Never call loseContext — Strict Mode remounts must be able to re-init.
    const gl = canvas.getContext('webgl2', {
      alpha: false, antialias: false, depth: false, stencil: false, premultipliedAlpha: false,
      powerPreference: 'high-performance',
    })
    const shader = gl && !gl.isContextLost() ? link(gl) : null
    if (!gl || !shader) {
      setFailed(true)
      return undefined
    }
    const u = shader.uniforms
    const vao = gl.createVertexArray()

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const view = { width: 1, height: 1, ratio: 1 }
    const pointer = { x: 0, y: 0, inside: false }
    const light = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, ready: false }
    const waves = new Float32Array(MAX_WAVES * 4)
    let waveIndex = 0
    let hover = 0
    let time = 0
    let swayTime = 0
    let grainTime = 0
    let introClock = reduce ? 1 : 0
    const colorStops = prepStops(settingsRef.current.gradientColors)
    const lightRGB = hexToRGB(settingsRef.current.lightColor)
    let raf = 0
    let last = 0
    let visible = true

    const blindTotal = () => {
      const s = settingsRef.current
      const byWidth = Math.max(1, Math.floor(view.width / s.blindMinWidth))
      return Math.max(1, Math.min(s.blindCount, byWidth))
    }

    const draw = () => {
      const s = settingsRef.current
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(shader.program)
      gl.bindVertexArray(vao)
      gl.uniform2f(u.uResolution, canvas.width, canvas.height)
      gl.uniform1f(u.uTime, time)
      gl.uniform2f(u.uMouse, light.x * view.ratio, (view.height - light.y) * view.ratio)
      gl.uniform1f(u.uAngle, (s.angle * Math.PI) / 180)
      gl.uniform1f(u.uNoise, s.noise)
      gl.uniform1f(u.uBlindCount, blindTotal())
      gl.uniform1f(u.uSpotlightRadius, s.spotlightRadius)
      gl.uniform1f(u.uSpotlightSoftness, 1)
      gl.uniform1f(u.uSpotlightOpacity, 1)
      gl.uniform1f(u.uShineFlip, 0)
      gl.uniform3fv(u.uColors, colorStops.flat)
      gl.uniform1i(u.uColorCount, colorStops.count)
      gl.uniform1f(u.uShine, s.shine)
      gl.uniform1f(u.uRelief, s.relief)
      gl.uniform1f(u.uGlow, s.glow)
      gl.uniform1f(u.uSway, reduce ? 0 : s.sway)
      gl.uniform1f(u.uSwayTime, swayTime)
      gl.uniform1f(u.uHover, hover * s.hoverTilt)
      gl.uniform4fv(u.uWaves, waves)
      gl.uniform1f(u.uIntro, introClock)
      gl.uniform1f(u.uGrainTime, grainTime)
      gl.uniform3fv(u.uLightColor, lightRGB)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.bindVertexArray(null)
    }

    const aim = () => {
      if (pointer.inside) {
        light.tx = pointer.x
        light.ty = pointer.y
      } else if (!reduce) {
        light.tx = view.width * (0.5 + 0.22 * Math.sin(swayTime * 0.23) + 0.05 * Math.sin(swayTime * 0.61 + 1.3))
        light.ty = view.height * (0.5 + 0.16 * Math.sin(swayTime * 0.31 + 0.7) + 0.04 * Math.sin(swayTime * 0.83))
      }
    }

    const follow = (dt: number) => {
      const tau = settingsRef.current.mouseDampening
      if (tau <= 0) {
        light.x = light.tx
        light.y = light.ty
        light.vx = 0
        light.vy = 0
        return
      }
      const omega = 2.4 / tau
      const k = omega * omega
      const c = 2 * omega
      const steps = Math.max(1, Math.ceil(dt / 0.008))
      const h = dt / steps
      for (let i = 0; i < steps; i++) {
        light.vx += (k * (light.tx - light.x) - c * light.vx) * h
        light.vy += (k * (light.ty - light.y) - c * light.vy) * h
        light.x += light.vx * h
        light.y += light.vy * h
      }
    }

    const wake = () => {
      if (!raf && visible && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }

    const resize = () => {
      view.width = Math.max(1, container.clientWidth)
      view.height = Math.max(1, container.clientHeight)
      view.ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(view.width * view.ratio))
      canvas.height = Math.max(1, Math.round(view.height * view.ratio))
      if (!light.ready) {
        light.ready = true
        light.x = light.tx = view.width / 2
        light.y = light.ty = view.height / 2
      }
      draw()
      wake()
    }

    const frame = (now: number) => {
      raf = 0
      if (!visible || document.hidden) return
      const s = settingsRef.current
      const dt = last ? clamp((now - last) / 1000, 0.001, 1 / 20) : 1 / 60
      last = now
      time += dt
      const ambient = !reduce && (pointer.inside || time < s.ambientSeconds)
      if (ambient) swayTime += dt
      grainTime = Math.floor(time * 24) * 17.13
      if (introClock < 1) introClock = Math.min(1, introClock + dt / INTRO_SECONDS)
      hover += ((pointer.inside ? 1 : 0) - hover) * (1 - Math.exp(-dt / 0.35))
      if (ambient || pointer.inside) aim()
      follow(dt)
      for (let i = 0; i < MAX_WAVES; i++) {
        if (waves[i * 4 + 3] > 0 && time - waves[i * 4 + 2] > RIPPLE_SECONDS) waves[i * 4 + 3] = 0
      }
      draw()
      const settling =
        Math.abs(light.tx - light.x) > 0.05 ||
        Math.abs(light.ty - light.y) > 0.05 ||
        Math.abs(light.vx) + Math.abs(light.vy) > 0.05 ||
        Math.abs((pointer.inside ? 1 : 0) - hover) > 0.002
      const rippling = waves.some((value, index) => index % 4 === 3 && value > 0)
      if (settling || introClock < 1 || rippling || ambient) raf = requestAnimationFrame(frame)
    }

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      return { x, y, inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height }
    }

    const onPointerMove = (event: PointerEvent) => {
      const { x, y, inside } = locate(event)
      pointer.x = x
      pointer.y = y
      pointer.inside = inside
      if (inside) wake()
    }

    const onPointerDown = (event: PointerEvent) => {
      const { x, y, inside } = locate(event)
      if (!inside || reduce) return
      const o = waveIndex * 4
      waves[o] = x * view.ratio
      waves[o + 1] = (view.height - y) * view.ratio
      waves[o + 2] = time
      waves[o + 3] = 1
      waveIndex = (waveIndex + 1) % MAX_WAVES
      wake()
    }

    const onPointerLeave = () => {
      pointer.inside = false
      wake()
    }

    const onVisibility = () => {
      last = 0
      wake()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      if (visible) wake()
    })
    intersection.observe(container)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)
    resize()

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersection.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(shader.program)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" style={failed ? { display: 'none' } : undefined} />
    </div>
  )
}
