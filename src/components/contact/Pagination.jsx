function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="secondary-button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        title="Previous page ( [ )"
        aria-label="Go to previous page"
      >
        Previous
      </button>

      <span className="pagination__status" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="secondary-button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        title="Next page ( ] )"
        aria-label="Go to next page"
      >
        Next
      </button>

      <span className="pagination__hint">
        Tip: press <kbd>"["</kbd> / <kbd> "]"</kbd> to switch pages
      </span>
    </nav>
  );
}

export default Pagination;
