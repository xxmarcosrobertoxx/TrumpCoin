// Inicialize o Mercado Pago com a chave pública
const mp = new MercadoPago('YOUR_PUBLIC_KEY', { locale: 'pt-BR' }); // Substitua YOUR_PUBLIC_KEY pela sua chave pública

// Handle do envio do formulário
document.getElementById("investment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const quantidade = document.getElementById("quantidade").value;

    if (!quantidade || isNaN(quantidade) || parseFloat(quantidade) <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // Criação da preferência de pagamento no Mercado Pago
    mp.createPreference({
        items: [
            {
                title: "Investimento TrumpCoin",
                unit_price: parseFloat(quantidade),
                quantity: 1
            }
        ],
        back_urls: {
            success: "https://www.suaurl.com/success",   // Substitua com sua URL de sucesso
            failure: "https://www.suaurl.com/failure",   // Substitua com sua URL de falha
            pending: "https://www.suaurl.com/pending"    // Substitua com sua URL de pendência
        },
        auto_return: "approved",
        payment_methods: {
            excluded_payment_types: [
                { id: "ticket" } // Excluindo boleto
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
        document.querySelector(".pix-section").style.display = 'block';
    }).catch(function(error) {
        console.error('Erro ao criar a preferência:', error);
        alert('Houve um erro ao processar seu pagamento.');
    });
});
