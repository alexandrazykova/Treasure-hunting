import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/addProduct">Sell Treasure</Link>  {/* Add Product link for signed-in users */}
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="mx-1">
          <Link as={Link} to='/savedProducts'>Favorite Products
          </Link>
          </li>
          <li className="mx-1">
          <Link className="text-danger"as={Link} to='/'>Sale
          </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1 className="ml-2">
        <Link to="/">
          Treasure Hunting
        </Link>
      </h1>

      <nav className="flex-row">
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;