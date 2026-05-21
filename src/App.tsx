import { useMemo, useState } from "react";
import "./App.css";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { PatientCard } from "./components/PatientCard";
import { PatientForm } from "./components/PatientForm";
import { Toolbar, type SortKey } from "./components/Toolbar";
import { I18nProvider, useI18n } from "./i18n/I18nContext";
import { usePatients } from "./hooks/usePatients";
import type { PatientDraft, PatientRecord, PatientStatus } from "./types/patient";

function AppShell() {
  const { t } = useI18n();
  const {
    patients,
    status,
    error,
    reload,
    addPatient,
    updatePatient,
    deletePatient,
  } = usePatients();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PatientStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("appointmentDesc");

  const [editing, setEditing] = useState<PatientRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<PatientRecord | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return patients
      .filter((p) => statusFilter === "all" || p.status === statusFilter)
      .filter((p) => {
        if (!q) return true;
        return (
          p.fullName.toLowerCase().includes(q) ||
          p.diagnosis_tr.toLowerCase().includes(q) ||
          p.diagnosis_en.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      });
  }, [patients, search, statusFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortKey) {
      case "appointmentDesc":
        arr.sort(
          (a, b) =>
            new Date(b.appointmentDate).getTime() -
            new Date(a.appointmentDate).getTime(),
        );
        break;
      case "appointmentAsc":
        arr.sort(
          (a, b) =>
            new Date(a.appointmentDate).getTime() -
            new Date(b.appointmentDate).getTime(),
        );
        break;
      case "nameAsc":
        arr.sort((a, b) => a.fullName.localeCompare(b.fullName, "tr"));
        break;
      case "scoreDesc":
        arr.sort((a, b) => b.score - a.score);
        break;
    }
    return arr;
  }, [filtered, sortKey]);

  function handleSubmit(draft: PatientDraft) {
    if (editing) {
      updatePatient(editing.id, draft);
    } else {
      addPatient(draft);
    }
    setEditing(null);
    setIsCreating(false);
  }

  function closeForm() {
    setEditing(null);
    setIsCreating(false);
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          onNewPatient={() => setIsCreating(true)}
          resultsCount={sorted.length}
          totalCount={patients.length}
        />

        {status === "loading" && (
          <div className="state state--loading">
            <div className="spinner" aria-hidden />
            <p>{t.loading}</p>
          </div>
        )}

        {status === "error" && (
          <div className="state state--error" role="alert">
            <h2>{t.errorTitle}</h2>
            {error && <p className="state__detail">{error}</p>}
            <button type="button" className="btn btn--primary" onClick={reload}>
              {t.errorRetry}
            </button>
          </div>
        )}

        {status === "success" && sorted.length === 0 && (
          <div className="state state--empty">
            <h2>{t.emptyTitle}</h2>
            <p>{t.emptyBody}</p>
          </div>
        )}

        {status === "success" && sorted.length > 0 && (
          <div className="grid">
            {sorted.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                onEdit={(patient) => setEditing(patient)}
                onDelete={(patient) => setPendingDelete(patient)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <span>
          {t.company} — {t.appTitle}
        </span>
        <span className="footer__tech">React 18 · TypeScript · Vite</span>
      </footer>

      <Modal
        open={isCreating || editing !== null}
        onClose={closeForm}
        title={editing ? t.modalEditTitle : t.modalAddTitle}
      >
        <PatientForm
          initial={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <ConfirmDialog
        open={pendingDelete !== null}
        title={t.confirmDelete}
        body={pendingDelete ? t.confirmDeleteBody(pendingDelete.fullName) : ""}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) deletePatient(pendingDelete.id);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppShell />
    </I18nProvider>
  );
}
