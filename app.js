document.addEventListener('DOMContentLoaded', () => {
  
  // 1. REGISTRO DEL SERVICE WORKER (PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker Registrado'))
      .catch(err => console.log('Error en Service Worker', err));
  }

  // 2. NAVEGACIÓN (Bottom Nav)
  const navItems = document.querySelectorAll('.nav-item');
  const views = document.querySelectorAll('.view');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remover clase activa de botones
      navItems.forEach(nav => nav.classList.remove('active'));
      // Añadir clase activa al presionado
      item.classList.add('active');

      // Ocultar todas las vistas
      views.forEach(view => view.classList.remove('active'));
      
      // Mostrar la vista correspondiente
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // 3. MODO OSCURO (Toggle y Persistencia)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Cargar preferencia guardada
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let theme = 'light';
    
    if (document.body.classList.contains('dark-theme')) {
      theme = 'dark';
    }
    
    // Guardar preferencia
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      // Ícono de Sol (para cambiar a claro)
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    } else {
      // Ícono de Luna (para cambiar a oscuro)
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    }
  }

  // 4. PERSISTENCIA DE CHECKBOXES (Progreso de estudio)
  const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
  
  checkboxes.forEach(chk => {
    // Cargar estado desde LocalStorage
    const savedState = localStorage.getItem(chk.id);
    if (savedState === 'true') {
      chk.checked = true;
    }

    // Guardar estado al hacer click
    chk.addEventListener('change', (e) => {
      localStorage.setItem(chk.id, e.target.checked);
    });
  });

});