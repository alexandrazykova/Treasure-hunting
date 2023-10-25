import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="align-items-centre">
      <h1>Oops!</h1>
      <p>Sorry, could not find treasures you were looking for</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
      <Link to="/">← Back to Products</Link>
    </div>
  );
}