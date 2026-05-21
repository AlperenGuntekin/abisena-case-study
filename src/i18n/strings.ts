import type { PatientPriority, PatientStatus } from "../types/patient";

export type Lang = "tr" | "en";

export interface Strings {
  appTitle: string;
  appSubtitle: string;
  company: string;

  search: string;
  searchPlaceholder: string;
  filterByStatus: string;
  allStatuses: string;
  sortBy: string;
  sortNewest: string;
  sortOldest: string;
  sortNameAsc: string;
  sortScoreDesc: string;

  newPatient: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  confirmDelete: string;
  confirmDeleteBody: (name: string) => string;

  loading: string;
  errorTitle: string;
  errorRetry: string;
  emptyTitle: string;
  emptyBody: string;

  results: (n: number, total: number) => string;

  fields: {
    fullName: string;
    birthDate: string;
    appointmentDate: string;
    createdAt: string;
    department: string;
    status: string;
    priority: string;
    bloodType: string;
    score: string;
    diagnosis: string;
    note: string;
    notes: string;
    tags: string;
    isInsured: string;
    isFollowUp: string;
    isVaccinated: string;
  };

  badges: {
    insured: string;
    followUp: string;
    vaccinated: string;
  };

  statusLabels: Record<PatientStatus, string>;
  priorityLabels: Record<PatientPriority, string>;

  modalAddTitle: string;
  modalEditTitle: string;
  required: string;
  yes: string;
  no: string;
  tagsHelp: string;
}

const tr: Strings = {
  appTitle: "Hasta Takip Sistemi",
  appSubtitle: "Poliklinik Hasta Randevu ve Takip Paneli",
  company: "Abisena / Panates",

  search: "Ara",
  searchPlaceholder: "Hasta adı veya tanıya göre ara…",
  filterByStatus: "Durum",
  allStatuses: "Tümü",
  sortBy: "Sırala",
  sortNewest: "Randevu — En Yeni",
  sortOldest: "Randevu — En Eski",
  sortNameAsc: "Ada Göre (A→Z)",
  sortScoreDesc: "Skor (Yüksek → Düşük)",

  newPatient: "Yeni Hasta",
  edit: "Düzenle",
  delete: "Sil",
  save: "Kaydet",
  cancel: "Vazgeç",
  confirmDelete: "Kaydı sil",
  confirmDeleteBody: (name) =>
    `"${name}" adlı hasta kaydını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,

  loading: "Hasta kayıtları yükleniyor…",
  errorTitle: "Veri alınamadı",
  errorRetry: "Tekrar dene",
  emptyTitle: "Sonuç bulunamadı",
  emptyBody: "Arama veya filtre kriterlerinizi değiştirmeyi deneyin.",

  results: (n, total) =>
    n === total ? `${total} kayıt` : `${n} / ${total} kayıt`,

  fields: {
    fullName: "Ad Soyad",
    birthDate: "Doğum Tarihi",
    appointmentDate: "Randevu Tarihi",
    createdAt: "Kayıt Tarihi",
    department: "Bölüm",
    status: "Durum",
    priority: "Öncelik",
    bloodType: "Kan Grubu",
    score: "Skor",
    diagnosis: "Tanı",
    note: "Not",
    notes: "Ek Not",
    tags: "Etiketler",
    isInsured: "Sigortalı",
    isFollowUp: "Takipte",
    isVaccinated: "Aşılı",
  },

  badges: {
    insured: "Sigortalı",
    followUp: "Takipte",
    vaccinated: "Aşılı",
  },

  statusLabels: {
    Bekliyor: "Bekliyor",
    Muayenede: "Muayenede",
    Tamamlandı: "Tamamlandı",
    İptal: "İptal",
  },
  priorityLabels: {
    acil: "Acil",
    normal: "Normal",
  },

  modalAddTitle: "Yeni Hasta Ekle",
  modalEditTitle: "Hastayı Düzenle",
  required: "Zorunlu alan",
  yes: "Evet",
  no: "Hayır",
  tagsHelp: "Virgülle ayırarak yazın (örn. kronik, alerji)",
};

const en: Strings = {
  appTitle: "Patient Tracking System",
  appSubtitle: "Outpatient Appointment & Follow-up Panel",
  company: "Abisena / Panates",

  search: "Search",
  searchPlaceholder: "Search by patient name or diagnosis…",
  filterByStatus: "Status",
  allStatuses: "All",
  sortBy: "Sort",
  sortNewest: "Appointment — Newest",
  sortOldest: "Appointment — Oldest",
  sortNameAsc: "By Name (A→Z)",
  sortScoreDesc: "Score (High → Low)",

  newPatient: "New Patient",
  edit: "Edit",
  delete: "Delete",
  save: "Save",
  cancel: "Cancel",
  confirmDelete: "Delete record",
  confirmDeleteBody: (name) =>
    `Are you sure you want to delete the record for "${name}"? This cannot be undone.`,

  loading: "Loading patient records…",
  errorTitle: "Could not fetch data",
  errorRetry: "Try again",
  emptyTitle: "No results",
  emptyBody: "Try adjusting your search or filter criteria.",

  results: (n, total) =>
    n === total ? `${total} records` : `${n} of ${total} records`,

  fields: {
    fullName: "Full Name",
    birthDate: "Date of Birth",
    appointmentDate: "Appointment Date",
    createdAt: "Created At",
    department: "Department",
    status: "Status",
    priority: "Priority",
    bloodType: "Blood Type",
    score: "Score",
    diagnosis: "Diagnosis",
    note: "Note",
    notes: "Additional Notes",
    tags: "Tags",
    isInsured: "Insured",
    isFollowUp: "Follow-up",
    isVaccinated: "Vaccinated",
  },

  badges: {
    insured: "Insured",
    followUp: "Follow-up",
    vaccinated: "Vaccinated",
  },

  statusLabels: {
    Bekliyor: "Waiting",
    Muayenede: "In Exam",
    Tamamlandı: "Completed",
    İptal: "Cancelled",
  },
  priorityLabels: {
    acil: "Urgent",
    normal: "Normal",
  },

  modalAddTitle: "Add New Patient",
  modalEditTitle: "Edit Patient",
  required: "Required field",
  yes: "Yes",
  no: "No",
  tagsHelp: "Comma-separated (e.g. chronic, allergy)",
};

export const STRINGS: Record<Lang, Strings> = { tr, en };
