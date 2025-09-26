// Carregar carrinho do localStorage ao iniciar
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function abrirModal(src, descricao) {
  const modal = document.getElementById('modal');
  const img = document.getElementById('imgModal');
  const desc = document.getElementById('descricaoModal');

  img.src = src;
  img.alt = descricao || 'Imagem do produto';
  desc.innerText = descricao || '';

  modal.classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('ativo');
  document.body.style.overflow = '';
  // Limpar imagem para próxima abertura
  document.getElementById('imgModal').src = '';
}

function adicionarCarrinho(nome, preco) {
  // Verificar se já existe (evita duplicatas simples)
  const existe = carrinho.find(item => item.nome === nome);
  if (existe) {
    existe.preco += preco; // Aumenta quantidade implícita
  } else {
    carrinho.push({ nome, preco });
  }
  atualizarCarrinho();
  // Salvar no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinho() {
  const lista = document.getElementById("itensCarrinho");
  const totalItens = document.getElementById("totalItens");
  const totalPrecoEl = document.getElementById("totalPreco");
  
  lista.innerHTML = "";
  let total = 0;
  
  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    total += item.preco;
  });
  
  totalItens.textContent = carrinho.length;
  totalPrecoEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function toggleCarrinho() {
  const sidebar = document.getElementById("carrinhoSidebar");
  sidebar.classList.toggle("ativo");
  if (sidebar.classList.contains("ativo")) {
    atualizarCarrinho(); // Atualiza ao abrir
  }
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }
  const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
  document.getElementById("totalFinal").textContent = total.toFixed(2);
  document.getElementById("telaFinalizacao").style.display = "block";
  document.getElementById("carrinhoSidebar").classList.remove("ativo");
  // Limpar carrinho após "compra"
  esvaziarCarrinho();
}

function voltarParaLoja() {
  document.getElementById("telaFinalizacao").style.display = "none";
}

function esvaziarCarrinho() {
  carrinho = [];
  atualizarCarrinho();
  localStorage.removeItem('carrinho');
  // Fechar sidebar se aberta
  document.getElementById("carrinhoSidebar").classList.remove("ativo");
}

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', atualizarCarrinho);