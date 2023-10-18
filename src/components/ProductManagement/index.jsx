import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import InfinityLoading from "../Loading/InfinityLoading";
import ErrorMessage from "../Message/ErrorMessage";
import PropTypes from "prop-types";

export default function ProductManagement({ error, setError, message, setMessage }) {
  const [products, setProducts] = useState([]);
  const [itemsToDelete, setItemstoDelete] = useState([]);
  const [noProduct, setNoProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [newProductId, setNewProductId] = useState("");

  const addProductToDatabase = async (product) => {
    try {
      const res = await axiosInstance.post("/products", product);
      console.log("Product added to the database:", res.data);
      setList([...list, res.data]);
      if (res) {
        fetchdata();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newProduct.trim() !== "" && newProductId.trim() !== "") {
      // Add the new product to the database
      addProductToDatabase({ name: newProduct, tagId: newProductId });
      // Clear the input field
      setNewProduct("");
      setNewProductId("");
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/products");
        if (!res.data.length) {
          setLoading(false);
          setNoProduct(true);
          setError(true);
          setMessage("Ajouter un premier produit à votre liste");
        } else {
          setProducts(res.data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setMessage(
          "Veuillez recharger la page afin d'afficher la liste de produits ou réessayer ultérieurement"
        );
        setLoading(false);
      }
    };
    fetchdata();
  }, [setError, setMessage]);

  const handleList = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setItemstoDelete([...itemsToDelete, value]);
    } else {
      const removeProduct = itemsToDelete.filter((item) => item !== value);
      setItemstoDelete(removeProduct);
    }
  };

  const deleteProducts = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.delete("/products", {
        data: { productIds: itemsToDelete },
      });
      if (res.data.message === "Produits supprimés avec succès.") {
        setLoading(false);
        setError(false);
      } else {
        console.log(res);
        setError(true);
        setMessage(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setError(true);
      setMessage(
        "Le produit n'a pu être supprimé, veuillez réessayer ultérieurement !"
      );
      setLoading(false);
    }
  };

  const fetchdata = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
      setNoProduct(res.data.length === 0); // Mettre à jour noProduct en fonction de la longueur des données
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(
        "Veuillez recharger la page afin d'afficher la liste de produits ou réessayer ultérieurement"
      );
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (itemsToDelete.length > 0) {
      await deleteProducts();
      await fetchdata();
    } else {
      setNoProduct(true); // Afficher le message "Ajouter un premier produit"
    }
  };

  const deleteButton = () => {
    return (
      <button
        onClick={handleDelete}
        className="btn btn-outline btn-error w-52"
        style={{ display: noProduct === false ? "" : "none" }}
      >
        SUPPRIMER PRODUIT
      </button>
    );
  };

  const addProductButton = () => {
    return (
      <button
        className="btn btn-outline btn-info "
        style={{ display: noProduct === true ? "" : "none" }}
      >
        ADD PRODUCT
      </button>
    );
  };
  return (
    <>
      <div className="hero min-h-[89vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <form
              onSubmit={handleAdd}
              className="flex flex-col items-center md:ml-10"
            >
              <input
                placeholder="Nom du produit"
                type="text"
                className="input input-bordered w-52 mt-4"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
              />
              <select
                value={newProductId}
                onChange={(e) => setNewProductId(e.target.value)}
                className="select select-bordered md:w-full md:max-w-xs w-52 mt-4"
              >
                <option disabled value="">
                  Catégories
                </option>
                <option value={"1"}>Alimentaire</option>
                <option value={"2"}>Hygiène</option>
                <option value={"3"}>Divers</option>
              </select>
              <button
                type="submit"
                className="btn btn-primary mt-4 md:max-w-xs w-52"
              >
                AJOUTER
              </button>
            </form>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <ErrorMessage error={error} message={message} />
            <div className="card-body h-[30rem]">
              {loading ? (
                <div className="m-auto">
                  <InfinityLoading />
                </div>
              ) : (
                <div className="overflow-auto ">
                  <table className="table-xs md:table-lg table-zebra md:text-left">
                    <tbody>
                      {products.map((product) => (
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
              )}
            </div>
            <div className="mt-10 m-auto">
              {deleteButton()}
              {addProductButton()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProductManagement.propTypes = {
  error: PropTypes.bool,
  setError: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};
