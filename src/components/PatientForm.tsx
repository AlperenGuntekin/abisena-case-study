import { useEffect, useState, type FormEvent } from "react";
import { useI18n } from "../i18n/I18nContext";
import {
  BLOOD_TYPES,
  DEPARTMENTS,
  PATIENT_PRIORITIES,
  PATIENT_STATUSES,
  type BloodType,
  type PatientDraft,
  type PatientRecord,
} from "../types/patient";
import { toISODate } from "../utils/format";

interface PatientFormProps {
  initial?: PatientRecord;
  onSubmit: (draft: PatientDraft) => void;
  onCancel: () => void;
}

function emptyDraft(): PatientDraft {
  const today = new Date().toISOString();
  return {
    fullName: "",
    birthDate: "1990-01-01",
    appointmentDate: today,
    department: DEPARTMENTS[0]!,
    status: "Bekliyor",
    priority: "normal",
    bloodType: "A+",
    score: 3,
    note_tr: "",
    note_en: "",
    diagnosis_tr: "",
    diagnosis_en: "",
    isInsured: true,
    isFollowUp: false,
    isVaccinated: false,
    tags: [],
    notes: null,
  };
}

function recordToDraft(p: PatientRecord): PatientDraft {
  const { id: _id, createdAt: _createdAt, ...rest } = p;
  return rest;
}

export function PatientForm({ initial, onSubmit, onCancel }: PatientFormProps) {
  const { t } = useI18n();
  const [draft, setDraft] = useState<PatientDraft>(() =>
    initial ? recordToDraft(initial) : emptyDraft(),
  );
  const [tagsInput, setTagsInput] = useState<string>(
    () => (initial?.tags ?? []).join(", "),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof PatientDraft, string>>>({});

  useEffect(() => {
    if (initial) {
      setDraft(recordToDraft(initial));
      setTagsInput(initial.tags.join(", "));
    } else {
      setDraft(emptyDraft());
      setTagsInput("");
    }
    setErrors({});
  }, [initial]);

  function update<K extends keyof PatientDraft>(key: K, value: PatientDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors: Partial<Record<keyof PatientDraft, string>> = {};
    if (!draft.fullName.trim()) nextErrors.fullName = t.required;
    if (!draft.diagnosis_tr.trim()) nextErrors.diagnosis_tr = t.required;
    if (!draft.diagnosis_en.trim()) nextErrors.diagnosis_en = t.required;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const parsedTags = tagsInput
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);

    onSubmit({
      ...draft,
      fullName: draft.fullName.trim(),
      diagnosis_tr: draft.diagnosis_tr.trim(),
      diagnosis_en: draft.diagnosis_en.trim(),
      note_tr: draft.note_tr.trim(),
      note_en: draft.note_en.trim(),
      notes: draft.notes && draft.notes.trim() ? draft.notes.trim() : null,
      tags: Array.from(new Set(parsedTags)),
      appointmentDate: draft.appointmentDate || new Date().toISOString(),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__grid">
        <label className="field">
          <span className="field__label">{t.fields.fullName}</span>
          <input
            type="text"
            value={draft.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            required
          />
          {errors.fullName && <span className="field__error">{errors.fullName}</span>}
        </label>

        <label className="field">
          <span className="field__label">{t.fields.birthDate}</span>
          <input
            type="date"
            value={toISODate(draft.birthDate)}
            onChange={(e) =>
              update("birthDate", e.target.value || draft.birthDate)
            }
          />
        </label>

        <label className="field">
          <span className="field__label">{t.fields.appointmentDate}</span>
          <input
            type="date"
            value={toISODate(draft.appointmentDate)}
            onChange={(e) => {
              const v = e.target.value;
              update(
                "appointmentDate",
                v ? new Date(v).toISOString() : draft.appointmentDate,
              );
            }}
          />
        </label>

        <label className="field">
          <span className="field__label">{t.fields.department}</span>
          <select
            value={draft.department}
            onChange={(e) => update("department", e.target.value)}
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">{t.fields.status}</span>
          <select
            value={draft.status}
            onChange={(e) =>
              update("status", e.target.value as PatientDraft["status"])
            }
          >
            {PATIENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {t.statusLabels[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">{t.fields.priority}</span>
          <select
            value={draft.priority}
            onChange={(e) =>
              update("priority", e.target.value as PatientDraft["priority"])
            }
          >
            {PATIENT_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {t.priorityLabels[p]}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">{t.fields.bloodType}</span>
          <select
            value={draft.bloodType}
            onChange={(e) => update("bloodType", e.target.value as BloodType)}
          >
            {BLOOD_TYPES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">
            {t.fields.score} ({draft.score}/5)
          </span>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={draft.score}
            onChange={(e) => update("score", Number(e.target.value))}
          />
        </label>

        <label className="field">
          <span className="field__label">{t.fields.diagnosis} (TR)</span>
          <input
            type="text"
            value={draft.diagnosis_tr}
            onChange={(e) => update("diagnosis_tr", e.target.value)}
            aria-invalid={Boolean(errors.diagnosis_tr)}
            required
          />
          {errors.diagnosis_tr && (
            <span className="field__error">{errors.diagnosis_tr}</span>
          )}
        </label>

        <label className="field">
          <span className="field__label">{t.fields.diagnosis} (EN)</span>
          <input
            type="text"
            value={draft.diagnosis_en}
            onChange={(e) => update("diagnosis_en", e.target.value)}
            aria-invalid={Boolean(errors.diagnosis_en)}
            required
          />
          {errors.diagnosis_en && (
            <span className="field__error">{errors.diagnosis_en}</span>
          )}
        </label>

        <label className="field field--full">
          <span className="field__label">{t.fields.note} (TR)</span>
          <textarea
            rows={2}
            value={draft.note_tr}
            onChange={(e) => update("note_tr", e.target.value)}
          />
        </label>

        <label className="field field--full">
          <span className="field__label">{t.fields.note} (EN)</span>
          <textarea
            rows={2}
            value={draft.note_en}
            onChange={(e) => update("note_en", e.target.value)}
          />
        </label>

        <label className="field field--full">
          <span className="field__label">{t.fields.notes}</span>
          <input
            type="text"
            value={draft.notes ?? ""}
            onChange={(e) => update("notes", e.target.value)}
          />
        </label>

        <label className="field field--full">
          <span className="field__label">{t.fields.tags}</span>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder={t.tagsHelp}
          />
        </label>

        <div className="field field--checkboxes field--full">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={draft.isInsured}
              onChange={(e) => update("isInsured", e.target.checked)}
            />
            {t.fields.isInsured}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={draft.isFollowUp}
              onChange={(e) => update("isFollowUp", e.target.checked)}
            />
            {t.fields.isFollowUp}
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={draft.isVaccinated}
              onChange={(e) => update("isVaccinated", e.target.checked)}
            />
            {t.fields.isVaccinated}
          </label>
        </div>
      </div>

      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          {t.cancel}
        </button>
        <button type="submit" className="btn btn--primary">
          {t.save}
        </button>
      </div>
    </form>
  );
}
