import { Link } from "react-router-dom";

function ContactTable({ contacts, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <Link to={`/contact/${contact.id}`} className="table-link">
                  {contact.name}
                </Link>
              </td>

              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.company?.name}</td>

              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
