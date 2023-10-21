import axiosInstance from "../../utils/axios";
import { useEffect, useState } from "react";
//import CartCancelled from "./CartCancelled/CartCancelled";
import InfinityLoading from "../Loading/InfinityLoading";
import ErrorMessage from "../Message/ErrorMessage";
import Header from "../Header";
import CartCancelledButton from "./CartCancelledButton";
import Status from "../Status"
import PropTypes from "prop-types";

export default function MyCart({ error, setError, message, setMessage }) {
  // State to set get the currentcart + the id of the cart to be able to delete it
  const [myCart, setMyCart] = useState([]);
 const [cancelCart, setCartCancelled] = useState(Number);
  const [loading, setLoading] = useState(false);
  const [cartInfo, setCartInfo] = useState("");

  useEffect(() => {
    const fetchMyCart = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/currentcart`);
        setLoading(false);
        setError(false);
        setCartCancelled(res.data[0].id);
        setMyCart(res.data[0].products);
        setCartInfo(res.data[0].message);
      } catch (error) {
        setError(true);
        setMessage(
          "Un problème est survenu, merci de réessayer ultérieurement."
        );
        setLoading(false);
      }
      // res.data[0], to get the object current cart
    };
    fetchMyCart();
  }, [setError, setMessage]);

  return (
    <>
      <Header />
      <div className="hero min-h-[89vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <><div className="sm:m-16">
            {cartInfo && <div className="alert alert-info mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{cartInfo}</span>
            </div>}
            {!error && <Status />}

          </div><div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                {loading ? (
                  <div className="m-auto">
                    <InfinityLoading />
                  </div>
                ) : (
                  <>
                    {error && <ErrorMessage error={error} message={message} />}
                    <>
                      {!error && (
                        <table className="table-lg table-zebra text-left border black-border ">
                          <h2 className=" sticky top-0 caption-top py-6  bg-eggshell text-center">
                            Votre sélection de la semaine
                          </h2>
                          <tbody>
                            {myCart.map((product) => (
                              <tr key={product.id}>
                                <td>{product.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </>
                  </>
                )}
                {!error && <CartCancelledButton id={cancelCart} />}
              </div>
            </div></>
        </div>
      </div>
    </>
  );
}

MyCart.propTypes = {
  error: PropTypes.bool,
  setError: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};