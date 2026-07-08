function ContactCard({ contact }) {
  return (
    <div>
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
    </div>
  );
}

export default ContactCard;
