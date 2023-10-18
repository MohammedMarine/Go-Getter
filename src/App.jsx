import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import ProductsOfTheWeek from "./components/ProductsOfTheWeek";
import MyCart from "./components/MyCart";
import ProductManagement from "./components/ProductManagement";
import "./App.css";
import AdminPage from "./components/AdminPage";
import GetCarts from "./components/GetCarts";
import CartDetails from "./components/GetCarts/CartDetails/CartDetails";
//import Header from "./components/Header";

function App() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedCart, setSelectedCart] = useState([]);
  const [cartId, setCartId] = useState(Number);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              error={error}
              setError={setError}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/products-of-the-week/*"
          element={
            <ProtectedRoute roles={["user"]}>
              <ProductsOfTheWeek
                error={error}
                setError={setError}
                message={message}
                setMessage={setMessage}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-cart"
          element={
            <ProtectedRoute roles={["user"]}>
              <MyCart
                error={error}
                setError={setError}
                message={message}
                setMessage={setMessage}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route
            path="add-product"
            element={
              <ProductManagement
                error={error}
                setError={setError}
                message={message}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path="dispatch"
            element={
              <GetCarts
                setSelectedCart={setSelectedCart}
                setCartId={setCartId}
                error={error}
                setError={setError}
                message={message}
                setMessage={setMessage}
              />
            }
          >
            <Route
              path=":id"
              element={<CartDetails products={selectedCart} cartId={cartId} />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
