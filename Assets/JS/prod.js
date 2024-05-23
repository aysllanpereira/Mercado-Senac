// função para pesquisar o produto
function pesquisarProduto() {
    const pegarPes = document.getElementById("pesquisarProd");
    if(pegarPes.value) {
        pesquisarProduto(pegarPes.value);
    }

    document.getElementById("pesquisarProd").value = "";
}

// url da api
let url = "http://localhost:3000/api/produto";

// função para requisitar a api (local host)
async function consultProd(nome) {
    // pegando a div com a class "prod-inline"
    const prodDiv = document.querySelector(".prod-inline");
    // deixando vazia
    prodDiv.innerHTML = "";

    if(nome) {
        url = `http://localhost:3000/api/produto?nome=${nome}`;
        const prodGet = await fetch(url);
        const products = await prodGet.json();
        console.log("produtos", products)
    }

    // requisitando a api

    // pegando os produtos
    if(products) {
        products.forEach(prod => {
            // cria a primeira div
            const createDiv = document.createElement("div");
            createDiv.classList.add("prod")

            // criando a tag img
            const createImg = document.createElement("img");
            createImg.src = prod.foto;
            // createImg.style.width = "100%";
            // createImg.style.height = "220px";
            createDiv.appendChild(createImg);

            // criando outra div com a descrição do produto
            const createDes = document.createElement("div");
            createDes.classList.add("descricao");

            // criando os parágrafos
            const primeiroP = document.createElement("p");
            primeiroP.innerText = prod.nome;
            createDiv.appendChild(primeiroP);

            const segundoP = document.createElement("p");
            segundoP.innerText = `R$ ${prod.preco}`;
            createDiv.appendChild(segundoP);

            const button = document.createElement("button");
            button.innerText = "Adicionar ao carrinho";
            button.classList.add("btn");
            button.classList.add("btn-primary");
            createDiv.appendChild(button);

            createDiv.appendChild(createDes);
            prodDiv.appendChild(createDiv);
        });
    }
}
