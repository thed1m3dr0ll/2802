// components/Layout.tsx
import type { ReactNode } from 'react'
import ScrollToTopButton from './ScrollToTopButton'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  )
}
