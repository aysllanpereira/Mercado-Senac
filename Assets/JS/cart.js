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
    salvarStorage();
}

// Função para atualizar a exibição do carrinho
function atualizarCart() {
    // pego a área do carrinho no html 
    const items = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    // quantidade de produtos no carrinho
    const qntProd = document.getElementById("prodCart").innerText = cart.reduce((contator, item) => contator + item.quantidade, 0);

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

// mostrar o formulário de nome e endereço
function mostrarFormulario() {
    const form = document.getElementById("checkout-form").style.display = "block";
    const button = document.getElementById("confirm-btn").style.display = "block";
    const button2 = document.getElementById("checkout-btn").style.display = "none";
}

// finalizar as compras 
function comprar() {
    const btn = document.getElementById("confirm-btn");
    const name = document.getElementById("user-name").value;
    const addres = document.getElementById("user-address").value;
    const payment = document.getElementById("payment").value;

    if(!name || !addres || !payment) {
        alert("Por favor, preencha todos os dados solicitados!");
        return
    }

    const number = "5561998701721";
    let message = `Olá! Me chamo ${name}, resido no ndereço: ${addres}. %0AComprei os seguintes produtos no seu Supermercado: `;

    cart.forEach(item => {
        message += `${item.nome} - R$${item.preco} x ${item.quantidade},%0A`;
    });

    message += `\nTotal - R$${document.getElementById("cart-total").innerText}.%0AA forma de pagamento é no ${payment} e gostaria que fossem entregues no meu endereço, desde já, agradeço!`;
    
    const linkZap = `https://wa.me/${number}?text=${message}`;

    window.open(linkZap);

    // desabilita o botão após a compra
    btn.disabled = true;
    // caso queira habilitar o botão novamente após um tempo
    // setTimeout(() => {
    //     btn.disabled = false;
    // }, 15000);

    cart = [];
    atualizarCart();
    salvarStorage();

}

// Função para exibir o carrinho de compras
document.getElementById("cart-icon").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("cart-modal"));
    modal.show();
});
