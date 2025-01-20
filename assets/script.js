// Verifique se o Mercado Pago já está carregado corretamente
if (!window.MercadoPago) {
    console.error("Erro: Mercado Pago não foi carregado.");
}

document.getElementById("investment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const quantidade = document.getElementById("quantidade").value;

    if (!quantidade || isNaN(quantidade) || parseFloat(quantidade) <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // Criação da preferência de pagamento no Mercado Pago
    window.MercadoPago.createPreference({
        items: [
            {
                title: "Investimento TrumpCoin",
                unit_price: parseFloat(quantidade),
                quantity: 1
            }
        ],
        back_urls: {
            success: "https://www.suaurl.com/success",
            failure: "https://www.suaurl.com/failure",
            pending: "https://www.suaurl.com/pending"
        },
        auto_return: "approved",
        payment_methods: {
            excluded_payment_types: [
                { id: "ticket" }
            ]
        }
    }).then(function(response) {
        const preference = response.body;

        // Geração do QR Code com a URL da preferência
        QRCode.toCanvas(document.getElementById('qrcode-container'), preference.init_point, function(error) {
            if (error) {
                console.error(error);
            } else {
                console.log('QR Code gerado com sucesso!');
            }
        });

        // Exibe a seção do Pix
        document.getElementById("pix-section").style.display = 'block';
    }).catch(function(error) {
        console.error('Erro ao criar a preferência:', error);
        alert('Houve um erro ao processar seu pagamento.');
    });
});
