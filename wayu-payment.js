document.addEventListener("DOMContentLoaded", function () {
  const checkoutPage = window.location.href.includes("/checkouts");

  if (checkoutPage) {
      const paymentButton = document.createElement("button");
      paymentButton.innerText = "Pagar con mi App";
      paymentButton.style.background = "#FF5733";
      paymentButton.style.color = "#fff";
      paymentButton.style.padding = "10px 15px";
      paymentButton.style.border = "none";
      paymentButton.style.borderRadius = "5px";
      paymentButton.style.fontSize = "16px";
      paymentButton.style.cursor = "pointer";
      paymentButton.style.marginTop = "10px";

      paymentButton.addEventListener("click", function () {
          // Aquí debes construir la URL de tu app con los productos y total
          const orderDetails = JSON.stringify({
              items: [
                  { name: "Producto 1", price: 1000 },
                  { name: "Producto 2", price: 2000 }
              ],
              total: 3000
          });

          window.location.href = `https://wayu-app.myshopify.com/payment?data=${encodeURIComponent(orderDetails)}`;
      });

      // Insertar el botón en la página del checkout
      const checkoutContainer = document.querySelector(".content-box");
      if (checkoutContainer) {
          checkoutContainer.appendChild(paymentButton);
      }
  }
});