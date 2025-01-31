document.addEventListener("DOMContentLoaded", function () {
  fetch("/cart.js")
    .then(response => response.json())
    .then(cart => {
      const items = cart.items.map(item => ({
        name: item.product_title,
        price: item.final_line_price / 100, // Shopify usa centavos
        quantity: item.quantity
      }));

      const total = cart.total_price / 100;

      // Generar el link de pago externo
      const paymentUrl = `https://wayu-pay.app/pay?items=${encodeURIComponent(JSON.stringify(items))}&total=${total}`;

      // Crear el botón de pago
      const button = document.createElement("a");
      button.href = paymentUrl;
      button.innerText = "Pagar con nuestra pasarela";
      button.className = "custom-payment-btn";
      
      // Agregar estilos al botón
      button.style = `
        display: block;
        margin-top: 15px;
        padding: 10px;
        background: #000;
        color: #fff;
        text-align: center;
        border-radius: 5px;
      `;

      // Insertar el botón en la página del carrito
      const checkoutButton = document.querySelector(".cart__checkout");
      if (checkoutButton) {
        checkoutButton.parentNode.insertBefore(button, checkoutButton);
      }
    });
});