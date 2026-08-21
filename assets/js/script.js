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
}

// --- LÓGICA DO PARALLAX FLUIDO NO PAINEL ---
const dashboardContainer = document.querySelector('.dashboard-container');
const parallaxBg = document.getElementById('parallaxBg');

if (dashboardContainer && parallaxBg) {
  let speed = 0.1; // Velocidade do movimento
  
  function updateParallax() {
    // Pega a rolagem específica de dentro do container do painel
    const scrollTop = dashboardContainer.scrollTop;
    parallaxBg.style.transform = `translate3d(0, ${scrollTop * speed}px, 0)`;
  }
  
  let ticking = false;
  dashboardContainer.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}