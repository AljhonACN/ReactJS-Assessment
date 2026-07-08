import { useParams } from "react-router-dom";

function ContactDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Contact Details</h1>
      <p>Contact ID: {id}</p>
    </>
  );
}

export default ContactDetailsPage;
