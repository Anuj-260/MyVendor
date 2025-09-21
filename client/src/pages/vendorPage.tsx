import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "../components/menuItem";
import Cart from "../components/cart";
import VendorHamburger from "../components/Hamburger";
import { RootState, AppDispatch } from "../redux/store";
import {
  addToCart,
  updateQty,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { Vendor } from "../types";

function VendorPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [error, setError] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/vendors/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Vendor not found");
        return res.json();
      })
      .then((data) => {
        setVendor(data.vendor);
        setError(false);
      })
      .catch(() => setError(true));
  }, [slug]);

  if (error) return <h2>Vendor Not Found</h2>;
  if (!vendor) return <h2>Loading...</h2>;

  return (
    <div className="vendor-container">
      <VendorHamburger Vendor={vendor} />
      <div className="vendor-header">
        {vendor.logo && (
          <img className="vendor-logo" src={vendor.logo} alt={vendor.name} />
        )}
        <h1 className="vendor-name">{vendor.name}</h1>
        <h2 className="back-link">
          <Link className="link" to="/">
            Back
          </Link>
        </h2>
      </div>

      <div className="menu-grid">
        {vendor.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onAdd={() => dispatch(addToCart(item))}
          />
        ))}
      </div>

      <Cart
        cart={cart}
        onUpdateQty={(id, change) => dispatch(updateQty({ id, change }))}
        onRemove={(id) => dispatch(removeFromCart(id))}
        onTotalChange={setCartTotal}
      />

      <div
        style={{ textAlign: "center", maxWidth: "900px", marginTop: "40px" }}
      >
        <button
          className="navigate-btn"
          onClick={() =>
            navigate("/checkout", { state: { cart, total: cartTotal } })
          }
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}
export default VendorPage;
