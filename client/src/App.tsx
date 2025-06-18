import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VendorPage from "./pages/vendorPage";
import GuestCheckout from "./pages/guestCheckout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:slug" element={<VendorPage />} />
      <Route path="/checkout" element={<GuestCheckout />} />
    </Routes>
  );
}

export default App;
