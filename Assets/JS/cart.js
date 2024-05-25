// função para exibir o carrinho de compras
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = new bootstrap.Modal(document.getElementById('cart-modal'));

    cartIcon.addEventListener('click', function() {
        cartModal.show();
    });
});





// tentar add no carrinho

/*function atualizarCarrinho() {
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantidade, 0);
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const valorTotal = item.quantidade * item.precoUnitario;
        total += valorTotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$${item.precoUnitario.toFixed(2)}</td>
            <td>R$${valorTotal.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(tr);
    });

    const totalElement = document.getElementById('total-price');
    totalElement.innerText = total.toFixed(2); 
} */


function adicionarCarrinho(products) {
    document.getElementsByClassName("btn-close");
    const existingProduct = cart.find(item => item.nome === products.nome);
    if (existingProduct) {
        existingProduct.quantidade += 1;
    } else {
        console.log()
        cart.push({ nome: products.nome, quantidade: 1, precoUnitario: products.preco }); 
    }
    atualizarCarrinho();
    localStorage.setItem('carrinho', JSON.stringify(cart))
}

/* function limparCarrinho() {
    cart = [];
    document.getElementById('cart-count').innerText = '0';
    atualizarCarrinho();
    localStorage.removeItem('carrinho')
}

async function finalizarCompra() {
    if (cart.length > 0) {
        const nome = prompt("Digite seu nome:");
        const telefone = prompt("Digite seu telefone:");
        try {
            const response = await fetch('http://localhost:3000/api/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nome, telefone, carrinho: cart})
            });

            if (response.ok) {
                alert("Compra finalizada com sucesso!");
                limparCarrinho();
            } else {
                alert("Ocorreu um erro ao finalizar a compra. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            alert("Ocorreu um erro ao processar sua compra. Tente novamente mais tarde.");
        }
    } else {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
    }
}

function carregarCarrinho(){
    const carStorage = localStorage.getItem('carrinho')
    if (carStorage){
        cart = JSON.parse(carStorage)
        atualizarCarrinho()
    }else{
        cart = []
    }
}

window.onload = carregarCarrinho */