import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <div className="footer-links">
        <a href="/Signup">Sell with Us</a>
          <span className="spacer"> | </span>
          <span>📞 Customer Service: +123-456-7890</span>
          <span className="spacer"> | </span>
          <a href="/OrderHistory">Order Status</a>
        </div>
     
        <span>&copy; {new Date().getFullYear()} - Treasure Hunters</span>
      </div>
    </footer>
  );
};

export default Footer;
