import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProvider from "./Store/UserContext";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Products from "./Pages/Products/Products";
import HomeSection from "./Components/HomeSection/HomeSection";
import ProductDescription from "./Pages/ProductDescripion/ProductDescription";
import Cart from "./Pages/Cart/Cart";
import Support from "./Pages/Support/Support";
import Profile from "./Pages/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Checkout from "./Pages/Checkout/Checkout";
import Orders from "./Pages/Orders/Orders";

function App() {
  return (
    <UserProvider>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}>
              <Route index element={<HomeSection />} />
              <Route path="/products/:category" element={<Products />} />
              <Route
                path="/products/:category/:productId"
                element={<ProductDescription />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/support" element={<Support />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          style={{ width: "auto" }}
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </UserProvider>
  );
}

export default App;
