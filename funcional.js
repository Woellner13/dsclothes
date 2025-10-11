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

// Fechar modal ao clicar fora (melhoria UX)
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) {
    fecharModal();
  }
});

function fecharModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('ativo');
  document.body.style.overflow = '';
  // Limpar imagem para próxima abertura
  document.getElementById('imgModal').src = '';
}

function adicionarCarrinho(nome, preco) {
  // Verificar se já existe (evita duplicatas)
  const existe = carrinho.find(item => item.nome === nome);
  if (existe) {
    existe.quantidade += 1;  // Incrementa quantidade em vez de somar preço
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });  // Adiciona com quantidade 1
  }
  atualizarCarrinho();
  // Salvar no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  
  // Feedback visual
  alert(`${nome} adicionado ao carrinho!`);  // Pode remover se quiser algo mais elegante, como um toast
}

function atualizarCarrinho() {
  const lista = document.getElementById("itensCarrinho");
  const totalItens = document.getElementById("totalItens");
  const totalPrecoEl = document.getElementById("totalPreco");
  
  lista.innerHTML = "";
  let total = 0;
  let totalQuantidade = 0;
  
  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    totalQuantidade += item.quantidade;
    
    const li = document.createElement("li");
    li.textContent = `${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2)} cada (Subtotal: R$ ${subtotal.toFixed(2)})`;
    lista.appendChild(li);
  });
  
  totalItens.textContent = totalQuantidade;  // Agora conta itens totais, considerando quantidade
  totalPrecoEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function toggleCarrinho() {
  const sidebar = document.getElementById("carrinhoSidebar");
  sidebar.classList.toggle("ativo");
  if (sidebar.classList.contains("ativo")) {
    atualizarCarrinho(); // Atualiza ao abrir
  }
}

// Nova função: Filtrar produtos pelo nav
function filtrarProdutos(categoria) {
  const produtos = document.querySelectorAll('.produto');
  produtos.forEach(produto => {
    if (categoria === 'todos' || produto.classList.contains(`categoria-${categoria}`)) {
      produto.style.display = 'block';  // Mostra
    } else {
      produto.style.display = 'none';   // Esconde
    }
  });
  
  // Fecha o carrinho se estiver aberto (opcional, para foco no filtro)
  document.getElementById("carrinhoSidebar").classList.remove("ativo");
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("O carrinho está vazio! Você não pode finalizar a compra!");
    return;
  }
  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
  const link = "https://github.com/Woellner13/dsclothes";
  document.getElementById("totalFinal").textContent = total.toFixed(2);
  document.getElementById("telaFinalizacao").style.display = "block";
  document.getElementById("carrinhoSidebar").classList.remove("ativo");
  window.open(link, '_blank');

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
document.addEventListener('DOMContentLoaded', function() {
  atualizarCarrinho();
  // Opcional: Filtrar para "todos" por padrão
  filtrarProdutos('todos');
});
