import { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useContext(AppContext);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-linear-to-b from-violet-50 via-white to-teal-50">
      <div className="px-4 sm:px-10 md:px-14 lg:px-28">
        <Navbar />
      </div>

      {showLogin && <Login />}

      <Routes>
        <Route
          path="/"
          element={
            <div className="px-4 sm:px-10 md:px-14 lg:px-28">
              <Home />
            </div>
          }
        />
        <Route
          path="/result"
          element={
            <div className="px-4 sm:px-10 md:px-14 lg:px-28">
              <Result />
            </div>
          }
        />
        <Route
          path="/buy"
          element={
            <div className="px-4 sm:px-10 md:px-14 lg:px-28">
              <BuyCredit />
            </div>
          }
        />
      </Routes>

      <div className="px-4 sm:px-10 md:px-14 lg:px-28">
        <Footer />
      </div>
    </div>
  );
};

export default App;
