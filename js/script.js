document.getElementById('form-investimento').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let quantidade = document.getElementById('quantidade').value;
    let moeda = document.getElementById('moeda').value;
    
    alert(`Investimento de ${quantidade} ${moeda} realizado com sucesso!`);
});
