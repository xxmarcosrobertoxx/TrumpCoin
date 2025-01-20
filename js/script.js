document.addEventListener("DOMContentLoaded", function() {
    // Envio de formulário de contato
    document.getElementById('form-contato').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        
        alert(`Mensagem enviada com sucesso!\nNome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`);
    });

    // Investimento
    document.getElementById('form-investimento').addEventListener('submit', function(e) {
        e.preventDefault();

        const quantidade = document.getElementById('quantidade').value;
        const moeda = document.getElementById('moeda').value;

        alert(`Investimento de ${quantidade} ${moeda} realizado com sucesso!`);
    });
});
