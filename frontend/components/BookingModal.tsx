// components/BookingModal.tsx
import { useState, useEffect, useRef } from "react";
import { trackBookingSuccess } from "../lib/analytics";
import { YCLIENTS_ROLES } from "../lib/openYclients";
import {
  LOGICAL_RITUALS,
  resolveServiceIdForRitual,
  LogicalRitualKey,
  MasterRole,
} from "../lib/ritualsConfig";

type BookingInitialContext = {
  masterId?: string;
  masterName?: string;
  ritualKey?: LogicalRitualKey;
  ritualName?: string;
} | null;

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: BookingInitialContext;
};

type Staff = {
  id: string;
  name: string;
  position?: string;
  description?: string;
};

type Step = 1 | 2 | 3 | 4 | 5 | 6;
type RitualSubStep = 1 | 2;
type TimeSubStep = 1 | 2;

type FieldErrors = {
  name?: string;
  phone?: string;
  date?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type PathType = "by_master" | "by_datetime" | null;

type AvailabilityByStaff = {
  staff_id: number;
  staff_name?: string;
  slots: { datetime: string; time: string }[];
};

export default function BookingModal({
  isOpen,
  onClose,
  initialContext,
}: BookingModalProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [masters, setMasters] = useState<Staff[]>([]);

  // путь (ветка)
  const [path, setPath] = useState<PathType>(null);

  // мастер
  const [masterRole, setMasterRole] = useState<MasterRole | null>(null);
  const [masterId, setMasterId] = useState<string>(
    initialContext?.masterId ?? "",
  );

  // ритуал
  const [selectedRitualKey, setSelectedRitualKey] =
    useState<LogicalRitualKey | null>(initialContext?.ritualKey ?? null);
  const [ritualStep, setRitualStep] = useState<RitualSubStep>(1);
  const [selectedRitualGroupId, setSelectedRitualGroupId] = useState<
    "group-hair" | "group-beard" | "group-care" | null
  >(null);

  // дата/время
  const [date, setDate] = useState<string>("");
  const [availableDatesByRole, setAvailableDatesByRole] = useState<string[]>(
    [],
  );
  const [availableDatesByStaff, setAvailableDatesByStaff] =
    useState<string[]>([]);

  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [availabilitiesByRole, setAvailabilitiesByRole] = useState<
    AvailabilityByStaff[]
  >([]);
  const [selectedTimeInDatePath, setSelectedTimeInDatePath] = useState<
    string | null
  >(null);
  const [selectedMasterIdInDatePath, setSelectedMasterIdInDatePath] =
    useState<string | null>(null);

  const [timeStep, setTimeStep] = useState<TimeSubStep>(1);

  // контакты
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const [step, setStep] = useState<Step>(1);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isLoadingDates, setIsLoadingDates] = useState(false);
  const [isLoadingAvailabilitiesByRole, setIsLoadingAvailabilitiesByRole] =
    useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const masterIdFromContext = initialContext?.masterId;
  const masterNameFromContext = initialContext?.masterName;

  const isSending = status === "submitting";

  // Если модалку открыли сразу с мастером – сразу ставим путь "by_master"
  useEffect(() => {
    if (!isOpen) return;
    if (masterIdFromContext) {
      setPath("by_master");
      setMasterId(masterIdFromContext);
      const role = (YCLIENTS_ROLES[masterIdFromContext] ||
        "top_master") as MasterRole;
      setMasterRole(role);
      setStep(3);
    }
  }, [isOpen, masterIdFromContext]);

  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && step === 6 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen, step]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSending) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, isSending, onClose]);

  // сброс при закрытии
  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setGlobalError(null);

      setMasters([]);

      setSelectedRitualKey(initialContext?.ritualKey ?? null);
      setRitualStep(1);
      setSelectedRitualGroupId(null);

      setPath(null);
      setMasterRole(null);

      setDate("");
      setAvailableDatesByRole([]);
      setAvailableDatesByStaff([]);

      setMasterId(initialContext?.masterId ?? "");
      setSlots([]);
      setSelectedSlot(null);

      setAvailabilitiesByRole([]);
      setSelectedTimeInDatePath(null);
      setSelectedMasterIdInDatePath(null);

      setTimeStep(1);

      setName("");
      setPhone("");
      setComment("");
      setErrors({});

      setStep(1);
      setIsLoadingSlots(false);
      setIsLoadingDates(false);
      setIsLoadingAvailabilitiesByRole(false);
    }
  }, [isOpen, initialContext]);

  // загрузка мастеров
  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();

    async function loadMasters() {
      try {
        const res = await fetch("/api/yclients/staff", {
          signal: controller.signal,
        });
        const raw = await res.json();
        const mastersData: Staff[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];
        setMasters(mastersData);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        console.error("Failed to load staff", e);
        setGlobalError(
          "Не удалось загрузить список мастеров. Попробуйте обновить страницу.",
        );
      }
    }

    loadMasters();
    return () => controller.abort();
  }, [isOpen]);

  // загрузка доступных дней
  useEffect(() => {
    if (!isOpen) return;

    const shouldLoadForDatePath = path === "by_datetime" && step === 2;
    const shouldLoadForMasterPath = path === "by_master" && step === 5;
    if (!shouldLoadForDatePath && !shouldLoadForMasterPath) return;

    const controller = new AbortController();

    async function loadDates() {
      try {
        setIsLoadingDates(true);
        setAvailableDatesByRole([]);
        setAvailableDatesByStaff([]);
        setGlobalError(null);

        // ВЕТКА "сначала дата и время": отдаём все дни текущего месяца
        if (path === "by_datetime") {
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth();
          const lastDay = new Date(year, month + 1, 0).getDate();

          const dates: string[] = [];
          for (let d = 1; d <= lastDay; d++) {
            const day = String(d).padStart(2, "0");
            const m = String(month + 1).padStart(2, "0");
            dates.push(`${year}-${m}-${day}`);
          }

          setAvailableDatesByRole(dates);
          return;
        }

        // дальше только для by_master — тут ритуал уже выбран
        if (!selectedRitualKey) return;

        const effectiveMasterId =
          path === "by_master" ? masterId : selectedMasterIdInDatePath || "";

        const serviceId = resolveServiceIdForRitual(selectedRitualKey!, {
          masterRole:
            masterRole ||
            (effectiveMasterId
              ? ((YCLIENTS_ROLES[effectiveMasterId] as MasterRole) ||
                  "top_master")
              : null),
        });

        if (!serviceId) {
          setGlobalError(
            "Не удалось определить формат услуги. Попробуйте выбрать другой ритуал.",
          );
          return;
        }

        if (path === "by_master") {
          if (effectiveMasterId) {
            const url = `/api/yclients/available-days-by-staff?service_id=${serviceId}&staff_id=${Number(
              effectiveMasterId,
            )}`;
            const res = await fetch(url, { signal: controller.signal });
            const data = await res.json();
            const dates: string[] = Array.isArray(data)
              ? data
              : Array.isArray(data?.data)
              ? data.data
              : [];
            setAvailableDatesByStaff(dates);
          } else if (masterRole) {
            const url = `/api/yclients/available-days-by-role?service_id=${serviceId}&role=${masterRole}`;
            const res = await fetch(url, { signal: controller.signal });
            const data = await res.json();
            const dates: string[] = Array.isArray(data)
              ? data
              : Array.isArray(data?.data)
              ? data.data
              : [];
            setAvailableDatesByRole(dates);
          }
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        console.error("Failed to load available days", e);
        setGlobalError(
          "Не удалось загрузить доступные дни. Попробуйте позже или смените способ подбора.",
        );
      } finally {
        setIsLoadingDates(false);
      }
    }

    loadDates();
    return () => controller.abort();
  }, [
    isOpen,
    step,
    path,
    selectedRitualKey,
    masterId,
    masterRole,
    selectedMasterIdInDatePath,
  ]);

  // загрузка слотов (by_master)
  useEffect(() => {
    if (!isOpen) return;
    if (path !== "by_master") return;
    if (!date || !selectedRitualKey) {
      setSlots([]);
      setSelectedSlot(null);
      return;
    }

    const controller = new AbortController();

    async function loadSlots() {
      try {
        setIsLoadingSlots(true);
        setGlobalError(null);

        const effectiveMasterId = masterId || selectedMasterIdInDatePath || "";
        const roleKey: MasterRole =
          masterRole ||
          (effectiveMasterId
            ? ((YCLIENTS_ROLES[effectiveMasterId] as MasterRole) ||
                "top_master")
            : "top_master");

        const serviceId = resolveServiceIdForRitual(selectedRitualKey!, {
          masterRole: roleKey,
        });

        if (!serviceId) {
          setGlobalError(
            "Не удалось подобрать услугу для выбранного формата. Попробуйте другой ритуал.",
          );
          return;
        }

        const params = new URLSearchParams();
        params.set("date", date);
        params.set("service_id", String(serviceId));
        if (effectiveMasterId) params.set("staff_id", effectiveMasterId);

        const res = await fetch(
          `/api/yclients/availability?${params.toString()}`,
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

        if (!slotsData.length) {
          setGlobalError(
            "В этот день свободных слотов под выбранный формат нет. Попробуйте другую дату или мастера.",
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

    if (date && (masterId || masterRole || selectedMasterIdInDatePath)) {
      loadSlots();
    }

    return () => controller.abort();
  }, [
    isOpen,
    path,
    date,
    selectedRitualKey,
    masterId,
    masterRole,
    selectedMasterIdInDatePath,
  ]);

  // загрузка availabilities (by_datetime) — ТЕПЕРЬ РАБОТАЕТ ПО date + ritual
  useEffect(() => {
    if (!isOpen) return;
    if (path !== "by_datetime") return;
    if (!date || !selectedRitualKey) {
      setAvailabilitiesByRole([]);
      setSelectedTimeInDatePath(null);
      setSelectedMasterIdInDatePath(null);
      return;
    }

    const controller = new AbortController();

    async function loadAvailabilities() {
      try {
        setIsLoadingAvailabilitiesByRole(true);
        setGlobalError(null);

        const roleKey: MasterRole = masterRole || "top_master";
        const serviceId = resolveServiceIdForRitual(selectedRitualKey!, {
          masterRole: roleKey,
        });

        if (!serviceId) {
          setGlobalError(
            "Не удалось подобрать услугу для выбранного формата. Попробуйте другой ритуал.",
          );
          return;
        }

        const url = `/api/yclients/availability-by-role?service_id=${serviceId}&date=${date}&role=${roleKey}`;
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        const list: AvailabilityByStaff[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setAvailabilitiesByRole(list);
        setSelectedTimeInDatePath(null);
        setSelectedMasterIdInDatePath(null);

        if (!list.length) {
          setGlobalError(
            "На выбранный день нет свободных слотов под этот формат. Попробуйте другую дату.",
          );
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        console.error("Failed to load availabilities by role", e);
        setAvailabilitiesByRole([]);
        setSelectedTimeInDatePath(null);
        setSelectedMasterIdInDatePath(null);
        setGlobalError(
          "Не удалось загрузить свободное время. Попробуйте выбрать другую дату.",
        );
      } finally {
        setIsLoadingAvailabilitiesByRole(false);
      }
    }

    loadAvailabilities();
    return () => controller.abort();
  }, [isOpen, path, date, selectedRitualKey, masterRole]);

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
    if (!selectedRitualKey) {
      setGlobalError("Выберите ритуал для записи.");
      return;
    }

    let finalDate = date;
    let finalTime: string | null = null;
    let finalMasterId: string | null = null;

    if (path === "by_master") {
      finalTime = selectedSlot;
      finalMasterId = masterId || selectedMasterIdInDatePath;
    }

    if (path === "by_datetime") {
      if (!date || !selectedTimeInDatePath || !selectedMasterIdInDatePath) {
        setGlobalError(
          "Проверьте, что выбраны дата, время и мастер для визита.",
        );
        return;
      }
      finalDate = date;
      finalTime = selectedTimeInDatePath;
      finalMasterId = selectedMasterIdInDatePath;
    }

    if (!finalDate || !finalTime || !finalMasterId) {
      setGlobalError("Проверьте, что выбраны мастер, дата и время визита.");
      return;
    }

    const roleKey: MasterRole =
      masterRole ||
      ((YCLIENTS_ROLES[finalMasterId] as MasterRole | undefined) ??
        "top_master");

    const serviceIdToUse = resolveServiceIdForRitual(selectedRitualKey!, {
      masterRole: roleKey,
    });

    if (!serviceIdToUse) {
      setGlobalError(
        "Не удалось подобрать услугу для бронирования. Попробуйте другой ритуал.",
      );
      return;
    }

    setStatus("submitting");
    let hadError = false;

    try {
      const ritual = LOGICAL_RITUALS.find((r) => r.key === selectedRitualKey);
      const ritualNameActual =
        initialContext?.ritualName || ritual?.name || undefined;

      const intentPayload = {
        ritualKey: selectedRitualKey,
        ritualName: ritualNameActual,
        masterId: finalMasterId,
        masterName:
          masterNameFromContext ||
          masters.find((m) => m.id === finalMasterId)?.name,
        date: finalDate,
        time: finalTime,
        name,
        phone,
        comment,
        path,
      };

      try {
        await fetch("/api/booking-intents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(intentPayload),
        });
      } catch (err) {
        console.error("Failed to send booking intent", err);
      }

      const datetime = `${finalDate} ${finalTime}`;

      try {
        const res = await fetch("/api/yclients/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: Number(serviceIdToUse),
            staffId: Number(finalMasterId),
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
          "Сервис записи временно недоступен. Попробуйте позже.",
        );
        return;
      }

      setStatus("success");
      trackBookingSuccess();
      setShowSuccessToast(true);
      onClose();
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3500);

      window.location.href = "/thank-you";
    } finally {
      if (!hadError) {
        setStatus("idle");
      }
    }
  };

  const selectedRitual =
    selectedRitualKey &&
    LOGICAL_RITUALS.find((r) => r.key === selectedRitualKey);
  const selectedRitualName =
    initialContext?.ritualName || selectedRitual?.name;

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
      className={`flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] md:text-[11px] ${
        active
          ? "bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-sm"
          : done
          ? "bg-transparent text-[var(--text-muted-strong)]"
          : "bg-transparent text-[var(--text-muted-soft)]"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
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

  const getMasterDescription = (master: Staff): string => {
    if (master.description && master.description.trim().length > 0) {
      return master.description;
    }

    switch (master.id) {
      case "3533027":
        return "Арт-директор клуба. Собирает мужские образы под статус и образ жизни, силен в сложных трансформациях и работе «до/после». Поможет понять, что вам действительно идет.";
      case "4910723":
        return "Топ-барбер клуба. Любит чистые формы и идеальные переходы. Делает стрижки, которые держат форму и без укладки выглядят аккуратно и собранно.";
      case "3498549":
        return "Топ-барбер. Внимательна к деталям и пожеланиям, аккуратно работает с формой и длиной. Подбирает стрижку под черты лица и привычный стиль одежды.";
      case "3498548":
        return "Топ-барбер. Делает быстрые, но точные стрижки. Подскажет, как ухаживать за волосами и бородой между визитами, чтобы образ держался без лишних усилий.";
      default:
        return "Опытный барбер клуба. Подберет стрижку и формат ритуала под ваш образ и ритм жизни, чтобы вы чувствовали себя уверенно после визита.";
    }
  };

  const allTimesFromAvailabilities: string[] = Array.from(
    new Set(
      availabilitiesByRole.flatMap((item) =>
        (item.slots || []).map((s) => s.time),
      ),
    ),
  ).sort();

  const mastersForSelectedTime: AvailabilityByStaff[] =
    selectedTimeInDatePath && availabilitiesByRole.length
      ? availabilitiesByRole.filter((item) =>
          (item.slots || []).some((s) => s.time === selectedTimeInDatePath),
        )
      : [];

  return (
    <div
      className="fixed inset-0 z-[100] bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.85)_0,_rgba(0,0,0,0.96)_55%,_rgba(0,0,0,0.98)_100%)] overflow-y-auto px-3 py-5 text-[13px] leading-snug backdrop-blur-md md:px-6 md:py-9 md:text-[14px]"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="mx-auto flex min-h-[100dvh] items-center justify-center">
        <div className="relative w-full max-w-[720px] rounded-3xl bg-[var(--surface-elevated)]/98 px-5 py-5 shadow-[0_32px_120px_rgba(0,0,0,0.9)] md:px-8 md:py-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[rgba(10,6,4,0.9)] text-[18px] text-[var(--text-muted)] transition hover:border-[var(--accent-soft)] hover:text-[var(--text-main)] md:right-5 md:top-5"
            aria-label="Закрыть окно записи"
            disabled={isSending}
          >
            ×
          </button>

          <div className="mb-3 space-y-2.5 md:mb-4">
            <p className="mb-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] md:text-[11px]">
              клубная запись
            </p>
            <h2
              id="booking-modal-title"
              className="text-[19px] font-semibold leading-snug tracking-[0.02em] text-[var(--text-main)] md:text-[24px]"
            >
              Запись в клуб по шагам
            </h2>
            <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">
              Каждый экран — один выбор. Сначала способ, затем мастер или время,
              ритуал и контакты.
            </p>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)]/95 px-3 py-2 text-[11px] text-[var(--text-muted-strong)]">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 md:flex md:flex-wrap md:gap-4">
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
                      (path === "by_master" && date && selectedSlot) ||
                      (path === "by_datetime" &&
                        date &&
                        selectedTimeInDatePath &&
                        selectedMasterIdInDatePath)
                        ? "font-medium text-[var(--accent-strong)]"
                        : "text-[var(--text-muted-soft)]"
                    }
                  >
                    {path === "by_master" && date && selectedSlot
                      ? `${date}, ${selectedSlot}`
                      : path === "by_datetime" &&
                        date &&
                        selectedTimeInDatePath &&
                        selectedMasterIdInDatePath
                      ? `${date}, ${selectedTimeInDatePath}`
                      : "не выбрано"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5 border-b border-[var(--border-subtle)] pb-2.5">
            <StepPill
              index={1}
              label="Способ"
              active={step === 1}
              done={step > 1}
            />
            <StepPill
              index={2}
              label="Дата и время"
              active={step === 2}
              done={step > 2}
            />
            <StepPill
              index={3}
              label="Мастер"
              active={step === 3}
              done={step > 3}
            />
            <StepPill
              index={4}
              label="Ритуал"
              active={step === 4}
              done={step > 4}
            />
            <StepPill
              index={5}
              label="Дата и время"
              active={step === 5}
              done={step > 5}
            />
            <StepPill
              index={6}
              label="Контакты"
              active={step === 6}
              done={false}
            />
          </div>

          {globalError && (
            <div className="mb-3 rounded-2xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-[11px] text-red-100">
              {globalError}
            </div>
          )}

          {/* ШАГ 1: способ */}
          {step === 1 && (
            <div className="space-y-3 md:space-y-4">
              <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                Как удобнее подобрать визит: от мастера или от даты и времени?
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setPath("by_master");
                    setTimeStep(1);
                    setStep(3);
                  }}
                  className={`w-full rounded-2xl border px-3 py-2.5 text-left text-[12px] transition ${
                    path === "by_master"
                      ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.02)]"
                      : "border-[var(--border-subtle)] bg-[rgba(9,5,4,0.9)] hover:border-[var(--accent-soft)]"
                  }`}
                >
                  <div className="mb-0.5 flex items-center justify-between gap-2">
                    <span className="font-medium text-[var(--text-main)]">
                      Сначала мастер
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted-strong)]">
                    Сначала выберете барбера, затем под него подберём ритуал,
                    дату и время визита.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPath("by_datetime");
                    setTimeStep(1);
                    setStep(2);
                  }}
                  className={`w-full rounded-2xl border px-3 py-2.5 text-left text-[12px] transition ${
                    path === "by_datetime"
                      ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.02)]"
                      : "border-[var(--border-subtle)] bg-[rgba(9,5,4,0.9)] hover:border-[var(--accent-soft)]"
                  }`}
                >
                  <div className="mb-0.5 flex items-center justify-between gap-2">
                    <span className="font-medium text-[var(--text-main)]">
                      Сначала дата и время
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted-strong)]">
                    Сначала выбираете удобный день, затем ритуал, далее время и
                    мастера, свободного в это время.
                  </p>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!path}
                  onClick={() => {
                    if (path === "by_master") {
                      setStep(3);
                    } else if (path === "by_datetime") {
                      setStep(2);
                    }
                  }}
                  className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                >
                  Продолжить
                </button>
              </div>
            </div>
          )}

          {/* ВЕТКА 1: сначала дата и время → ритуалы → мастер */}

          {step === 2 && path === "by_datetime" && (
            <>
              {/* Подшаг 1: выбор даты */}
              {timeStep === 1 && (
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                    Выберите удобный день визита.
                  </p>

                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Дата визита
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {isLoadingDates && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          Загружаем доступные дни…
                        </span>
                      )}
                      {!isLoadingDates &&
                        !!availableDatesByRole.length &&
                        availableDatesByRole.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setDate(d);
                            }}
                            className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                              date === d
                                ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.03)] text-[var(--accent-strong)]"
                                : "border-[var(--border-subtle)] text-[var(--text-muted-strong)] hover:border-[var(--accent-soft)]"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      {!isLoadingDates && !availableDatesByRole.length && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          Доступные дни появятся после загрузки.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setDate("");
                        setTimeStep(1);
                        setStep(1);
                      }}
                      className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                    >
                      ← Вернуться к способу
                    </button>
                    <button
                      type="button"
                      disabled={!date}
                      onClick={() => {
                        setStep(4);
                        setRitualStep(1);
                      }}
                      className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                    >
                      Далее к ритуалам
                    </button>
                  </div>
                </div>
              )}

              {/* Подшаг 2: выбор времени — будет показан ПОСЛЕ ритуала */}
              {timeStep === 2 && (
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                    Теперь выберите удобное время в этот день.
                  </p>

                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Время визита
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {isLoadingAvailabilitiesByRole && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          Загружаем доступное время…
                        </span>
                      )}
                      {!isLoadingAvailabilitiesByRole &&
                        !!allTimesFromAvailabilities.length &&
                        allTimesFromAvailabilities.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              setSelectedTimeInDatePath(time);
                            }}
                            className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                              selectedTimeInDatePath === time
                                ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.03)] text-[var(--accent-strong)]"
                                : "border-[var(--border-subtle)] text-[var(--text-muted-strong)] hover:border-[var(--accent-soft)]"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      {!isLoadingAvailabilitiesByRole &&
                        !allTimesFromAvailabilities.length &&
                        date && (
                          <span className="text-[11px] text-[var(--text-muted-soft)]">
                            На выбранный день нет свободных слотов под этот
                            формат.
                          </span>
                        )}
                      {!date && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          Сначала выберите дату.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify_between">
                    <button
                      type="button"
                      onClick={() => {
                        setTimeStep(1);
                        setStep(4);
                        setRitualStep(2);
                      }}
                      className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                    >
                      ← Вернуться к ритуалу
                    </button>
                    <button
                      type="button"
                      disabled={!selectedTimeInDatePath}
                      onClick={() => {
                        setStep(3);
                      }}
                      className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                    >
                      Далее к мастеру
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ВЕТКА 2: сначала мастер → ритуалы → дата/время */}

          {step === 3 && path === "by_master" && (
            <div className="space-y-3 md:space-y-4">
              <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                Сначала выберите мастера, затем подберём ритуал и время визита.
              </p>

              <div className="space-y-2">
                {masters.map((master) => {
                  const isActive = masterId === master.id;
                  return (
                    <button
                      key={master.id}
                      type="button"
                      onClick={() => {
                        setMasterId(master.id);
                        setMasterRole(
                          (YCLIENTS_ROLES[master.id] as MasterRole) ||
                            "top_master",
                        );
                      }}
                      className={`w-full rounded-2xl border px-3 py-2.5 text-left text-[12px] transition ${
                        isActive
                          ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.06)] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                          : "border-[var(--border-subtle)] bg-[rgba(9,5,4,0.9)] hover:border-[var(--accent-soft)]"
                      }`}
                    >
                      <div className="mb-0.5 flex items-center justify-between gap-2">
                        <span
                          className={
                            isActive
                              ? "font-semibold text-[var(--accent-strong)]"
                              : "font-medium text-[var(--text-main)]"
                          }
                        >
                          {master.name}
                        </span>
                        {master.position && (
                          <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted-soft)]">
                            {master.position}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted-strong)]">
                        {getMasterDescription(master)}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                >
                  ← Вернуться к способу
                </button>
                <button
                  type="button"
                  disabled={!masterId}
                  onClick={() => {
                    setStep(4);
                    setRitualStep(1);
                  }}
                  className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                >
                  Далее к ритуалам
                </button>
              </div>
            </div>
          )}

          {/* ВЕТКА 1 (продолжение): мастер после даты/времени и ритуала – ШАГ 3 */}

          {step === 3 && path === "by_datetime" && (
            <div className="space-y-3 md:space-y-4">
              <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                Выберите мастера, свободного в выбранный слот.
              </p>

              <div className="grid gap-2 md:grid-cols-2">
                {mastersForSelectedTime.map((item) => {
                  const isActive =
                    selectedMasterIdInDatePath === String(item.staff_id);
                  return (
                    <button
                      key={item.staff_id}
                      type="button"
                      onClick={() => {
                        setSelectedMasterIdInDatePath(String(item.staff_id));
                        setMasterId(String(item.staff_id));
                      }}
                      className={`rounded-2xl border px-3 py-2.5 text-left text-[12px] transition ${
                        isActive
                          ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.06)] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                          : "border-[var(--border-subtle)] bg-[rgba(9,5,4,0.9)] hover:border-[var(--accent-soft)]"
                      }`}
                    >
                      <div className="mb-0.5 flex items-center justify-between gap-2">
                        <span
                          className={
                            isActive
                              ? "font-semibold text-[var(--accent-strong)]"
                              : "font-medium text-[var(--text-main)]"
                          }
                        >
                          {item.staff_name || "Мастер клуба"}
                        </span>
                      </div>
                    </button>
                  );
                })}
                {!mastersForSelectedTime.length && selectedTimeInDatePath && (
                  <span className="text-[11px] text-[var(--text-muted-soft)]">
                    На выбранное время сейчас нет свободных мастеров.
                  </span>
                )}
                {!selectedTimeInDatePath && (
                  <span className="text-[11px] text-[var(--text-muted-soft)]">
                    Сначала выберите время визита.
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    setTimeStep(2);
                  }}
                  className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                >
                  ← Вернуться ко времени
                </button>
                <button
                  type="button"
                  disabled={!selectedMasterIdInDatePath}
                  onClick={() => setStep(6)}
                  className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                >
                  Далее к контактам
                </button>
              </div>
            </div>
          )}

                    {/* ОБЩИЙ ШАГ 4: ритуалы – подшаг 1: выбор группы */}
          {step === 4 && ritualStep === 1 && (
            <div className="space-y-3 md:space-y-4">
              <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                Сначала выберите направление ритуала. На следующем шаге покажем
                конкретные варианты внутри группы.
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    id: "group-hair",
                    title: "Стрижка и образ",
                    desc: "Ритуалы, связанные со стрижкой и формой.",
                  },
                  {
                    id: "group-beard",
                    title: "Борода и бритьё",
                    desc: "Работа с бородой, усами и бритьём.",
                  },
                  {
                    id: "group-care",
                    title: "Уход и кожа",
                    desc: "Уходовые ритуалы для головы и кожи.",
                  },
                ].map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => {
                      setSelectedRitualGroupId(
                        group.id as
                          | "group-hair"
                          | "group-beard"
                          | "group-care",
                      );
                      setRitualStep(2);
                    }}
                    className={`w-full rounded-2xl border px-3 py-2.5 text-left text-[12px] transition ${
                      selectedRitualGroupId === group.id
                        ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.02)]"
                        : "border-[var(--border-subtle)] bg-[rgba(9,5,4,0.9)] hover:border-[var(--accent-soft)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-[var(--text-main)]">
                        {group.title}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted-soft)]">
                        выбрать →
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-[var(--text-muted-strong)]">
                      {group.desc}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (path === "by_master") {
                      setStep(3);
                    } else if (path === "by_datetime") {
                      setStep(2);
                    }
                    setRitualStep(1);
                  }}
                  className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                >
                  ← Вернуться назад
                </button>
                <button
                  type="button"
                  disabled={!selectedRitualGroupId}
                  onClick={() => setRitualStep(2)}
                  className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                >
                  Выбрать ритуал
                </button>
              </div>
            </div>
          )}

          {/* ОБЩИЙ ШАГ 4: ритуалы – подшаг 2: выбор ритуала */}
          {step === 4 && ritualStep === 2 && selectedRitualGroupId && (
            <div className="space-y-3 md:space-y-4">
              <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                Выберите ритуал внутри группы.
              </p>

              <div className="space-y-2">
                {LOGICAL_RITUALS.filter(
                  (r) => r.groupId === selectedRitualGroupId,
                ).map((ritual) => {
                  const isActive = selectedRitualKey === ritual.key;
                  return (
                    <button
                      key={ritual.key}
                      type="button"
                      onClick={() => {
                        setSelectedRitualKey(ritual.key);
                      }}
                      className={`w-full rounded-2xl border px-3 py-2 text-left text-[11px] md:text-[12px] transition ${
                        isActive
                          ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.04)] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                          : "border-[var(--border-subtle)] bg-[rgba(9,5,4,0.9)] hover:border-[var(--accent-soft)] hover:bg-[rgba(255,255,255,0.02)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={
                            isActive
                              ? "font-semibold text-[var(--accent-strong)]"
                              : "font-medium text-[var(--text-main)]"
                          }
                        >
                          {ritual.name}
                        </span>
                        <span className="text-[11px] text-[var(--text-muted-strong)]">
                          ~ {ritual.durationMinutes} мин · от {ritual.price} ₽
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setRitualStep(1)}
                  className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                >
                  ← Вернуться к группам
                </button>
                <button
                  type="button"
                  disabled={!selectedRitualKey}
                  onClick={() => {
                    if (path === "by_master") {
                      setStep(5);
                      setTimeStep(1);
                    } else if (path === "by_datetime") {
                      // после выбора ритуала во второй ветке идём выбирать время
                      setStep(2);
                      setTimeStep(2);
                    }
                  }}
                  className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                >
                  Продолжить
                </button>
              </div>
            </div>
          )}

          {/* ВЕТКА 2 (продолжение): после ритуала выбираем дату/время под мастера – ШАГ 5 */}
          {step === 5 && path === "by_master" && (
            <>
              {timeStep === 1 && (
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                    Выберите день визита под выбранного мастера и ритуал.
                  </p>

                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Дата визита
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {isLoadingDates && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          Загружаем доступные дни…
                        </span>
                      )}
                      {!isLoadingDates &&
                        (availableDatesByStaff.length > 0 ||
                          availableDatesByRole.length > 0) &&
                        (availableDatesByStaff.length
                          ? availableDatesByStaff
                          : availableDatesByRole
                        ).map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setDate(d);
                              setTimeStep(2);
                            }}
                            className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                              date === d
                                ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.03)] text-[var(--accent-strong)]"
                                : "border-[var(--border-subtle)] text-[var(--text-muted-strong)] hover:border-[var(--accent-soft)]"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      {!isLoadingDates &&
                        !availableDatesByStaff.length &&
                        !availableDatesByRole.length && (
                          <span className="text-[11px] text-[var(--text-muted-soft)]">
                            Доступные дни появятся после выбора мастера и
                            ритуала.
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setTimeStep(1);
                        setStep(4);
                      }}
                      className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                    >
                      ← Вернуться к ритуалам
                    </button>
                  </div>
                </div>
              )}

              {timeStep === 2 && (
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                    Выберите время визита в выбранный день.
                  </p>

                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Время визита
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {isLoadingSlots && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          Загружаем доступное время…
                        </span>
                      )}
                      {!isLoadingSlots &&
                        !!slots.length &&
                        slots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedSlot(time)}
                            className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                              selectedSlot === time
                                ? "border-[var(--accent-strong)] bg-[rgba(255,255,255,0.03)] text-[var(--accent-strong)]"
                                : "border-[var(--border-subtle)] text-[var(--text-muted-strong)] hover:border-[var(--accent-soft)]"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      {!isLoadingSlots && !slots.length && date && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          На выбранный день пока нет свободных слотов под этот
                          формат.
                        </span>
                      )}
                      {!date && (
                        <span className="text-[11px] text-[var(--text-muted-soft)]">
                          Сначала выберите дату.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setTimeStep(1)}
                      className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                    >
                      ← Вернуться к дате
                    </button>
                    <button
                      type="button"
                      disabled={!selectedSlot}
                      onClick={() => setStep(6)}
                      className="rounded-full bg-[var(--accent-strong)] px-4 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                    >
                      Далее к контактам
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ШАГ 6: контакты */}
          {step === 6 && (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <p className="text-[11px] md:text-[12px] text-[var(--text-muted-strong)]">
                Оставьте контакты, чтобы мы подтвердили запись и уточнили
                детали.
              </p>

              <div className="grid gap-2.5 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-[11px] text-[var(--text-muted)]">
                    Имя
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`h-9 w-full rounded-full border bg-[rgba(9,5,4,0.9)] px-3 text-[12px] text-[var(--text-main)] outline-none transition placeholder:text-[var(--text-muted-soft)] ${
                      errors.name
                        ? "border-red-500/70"
                        : "border-[var(--border-subtle)] focus:border-[var(--accent-soft)]"
                    }`}
                    placeholder="Как к вам обращаться"
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-300">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] text-[var(--text-muted)]">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`h-9 w-full rounded-full border bg-[rgba(9,5,4,0.9)] px-3 text-[12px] text-[var(--text-main)] outline-none transition placeholder:text-[var(--text-muted-soft)] ${
                      errors.phone
                        ? "border-red-500/70"
                        : "border-[var(--border-subtle)] focus:border-[var(--accent-soft)]"
                    }`}
                    placeholder="+7 (___) ___-__-__"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-300">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] text-[var(--text-muted)]">
                  Комментарий (если есть пожелания по визиту)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[rgba(9,5,4,0.9)] px-3 py-2 text-[12px] text-[var(--text-main)] outline-none transition placeholder:text-[var(--text-muted-soft)] focus:border-[var(--accent-soft)]"
                  placeholder={commentPlaceholder}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (path === "by_master") {
                      setStep(5);
                    } else if (path === "by_datetime") {
                      setStep(3);
                    }
                  }}
                  className="text-[11px] text-[var(--text-muted-strong)] hover:text-[var(--text-main)]"
                  disabled={isSending}
                >
                  ← Вернуться назад
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="rounded-full bg-[var(--accent-strong)] px-5 py-1.5 text-[12px] font-medium text-[var(--text-on-accent)] hover:bg-[var(--accent-strong-hover)] disabled:opacity-60"
                >
                  {isSending ? "Создаём запись…" : "Подтвердить запись"}
                </button>
              </div>
            </form>
          )}

          {showSuccessToast && (
            <div className="pointer-events-none fixed bottom-4 left-1/2 z-[110] -translate-x-1/2 transform px-4 md:bottom-6 md:px-0">
              <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-[rgba(22,16,13,0.96)] px-4 py-3 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
                <p className="text-[12px] text-[var(--text-main)]">
                  Запись создана. Детали визита мы уточним с вами лично.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          color: transparent;
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: auto;
          height: auto;
        }
      `}</style>
    </div>
  );
}

