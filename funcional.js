function abrirModal(src, descricao) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("imgModal").src = src;
  document.getElementById("descricaoModal").innerText = descricao;
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

let carrinho = [];

function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("itensCarrinho");
  lista.innerHTML = "";
  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco}`;
    lista.appendChild(li);
  });
}

function toggleCarrinho() {
  const sidebar = document.getElementById("carrinhoSidebar");
  sidebar.classList.toggle("ativo");
}

function finalizarCompra() {
  document.getElementById("telaFinalizacao").style.display = "block";
  document.getElementById("carrinhoSidebar").classList.remove("ativo");
}

function voltarParaLoja() {
  document.getElementById("telaFinalizacao").style.display = "none";
}

function esvaziarCarrinho() {
  carrinho = [];
  atualizarCarrinho();
  alert("Carrinho esvaziado!");
}
