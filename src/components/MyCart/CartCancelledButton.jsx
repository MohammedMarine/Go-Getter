import axiosInstance from "../../utils/axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


export default function CartCancelledButton({ id }) {
  // State to get the succes message of the delete cart
  const [notificationDelete, setNotificationDelete] = useState([]);
  const [redirection, setRedirection] = useState("");
  const navigate = useNavigate();

  // Fetch to get cancelled a cart
  const fetchData = async () => {
    try {
      const res = await axiosInstance.delete(`/carts/${id}`);
      setRedirection(res.data);
      setNotificationDelete(res.data);
      if (res.data) {
        window.my_modal_5.showModal();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRedirection = () => {
    if (redirection === "Panier supprimé avec succès") {
      navigate("/products-of-the-week");
    }
  };
  const handleSubmit = () => {
    fetchData();
  };

  return (
    <>
      {/* Make  */}
      <button
        className="btn btn-outline btn-accent"
        onClick={() => {
          handleSubmit();
        }}
      >
        Annuler le panier
      </button>

      <dialog id="my_modal_5" className="modal modal-middle">
        <form method="dialog" className="modal-box">
          <p className="py-4">{notificationDelete}</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn " onClick={handleRedirection}>
              Fermer
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

CartCancelledButton.propTypes = {
  id: PropTypes.number,
};
