// inicia vazio
var cart = [];

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
// após carregar a página, carrega o localstorage
window.onload = jogarNoLocalStorage;

// mostrar o formulário de nome e endereço
function mostrarFormulario() {
    const form = document.getElementById("checkout-form").style.display = "block";
    const button = document.getElementById("confirm-btn").style.display = "block";
    const button2 = document.getElementById("checkout-btn").style.display = "none";
}

// finalizar as compras 
async function comprar() {
    const btn = document.getElementById("confirm-btn");
    const name = document.getElementById("user-name").value;
    const addres = document.getElementById("user-address").value;
    const payment = document.getElementById("payment").value;
    const alertInfo = document.getElementById("alertInfo");

    if(name === "" || addres === "" || payment === "") {
        alertInfo.style.display = "block";
        return;
    }

    const number = "5561998701721";
    let message = `Olá! Me chamo ${name}, resido no ndereço: ${addres}. %0AComprei os seguintes produtos no seu Supermercado: `;

    cart.forEach(item => {
        message += `${item.nome} - R$${item.preco} x ${item.quantidade},%0A`;
    });

    message += `\nTotal - R$${document.getElementById("cart-total").innerText}.%0AA forma de pagamento é no ${payment} e gostaria que fossem entregues no meu endereço, desde já, agradeço!`;
    
    const linkZap = `https://wa.me/${number}?text=${message}`;

    const successCompra = await finish();

    if(successCompra) {
        window.open(linkZap);
    }

    // desabilita o botão após a compra
    btn.disabled = true;
    // caso queira habilitar o botão novamente após um tempo
    setTimeout(() => {
        btn.disabled = false;
    }, 15000);
    
    finish();
    cart = [];
    atualizarCart();
    salvarStorage();

}

// função para jogar a compra finalizada no banco
async function finish() {
    const name = document.getElementById("user-name").value;
    const addres = document.getElementById("user-address").value;
    const payment = document.getElementById("payment").value;
    const alertSuccess = document.getElementById("alertSuccess");
    const alertErro = document.getElementById("alertErro");
    const alertInfo = document.getElementById("alertInfo");


    const pedido = {
        name,
        addres,
        payment,
        carrinho: cart
    }

    // console.log(JSON.stringify(pedido))
    try {
        // https://mercado-senac.azurewebsites.net/api/produto || http://localhost:3000/api/pedido
        const response = await fetch('https://mercado-senac.azurewebsites.net/api/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });
        
        if(response.ok) {
            alertInfo.style.display = "none";
            alertSuccess.style.display = "block";
            return true;
        } else {
            // console.log(JSON.stringify(pedido))
            alertErro.style.display = "block";
            return false;
        }
    } catch (error) {
        console.log("Erro, verifique e tente novamente", error);
        alertErro.style.display = "block";
        return false;
    }
}

// Função para exibir o carrinho de compras
document.getElementById("cart-icon").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("cart-modal"));
    modal.show();
});
