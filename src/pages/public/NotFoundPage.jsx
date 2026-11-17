import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="static-page section">
      <div className="container narrow-container centered-copy">
        <span className="eyebrow">404</span>
        <h1>Page not found.</h1>
        <p>The page you are looking for may have moved or does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
