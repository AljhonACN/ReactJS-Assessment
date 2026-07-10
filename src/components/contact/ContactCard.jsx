import { Link } from "react-router-dom";

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <div className="contact-card__content">
        <div className="contact-card__top">
          <span className="contact-badge">
            {contact.company?.name || "Company"}
          </span>
          <span
            className={`contact-status ${
              contact.status === "Inactive"
                ? "contact-status--inactive"
                : "contact-status--active"
            }`}
          >
            {contact.status || "Active"}
          </span>
        </div>

        <h3>
          <Link className="contact-card__link" to={`/contact/${contact.id}`}>
            {contact.name}
          </Link>
        </h3>

        <p className="contact-meta">Username: {contact.username}</p>
        <p className="contact-meta">Email: {contact.email}</p>
        <p className="contact-meta">Phone: {contact.phone}</p>
      </div>

      <div className="contact-card__actions">
        <button
          className="icon-button secondary-icon-button"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 17.25V21h3.75L17.81 8.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button
          className="icon-button danger-icon-button"
          onClick={() => onDelete(contact.id)}
          aria-label={`Delete ${contact.name}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7zm3 2v10H9V9h2zm4 0v10h-2V9h2zm-6-3h8V3H7v2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
