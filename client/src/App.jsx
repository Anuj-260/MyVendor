import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import VendorPage from "./pages/vendorPage.jsx";
import GuestCheckout from "./pages/guestCheckout";
import VendorHamburger from "./components/Hamburger.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<VendorPage />} />
        <Route path="/checkout" element={<GuestCheckout />} />
      </Routes>
    </>
  );
}
export default App;
