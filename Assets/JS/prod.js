// função para requisitar a api (local host)
async function consultProd(event) {
    // pegando a div com a class "prod-inline"
    const prodDiv = document.querySelector(".prod-inline");
    // deixando vazia
    prodDiv.innerHTML = "";

    // requisitando a api
    const prodGet = await fetch("http://localhost:3000/api/produto");
    const products = await prodGet.json();
    console.log("produtos", products)

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