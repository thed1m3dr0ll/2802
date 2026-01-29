import type { AppProps } from "next/app"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-club-dark text-club-light flex flex-col">
      <Header />
      <main className="pt-20 flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
