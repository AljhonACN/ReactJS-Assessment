function ContactList({ contacts }) {
  return (
    <>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <h3>{contact.name}</h3>
        </div>
      ))}
    </>
  );
}

export default ContactList;
