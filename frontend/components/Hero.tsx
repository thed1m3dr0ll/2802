export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-28 pb-24 bg-club-dark bg-[radial-gradient(circle_at_top,_rgba(191,37,37,0.18)_0,_transparent_55%)]"
    >
      <div className="container-custom flex flex-col md:flex-row items-start md:items-center gap-10">
        <div className="max-w-xl space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-club-muted">
            закрытый barbershop club
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-club-light leading-tight">
            Культовые ритуалы
            <br />
            для джентльменов Нижнего
          </h1>

          <p className="text-base md:text-lg text-club-muted">
            Горячие полотенца, идеальная стрижка, виски и разговоры.
            Атмосфера закрытого клуба для тех, кто ценит ритуалы, а не просто услуги.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button className="btn btn-primary">
              Записаться в клуб
            </button>

            <a
              href="tel:+79877553000"
              className="text-sm md:text-base text-club-gold hover:text-club-light transition-colors"
            >
              +7 987 755 30 00
            </a>

            <span className="w-full text-xs text-club-muted">
              Нижний Новгород, ул. Белозёрская, 4
            </span>
          </div>
        </div>

        <div className="w-full md:w-[380px] lg:w-[420px]">
          <div className="relative rounded-3xl overflow-hidden border border-club-gold/30 bg-gradient-to-br from-[#1b1b1f] to-[#0b0b0d] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <div className="aspect-[4/5] flex items-end p-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.22em] text-club-gold">
                  gentlemen&apos;s rituals
                </p>
                <p className="text-sm text-club-light">
                  Тёплый свет, коричневые стены и тёмные кресла —
                  атмосфера, которую видно уже с порога.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
