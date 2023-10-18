import PropTypes from "prop-types";
import axiosInstance from "../../../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Both props coming from the GetCarts component
export default function CartDetails({ products, cartId }) {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  console.log(cartId);

  const sendStatusOk = async () => {
    try {
      const res = await axiosInstance(`/carts/${cartId}`, {
        method: "PATCH",
        //Send the status and the message to the back to move the cart into the "Prêt à être récupéré" phase for the getter
        data: {
          message: inputValue,
          statusId: 2,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitOk = () => {
    sendStatusOk();
  };

  // Redirect to this URL when the cart is done
  const redirectOk = async () => {
    await sendStatusOk();
    navigate("/admin/dispatch");
  };

  const sendStatusNotOk = async () => {
    try {
      const res = await axiosInstance(`/carts/${cartId}`, {
        // Patch, to be able to acces to the history of the cart
        method: "PATCH",
        // Send the status and message to the back, the getter will have the opportunity to make his cart once again
        data: {
          message: inputValue,
          statusId: 3,
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectNotOk = async () => {
    await sendStatusNotOk();
    navigate("/admin/dispatch");
  };

  const handleSubmitNotOk = () => {
    sendStatusNotOk();
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
          <div className="mt-10 m-auto">
            {/* Input to get the message of the asso, who's gonna be sent to the back*/}
            <input
              className="border p-3 rounded "
              type="text"
              placeholder="Votre message içi..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <form method="dialog" className="m-auto">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              {/* if there is a button in form, it will close the modal */}

              <button
                className="btn btn-success m-2"
                onClick={() => {
                  handleSubmitOk();
                  redirectOk();
                }}
              >
                VALIDER
              </button>
              <button
                className="btn btn-error "
                onClick={() => {
                  handleSubmitNotOk();
                  redirectNotOk();
                }}
              >
                REFUSER
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

CartDetails.propTypes = {
  products: PropTypes.array,
  cartId: PropTypes.number,
};
