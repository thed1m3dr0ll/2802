// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Gentlemen — закрытый барбершоп‑клуб в Нижнем Новгороде. Ритуалы стрижки и бороды, ночные форматы и клубная атмосфера без суеты."
        />
        <meta
          name="keywords"
          content="барбершоп, мужской клуб, Gentlemen, стрижка, борода, Нижний Новгород"
        />
        <meta name="theme-color" content="#050307" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Gentlemen Barbershop Club — закрытый барбершоп‑клуб в Нижнем Новгороде"
        />
        <meta
          property="og:description"
          content="Ритуалы для головы и бороды, ночные форматы и спокойная атмосфера клуба на Белозёрской, 4."
        />
        <meta
          property="og:url"
          content="https://gentlemen-barber.ru/"
        />
        <meta
          property="og:image"
          content="https://gentlemen-barber.ru/og-image.jpg"
        />
        <meta
          property="og:site_name"
          content="Gentlemen Barbershop Club"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gentlemen Barbershop Club — закрытый барбершоп‑клуб"
        />
        <meta
          name="twitter:description"
          content="Ритуалы стрижки и бороды, ночные форматы и атмосфера клуба."
        />
        <meta
          name="twitter:image"
          content="https://gentlemen-barber.ru/og-image.jpg"
        />

        {/* CSP: Метрика, YCLIENTS, Google Fonts (CSS + font files) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            img-src 'self' https: data:;
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://w1258165.yclients.com;
            style-src 'self' 'unsafe-inline' https://w1258165.yclients.com https://fonts.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
            connect-src 'self' http://localhost:8000 https://mc.yandex.ru wss://mc.yandex.ru;
            frame-src https://yandex.ru https://b1258165.yclients.com https://w1258165.yclients.com http://localhost:3000;
          "
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
