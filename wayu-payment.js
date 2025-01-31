function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 500);
    }
}

if (window.location.pathname.includes("/cart")) {
    waitForElement("form[action='/cart']", function (cartContainer) {
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

        // Agregar el botón al carrito
        cartContainer.appendChild(paymentButton);
        console.log("✅ Botón insertado en el carrito");
    });
}