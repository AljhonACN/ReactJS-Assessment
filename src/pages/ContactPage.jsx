import { useEffect } from "react";
import { getContacts } from "../api/contactApi";

function ContactPage() {
  useEffect(() => {
    async function loadContacts() {
      const contacts = await getContacts();
      console.log(contacts);
    }

    loadContacts();
  }, []);

  return <h1>Contact Information</h1>;
}

export default ContactPage;
