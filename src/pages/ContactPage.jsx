import { useEffect, useState } from "react";
import { getContacts } from "../api/contactApi";

function ContactPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function loadContacts() {
      const data = await getContacts();
      setContacts(data);
    }

    loadContacts();
  }, []);

  return <h1>Contact Information</h1>;
}

export default ContactPage;
