// pages/_app.tsx
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  // Лоадер на первый заход
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsPageLoading(false), 200);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Индикатор загрузки при смене маршрутов
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsRouteChanging(true);
    };

    const handleRouteChangeEnd = () => {
      // небольшая задержка, чтобы бар не мигал на быстрых переходах
      setTimeout(() => setIsRouteChanging(false), 150);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeEnd);
    Router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeEnd);
      Router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap"
        />
      </Head>

      {/* Лоадер при первом заходе */}
      {isPageLoading && (
        <div className="page-loader">
          <div className="spinner" />
        </div>
      )}

      {/* Тонкий верхний индикатор при смене страниц */}
      <div
        className={`fixed inset-x-0 top-0 z-[120] h-[2px] bg-[var(--accent-red)] transition-opacity duration-200 ${
          isRouteChanging ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-full w-full animate-[loading-bar_1.1s_ease-in-out_infinite]" />
      </div>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
