import { useI18n } from "../i18n/I18nContext";

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export function Header() {
  const { t, lang, toggleLang } = useI18n();

  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo" aria-hidden>
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
          >
            <path
              d="M16 4v24M4 16h24M10 10l12 12M22 10L10 22"
              stroke="#b8131f"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
            <circle cx="16" cy="16" r="3.2" fill="#b8131f" />
          </svg>
        </div>
        <div className="header__titles">
          <p className="header__company">{t.company}</p>
          <h1 className="header__title">{t.appTitle}</h1>
          <p className="header__subtitle">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="header__actions">
        <div className="header__form-no">
          <div>{t.dossierLabel}</div>
          <div>
            <strong>{todayKey()}</strong>
          </div>
        </div>
        <button
          type="button"
          className="lang-toggle"
          onClick={toggleLang}
          aria-label="Change language"
        >
          <span className={lang === "tr" ? "is-active" : ""}>TR</span>
          <span className="lang-toggle__sep">/</span>
          <span className={lang === "en" ? "is-active" : ""}>EN</span>
        </button>
      </div>
    </header>
  );
}
