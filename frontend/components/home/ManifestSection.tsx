// components/home/ManifestSection.tsx
export function ManifestSection() {
  return (
    <section
      id="manifest"
      className="section section-wave-top section-y section-animate"
    >
      <div className="container-custom max-w-4xl space-y-6">
        <p className="label-small uppercase tracking-[0.22em] text-[var(--accent-red)]">
          манифест клуба
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold tracking-wide text-[var(--text-dark-strong)] md:text-4xl">
          Клуб, куда{" "}
          <span className="text-[var(--accent-red)]">возвращаются</span>, а не
          просто записываются
        </h2>

        <div className="relative pl-4 md:pl-5">
          <div className="pointer-events-none absolute left-0 top-1 bottom-1">
            <div className="h-full w-px bg-gradient-to-b from-[rgba(191,37,37,0.8)] via-[rgba(170,140,105,0.8)] to-[rgba(0,0,0,0.0)]" />
          </div>

          <div className="space-y-4 text-[14px] text-[var(--text-muted)] md:text-[15px]">
            <p>
              «Джентльмены Культуры» — это не ещё одна точка в списке салонов.
              Это клуб, где у тебя есть свой мастер, свой образ и своё кресло по
              времени.
            </p>
            <p>
              Мы фиксируем твои предпочтения, удачные решения и ритуалы в
              клубном кабинете. Поэтому визит не начинается с «как стрижём?» —
              он продолжается с того места, где вы остановились в прошлый раз.
            </p>
            <p>
              Быстрый срез можно сделать где угодно. Клуб нужен, чтобы у тебя
              было место в городе, где узнают с порога, называют по имени и
              относятся к твоему времени так же бережно, как к своему.
            </p>
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            клуб 18+ · тишина, свои ритуалы и честный сервис без показухи
          </p>
        </div>
      </div>
    </section>
  );
}
