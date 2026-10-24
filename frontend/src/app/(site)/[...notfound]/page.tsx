import { notFound } from 'next/navigation'

// Unmatched public URLs render the 404 inside the site layout (Navbar + Footer)
export default function CatchAll() {
  notFound()
}
