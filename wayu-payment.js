document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("/checkouts/")) {
        const checkoutContainer = document.querySelector("form[action='/cart']") || document.body;
        
        if (checkoutContainer) {
            const paymentButton = document.createElement("button");
            paymentButton.innerText = "Pagar con mi App";
            paymentButton.classList.add("custom-payment-button");

            paymentButton.addEventListener("click", function () {
                const total = document.body.innerText.match(/\$\d+\.\d+/g)?.pop();
                console.log("Total a pagar:", total);
                
                window.location.href = `https://wayu.app/payment?total=${total}`;
            });

            checkoutContainer.appendChild(paymentButton);
        }
    }
});