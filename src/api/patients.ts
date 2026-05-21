import type { PatientRecord } from "../types/patient";

const ENDPOINT = "https://v0-json-api-three.vercel.app/api/data";

export async function fetchPatients(
  signal?: AbortSignal,
): Promise<PatientRecord[]> {
  const res = await fetch(ENDPOINT, { signal });
  if (!res.ok) {
    throw new Error(`API responded with ${res.status}`);
  }
  const data = (await res.json()) as PatientRecord[];
  if (!Array.isArray(data)) {
    throw new Error("API payload is not an array");
  }
  return data;
}
