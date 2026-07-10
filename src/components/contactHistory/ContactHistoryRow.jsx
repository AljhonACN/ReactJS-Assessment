function ContactHistoryRow({ history }) {
  return (
    <tr>
      <td>{history.date}</td>
      <td>{history.type}</td>
      <td>{history.description}</td>
    </tr>
  );
}

export default ContactHistoryRow;
