// --- LÓGICA DE LOGIN ---
function handleLogin(event) {
  event.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginError');
  const overlay = document.getElementById('loginOverlay');
  
  if (user === 'admin' && pass === '1234') {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    errorMsg.style.display = 'none';
  } else {
    errorMsg.style.display = 'block';
  }
}

// --- LÓGICA DE LOGOUT ---
function handleLogout() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  
  const overlay = document.getElementById('loginOverlay');
  overlay.style.visibility = 'visible';
  overlay.style.opacity = '1';
  
  // Garante que ao deslogar a tela volte para o Painel Inicial
  openTab('painel-inicial', document.querySelector('.nav-btn'));
}

// --- CONTROLE DE NAVEGAÇÃO DE ABAS ---
function openTab(tabId, element) {
  // Remove classe ativa de todas as abas e botões
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  // Adiciona classe ativa na aba e botão selecionados
  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
    element.classList.add('active');
  }
}