import React, { useEffect, useRef } from "react";
import loadPaypalScript from "../Utils/loadPaypalScript";

function PayPalButton({ amount }) {
  const paypalRef = useRef();

  useEffect(() => {
    if (!amount || parseFloat(amount) <= 0) return;

    loadPaypalScript()
      .then((paypal) => {
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                alert("Payment successful by " + details.payer.name.given_name);
                // TODO: Redirect to /success or update backend
              });
            },
            onError: (err) => {
              console.error("PayPal Error:", err);
              alert("Something went wrong with payment.");
            },
          })
          .render(paypalRef.current);
      })
      .catch((err) => {
        console.error("SDK Load Failed:", err);
      });
  }, [amount]);

  return <div ref={paypalRef}></div>;
}

export default PayPalButton;
