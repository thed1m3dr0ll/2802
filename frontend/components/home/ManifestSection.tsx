// components/home/ManifestSection.tsx
export function ManifestSection() {
  return (
    <section className="section section-wave-top section-y section-animate">
      <div className="container-custom max-w-4xl space-y-7">
        <p className="label-small text-[var(--accent-red)]">манифест клуба</p>

        <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-[var(--text-dark-strong)] max-w-3xl">
          Мы не просто стрижём — мы{" "}
          <span className="text-[var(--accent-red)]">строим отношения</span> с
          гостями клуба
        </h2>

        <div className="space-y-4 text-[14px] md:text-[15px] text-[var(--text-muted)]">
          <p>
            Мы не продаём ещё одну стрижку по записи. Каждый визит — часть
            истории: любимый мастер, понятный образ и место, куда хочется
            возвращаться.
          </p>
          <p>
            Личные предпочтения, удачные решения и ритуалы фиксируются в клубном
            кабинете. Это значит, что каждый следующий визит начинается не с
            нуля, а с уже понятного образа и доверия.
          </p>
          <p>
            Если нужен просто недорогой срез кончиков — вокруг достаточно
            салонов. Если нужно своё место в городе, где помнят вас по имени и
            уважают личное время, — для этого есть клуб «Джентльмены Культуры».
          </p>
        </div>
      </div>
    </section>
  );
}
