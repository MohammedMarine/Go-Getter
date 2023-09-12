import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/axios";
import RegisterField from "../Field/RegisterField";
import SuccessMessage from "../Message/SuccesMessage";
import ServerErrorMessage from "../Message/ServerErrorMessage";
import ErrorMessage from "../Message/ErrorMessage";
import InfinityLoading from "../Loading/InfinityLoading";

export default function Register({
  submitted,
  setSubmitted,
  error,
  setError,
  serverError,
  setServerError,
  message,
  setMessage,
}) {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirmation, setPwConfirmation] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
    setSubmitted(false);
  };
  const handleLastname = (e) => {
    setLastname(e.target.value);
    setSubmitted(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  const handlePwConfirmation = (e) => {
    setPwConfirmation(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      pwConfirmation === ""
    ) {
      setError(true);
      setMessage("Veuillez compléter tous les champs requis !");
    } else {
      setError(false);
      fetchdata();
    }
  };

  useEffect(() => {
    setError(false);
    setSubmitted(false);
    setServerError(false);
  }, [setError, setServerError, setSubmitted]);

  const fetchdata = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/register", {
        firstname,
        lastname,
        email,
        password,
        pwConfirmation,
      });
      if (res.data === "Compte correctement créé !") {
        setSubmitted(true);
        setMessage(
          "Merci de votre inscription, connectez vous dès à présent pour effectuer votre première demande !"
        );
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setPwConfirmation("");
        setLoading(false);
      } else {
        console.log(res.data);
        setError(true);
        setMessage(
          "Un problème est survenu, merci de réessayer ultérieurement !"
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setServerError(true);
      setMessage(
        "Un problème est survenu, merci de réessayer ultérieurement !"
      );
      setLoading(false);
    }
  };

  return loading ? (
    <InfinityLoading />
  ) : (
    <>
      <div className="messages m-10">
        <SuccessMessage submitted={submitted} message={message} />
        <ErrorMessage error={error} message={message} />
        <ServerErrorMessage serverError={serverError} message={message} />
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Prénom</span>
            </label>
            <RegisterField
              name="firstname"
              placeholder="Clément"
              value={firstname}
              onChange={handleFirstname}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <RegisterField
              name="lastname"
              placeholder="O'Clock"
              value={lastname}
              onChange={handleLastname}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <RegisterField
              name="email"
              placeholder="bossdesvosges@caramail.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <RegisterField
              name="password"
              type="password"
              placeholder="°°°°°°°°°°"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirmation</span>
            </label>
            <RegisterField
              name="pwConfirmation"
              type="password"
              placeholder="°°°°°°°°°°"
              value={pwConfirmation}
              onChange={handlePwConfirmation}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleSubmit}>
              S&apos;inscrire
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Register.propTypes = {
  submitted: PropTypes.bool,
  setSubmitted: PropTypes.func,
  error: PropTypes.bool,
  setError: PropTypes.func,
  serverError: PropTypes.bool,
  setServerError: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};
