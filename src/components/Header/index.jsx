import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/userActions";
import logo_header from "../../assets/img/logo_header.png";
import "semantic-ui-css/semantic.min.css";

function Header() {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown n">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Gérer la liste de Produits</a>
              </li>
              <li>
                <a>Panier à préparer</a>
              </li>
              <li>
                <a>Valider un Pick Up</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img src={logo_header} alt="Logo Go/Getter" />
        </div>
        <div className="navbar-end">
          <button
            type="button"
            className="mr-5 hidden md:block bg-purple-400 text-green-100"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
          <div className="mr-5 md:hidden" onClick={handleLogout}>
            <i className="power off icon "></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
