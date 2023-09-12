import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
