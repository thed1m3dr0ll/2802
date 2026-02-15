// components/ClubMap.tsx
export default function ClubMap() {
  return (
    <section
      id="map"
      className="section section-paper section-animate"
    >
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-3 max-w-md">
          <p className="label-small text-[var(--text-muted)]">
            как нас найти
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark)]">
            Клуб Gentlemen на Белозёрской, 4
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Закрытый барбершоп‑клуб в тихом квартале, рядом с жилыми домами и
            парковкой. Уточнить вход и ориентиры всегда можно у администратора.
          </p>
          <div className="text-sm text-[var(--text-dark-strong)] space-y-1">
            <p>Нижний Новгород, ул. Белозёрская, 4</p>
            <p>
              Телефон{" "}
              <a
                href="tel:+79877553000"
                className="text-[var(--accent-red)] hover:opacity-80"
              >
                +7 987 755 30 00
              </a>
            </p>
          </div>
        </div>

        <div className="card-paper overflow-hidden rounded-2xl border border-[var(--card-border)]">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
            <div
              className="absolute inset-0 h-full w-full"
              style={{
                filter:
                  "grayscale(0.85) sepia(0.12) contrast(1.32) brightness(0.94)",
              }}
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructor"
                title="Карта проезда к клубу Gentlemen на Белозёрской, 4"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
