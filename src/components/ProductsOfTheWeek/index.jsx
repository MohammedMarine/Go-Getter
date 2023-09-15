import axiosInstance from "../../utils/axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfinityLoading from "../Loading/InfinityLoading";
import ErrorMessage from "../Message/ErrorMessage";
import PropTypes from "prop-types";


export default function ProductsOfTheWeek({error, setError, message, setMessage}) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [cart, setCart] = useState([Number]);


  // function to add the products selected to the getter's cart
  const handleList = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      //Add checked product into getter's list
      setCart([...cart, value]);
    } else {
      // Remove unchecked product from getter's list
      const removeProduct = cart.filter((item) => item !== value);
      setCart(removeProduct);
    }
  };

  const navigate = useNavigate();
  // useEffect to create the redirection to the component MyCart if the getter has already one cart
  useEffect(() => {
    const fetchCurrentCart = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/currentCart");
        if (res.data[0].status_id === 1) {
          navigate("/my-cart");
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCurrentCart();
  }, [navigate]);

  // Send the getter's cart to the back
  const createCart = async () => {
    try {
      const res = await axiosInstance.post("/carts", {
        productIds: cart,
      });
      if (res.data.status_id === 1) {
        navigate("/my-cart");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error.message);
    }
  };

  const handleSubmit = () => {
    createCart();
  };

  // call the products only at the mount
  useEffect(() => {
    // console.log(axiosInstance.defaults.headers.common["Authorization"]);
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/products");
        setLoading(false);
        setError(false);
        setProductsList(res.data);
      } catch (error) {
        console.log(error);
        //setError(true);
        setMessage(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setError, setMessage, user]);


  return loading ? (
    <InfinityLoading />
  ) : (
    <div>
      <ErrorMessage error={error} message={message} />
      <>
        <div className="">
          <div className="overflow-x-auto max-h-[45rem]">
            <table className="table">
              <thead>
                <tr>
                  <th>Produits de la semaine</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product) => (
                  <tr key={product.id}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={product.id}
                          onChange={handleList}
                        />
                      </label>
                    </th>
                    <td>{product.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => handleSubmit()}
            className="btn btn-outline btn-accent m-10"
          >
            Valider
          </button>
        </div>
      </>
    </div>
  );
}

ProductsOfTheWeek.propTypes = {
  error: PropTypes.bool,
  setError: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};