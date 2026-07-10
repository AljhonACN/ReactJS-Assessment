import { useState, useEffect } from "react";
import ContactHistoryRow from "./ContactHistoryRow";

function ContactHistoryTable({ history }) {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 4;
  const totalPages = Math.ceil(history.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedHistory = history.slice(startIndex, startIndex + rowsPerPage);

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  // History pagination hotkeys — [ = previous, ] = next
  useEffect(() => {
    function handleHistoryHotkeys(event) {
      // Don't fire while typing in a field
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (event.key === "[") {
        event.preventDefault();
        goToPreviousPage();
      } else if (event.key === "]") {
        event.preventDefault();
        goToNextPage();
      }
    }

    window.addEventListener("keydown", handleHistoryHotkeys);
    return () => window.removeEventListener("keydown", handleHistoryHotkeys);
  }, [totalPages]);

  return (
    <div className="history-card">
      <h2 id="history-heading">Contact History</h2>

      {history.length === 0 ? (
        <p className="empty-state">No contact history found.</p>
      ) : (
        <>
          <table aria-labelledby="history-heading">
            <caption className="visually-hidden">
              A list of past interactions with this contact, including date,
              type, and description.
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
              </tr>
            </thead>

            <tbody>
              {paginatedHistory.map((item) => (
                <ContactHistoryRow key={item.id} history={item} />
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Contact history pagination">
              <button
                className="secondary-button"
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
                title="Previous page ( [ )"
                aria-label="Go to previous history page"
              >
                Previous
              </button>

              <span className="pagination__status" aria-live="polite">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="secondary-button"
                disabled={currentPage === totalPages}
                onClick={goToNextPage}
                title="Next page ( ] )"
                aria-label="Go to next history page"
              >
                Next
              </button>

              <span className="pagination__hint">
                Tip: press <kbd>"["</kbd> / <kbd>"]"</kbd> to switch pages
              </span>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default ContactHistoryTable;
