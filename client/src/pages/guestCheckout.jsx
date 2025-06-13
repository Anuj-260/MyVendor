import PayPalButton from "../components/payPalButton";

function GuestCheckout({ cart }) {
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-box">
      <h2>Guest Checkout</h2>
      <p>Total: ₹{cartTotal}</p>

      <h3>Pay with:</h3>
      <PayPalButton amount={cartTotal} />
    </div>
  );
}
export default GuestCheckout;
