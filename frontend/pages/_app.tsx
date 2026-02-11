// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Прелоадер до полной загрузки страницы
  useEffect(() => {
    const handleLoad = () => {
      // лёгкая задержка, чтобы спиннер не мигал
      setTimeout(() => setIsPageLoading(false), 200);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Анимация появления секций при скролле
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.section-animate');

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isPageLoading && (
        <div className="page-loader">
          <div className="spinner" />
        </div>
      )}

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
