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
        // Verifica si el botón ya fue reemplazado
        if (!document.querySelector(".custom-payment-button")) {
            // Crear el nuevo botón
            const paymentButton = document.createElement("button");
            paymentButton.innerText = "Pagar con mi App";
            paymentButton.classList.add("custom-payment-button");

            // Estilos del botón (opcional, puedes agregar Tailwind u otros estilos en CSS)
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

            // Redirigir a la URL de pago con los productos
            paymentButton.addEventListener("click", function () {
                const totalElement = document.querySelector(".totals__total-value");
                const total = totalElement ? totalElement.innerText.replace(/[^0-9.]/g, "") : "0";

                const orderDetails = JSON.stringify({
                    items: [
                        { name: "Producto 1", price: 1000 }, // Puedes mejorar esto para obtener los productos reales
                        { name: "Producto 2", price: 2000 }
                    ],
                    total: parseFloat(total)
                });

                window.location.href = `https://wayu.app/payment?data=${encodeURIComponent(orderDetails)}`;
            });

            // Reemplazar el botón de checkout por el nuevo botón
            checkoutButton.replaceWith(paymentButton);
            console.log("✅ Botón de checkout reemplazado");
        } else {
            console.log("⚠️ Botón ya reemplazado, no se vuelve a insertar.");
        }
    });
}