const loadPaypalScript = (clientId = "YOUR_SANDBOX_CLIENT_ID") => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("paypal-sdk")) {
      resolve(window.paypal);
      return;
    }

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
    script.onload = () => resolve(window.paypal);
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
export default loadPaypalScript;
