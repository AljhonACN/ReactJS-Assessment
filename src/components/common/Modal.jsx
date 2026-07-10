import { useEffect, useRef } from "react";

function Modal({ title, onClose, children, small = false }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const container = modalRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement;

    function getFocusable() {
      return Array.from(
        container.querySelectorAll("button, input, select, textarea, a[href]"),
      ).filter((el) => !el.disabled && el.offsetParent !== null);
    }

    getFocusable()[0]?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!container.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className={small ? "modal-card modal-card--small" : "modal-card"}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.3 5.71 12 12.01 5.7 5.71 4.29 7.12l6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
