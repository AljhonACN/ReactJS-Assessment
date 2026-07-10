import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContact } from "../api/contactApi";
import { getContactHistoryByContactId } from "../api/contactHistoryApi";
import ContactHistoryTable from "../components/contactHistory/ContactHistoryTable";

function ContactDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(false);

        const contactData = await getContact(id);
        const historyData = await getContactHistoryByContactId(id);

        if (!contactData) {
          setError(true);
          return;
        }

        setContact(contactData);
        setHistory(historyData || []);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  // Press Escape to go back to the contact list
  useEffect(() => {
    function handleKeyDown(event) {
      // Don't fire while typing in a field
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (event.key === "Escape") {
        event.preventDefault();
        navigate(-1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="empty-state">Loading contact details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="not-found-page">
        <div className="not-found-card">
          <h1>404</h1>

          <p>Contact not found or JSON Server is not running.</p>

          <button className="primary-button" onClick={() => navigate("/")}>
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Contact Profile</p>
          <h1 className="details-name">{contact.name}</h1>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate(-1)}
          title="Back (Esc)"
          aria-label="Go back to contacts"
        >
          Back
        </button>
      </header>

      <div className="details-card">
        <div className="details-section">
          <h2>Basic Info</h2>

          <p>
            <strong>Username:</strong> {contact.username || "Not provided"}
          </p>

          <p>
            <strong>Email:</strong> {contact.email || "Not provided"}
          </p>

          <p>
            <strong>Phone:</strong> {contact.phone || "Not provided"}
          </p>

          <p>
            <strong>Website:</strong> {contact.website || "Not provided"}
          </p>

          <p>
            <strong>Status:</strong> {contact.status || "Active"}
          </p>
        </div>

        <div className="details-section">
          <h2>Address</h2>

          <p>{contact.address?.street || "Not provided"}</p>
          <p>{contact.address?.suite || "Not provided"}</p>
          <p>{contact.address?.city || "Not provided"}</p>
          <p>{contact.address?.zipcode || "Not provided"}</p>
        </div>

        {/* <div className="details-section">
          <h2>Location</h2>

          <p>
            <strong>Lat:</strong> {contact.address?.geo?.lat || "Not provided"}
          </p>

          <p>
            <strong>Lng:</strong> {contact.address?.geo?.lng || "Not provided"}
          </p>
        </div> */}

        <div className="details-section">
          <h2>Company</h2>

          <p>{contact.company?.name || "Not provided"}</p>

          <p>{contact.company?.catchPhrase || "Not provided"}</p>

          <p>{contact.company?.bs || "Not provided"}</p>
        </div>
      </div>

      <ContactHistoryTable history={history} />
    </div>
  );
}

export default ContactDetailsPage;
