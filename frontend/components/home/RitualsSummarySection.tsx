// components/home/RitualsSummarySection.tsx
import type { LogicalRitualKey, MasterRole } from "../../lib/ritualsConfig";

export type BookRitualParams = {
  ritualKey: LogicalRitualKey;
  ritualName: string;
  role: MasterRole;
};

type Props = {
  onBookRitual: (params: BookRitualParams) => void;
  onBookClick: () => void;
};

export function RitualsSummarySection({ onBookRitual, onBookClick }: Props) {
  return (
    <section
      id="club"
      className="section section-dark section-rug-photo section-y section-animate"
    >
      <div className="container-custom flex flex-col items-center">
        <div className="mx-auto mb-8 w-full max-w-3xl text-center md:mb-10">
          <p className="label-small mb-2 text-[11px] text-club-muted md:text-[12px]">
            ритуалы, с которых проще всего начать
          </p>
          <h2 className="mb-3 text-3xl font-semibold text-[var(--text-main-strong)] md:text-4xl">
            Ритуалы для головы и бороды
          </h2>
          <p className="mx-auto max-w-2xl text-[13px] text-[var(--text-main-soft)] md:text-[14px]">
            Вместо огромного прайса — несколько понятных форматов. Первый визит,
            мужская стрижка, комплекс с бородой, аккуратный контур и закрытый
            ночной формат для тех, кто уже в клубе.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <RitualCard
            imageSrc="/images/rituals/ritual-first-visit.webp"
            imageAlt="Первый визит в клуб: консультация и стрижка"
            label="первый визит · скидка 10 %"
            title="«Собрать голову» — первая стрижка в клубе"
            description="Формат, с которого удобно начать. Спокойная консультация, стрижка, мытьё головы и укладка — чтобы выйти с формой, которую легко носить без стилиста под боком."
            priceMeta="от 1 500 ₽ · мужская стрижка"
            extraMeta="на первый визит действует скидка 10 %"
            kind="two-buttons"
            onArtDirectorClick={() =>
              onBookRitual({
                ritualKey: "mens_haircut",
                ritualName: "Собрать голову",
                role: "art_director",
              })
            }
            onTopMasterClick={() =>
              onBookRitual({
                ritualKey: "mens_haircut",
                ritualName: "Собрать голову",
                role: "top_master",
              })
            }
          />

          <RitualCard
            imageSrc="/images/rituals/ritual-head-beard.webp"
            imageAlt="Стрижка и борода в одном ритуале"
            label="голова + борода"
            title="«Собрать образ» — стрижка и борода вместе"
            description="Когда хочется, чтобы голова и борода жили одной жизнью. Стрижка, моделирование бороды и аккуратные линии — образ, который комфортно носить не только в день визита."
            priceMeta='от 2 400 ₽ · комплекс "стрижка + борода"'
            extraMeta=""
            kind="two-buttons"
            onArtDirectorClick={() =>
              onBookRitual({
                ritualKey: "complex_hair_beard",
                ritualName: "Собрать образ",
                role: "art_director",
              })
            }
            onTopMasterClick={() =>
              onBookRitual({
                ritualKey: "complex_hair_beard",
                ritualName: "Собрать образ",
                role: "top_master",
              })
            }
          />

          <RitualCard
            imageSrc="/images/rituals/ritual-clean-contour.webp"
            imageAlt="Коррекция контура без полной стрижки"
            label="быстрый формат"
            title="«Чистый контур» — освежить линии без радикала"
            description="Подходит, когда в целом всё устраивает, но края поплыли. Виски, шея, борода — мастер возвращает аккуратный контур без заметного изменения длины."
            priceMeta="от 800 ₽ · коррекция контура"
            extraMeta=""
            kind="two-buttons"
            onArtDirectorClick={() =>
              onBookRitual({
                ritualKey: "machine_haircut",
                ritualName: "Чистый контур",
                role: "art_director",
              })
            }
            onTopMasterClick={() =>
              onBookRitual({
                ritualKey: "machine_haircut",
                ritualName: "Чистый контур",
                role: "top_master",
              })
            }
          />

          {/* Закрытый формат: одна кнопка с заглушкой */}
          <RitualCard
            imageSrc="/images/rituals/ritual-night-ritual.webp"
            imageAlt="Ночной клубный ритуал в закрытом формате"
            label="закрытый ночной формат"
            title="«Выключить голову» — ритуал для своих"
            description="Поздний клубный ритуал для гостей с историей. Больше времени, мягкий свет, бар и расширенный уход — чтобы перезагрузиться и выйти уже с другим состоянием."
            priceMeta="стоимость уточните у администратора"
            extraMeta="доступен гостям с 5+ визитами в клуб"
            kind="single-button"
            onSingleClick={() => {
              // заглушка: потом сюда поставишь открытие модалки с телефоном/телеграмом
              // eslint-disable-next-line no-alert
              alert(
                "Для записи на ночной ритуал свяжитесь с клубом по телефону или в личных сообщениях."
              );
            }}
          />
        </div>

        <div className="mx-auto mt-8 w-full max-w-lg space-y-2 text-center md:mt-10">
          <p className="text-[13px] text-[var(--text-main-soft)] md:text-[14px]">
            Точные цены и свободные слоты можно уточнить у администратора или
            выбрать ритуал онлайн.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={onBookClick}
          >
            выбрать ритуал и записаться
          </button>
        </div>
      </div>
    </section>
  );
}

