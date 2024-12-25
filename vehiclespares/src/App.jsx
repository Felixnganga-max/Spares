import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react"; // Import useState for managing login popup state
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Collections from "./pages/Collections/Collections";
import AboutUs from "./pages/AboutUs/AboutUs";
import Brands from "./pages/Brands/Brands";
import Navbar from "./components/Navbar/Navbar";
import Nav from "./components/Nav/Nav";
import MyOrders from "./pages/MyOrders/MyOrders";
import Product from "./pages/Product/Product";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import FilterAndProductDisplay from "./pages/FilterAndProductDisplay/FilterAndProductDisplay";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import AddSparePart from "./components/AddSparePart/AddSparePart.JSX";
import AdminProductList from "./components/AdminProductList/AdminProductList";
import AdminPage from "./pages/AdminPage/AdminPage";
import Verify from "./pages/Verify/Verify";

function App() {
  const location = useLocation();
  
  const [showLogin, setShowLogin] = useState(false); // State to control login popup visibility

  return (
    <>
      <Navbar />
      {location.pathname !== "/admin" && <Nav setShowLogin={setShowLogin} />} {/* Pass setShowLogin to Nav */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collections" element={<FilterAndProductDisplay />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/order" element={<Cart />} />
        <Route path="/verify" element={<Verify />} /> 
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        
        {/* Remove the /login route as it's no longer needed */}
        {/* <Route path="/login" element={<LoginPopUp setShowLogin={setShowLogin} />} /> */}
        
        <Route path="/add" element={<AddSparePart />} />
        <Route path="/list" element={<AdminProductList />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      {/* Render Footer only if not on the /admin page */}
      {location.pathname !== "/admin" && <Footer />}

      {/* Conditionally render LoginPopUp if showLogin is true */}
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
    </>
  );
}

export default App;
