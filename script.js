// URL do backend
const BACKEND_URL = "https://seu-backend.com";

document.addEventListener("DOMContentLoaded", async () => {
    // Atualizar o preço da moeda
    const priceContainer = document.getElementById("price");
    try {
        const response = await fetch(`${BACKEND_URL}/get_price`);
        const data = await response.json();
        const priceBRL = data['trump-coin'].brl;
        priceContainer.textContent = `R$ ${priceBRL.toFixed(2)}`;
    } catch (error) {
        priceContainer.textContent = "Erro ao carregar preço.";
    }

    // Formulário de compra
    const form = document.getElementById("purchase-form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const amount = document.getElementById("amount").value;
        try {
            const response = await fetch(`${BACKEND_URL}/create_payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount })
            });
            const paymentData = await response.json();
            const qrCode = document.getElementById("qr-code");
            const paymentContainer = document.getElementById("payment-container");
            qrCode.src = `data:image/png;base64,${paymentData.qr_code}`;
            paymentContainer.style.display = "block";
        } catch (error) {
            alert("Erro ao criar pagamento.");
        }
    });
});
