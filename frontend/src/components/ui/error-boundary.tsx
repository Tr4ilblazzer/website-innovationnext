import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <main className="pt-40 pb-24 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/30 mb-4">
            Something went wrong
          </p>
          <h1 className="section-heading text-[#0A0A0A] mb-4">Unexpected error</h1>
          <p className="text-[#0A0A0A]/40 mb-8">
            Try refreshing the page. If the problem persists, contact us.
          </p>
          <a href="/" className="btn-primary inline-flex mx-auto">
            Back to Home
          </a>
        </main>
      )
    }
    return this.props.children
  }
}
