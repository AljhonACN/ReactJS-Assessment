function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-bar">
      <label htmlFor="contact-search" className="visually-hidden">
        Search contacts
      </label>
      <input
        id="contact-search"
        type="search"
        className="search-bar__input"
        placeholder="Search by name, email, phone, or company..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby="search-status"
      />
      <span
        id="search-status"
        className="search-bar__status"
        aria-live="polite"
      >
        {value
          ? `${resultCount} ${resultCount === 1 ? "result" : "results"} found`
          : ""}
      </span>
    </div>
  );
}

export default SearchBar;
