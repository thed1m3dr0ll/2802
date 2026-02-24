// components/BookingModal.tsx
import { useState, useEffect, useRef } from "react";
import { trackBookingSuccess } from "../lib/analytics";
import {
  YCLIENTS_ROLES,
  YCLIENTS_SERVICES_BY_ROLE,
} from "../lib/openYclients.ts";

type BookingInitialContext = {
  masterId?: string;
  masterName?: string;
  ritualId?: string;
  ritualName?: string;
} | null;

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: BookingInitialContext;
};

type RitualService = {
  id: string;
  name: string;
};

type Staff = {
  id: string;
  name: string;
  position?: string;
  description?: string;
};

type Step = 1 | 2 | 3 | 4 | 5;

type FieldErrors = {
  name?: string;
  phone?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const ritualGroups = [
  {
    id: "group-hair",
    title: "Стрижка и образ",
    items: ["Детская стрижка", "Стрижка ножницами", "Стрижка машинкой"],
  },
  {
    id: "group-beard",
    title: "Борода и бритьё",
    items: [
      "Опасное бритье",
      "Камуфляж бороды",
      "Детокс уход бороды и кожи лица",
    ],
  },
  {
    id: "group-care",
    title: "Уход и кожа",
    items: [
      "Премиум уход за кожей головы и волосами",
      "Черная маска",
      "Патчи",
    ],
  },
  {
    id: "group-extra",
    title: "Дополнительно",
    items: ["Камуфляж головы", "Укладка", "Удаление воском"],
  },
];

export default function BookingModal({
  isOpen,
  onClose,
  initialContext,
}: BookingModalProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [rituals, setRituals] = useState<RitualService[]>([]);
  const [masters, setMasters] = useState<Staff[]>([]);
  const [openRitualGroupId, setOpenRitualGroupId] = useState<string | null>(
    null,
  );

  const [date, setDate] = useState<string>("");
  const [masterId, setMasterId] = useState<string>(""); // '' = не выбран
  const [ritualId, setRitualId] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const [step, setStep] = useState<Step>(1);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const masterIdFromContext = initialContext?.masterId;
  const masterNameFromContext = initialContext?.masterName;
  // const ritualIdFromContext = initialContext?.ritualId;
  const ritualNameFromContext = initialContext?.ritualName;

  const isSending = status === "submitting";

  // Фокус: вернуть на триггер после закрытия
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && step === 5 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen, step]);

  // ESC для закрытия
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSending) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSending, onClose]);

  // Сброс состояния при закрытии
  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setGlobalError(null);
      setDate("");
      setMasters([]);
      setRituals([]);
      setMasterId("");
      setRitualId(null);
      setSlots([]);
      setSelectedSlot(null);
      setName("");
      setPhone("");
      setComment("");
      setErrors({});
      setStep(1);
      setIsLoadingSlots(false);
      setOpenRitualGroupId(null);
    }
  }, [isOpen]);

  // Загрузка услуг и мастеров
  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();

    async function loadDictionaries() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const ritualsRes = await fetch(`${baseUrl}/yclients/services`, {
          signal: controller.signal,
        });
        const rawRituals = await ritualsRes.json();
        const ritualsData: RitualService[] = Array.isArray(rawRituals)
          ? rawRituals
          : Array.isArray(rawRituals?.data)
          ? rawRituals.data
          : [];
        setRituals(ritualsData);

        const mastersRes = await fetch(`${baseUrl}/yclients/staff`, {
          signal: controller.signal,
        });
        const rawMasters = await mastersRes.json();
        const mastersData: Staff[] = Array.isArray(rawMasters)
          ? rawMasters
          : Array.isArray(rawMasters?.data)
          ? rawMasters.data
          : [];
        setMasters(mastersData);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        console.error("Failed to load YCLIENTS dictionaries", e);
        setGlobalError(
          "Не удалось загрузить данные для записи. Попробуйте ещё раз.",
        );
      }
    }

    loadDictionaries();

    return () => controller.abort();
  }, [isOpen]);

  // Загрузка слотов по дате + мастеру + ритуалу
  useEffect(() => {
    if (!isOpen) return;
    if (!date || !masterId || !ritualId) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }

    const controller = new AbortController();

    async function loadSlots() {
      try {
        setIsLoadingSlots(true);
        setGlobalError(null);

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const params = new URLSearchParams();
        params.set("date", date);
        params.set("staff_id", masterId);

        if (ritualId) {
          const ritual = rituals.find((r) => r.id === ritualId);
          const ritualName = ritual?.name;

          let serviceIdToUse = ritualId;

          if (ritualName) {
            const role = YCLIENTS_ROLES[masterId] ?? "top_master";
            const byRole = YCLIENTS_SERVICES_BY_ROLE[ritualName];
            if (byRole) {
              serviceIdToUse = byRole[role];
            }
          }

          params.set("service_id", serviceIdToUse);
        }

        const res = await fetch(
          `${baseUrl}/yclients/availability?${params.toString()}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        const slotsData: string[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        setSlots(slotsData);
        setSelectedSlot(null);

        if (slotsData.length === 0) {
          setGlobalError(
            "На выбранный день у этого мастера нет свободных окон. Попробуйте другую дату или мастера.",
          );
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        console.error("Failed to load slots", e);
        setSlots([]);
        setSelectedSlot(null);
        setGlobalError(
          "Не удалось загрузить свободное время. Попробуйте выбрать другую дату.",
        );
      } finally {
        setIsLoadingSlots(false);
      }
    }

    loadSlots();

    return () => controller.abort();
  }, [isOpen, date, masterId, ritualId, rituals]);

  if (!isOpen) return null;

  const validateContacts = () => {
    const nextErrors: FieldErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Минимум 2 символа";
    }

    const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    if (!phoneRegex.test(phone.trim())) {
      nextErrors.phone = "Неверный формат телефона";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validateContacts()) return;
    if (!date || !masterId || !ritualId || !selectedSlot) {
      setGlobalError("Проверьте, что выбраны дата, мастер, ритуал и время.");
      return;
    }

    setStatus("submitting");
    let hadError = false;

    try {
      const ritual = rituals.find((r) => r.id === ritualId);
      const ritualNameActual =
        ritualNameFromContext || ritual?.name || undefined;

      let serviceIdToUse = ritualId;
      if (ritualNameActual) {
        const role = YCLIENTS_ROLES[masterId] ?? "top_master";
        const byRole = YCLIENTS_SERVICES_BY_ROLE[ritualNameActual];
        if (byRole) {
          serviceIdToUse = byRole[role];
        }
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const intentPayload = {
        ritualId: ritualId || undefined,
        ritualName: ritualNameActual,
        masterId,
        masterName:
          masterNameFromContext || masters.find((m) => m.id === masterId)?.name,
        date,
        time: selectedSlot || undefined,
        name,
        phone,
        comment,
      };

      // booking-intents: не критично для самой записи
      try {
        await fetch(`${baseUrl}/booking-intents/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(intentPayload),
        });
      } catch (err) {
        console.error("Failed to send booking intent", err);
      }

      const datetime = `${date} ${selectedSlot}`;

      try {
        const res = await fetch(`${baseUrl}/yclients/book`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: Number(serviceIdToUse),
            staffId: Number(masterId),
            datetime,
            name,
            phone,
            email: "",
            comment,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          const message =
            data?.detail ||
            data?.message ||
            "Не удалось создать запись. Попробуйте другое время или мастера.";
          hadError = true;
          setStatus("error");
          setGlobalError(message);
          return;
        }

        const data = await res.json().catch(() => null);
        if (data && data.success === false) {
          const message =
            data.message ||
            "Не удалось создать запись. Попробуйте другое время или мастера.";
          hadError = true;
          setStatus("error");
          setGlobalError(message);
          return;
        }
      } catch (err) {
        console.error("Failed to create YCLIENTS booking", err);
        hadError = true;
        setStatus("error");
        setGlobalError(
          "Сервис записи временно недоступен. Мы свяжемся с вами для подтверждения.",
        );
        return;
      }

      // Успешная запись: трекаем цель и ведём на thank-you
      setStatus("success");
      trackBookingSuccess();
      setShowSuccessToast(true);
      onClose();
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3500);

      // Жёсткий редирект (под Директ/Метрику надёжнее, чем SPA-переход)
      window.location.href = "/thank-you";
    } finally {
      if (!hadError) {
        setStatus("idle");
      }
    }
  };

  const selectedRitualName =
    ritualNameFromContext ||
    (ritualId ? rituals.find((r) => r.id === ritualId)?.name : undefined);

  const selectedMaster =
    masters.find((m) => m.id === (masterIdFromContext || masterId || "")) ||
    undefined;
  const selectedMasterName =
    masterNameFromContext || selectedMaster?.name || undefined;

  const commentPlaceholder =
    selectedRitualName
      ? `Например: «хочу именно ритуал “${selectedRitualName}”», «важно уложиться к началу встречи», «нужен поздний слот после 20:00».`
      : "Например: «освежить стрижку», «собрать образ с бородой», «нужен поздний слот после 20:00».";

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSending) {
      onClose();
    }
  };

  const StepPill = ({
    index,
    label,
    active,
    done,
  }: {
    index: number;
    label: string;
    active: boolean;
    done: boolean;
  }) => (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
        active
          ? "bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-sm"
          : done
          ? "bg-transparent text-[var(--text-muted-strong)]"
          : "bg-transparent text-[var(--text-muted-soft)]"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
          active
            ? "bg-[var(--accent-strong)] text-[var(--text-on-accent)]"
            : done
            ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
            : "border border-[var(--border-subtle)] text-[var(--text-muted-soft)]"
        }`}
      >
        {index}
      </span>
      <span className="max-w-[80px] text-left md:max-w-none">{label}</span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgba(15,10,8,0.9)] px-0 backdrop-blur-md md:items-center md:px-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative h-[88vh] w-full max-w-[520px] overflow-y-auto rounded-t-3xl bg-[var(--surface-elevated)] px-5 py-5 shadow-2xl md:h-auto md:max-h-[90vh] md:rounded-3xl md:px-8 md:py-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-[var(--text-muted)] hover:text-[var(--text-main)] md:right-5 md:top-5"
          aria-label="Закрыть окно записи"
          disabled={isSending}
        >
          ×
        </button>

        {/* Заголовок + мини-объяснение */}
        <div className="mb-4 space-y-3 md:mb-5">
          <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-[11px]">
            клубная запись
          </p>
          <h2
            id="booking-modal-title"
            className="text-[20px] font-semibold leading-snug tracking-[0.02em] text-[var(--text-main)] md:text-[26px]"
          >
            Запись в клуб в 5 шагов
          </h2>
          <p className="text-[11px] text-[var(--text-muted)]">
            Сначала выбираем дату, мастера и ритуал, затем — удобное время и
            контакты для подтверждения визита.
          </p>

          {/* Резюме выбора */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-2.5 text-[11px] text-[var(--text-muted-strong)]">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span>
                Дата:{" "}
                <span
                  className={
                    date
                      ? "font-medium text-[var(--accent-strong)]"
                      : "text-[var(--text-muted-soft)]"
                  }
                >
                  {date || "не выбрана"}
                </span>
              </span>
              <span>
                Мастер:{" "}
                <span
                  className={
                    selectedMasterName
                      ? "font-medium text-[var(--accent-strong)]"
                      : "text-[var(--text-muted-soft)]"
                  }
                >
                  {selectedMasterName || "не выбран"}
                </span>
              </span>
              <span>
                Ритуал:{" "}
                <span
                  className={
                    selectedRitualName
                      ? "font-medium text-[var(--accent-strong)]"
                      : "text-[var(--text-muted-soft)]"
                  }
                >
                  {selectedRitualName || "не выбран"}
                </span>
              </span>
              <span>
                Время:{" "}
                <span
                  className={
                    date && selectedSlot
                      ? "font-medium text-[var(--accent-strong)]"
                      : "text-[var(--text-muted-soft)]"
                  }
                >
                  {date && selectedSlot ? `${date}, ${selectedSlot}` : "не выбрано"}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Прогресс по шагам */}
        <div className="mb-4 flex flex-wrap gap-2">
          <StepPill index={1} label="Дата" active={step === 1} done={step > 1} />
          <StepPill index={2} label="Мастер" active={step === 2} done={step > 2} />
          <StepPill index={3} label="Ритуал" active={step === 3} done={step > 3} />
          <StepPill index={4} label="Время" active={step === 4} done={step > 4} />
          <StepPill index={5} label="Контакты" active={step === 5} done={false} />
        </div>

        {globalError && (
          <div className="mb-3 rounded-2xl border border-red-500/60 bg-red-500/8 px-3 py-2.5 text-[11px] text-red-100">
            {globalError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* STEP 1: ДАТА */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-[12px] font-medium text-[var(--text-main)]">
                  Когда удобно зайти в клуб?
                </p>
                <p className="mb-2 text-[11px] text-[var(--text-muted)]">
                  Выберите дату визита, а позже подберём подходящего мастера и ритуал.
                </p>
                <input
                  type="date"
                  className="w-full rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2 text-[13px] text-[var(--text-main)] outline-none focus:border-[var(--accent-strong)]"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setMasterId("");
                    setRitualId(null);
                    setSlots([]);
                    setSelectedSlot(null);
                  }}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!date}
                  onClick={() => date && setStep(2)}
                  className="rounded-full bg-[var(--accent-strong)] px-5 py-2 text-[13px] font-medium text-[var(--text-on-accent)] disabled:opacity-40"
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: МАСТЕР */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-[12px] font-medium text-[var(--text-main)]">
                С кем вы хотите работать?
              </p>

              {!date && (
                <p className="text-[11px] text-[var(--text-muted)]">
                  Сначала выберите дату — так мы покажем только актуальных мастеров.
                </p>
              )}

              {date && masters.length === 0 && (
                <p className="text-[11px] text-[var(--text-muted)]">
                  Мастера пока не загружены. Попробуйте обновить страницу или выбрать
                  другую дату.
                </p>
              )}

              {date && masters.length > 0 && (
                <div className="space-y-2">
                  {masters.map((m) => {
                    const isActive = masterId === m.id;
                    const roleLabel =
                      YCLIENTS_ROLES[m.id] === "art_director"
                        ? "арт‑директор клуба"
                        : "топ‑барбер";
                    return (
                      <button
                        key={m.id}
                        type="button"
                        className={`flex w-full items-start justify-between rounded-2xl border px-4 py-3 text-left text-[13px] transition ${
                          isActive
                            ? "border-[var(--accent-strong)] bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-sm"
                            : "border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-main)] hover:border-[var(--accent-soft)] hover:bg-[var(--surface-elevated)]"
                        }`}
                        onClick={() => {
                          setMasterId(m.id);
                          setStep(3);
                        }}
                        aria-pressed={isActive}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{m.name}</span>
                            <span className="rounded-full bg-[var(--surface-elevated)] px-2 py-[2px] text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                              {roleLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--text-muted)]">
                            {m.description ||
                              "Точность линий, внимание к деталям и спокойный формат без суеты."}
                          </p>
                        </div>
                        {isActive && (
                          <span className="ml-3 mt-1 text-[11px] text-[var(--accent-strong)]">
                            выбран
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[12px] text-[var(--text-muted)]"
                >
                  Назад
                </button>
                <button
                  type="button"
                  disabled={!masterId}
                  onClick={() => masterId && setStep(3)}
                  className="rounded-full bg-[var(--accent-strong)] px-5 py-2 text-[13px] font-medium text-[var(--text-on-accent)] disabled:opacity-40"
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: РИТУАЛ */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-[12px] font-medium text-[var(--text-main)]">
                Какой ритуал вам нужен?
              </p>

              {!masterId && (
                <p className="text-[11px] text-[var(--text-muted)]">
                  Сначала выберите мастера — ритуалы подстроим под его специализацию.
                </p>
              )}

              {masterId && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      популярное
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {rituals
                        .filter((r) =>
                          [
                            "Мужская стрижка",
                            'Комплекс "стрижка + борода"',
                            "Моделирование бороды",
                            "Стрижка отец + сын",
                          ].includes(r.name),
                        )
                        .map((r) => {
                          const isActive = ritualId === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              className={`min-h-[40px] rounded-full border px-4 py-2 text-[13px] transition ${
                                isActive
                                  ? "border-[var(--accent-strong)] bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-sm"
                                  : "border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-main)] hover:border-[var(--accent-soft)] hover:bg-[var(--surface-elevated)]"
                              }`}
                              onClick={() => {
                                setRitualId(r.id);
                                setStep(4);
                              }}
                              aria-pressed={isActive}
                            >
                              {r.name}
                              {isActive && (
                                <span className="ml-1 text-[11px] text-[var(--accent-strong)]">
                                  • выбрано
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    {ritualGroups.map((group) => {
                      const groupRituals = rituals.filter((r) =>
                        group.items.includes(r.name),
                      );
                      if (!groupRituals.length) return null;

                      const isOpenGroup = openRitualGroupId === group.id;

                      return (
                        <div key={group.id}>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenRitualGroupId((prev) =>
                                prev === group.id ? null : group.id,
                              )
                            }
                            className="flex w-full items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3 text-left"
                          >
                            <span className="text-[12px] font-medium text-[var(--text-main)]">
                              {group.title}
                            </span>
                            <span className="text-[11px] text-[var(--text-muted)] transition-transform">
                              {isOpenGroup ? "˄" : "˅"}
                            </span>
                          </button>

                          {isOpenGroup && (
                            <div className="mt-2 flex flex-wrap gap-2 rounded-2xl bg-[var(--surface-elevated)] px-4 py-3">
                              {groupRituals.map((r) => {
                                const isActive = ritualId === r.id;
                                return (
                                  <button
                                    key={r.id}
                                    type="button"
                                    className={`min-h-[36px] rounded-full border px-3 py-1.5 text-[12px] transition ${
                                      isActive
                                        ? "border-[var(--accent-strong)] bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-sm"
                                        : "border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-main)] hover:border-[var(--accent-soft)] hover:bg-[var(--surface-elevated)]"
                                    }`}
                                    onClick={() => {
                                      setRitualId(r.id);
                                      setStep(4);
                                    }}
                                    aria-pressed={isActive}
                                  >
                                    {r.name}
                                    {isActive && (
                                      <span className="ml-1 text-[10px] text-[var(--accent-strong)]">
                                        • выбрано
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[12px] text-[var(--text-muted)]"
                >
                  Назад
                </button>
                <button
                  type="button"
                  disabled={!ritualId}
                  onClick={() => ritualId && setStep(4)}
                  className="rounded-full bg-[var(--accent-strong)] px-5 py-2 text-[13px] font-medium text-[var(--text-on-accent)] disabled:opacity-40"
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ВРЕМЯ */}
          {step === 4 && (
            <div className="space-y-4 md:space-y-5">
              <div>
                <div className="mb-1 flex items-center justify_between gap-2">
                  <p className="text-[12px] font-medium text-[var(--text-main)]">
                    Во сколько вам удобно?
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    В популярные дни вечерние слоты разбирают за 1–2 дня.
                  </p>
                </div>

                {(!date || !masterId || !ritualId) && (
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Сначала выберите дату, мастера и ритуал, чтобы мы показали подходящие
                    окна.
                  </p>
                )}

                {date && masterId && ritualId && isLoadingSlots && (
                  <div className="mt-1 space-y-2">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Идёт загрузка свободных слотов…
                    </p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="h-9 w-full animate-pulse rounded-full bg-[rgba(255,255,255,0.06)]"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {date &&
                  masterId &&
                  ritualId &&
                  !isLoadingSlots &&
                  slots.length === 0 && (
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Нет свободных окон на выбранный день. Попробуйте другую дату или
                      мастера.
                    </p>
                  )}

                {date &&
                  masterId &&
                  ritualId &&
                  !isLoadingSlots &&
                  slots.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {slots.map((slot) => {
                        const isActive = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            className={`min-h-[40px] rounded-full px-3 py-2.5 text-[13px] transition ${
                              isActive
                                ? "bg-[var(--accent-strong)] text-[var(--text-on-accent)] shadow-sm"
                                : "bg-[var(--surface-soft)] text-[var(--text-main)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
                            }`}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setStep(5);
                            }}
                            aria-pressed={isActive}
                          >
                            {slot}
                            {isActive && (
                              <span className="ml-1 text-[11px] text-[var(--text-on-accent)]/80">
                                • выбрано
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-[12px] text-[var(--text-muted)]"
                >
                  Назад
                </button>
                <button
                  type="button"
                  disabled={!selectedSlot}
                  onClick={() => selectedSlot && setStep(5)}
                  className="rounded-full bg-[var(--accent-strong)] px-5 py-2 text-[13px] font-medium text-[var(--text-on-accent)] disabled:opacity-40"
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: КОНТАКТЫ */}
          {step === 5 && (
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-[12px] font-medium text-[var(--text-main)]">
                    Как к вам обращаться?
                  </p>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name="name"
                    className={`w-full rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2 text-[13px] text-[var(--text-main)] outline-none focus:border-[var(--accent-strong)] ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1 text-[11px] text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-1 text-[12px] font-medium text-[var(--text-main)]">
                    Телефон для подтверждения
                  </p>
                  <input
                    type="tel"
                    name="phone"
                    className={`w-full rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2 text-[13px] text-[var(--text-main)] outline-none focus:border-[var(--accent-strong)] ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    required
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="mt-1 text-[11px] text-red-400"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-[12px] font-medium text-[var(--text-main)]">
                    Комментарий (по желанию)
                  </p>
                  <span
                    className="cursor-default text-[12px] text-[var(--text-muted)]"
                    title="Например: формат встречи, пожелания по образу или времени визита."
                  >
                    ℹ️
                  </span>
                </div>
                <textarea
                  className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3 text-[13px] text-[var(--text-main)] outline-none focus:border-[var(--accent-strong)]"
                  placeholder={commentPlaceholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-full bg-[var(--accent-strong)] px-5 py-3 text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--text-on-accent)] disabled:opacity-60"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <span className="spinner-small mr-2" />
                      отправляем запрос в клуб…
                    </>
                  ) : (
                    "подтвердить запись"
                  )}
                </button>
                <p className="text-center text-[11px] text-[var(--text-muted)]">
                  В популярные дни вечерние слоты закрываются заранее — если
                  что‑то пойдёт не так, администратор предложит ближайшее
                  доступное время.
                </p>
              </div>

              <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                Мы используем их только для связи по вашей записи в клуб
                «Джентльмены Культуры».
              </p>
            </div>
          )}
        </form>

        {showSuccessToast && (
          <div className="pointer-events-none fixed bottom-4 left-1/2 z-[110] -translate-x-1/2 transform px-4 md:bottom-6 md:px-0">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-[rgba(22,16,13,0.96)] px-4 py-3 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
              <p className="text-[12px] text-[var(--text-main)]">
                Запрос на запись отправлен. Администратор клуба свяжется с вами
                для подтверждения времени.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
