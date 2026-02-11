// pages/404.tsx
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <p>
        Возможно, вы перешли по устаревшей ссылке или ввели неверный адрес.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary">
          на главную
        </Link>
        <a href="tel:+79877553000" className="btn-secondary">
          позвонить в клуб
        </a>
      </div>
    </div>
  );
}
