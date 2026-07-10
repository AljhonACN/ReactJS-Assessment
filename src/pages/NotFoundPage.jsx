import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page-shell not-found-page">
      <div className="not-found-card">
        <p className="eyebrow">Page not found</p>
        <h1>404</h1>
        <p>
          The page you are looking for might have been moved or no longer
          exists.
        </p>
        <Link to="/" className="primary-button not-found-link">
          Back to contacts
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
