import { useNavigate } from 'react-router-dom';
import '../styles/ErrorPage.scss'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card error-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Error 404 ! </h1>
          <p className="auth-card__subtitle">
          Page Not Found.
          </p>
        </div>
        <div className="auth-card__content">
          <button className="auth-form__submit" onClick={() => navigate('/')}>
            Go back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;