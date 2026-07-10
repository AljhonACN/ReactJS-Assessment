import ContactCard from "./ContactCard";

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

export default ContactList;
