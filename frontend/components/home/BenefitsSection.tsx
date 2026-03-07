// components/home/BenefitsSection.tsx
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Target01Icon,
  Scissor01Icon,
  TimeScheduleIcon,
  DrinkIcon,
} from "@hugeicons/core-free-icons";

type BenefitItemProps = {
  icon: any;
  title: string;
  text: string;
};

export function BenefitsSection() {
  return (
    <section className="section section-paper section-y section-animate">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10 text-center">
            <p className="label-small mb-2 uppercase tracking-[0.22em] text-[var(--accent-gold-soft)]">
              
            </p>
            <h2 className="text-2xl font-semibold text-[var(--text-dark-strong)] md:text-3xl">
              Почему выбирают клуб «Джентльмены Культуры»
            </h2>
          </header>

          <div className="relative pl-10 md:pl-16">
            <div className="pointer-events-none absolute left-6 top-2 bottom-4 hidden md:block">
              <div className="h-full w-px bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(170,140,105,0.7)] to-[rgba(0,0,0,0.35)]" />
            </div>

            <div className="space-y-8 md:space-y-9">
              <BenefitItem
                icon={Target01Icon}
                title="Персональный подход, а не поток"
                text="Запоминаем твои предпочтения и удачные решения, чтобы каждый визит в клуб не начинался с нуля."
              />
              <BenefitItem
                icon={Scissor01Icon}
                title="Мастера с опытом и единым почерком"
                text="Опыт от 5 лет, внутренняя школа и общий взгляд на стиль — команда, которая держит планку клуба."
              />
              <BenefitItem
                icon={TimeScheduleIcon}
                title="Запись по времени, без очередей"
                text="Ты приходишь к своему времени — без ожидания у стойки и живой очереди перед креслом."
              />
              <BenefitItem
                icon={DrinkIcon}
                title="Атмосфера мужского клуба 18+"
                text="Бар, свет и музыка для тех, кто ценит спокойный формат без лишнего шума."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitItem({ icon, title, text }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center pt-1">
        <div className="benefit-icon mb-2">
          <HugeiconsIcon icon={icon} size={28} className="lux-icon" />
        </div>
      </div>
      <div>
        <h3 className="mb-1.5 text-[16px] font-semibold text-[var(--text-dark-strong)] md:text-[17px]">
          {title}
        </h3>
        <p className="text-[14px] leading-relaxed text-[var(--text-muted)] md:text-[15px]">
          {text}
        </p>
      </div>
    </div>
  );
}
