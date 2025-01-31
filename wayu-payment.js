function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 500);
    }
}

if (window.location.pathname.includes("/cart")) {
    waitForElement("#checkout", function (checkoutButton) {
        if (!document.querySelector(".custom-payment-button")) {
            const paymentButton = document.createElement("button");
            paymentButton.innerText = "Pagar con mi App";
            paymentButton.classList.add("custom-payment-button");

            // Estilos del botón
            paymentButton.style.background = "black";
            paymentButton.style.color = "#fff";
            paymentButton.style.padding = "12px 20px";
            paymentButton.style.border = "none";
            paymentButton.style.borderRadius = "6px";
            paymentButton.style.fontSize = "16px";
            paymentButton.style.cursor = "pointer";
            paymentButton.style.display = "block";
            paymentButton.style.width = "100%";
            paymentButton.style.marginTop = "10px";

            paymentButton.addEventListener("click", function () {
                const cartItems = Array.from(document.querySelectorAll(".cart-item")).map(item => {
                    return {
                        name: item.querySelector(".cart-item-name")?.innerText || "Producto",
                        price: parseFloat(item.querySelector(".cart-item-price")?.innerText.replace(/[^0-9.]/g, "")) || 0,
                        quantity: parseInt(item.querySelector(".cart-item-quantity")?.innerText) || 1
                    };
                });

                const totalElement = document.querySelector(".totals__total-value");
                const total = totalElement ? totalElement.innerText.replace(/[^0-9.]/g, "") : "0";

                const orderDetails = JSON.stringify({
                    items: cartItems,
                    total: parseFloat(total)
                });

                window.location.href = `https://wayu.app/payment?data=${encodeURIComponent(orderDetails)}`;
            });

            checkoutButton.parentNode.appendChild(paymentButton);
            console.log("✅ Botón de pago agregado en el carrito");
        }
    });
}