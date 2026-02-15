// components/home/ReviewsSection.tsx
type ReviewSource = "yandex" | "2gis" | "site";

export interface Review {
  id: number;
  author: string;
  source: ReviewSource;
  rating: number;
  text: string;
  date: string;
}

type Props = {
  reviews: Review[];
  loading: boolean;
  error: string | null;
};

function getSourceLabel(source: ReviewSource) {
  if (source === "yandex") return "Яндекс Карты";
  if (source === "2gis") return "2ГИС";
  return "Сайт клуба Джентльмены Культуры";
}

export function ReviewsSection({ reviews, loading, error }: Props) {
  return (
    <section
      id="media"
      className="section section-dark section-y section-animate"
      aria-labelledby="reviews-title"
    >
      <div className="container-custom">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <p className="label-small mb-2 text-club-muted">
            гости о клубе gentlemen
          </p>
          <h2
            id="reviews-title"
            className="text-2xl font-semibold md:text-3xl"
          >
            5.0 по отзывам гостей клуба в Нижнем Новгороде
          </h2>
          <p className="mt-3 text-[13px] text-club-soft md:text-[14px]">
            Ниже — несколько живых отзывов гостей «Джентльменов Культуры». Полные
            списки можно посмотреть на Яндекс Картах и в 2ГИС.
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center justify-center gap-3 md:mb-8 md:flex-row">
          <a
            href="https://yandex.ru/maps/org/dzhentlmeny_kultury/101569682800/reviews/?ll=43.875272%2C56.348966&z=17"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-club-soft transition hover:bg-white/10"
          >
            <span className="h-2 w-2 rounded-full bg-[#ffcc00]" />
            отзывы о клубе на яндекс картах
          </a>
          <a
            href="https://2gis.ru/n_novgorod/firm/70000001080133566/tab/reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-club-soft transition hover:bg-white/10"
          >
            <span className="h-2 w-2 rounded-full bg-[#00b25c]" />
            отзывы о клубе в 2ГИС
          </a>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {loading && (
            <p className="col-span-full text-center text-club-muted">
              Загружаем отзывы гостей…
            </p>
          )}

          {!loading &&
            !error &&
            reviews.length > 0 &&
            reviews.map((review) => {
              const formattedDate = review.date
                ? new Date(
                    review.date + "T00:00:00",
                  ).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : null;

              return (
                <article
                  key={review.id}
                  className="card-glass flex h-full flex-col justify-between px-6 py-6 hover-lift"
                >
                  <p className="card-dark-text mb-4 text-[14px] italic">
                    «{review.text}»
                  </p>
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--accent-gold-soft)]">
                        {review.author || "Гость клуба"}
                      </p>
                      <p className="mt-1 text-[12px] text-club-muted">
                        {getSourceLabel(review.source)}
                        {formattedDate ? ` • ${formattedDate}` : ""}
                      </p>
                    </div>
                    <p className="text-[14px] text-[var(--accent-red)]">
                      {"★".repeat(review.rating)}
                    </p>
                  </div>
                </article>
              );
            })}

          {!loading && !error && reviews.length === 0 && (
            <p className="col-span-full text-center text-club-muted">
              Первые отзывы уже в пути — пока можно посмотреть оценки в Яндекс
              Картах и 2ГИС.
            </p>
          )}

          {!loading && error && (
            <p className="col-span-full text-center text-club-muted">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
