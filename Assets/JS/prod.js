// url da api
const apiURL = "http://localhost:3000/api/produto";

// função para pesquisar o produto
async function pesquisarProduto() {
    // pega o valor digitado no input
    let nome = document.getElementById("pesquisarProd").value;
    // inicia o array vazio
    let products = [];
    // verifica se não está vazio e dá um push do produto para o array
    if (nome) {
        try {
            const resName = await fetch(`${apiURL}?nome=${nome}`);
            const prod = await resName.json();
            if (prod) products.push(prod);
        } catch (error) {
            console.error("Erro:", error);
        }
    } else {
        products = await consultProd();
    }
    // mostra os produtos
    displayProd(products);
    // limpa o campo de pesquisa
    document.getElementById("pesquisarProd").value = "";
}

// função para consultar os produtos
async function consultProd() {
    try {
        // requesita a api
        const response = await fetch(apiURL);
        // transforma em json
        const prodData = await response.json();
        //retorna os dados
        return prodData;
    } catch (error) {
        // mensagem de erro
        console.error("Erro", error);
    }
}

// função para exibir o home
function exibirHome() {
    const home = document.getElementById("home");
    const carrosel = document.getElementById("carrosel");
    const descText = document.getElementById("idDesc");
    const loc = document.getElementById("loc");
    const desc = document.getElementById("prods");
    carrosel.style.display = "block";
    descText.style.display = "block";
    loc.style.display = "block";
    desc.style.display = "none";    
}

// função para exibir os produtos
function displayProd(products) {
    // pega a div principal
    const prodDiv = document.querySelector(".prod-inline");
    
    // ocultando o home e exibindo os produtos
    const descProd = document.getElementById("descProd");
    const desc = document.getElementById("prods");
    const carrosel = document.getElementById("carrosel");
    const descText = document.getElementById("idDesc");
    const loc = document.getElementById("loc");
    carrosel.style.display = "none";
    descText.style.display = "none";
    loc.style.display = "none";
    desc.style.display = "block";
    descProd.style.display = "block";
    
    // limpa a div
    prodDiv.innerHTML = "";
    if (products) {
        products.forEach(prod => {
            // cria a div com a class prod
            const createDiv = document.createElement("div");
            createDiv.classList.add("prod");

            // cria a imagem
            const createImg = document.createElement("img");
            createImg.src = prod.foto;
            createDiv.appendChild(createImg);

            // cria outra div com a class descricao
            const createDes = document.createElement("div");
            createDes.classList.add("descricao");

            // cria o primeiro parágrafo com a descrição 
            const primeiroP = document.createElement("p");
            primeiroP.innerText = prod.nome;
            createDes.appendChild(primeiroP);

            // cria o segundo parágrafo com a descrição
            const segundoP = document.createElement("p");
            segundoP.innerText = `R$ ${prod.preco}`;
            createDes.appendChild(segundoP);

            // cria o button do carrinho
            const button = document.createElement("button");
            button.innerText = "Adicionar ao carrinho";
            button.classList.add("btn", "btn-primary");
            button.setAttribute("id", prod.id);
            button.setAttribute("nome", prod.nome);
            button.setAttribute("preco", prod.preco);
            button.onclick = () => addProd(button);
    
            
            createDes.appendChild(button);
            createDiv.appendChild(createDes);
            prodDiv.appendChild(createDiv);
        });
    }
}

// evento de click para exibir o produto pesquisado
document.getElementById("pesquisar").addEventListener("click", async () => {
    const products = await consultProd();
    displayProd(products);
});



