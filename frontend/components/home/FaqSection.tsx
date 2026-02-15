// components/home/FaqSection.tsx
export function FaqSection() {
  return (
    <section className="section section-paper section-y section-animate">
      <div className="container-custom max-w-3xl">
        <p className="label-small text-[var(--text-muted)] mb-2">
          ответы до звонка
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark-strong)] mb-5">
          Частые вопросы о клубе
        </h2>

        <div className="space-y-4 text-[14px] md:text-[15px] text-[var(--text-muted)]">
          <FaqItem question="Работаете по записи или можно прийти без звонка?">
            Клуб работает только по предварительной записи. Так мы держим ритм и
            не сажаем гостей в живую очередь у стойки администратора.
          </FaqItem>

          <FaqItem question="Сколько по времени длится визит?">
            «Собрать голову» — около 60 минут, «Собрать образ» — до 90 минут,
            «Чистый контур» — 30–45 минут. Ночной ритуал обсуждается отдельно.
          </FaqItem>

          <FaqItem question="Можно ли прийти с ребёнком или семьёй?">
            Клуб создавался как пространство 18+. Если нужен формат для подростка
            — уточните у администратора, подберём подходящее время и мастера.
          </FaqItem>

          <FaqItem question="Как отменить или перенести запись?">
            Просто напишите администратору в мессенджер или позвоните минимум за
            3 часа до визита — так мы успеем предложить слот другому гостю.
          </FaqItem>
        </div>
      </div>
    </section>
  );
}

type FaqItemProps = {
  question: string;
  children: React.ReactNode;
};

function FaqItem({ question, children }: FaqItemProps) {
  return (
    <details className="group rounded-xl border border-[var(--card-border)] bg-white/90 px-4 py-3">
      <summary className="flex items-center justify-between cursor-pointer font-semibold text-[var(--text-dark-strong)] list-none min-h-[44px]">
        <span className="pr-3 leading-snug">{question}</span>
        <span className="ml-3 flex items-center justify-center w-7 h-7 rounded-full border border-[var(--card-border)] text-[11px] text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180">
          ▾
        </span>
      </summary>
      <p className="mt-2">{children}</p>
    </details>
  );
}
