function handleLogin(event) {
  event.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginError');
  
  if (user === 'admin' && pass === '1234') {
    document.getElementById('loginOverlay').style.display = 'none';
    errorMsg.style.display = 'none';
  } else {
    errorMsg.style.display = 'block';
  }
}

function handleLogout() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('loginOverlay').style.display = 'flex';
}

function openTab(tabId, element) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  element.classList.add('active');
  
  // Reaplica os filtros atuais ao trocar de aba para manter consistência
  applyFilters();
}

let debounceTimer;

function handleSearchInput() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    applyFilters();
  }, 250);
}

function applyFilters() {
  const statusFilter = document.getElementById('filter-status').value;
  const searchText = document.getElementById('filter-search').value.toLowerCase().trim();
  
  const activeTab = document.querySelector('.tab-content.active');
  if (!activeTab) return;
  
  // Filtra linhas de tabelas
  const rows = activeTab.querySelectorAll('tbody tr');
  let visibleRowsCount = 0;
  let totalRowsCount = rows.length;
  
  rows.forEach(row => {
    const searchData = row.getAttribute('data-search') || '';
    const statusData = row.getAttribute('data-status') || '';
    const rowText = row.innerText.toLowerCase();
    
    const matchesStatus = (statusFilter === 'TODAS' || statusData === statusFilter);
    const matchesSearch = (searchText === '' || searchData.includes(searchText) || rowText.includes(searchText));
    
    if (matchesStatus && matchesSearch) {
      row.style.display = '';
      visibleRowsCount++;
    } else {
      row.style.display = 'none';
    }
  });
  
  // Filtro dinâmico também para elementos visuais específicos (como o pódio no ranking)
  const podiumSteps = activeTab.querySelectorAll('.podium-step');
  podiumSteps.forEach(step => {
    const searchData = step.getAttribute('data-search') || '';
    const statusData = step.getAttribute('data-status') || '';
    const stepText = step.innerText.toLowerCase();
    
    const matchesStatus = (statusFilter === 'TODAS' || statusData === statusFilter);
    const matchesSearch = (searchText === '' || searchData.includes(searchText) || stepText.includes(searchText));
    
    if (matchesStatus && matchesSearch) {
      step.style.display = '';
    } else {
      step.style.display = 'none';
    }
  });
  
  // Atualiza o contador informativo na barra de filtros
  const counterEl = document.getElementById('filter-counter');
  if (counterEl) {
    counterEl.innerText = `Mostrando ${visibleRowsCount} de ${totalRowsCount} registros filtrados na guia atual.`;
  }
}

function resetFilters() {
  document.getElementById('filter-status').value = 'TODAS';
  document.getElementById('filter-search').value = '';
  applyFilters();
}

function exportData() {
  alert('Função de exportação rápida acoplada com sucesso! Pronto para integrar com a lógica de backend ou geração de CSV.');
}