type RitualCardProps =
  | {
      kind: "two-buttons";
      imageSrc: string;
      imageAlt: string;
      label: string;
      title: string;
      description: string;
      priceMeta: string;
      extraMeta?: string;
      onArtDirectorClick: () => void;
      onTopMasterClick: () => void;
      onSingleClick?: never;
    }
  | {
      kind: "single-button";
      imageSrc: string;
      imageAlt: string;
      label: string;
      title: string;
      description: string;
      priceMeta: string;
      extraMeta?: string;
      onSingleClick: () => void;
      onArtDirectorClick?: never;
      onTopMasterClick?: never;
    };

function RitualCard(props: RitualCardProps) {
  const {
    imageSrc,
    imageAlt,
    label,
    title,
    description,
    priceMeta,
    extraMeta,
  } = props;

  return (
    <article className="ritual-card mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%),rgba(5,3,7,0.96)] shadow-[0_14px_32px_rgba(0,0,0,0.9)] transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_22px_48px_rgba(0,0,0,1)]">
      <div className="relative w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="block h-auto w-full"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.18),transparent_60%)]" />
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 text-left md:px-5 md:py-5">
        <p className="label-small mb-2 text-[11px] text-club-muted md:text-[12px]">
          {label}
        </p>
        <h3 className="card-dark-title mb-2 text-[14px] font-semibold text-[var(--accent-red)] md:text-[15px]">
          {title}
        </h3>
        <p className="card-dark-text mb-3 text-[12px] md:text-[13px]">
          {description}
        </p>
        <p className="text-[11px] text-[var(--accent-gold-soft)] md:text-[12px]">
          {priceMeta}
          {extraMeta ? ` · ${extraMeta}` : ""}
        </p>

        <div className="mt-4 flex-1" />

        <div className="mt-2 flex flex-col gap-2">
          {props.kind === "two-buttons" ? (
            <>
              <button
                type="button"
                className="btn-primary-dark w-full"
                onClick={props.onArtDirectorClick}
              >
                к арт‑директору
              </button>
              <button
                type="button"
                className="btn-primary-dark w-full"
                onClick={props.onTopMasterClick}
              >
                к топ‑барберу
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-primary-dark w-full"
              onClick={props.onSingleClick}
            >
              написать/позвонить в клуб
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
