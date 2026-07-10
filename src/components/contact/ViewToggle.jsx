function ViewToggle({ viewMode, onChange }) {
  return (
    <div className="toolbar">
      <div
        className="view-toggle"
        role="tablist"
        aria-label="Contact view options"
      >
        <button
          className={
            viewMode === "cards"
              ? "view-toggle__button active"
              : "view-toggle__button"
          }
          onClick={() => onChange("cards")}
          aria-label="Show cards"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          </svg>
        </button>
        <button
          className={
            viewMode === "table"
              ? "view-toggle__button active"
              : "view-toggle__button"
          }
          onClick={() => onChange("table")}
          aria-label="Show table"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4h16v4H4zM4 10h16v10H4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ViewToggle;
