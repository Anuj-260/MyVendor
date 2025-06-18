import { useEffect } from "react";
import { VendorItem } from "../types";

interface CartItem extends VendorItem {
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onUpdateQty: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  onTotalChange: (total: number) => void;
}

function Cart({ cart, onUpdateQty, onRemove, onTotalChange }: CartProps) {
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    onTotalChange(cartTotal);
  }, [cartTotal, onTotalChange]);

  return (
    <div className="cart-box">
      <div className="cart-wrapper">
        <div className="cart-container">
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
      </div>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>
                ₹{item.price} x {item.quantity}
              </span>
              <div className="cart-controls">
                <button onClick={() => onUpdateQty(item.id, -1)}>-</button>
                <button onClick={() => onUpdateQty(item.id, 1)}>+</button>
                <button onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{cartTotal}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;
