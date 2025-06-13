import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import VendorPage from "./pages/vendorPage.jsx";
import GuestCheckout from "./pages/guestCheckout";
// import SuccessPage from "./pages/successPage";
// import FailurePage from "./pages/failurePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:slug" element={<VendorPage />} />
      <Route path="/checkout" element={<GuestCheckout />} />
      {/* <Route path="/success" element={<SuccessPage />} />
      <Route path="/failure" element={<FailurePage />} /> */}
    </Routes>
  );
}
export default App;
