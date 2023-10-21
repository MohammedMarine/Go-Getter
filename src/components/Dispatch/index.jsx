import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { Link, Outlet } from "react-router-dom";
import InfinityLoading from "../Loading/InfinityLoading";
import PropTypes from "prop-types";
import ErrorMessage from "../Message/ErrorMessage";

export default function Dispatch({
  setSelectedCart,
  setCartId,
  error,
  setError,
  message,
  setMessage,
}) {
  const [allCarts, setAllCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Call to get all the carts and change as soon as there is a new cart created(dependencies array)
    const fetchCarts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/carts");
        setLoading(false);
        setAllCarts(res.data);
        setError(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        setError(true);
        setMessage(
          "Un problème est survenu, merci de réessayer ulterieurement !"
        );
      }
    };
    fetchCarts();
  }, [setAllCarts, setError, setMessage]);

  // Filter to get just the carts to dispatch (status1)
  const carts = allCarts.filter((cart) => cart.status_id === 1);

  return (
    <>
      <div className="hero min-h-[89vh] bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-1">
          <div className="card-body h-[35rem]">
            {loading ? (
              <div className="m-auto">
                <InfinityLoading />
              </div>
            ) : (
              <>
                {error && <ErrorMessage error={error} message={message} />}
                <>
                  <h2 className="sticky top-0 caption-top py-6 bg-eggshell ">
                    Panier à préparer
                  </h2>
                  <div className="overflow-auto w-[21rem] m-auto">
                    <table className="table-md md:table-lg ">
                      <tbody>
                        {carts.map((cart) => (
                          <tr key={cart.id}>
                            <td>
                              <div className="flex items-center space-x-3">
                                {cart.user.firstname} {cart.user.lastname}
                              </div>
                            </td>
                            <th>
                              <Link to={`/admin/dispatch/${cart.id}`}>
                                <button
                                  className="btn w-36"
                                  onClick={() => {
                                    // Both variable coming from the props, gonna be used in the CartDetails component
                                    setSelectedCart(cart.products);
                                    setCartId(cart.id);

                                    document
                                      .getElementById("my_modal_1")
                                      .showModal();
                                  }}
                                >
                                  Voir le panier
                                </button>
                              </Link>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              </>
            )}
          </div>
        </div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Outlet />
        </div>
      </div>
    </>
  );
}

Dispatch.propTypes = {
  setSelectedCart: PropTypes.func,
  setCartId: PropTypes.func,
  error: PropTypes.bool,
  setError: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func
};
