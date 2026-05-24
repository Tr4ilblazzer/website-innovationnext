import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions extends IntersectionObserverInit {
  /** Once true, stop observing (default: false) */
  once?: boolean
}

/**
 * Returns [ref, isIntersecting].
 * Attach `ref` to any DOM element to track when it enters the viewport.
 *
 * @example
 * const [ref, visible] = useIntersection({ threshold: 0.2, once: true })
 * return <section ref={ref} className={visible ? 'fade-in' : 'opacity-0'}>…</section>
 */
export function useIntersection<T extends Element = HTMLDivElement>(
  options?: UseIntersectionOptions,
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { once = false, ...observerOptions } = options ?? {}

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setIsIntersecting(false)
      }
    }, observerOptions)

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin, options?.once])

  return [ref, isIntersecting]
}
