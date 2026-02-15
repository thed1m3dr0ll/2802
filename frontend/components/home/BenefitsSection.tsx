// components/home/BenefitsSection.tsx
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Target01Icon,
  Scissor01Icon,
  TimeScheduleIcon,
  DrinkIcon,
} from "@hugeicons/core-free-icons";

export function BenefitsSection() {
  return (
    <section className="section section-paper section-y section-animate">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 text-center">
            <p className="label-small tracking-[0.22em] uppercase text-[var(--accent-gold-soft)] mb-2">
              почему выбирают клуб
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-dark-strong)]">
              Почему выбирают клуб «Джентльмены Культуры»
            </h2>
          </header>

          <div className="relative pl-10 md:pl-16">
            <div className="hidden md:block pointer-events-none absolute left-6 top-2 bottom-4">
              <div className="w-px h-full bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(170,140,105,0.7)] to-[rgba(0,0,0,0.35)]" />
            </div>

            <div className="space-y-8 md:space-y-9">
              <BenefitItem
                icon={Target01Icon}
                title="Персональный подход в клубном формате"
                text="Запоминаем ваши предпочтения, удачные решения и историю образа, чтобы каждый визит в клуб «Джентльмены Культуры» начинался не с нуля."
              />
              <BenefitItem
                icon={Scissor01Icon}
                title="Мастера с опытом и единым почерком"
                text="Опыт от 5 лет, внутренняя школа и стандарты клуба — не потоковая смена, а команда, которая разделяет почерк «Джентльменов Культуры»."
              />
              <BenefitItem
                icon={TimeScheduleIcon}
                title="Строго по записи и по времени"
                text="Планируем ритуалы так, чтобы вы приходили на своё время и не сидели в живой очереди у стойки администратора."
              />
              <BenefitItem
                icon={DrinkIcon}
                title="Атмосфера закрытого мужского клуба"
                text="Бар, мягкий свет и гости, которым близок спокойный формат без суеты и лишнего шума."
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-[var(--accent-red)] hover:opacity-80">
              манифест клуба
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

type BenefitItemProps = {
  icon: any;
  title: string;
  text: string;
};

function BenefitItem({ icon, title, text }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center pt-1">
        <div className="benefit-icon mb-2">
          <HugeiconsIcon icon={icon} size={28} className="lux-icon" />
        </div>
      </div>
      <div>
        <h3 className="text-[16px] md:text-[17px] font-semibold mb-1.5 text-[var(--text-dark-strong)]">
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-[var(--text-muted)] leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
