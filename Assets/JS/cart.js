// inicia vazio
let cart = [];

// Função para adicionar produto ao carrinho
function addProd(button) {
    const prodId = button.getAttribute("id");
    const prodNome = button.getAttribute("nome");
    const prodPreco = parseFloat(button.getAttribute("preco"));

    // verifica se existe produto no carrinho
    const produtoExistente = cart.find(item => item.id === prodId);

    // se o produto existir, ele incrementa mais 1. Se não adiciona no carrinho
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        cart.push({
            id: prodId,
            nome: prodNome,
            preco: prodPreco,
            quantidade: 1
        });
    }
    // atualiza o carrinho e salva no localStorage
    atualizarCart();
    salvarStorage()
}

// Função para atualizar a exibição do carrinho
function atualizarCart() {
    // pego a área do carrinho no html 
    const items = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // zero os itens
    items.innerHTML = "";

    // o total inicia em zero
    let total = 0;

    // crio a lista com os produtos, acrescento o total e formato o valor para duas casas após a virgula
    cart.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco} x ${item.quantidade}
            <button class="btn btn-danger btn-sm float-end" onclick="removerProd('${item.id}')">X</button>
            <button class="btn btn-secondary btn-sm float-end" onclick="decrementarQuantidade('${item.id}')">-</button>
            <button class="btn btn-secondary btn-sm float-end" onclick="incrementarQuantidade('${item.id}')">+</button>
        `;

        items.appendChild(li);

        total += item.preco * item.quantidade;
    });

    cartTotal.innerText = total.toFixed(2);
}

// Função para incrementar a quantidade do produto no carrinho
function incrementarQuantidade(prodId) {
    // verifico se tem o produto no carrinho, se tiver aumento/incremento e atualizo o carrinho
    const produtoExistente = cart.find(item => item.id === prodId);
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
        atualizarCart();
        salvarStorage()
    }
}

// Função para decrementar a quantidade do produto no carrinho
function decrementarQuantidade(prodId) {
    // verifico se tem o produto no carrinho, se tiver diminuo/decremento e atualizo o carrinho
    const produtoExistente = cart.find(item => item.id === prodId);
    if (produtoExistente) {
        produtoExistente.quantidade -= 1;
        if (produtoExistente.quantidade === 0) {
            removerProd(prodId);
        } else {
            atualizarCart();
            salvarStorage()
        }
    }
}

// Função para remover produto do carrinho
function removerProd(prodId) {
    cart = cart.filter(item => item.id !== prodId);
    atualizarCart();
    salvarStorage()
}

// salvar no localStorage
function salvarStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// jogar o produto pro localStorage
function jogarNoLocalStorage() {
const cartStorage = localStorage.getItem("cart");
    if (cartStorage) {
        cart = JSON.parse(cartStorage);
        atualizarCart();
    }
}

window.onload = jogarNoLocalStorage;

// Função para exibir o carrinho de compras
document.getElementById("cart-icon").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("cart-modal"));
    modal.show();
});
