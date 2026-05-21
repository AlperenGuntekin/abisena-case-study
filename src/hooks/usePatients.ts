import { useCallback, useEffect, useState } from "react";
import { fetchPatients } from "../api/patients";
import type { PatientDraft, PatientRecord } from "../types/patient";

type Status = "idle" | "loading" | "success" | "error";

interface UsePatientsResult {
  patients: PatientRecord[];
  status: Status;
  error: string | null;
  reload: () => void;
  addPatient: (draft: PatientDraft) => PatientRecord;
  updatePatient: (id: string, draft: PatientDraft) => void;
  deletePatient: (id: string) => void;
}

function makeId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36).slice(-4);
  return `loc-${time}${rand}`;
}

export function usePatients(): UsePatientsResult {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetchPatients(controller.signal)
      .then((data) => {
        setPatients(data);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error ? err.message : "Unknown error while fetching";
        setError(message);
        setStatus("error");
      });

    return () => controller.abort();
  }, [reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const addPatient = useCallback((draft: PatientDraft): PatientRecord => {
    const record: PatientRecord = {
      ...draft,
      id: makeId(),
      createdAt: new Date().toISOString(),
    };
    setPatients((prev) => [record, ...prev]);
    return record;
  }, []);

  const updatePatient = useCallback((id: string, draft: PatientDraft) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...draft } : p)),
    );
  }, []);

  const deletePatient = useCallback((id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    patients,
    status,
    error,
    reload,
    addPatient,
    updatePatient,
    deletePatient,
  };
}
