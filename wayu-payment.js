document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("/cart")) {
        const cartContainer = document.querySelector("form[action='/cart']") || document.body;

        if (cartContainer) {
            const paymentButton = document.createElement("button");
            paymentButton.innerText = "Pagar con mi App";
            paymentButton.classList.add("custom-payment-button");

            // Estilos del botón
            paymentButton.style.background = "#FF5733";
            paymentButton.style.color = "#fff";
            paymentButton.style.padding = "10px 15px";
            paymentButton.style.border = "none";
            paymentButton.style.borderRadius = "5px";
            paymentButton.style.fontSize = "16px";
            paymentButton.style.cursor = "pointer";
            paymentButton.style.marginTop = "10px";

            // Capturar información del carrito y redirigir a la pasarela
            paymentButton.addEventListener("click", function () {
                fetch('/cart.js')
                    .then(response => response.json())
                    .then(cart => {
                        const orderDetails = JSON.stringify({
                            items: cart.items.map(item => ({
                                name: item.product_title,
                                price: item.final_line_price / 100,
                                quantity: item.quantity
                            })),
                            total: cart.total_price / 100
                        });

                        window.location.href = `https://tu-app.com/payment?data=${encodeURIComponent(orderDetails)}`;
                    })
                    .catch(error => console.error("Error obteniendo el carrito:", error));
            });

            // Insertar el botón en el carrito
            cartContainer.appendChild(paymentButton);
            console.log("✅ Botón insertado en el carrito");
        } else {
            console.error("❌ No se encontró un contenedor válido para el botón");
        }
    }
});