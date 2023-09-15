import { useState } from "react";
import Login from "../Login";
import Register from "../Register";
import Logo from "../../assets/img/Logo_GoGetter.png";
import PropTypes from "prop-types";

const LoginPage = ({ error, setError, message, setMessage }) => {
  const [isActive, setIsActive] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleClick = (isActive) => {
    setIsActive(isActive);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <img src={Logo} alt="Logo Go/Getter" />
          <div className="stats shadow lg:ml-28">
            <div className="stat place-items-center">
              <div className="stat-title">Denrées récoltées</div>
              <div className="stat-value">6,3 T</div>
              <div className="stat-desc">Depuis 2020</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Getter</div>
              <div className="stat-value text-secondary">4,200</div>
              <div className="stat-desc text-secondary">↗︎ 400 (20%)</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Paniers distribués</div>
              <div className="stat-value">655200</div>
              <div className="stat-desc">↗︎ 90 (14%)</div>
            </div>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
          <div className="">
            <button onClick={() => handleClick(true)}>Se connecter</button>
            <button onClick={() => handleClick(false)}>S&apos;inscrire</button>
          </div>
          {isActive && (
            <Login
              text={"Se connecter"}
              error={error}
              setError={setError}
              message={message}
              setMessage={setMessage}
            />
          )}
          {!isActive && (
            <Register
              text={"S'inscire"}
              submitted={submitted}
              setSubmitted={setSubmitted}
              error={error}
              setError={setError}
              serverError={serverError}
              setServerError={setServerError}
              message={message}
              setMessage={setMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

LoginPage.propTypes = {
  error: PropTypes.bool,
  setError: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};