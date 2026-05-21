import { useI18n } from "../i18n/I18nContext";

export function Header() {
  const { t, lang, toggleLang } = useI18n();

  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo" aria-hidden>
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
          >
            <rect x="2" y="2" width="28" height="28" rx="6" fill="#e11d2e" />
            <path
              d="M16 9v14M9 16h14"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="header__titles">
          <p className="header__company">{t.company}</p>
          <h1 className="header__title">{t.appTitle}</h1>
          <p className="header__subtitle">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="header__actions">
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
