import { useRouteError, Link } from "react-router-dom";
import "../../Styles/Error.css";
import errorImg from "../../assets/error.gif";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <main className="error_container">
        <div>
          <h1 className="error_title">404</h1>
          <img src={errorImg} />
          <div className="message">
            <h1>Page Not Found</h1>
            <p>Sorry, we couldn't find the page you where looking for.</p>
            <p>We suggest that you return to homepage.</p>
            <div className="button">
              <Link to="/">Go back home</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  console.log(error);

  return (
    <main>
      <h4>there was an error... </h4>
    </main>
  );
};

export default Error;
