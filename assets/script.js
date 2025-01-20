document.getElementById("investment-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const quantidade = document.getElementById("quantidade").value;
    if (quantidade <= 0) {
        alert("Por favor, insira um valor válido para investir.");
    } else {
        // Simula o processamento do investimento
        document.getElementById("mensagem-confirmacao").style.display = "block";
        setTimeout(() => {
            document.getElementById("mensagem-confirmacao").style.display = "none";
            alert("Investimento realizado com sucesso!");
        }, 3000);
    }
});
