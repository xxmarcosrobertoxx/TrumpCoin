// Função para buscar o QR Code gerado
window.onload = function() {
    fetch('payment.php')
        .then(response => response.json())
        .then(data => {
            // Exibe o QR Code na página
            document.getElementById('qr-code').src = data.qr_code_url;
        })
        .catch(error => {
            console.error('Erro ao obter QR Code:', error);
            alert('Erro ao carregar QR Code.');
        });
};
