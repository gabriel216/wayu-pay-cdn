function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 500);
    }
}

if (window.location.pathname.includes("/checkouts")) {
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

            // Evento de click para obtener los datos del carrito
            paymentButton.addEventListener("click", function () {
                const subtotalElement = document.querySelector(".totals__total-value"); // Normalmente es el subtotal
                const taxElement = document.querySelector(".tax-note"); // Ajusta el selector si no es correcto
                const shippingElement = document.querySelector(".totals__shipping-value"); // Ajusta el selector si no es correcto

                const subtotal = subtotalElement ? subtotalElement.innerText.replace(/[^0-9.]/g, "") : "0";
                const taxes = taxElement ? taxElement.innerText.replace(/[^0-9.]/g, "") : "0";
                const shipping = shippingElement ? shippingElement.innerText.replace(/[^0-9.]/g, "") : "0";
                const total = parseFloat(subtotal) + parseFloat(taxes) + parseFloat(shipping);

                // Obtener dirección de envío (solo si el usuario ya ingresó su dirección)
                const shippingAddress = {
                    country: document.querySelector("select[name='country']")?.value || "",
                    state: document.querySelector("select[name='state']")?.value || "",
                    city: document.querySelector("input[name='city']")?.value || "",
                    address: document.querySelector("input[name='address']")?.value || "",
                    postalCode: document.querySelector("input[name='postalCode']")?.value || "",
                };

                const orderDetails = JSON.stringify({
                    items: [
                        { name: "Producto 1", price: 1000 }, 
                        { name: "Producto 2", price: 2000 }
                    ],
                    subtotal: parseFloat(subtotal),
                    taxes: parseFloat(taxes),
                    shipping: parseFloat(shipping),
                    total: parseFloat(total),
                    shippingAddress: shippingAddress
                });

                console.log("🛒 Enviando a la app:", orderDetails);
                window.location.href = `https://wayu.app/payment?data=${encodeURIComponent(orderDetails)}`;
            });

            // Agregar botón debajo del checkout
            checkoutButton.parentNode.appendChild(paymentButton);
            console.log("✅ Botón de pago con mi App agregado junto al de Shopify");
        }
    });
}