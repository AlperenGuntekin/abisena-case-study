import { useI18n } from "../i18n/I18nContext";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  body: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  title,
  body,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const { t } = useI18n();
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <p className="confirm__body">{body}</p>
      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          {t.cancel}
        </button>
        <button type="button" className="btn btn--danger" onClick={onConfirm}>
          {t.delete}
        </button>
      </div>
    </Modal>
  );
}
