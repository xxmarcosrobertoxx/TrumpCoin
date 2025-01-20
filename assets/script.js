document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Simula o processo de pagamento com sucesso
    const valor = document.getElementById('quantidade').value;
    if (valor > 0) {
        document.getElementById('mensagem-confirmacao').style.display = 'block';
    } else {
        alert('Por favor, insira um valor válido para o investimento.');
    }
});
