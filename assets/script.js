document.getElementById('investment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const valor = document.getElementById('quantidade').value;
    if (valor > 0) {
        document.getElementById('mensagem-confirmacao').style.display = 'block';
    } else {
        alert('Por favor, insira um valor válido para o investimento.');
    }
});
