import PropTypes from "prop-types";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function CartToPickUp({ products, cartId }) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    axiosInstance(`/carts/${cartId}`, {
      method: "PATCH",

      data: {
        message: "Panier récupéré",
        statusId: 4,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const redirect = async () => {
    await handleSubmit();
    navigate("/admin/pickup");
  };
  return (

      <>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <table className="table-lg table-zebra m-auto">
              <tbody>
                {products.map((cart) => (
                  <tr key={cart.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        {cart.name}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-action">
              <form method="dialog" className="m-auto">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                {/* if there is a button in form, it will close the modal */}

                <button
                  className="btn btn-success m-2"
                  onClick={() => {
                   handleSubmit();
                   redirect();
                  }}
                >
                  PICKED UP
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>

  );
}

CartToPickUp.propTypes = {
  products: PropTypes.array,
  cartId: PropTypes.number,
};
