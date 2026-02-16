// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Барбершоп‑клуб «Джентльмены Культуры» в Нижнем Новгороде: мужские стрижки, борода, авторские ритуалы и клубная атмосфера на Белозёрской, 4."
        />
        <meta
          name="keywords"
          content="барбершоп, мужской клуб, Джентльмены Культуры, Gentlemen, стрижка, борода, Нижний Новгород"
        />
        <meta name="theme-color" content="#050307" />

        {/* базовый Open Graph по умолчанию */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Gentlemen Barbershop Club — барбершоп‑клуб в Нижнем Новгороде"
        />
        <meta
          property="og:description"
          content="Ритуалы для головы и бороды, ночные форматы и спокойная атмосфера клуба на Белозёрской, 4."
        />
        <meta property="og:url" content="https://gentlemenbarber.ru/" />
        <meta
          property="og:image"
          content="https://gentlemenbarber.ru/og-image.jpg"
        />
        <meta
          property="og:site_name"
          content="Gentlemen Barbershop Club"
        />

        {/* preconnect к шрифтам и внешним сервисам */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://vk.ru" />

        {/* Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />

        {/* CSP: Метрика, YCLIENTS, Google Fonts, API */}
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

        {/* Yandex.Metrika (заглушка ID 12345678) */}
        <script
          type="text/javascript"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){
              (m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              window.ym = window.ym || function(){ (window.ym.a = window.ym.a || []).push(arguments); };

              ym(12345678, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
      </Head>
      <body>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/12345678"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
