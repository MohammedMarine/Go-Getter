import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, changeField } from "../../store/actions/userActions";
import LoginField from "../Field/LoginField";
import ErrorMessage from "../Message/ErrorMessage";
import { useEffect } from "react";

const Login = ({ error, setError, message, setMessage }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const isLogged = useSelector((state) => state.user.logged);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    setError(false)
    if (isLogged && role === "user") {
      navigateTo("/products-of-the-week");
    }
    if (isLogged && role === "admin") {
      navigateTo("/admin/add-product");
    }
  }, [isLogged, navigateTo, role, setError]);

  const { email, password } = useSelector((state) => state.user.credentials);
  const loginFailed = useSelector((state) => state.user.error);

//Issue: the error message appears after submitting the form twice
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === ""){
        setError(true);
        setMessage("Merci de compléter tous les champs !")
    } else {
     dispatch(login());
     setError(loginFailed)
     setMessage("Un problème est survenu, veuillez réessayer ulterieurement !")
    }
  };

  const onChangeField = (value, name) => {
    dispatch(changeField({ value, name }));
  };

  return (
    <>
      {!isLogged && (
        <>
          <div className="messages m-2">
            <ErrorMessage error={error} message={message} />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body p-0">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <LoginField
                  name="email"
                  placeholder="go@getter.com"
                  onChange={onChangeField}
                  value={email}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mot de passe</span>
                </label>
                <LoginField
                  name="password"
                  type="password"
                  placeholder="°°°°°°°°°°"
                  onChange={onChangeField}
                  value={password}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Mot de passe oublié?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;

Login.propTypes = {
  error: PropTypes.bool,
  setError: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};
