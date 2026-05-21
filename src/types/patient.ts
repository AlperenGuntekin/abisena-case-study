export type PatientStatus = "Bekliyor" | "Muayenede" | "Tamamlandı" | "İptal";
export type PatientPriority = "acil" | "normal";
export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "0+"
  | "0-";

export interface PatientRecord {
  id: string;
  fullName: string;
  birthDate: string;
  appointmentDate: string;
  createdAt: string;
  department: string;
  status: PatientStatus;
  priority: PatientPriority;
  bloodType: BloodType;
  score: number;
  note_tr: string;
  note_en: string;
  diagnosis_tr: string;
  diagnosis_en: string;
  isInsured: boolean;
  isFollowUp: boolean;
  isVaccinated: boolean;
  tags: string[];
  notes?: string | null;
}

export type PatientDraft = Omit<PatientRecord, "id" | "createdAt">;

export const PATIENT_STATUSES: PatientStatus[] = [
  "Bekliyor",
  "Muayenede",
  "Tamamlandı",
  "İptal",
];

export const PATIENT_PRIORITIES: PatientPriority[] = ["acil", "normal"];

export const BLOOD_TYPES: BloodType[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "0+",
  "0-",
];

export const DEPARTMENTS = [
  "Dahiliye",
  "Kardiyoloji",
  "Nöroloji",
  "Ortopedi",
  "Pediatri",
];
