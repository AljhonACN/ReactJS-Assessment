import { useEffect, useState } from "react";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../api/contactApi";

import ContactList from "../components/contact/ContactList";
import ContactForm from "../components/contact/ContactForm";
import ContactTable from "../components/contact/ContactTable";
import ViewToggle from "../components/contact/ViewToggle";
import Pagination from "../components/contact/Pagination";
import SearchBar from "../components/contact/SearchBar";
import Modal from "../components/common/Modal";
import Toast from "../components/contact/Toast";

function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const cardsPerPage = 6;

  // Filter contacts by name, email, phone, or company (searching = Read)
  const query = search.trim().toLowerCase();
  const queryDigits = query.replace(/[\s-]/g, "");
  const filteredContacts = query
    ? contacts.filter((contact) => {
        const name = contact.name?.toLowerCase() || "";
        const email = contact.email?.toLowerCase() || "";
        const phone = contact.phone?.toLowerCase() || "";
        const company =
          (typeof contact.company === "string"
            ? contact.company
            : contact.company?.name
          )?.toLowerCase() || "";

        // Match phone ignoring spaces/dashes (e.g. "09171234567")
        const phoneDigits = phone.replace(/[\s-]/g, "");

        return (
          name.includes(query) ||
          email.includes(query) ||
          company.includes(query) ||
          phone.includes(query) ||
          (queryDigits && phoneDigits.includes(queryDigits))
        );
      })
    : contacts;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / cardsPerPage),
  );
  const startIndex = (currentPage - 1) * cardsPerPage;
  const pagedContacts = filteredContacts.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  async function loadContacts() {
    try {
      const data = await getContacts();
      setContacts(data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  // Reset to page 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    function handlePageHotkeys(event) {
      // Don't fire while a modal/form is open
      if (showForm || deleteTarget) return;

      // Don't fire while typing in a field
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // Open the Add Contact form — press "n"
      if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        handleAddClick();
        return;
      }

      // Pagination
      if (event.key === "[") {
        event.preventDefault();
        goToPreviousPage();
      } else if (event.key === "]") {
        event.preventDefault();
        goToNextPage();
      }
    }

    window.addEventListener("keydown", handlePageHotkeys);
    return () => window.removeEventListener("keydown", handlePageHotkeys);
  }, [showForm, deleteTarget, totalPages]);

  async function handleCreateContact(contact) {
    try {
      await createContact(contact);
      await loadContacts();
      setShowForm(false);
      setSelectedContact(null);
      setToast("Contact added successfully.");
    } catch (error) {
      console.error(error);
      setToast("Unable to add contact.");
    }
  }

  async function handleUpdateContact(contact) {
    try {
      await updateContact(selectedContact.id, contact);
      await loadContacts();
      setShowForm(false);
      setSelectedContact(null);
      setToast("Contact updated successfully.");
    } catch (error) {
      console.error(error);
      setToast("Unable to update contact.");
    }
  }

  function handleDeleteContact(id) {
    setDeleteTarget(id);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    try {
      await deleteContact(deleteTarget);
      await loadContacts();
      setToast("Contact deleted successfully.");
    } catch (error) {
      console.error(error);
      setToast("Unable to delete contact.");
    } finally {
      setDeleteTarget(null);
    }
  }

  function handleAddClick() {
    setSelectedContact(null);
    setShowForm(true);
  }

  function handleEditClick(contact) {
    setSelectedContact(contact);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setSelectedContact(null);
  }

  function closeDeleteModal() {
    setDeleteTarget(null);
  }

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  if (loading) {
    return (
      <div className="page-shell">
        <h1>Loading contacts...</h1>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        <div>
          <h1>Contact Information</h1>
        </div>
        <button
          className="primary-button"
          onClick={handleAddClick}
          title="Add new contact (N)"
        >
          Add New Contact
        </button>
      </header>

      <p className="page-intro">
        View and manage your contacts in a simple card or table layout.
      </p>

      <div className="list-toolbar">
        <SearchBar
          value={search}
          onChange={setSearch}
          resultCount={filteredContacts.length}
        />
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {showForm && (
        <Modal
          title={selectedContact ? "Edit Contact" : "Add Contact"}
          onClose={handleCancel}
        >
          <ContactForm
            initialValues={selectedContact}
            existingContacts={contacts}
            onSubmit={
              selectedContact ? handleUpdateContact : handleCreateContact
            }
            onCancel={handleCancel}
            buttonText={selectedContact ? "Save Changes" : "Add Contact"}
          />
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete Contact" onClose={closeDeleteModal} small>
          <p>Are you sure you want to delete this contact?</p>
          <div className="form-actions">
            <button className="secondary-button" onClick={closeDeleteModal}>
              Cancel
            </button>
            <button className="danger-button" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </Modal>
      )}

      <Toast message={toast} onClose={() => setToast(null)} />

      {filteredContacts.length === 0 ? (
        <p className="empty-state">
          {search ? `No contacts match "${search}".` : "No contacts found."}
        </p>
      ) : (
        <>
          {viewMode === "table" ? (
            <ContactTable
              contacts={pagedContacts}
              onEdit={handleEditClick}
              onDelete={handleDeleteContact}
            />
          ) : (
            <div className="contact-list">
              <ContactList
                contacts={pagedContacts}
                onEdit={handleEditClick}
                onDelete={handleDeleteContact}
              />
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
          />
        </>
      )}
    </div>
  );
}

export default ContactPage;
