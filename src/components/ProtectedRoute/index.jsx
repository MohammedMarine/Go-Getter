import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const isLogged = useSelector((state) => state.user.logged);
  const role = useSelector((state) => state.user.role);
  console.log(roles);

  let location = useLocation();

  if (!isLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  //vérification du role de l'utilisateur pour autoriser la route
  if (roles != undefined && !roles.includes(role)) {
    return <h1>401-unauthorized</h1>;
  }
  return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.any,
  roles: PropTypes.any,
}
//RAPPEL POUR TP: Expliquer ce composant en parlant de la sécurité de l'application (Guard component)
