import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuItem from "../components/menuItem";
import Cart from "../components/cart";
import { Vendor, VendorItem } from "../types";

interface CartItem extends VendorItem {
  quantity: number;
}

function VendorPage() {
  const { slug } = useParams<{ slug: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
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

  const handleAddToCart = (item: VendorItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="vendor-container">
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
          <MenuItem key={item.id} item={item} onAdd={handleAddToCart} />
        ))}
      </div>

      <Cart
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
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
