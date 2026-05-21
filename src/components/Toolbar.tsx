import { useI18n } from "../i18n/I18nContext";
import { PATIENT_STATUSES, type PatientStatus } from "../types/patient";

export type SortKey =
  | "appointmentDesc"
  | "appointmentAsc"
  | "nameAsc"
  | "scoreDesc";

interface ToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: PatientStatus | "all";
  onStatusFilterChange: (value: PatientStatus | "all") => void;
  sortKey: SortKey;
  onSortKeyChange: (value: SortKey) => void;
  onNewPatient: () => void;
  resultsCount: number;
  totalCount: number;
}

export function Toolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortKey,
  onSortKeyChange,
  onNewPatient,
  resultsCount,
  totalCount,
}: ToolbarProps) {
  const { t } = useI18n();

  return (
    <div className="toolbar">
      <div className="toolbar__row">
        <label className="field field--search">
          <span className="field__label">{t.search}</span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.search}
          />
        </label>

        <label className="field">
          <span className="field__label">{t.filterByStatus}</span>
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as PatientStatus | "all")
            }
          >
            <option value="all">{t.allStatuses}</option>
            {PATIENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {t.statusLabels[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">{t.sortBy}</span>
          <select
            value={sortKey}
            onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
          >
            <option value="appointmentDesc">{t.sortNewest}</option>
            <option value="appointmentAsc">{t.sortOldest}</option>
            <option value="nameAsc">{t.sortNameAsc}</option>
            <option value="scoreDesc">{t.sortScoreDesc}</option>
          </select>
        </label>

        <button type="button" className="btn btn--primary" onClick={onNewPatient}>
          <span aria-hidden>+</span>
          {t.newPatient}
        </button>
      </div>

      <div className="toolbar__meta">{t.results(resultsCount, totalCount)}</div>
    </div>
  );
}
