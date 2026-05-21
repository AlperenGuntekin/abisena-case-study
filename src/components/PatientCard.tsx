import { useI18n } from "../i18n/I18nContext";
import type { PatientRecord } from "../types/patient";
import { calculateAge, formatDate } from "../utils/format";

interface PatientCardProps {
  patient: PatientRecord;
  onEdit: (patient: PatientRecord) => void;
  onDelete: (patient: PatientRecord) => void;
}

function statusClass(status: PatientRecord["status"]): string {
  switch (status) {
    case "Bekliyor":
      return "status status--waiting";
    case "Muayenede":
      return "status status--exam";
    case "Tamamlandı":
      return "status status--done";
    case "İptal":
      return "status status--cancelled";
  }
}

export function PatientCard({ patient, onEdit, onDelete }: PatientCardProps) {
  const { t, lang } = useI18n();
  const age = calculateAge(patient.birthDate);
  const diagnosis =
    lang === "tr" ? patient.diagnosis_tr : patient.diagnosis_en;
  const note = lang === "tr" ? patient.note_tr : patient.note_en;

  return (
    <article className="card">
      <header className="card__header">
        <div className="card__identity">
          <h3 className="card__name">{patient.fullName}</h3>
          <p className="card__meta">
            <span>{patient.department}</span>
            <span aria-hidden>·</span>
            <span>
              {formatDate(patient.birthDate, lang)}
              {age !== null ? ` (${age})` : ""}
            </span>
            <span aria-hidden>·</span>
            <span>{patient.bloodType}</span>
          </p>
        </div>

        <div className="card__status-group">
          <span className={statusClass(patient.status)}>
            {t.statusLabels[patient.status]}
          </span>
          {patient.priority === "acil" && (
            <span className="priority priority--urgent">
              {t.priorityLabels.acil}
            </span>
          )}
        </div>
      </header>

      <div className="card__body">
        <div className="card__field">
          <p className="card__label">{t.fields.appointmentDate}</p>
          <p className="card__value">
            {formatDate(patient.appointmentDate, lang)}
          </p>
        </div>
        <div className="card__field">
          <p className="card__label">{t.fields.diagnosis}</p>
          <p className="card__value">{diagnosis}</p>
        </div>
        <div className="card__field card__field--score">
          <p className="card__label">{t.fields.score}</p>
          <div className="score" aria-label={`${patient.score} / 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < patient.score ? "score__dot is-on" : "score__dot"}
              />
            ))}
          </div>
        </div>
      </div>

      {note && <p className="card__note">{note}</p>}

      <div className="card__flags">
        {patient.isInsured && (
          <span className="flag flag--insured">{t.badges.insured}</span>
        )}
        {patient.isFollowUp && (
          <span className="flag flag--followup">{t.badges.followUp}</span>
        )}
        {patient.isVaccinated && (
          <span className="flag flag--vaccinated">{t.badges.vaccinated}</span>
        )}
        {patient.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="card__actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => onEdit(patient)}
        >
          {t.edit}
        </button>
        <button
          type="button"
          className="btn btn--danger-ghost"
          onClick={() => onDelete(patient)}
        >
          {t.delete}
        </button>
      </div>
    </article>
  );
}
