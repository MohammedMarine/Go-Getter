import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import ProductsOfTheWeek from "./components/ProductsOfTheWeek";

import "./App.css";
import Header from "./components/Header";

function App() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
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
              <Header />
              <ProductsOfTheWeek
                error={error}
                setError={setError}
                message={message}
                setMessage={setMessage}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
