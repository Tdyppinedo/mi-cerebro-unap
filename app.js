document.addEventListener('DOMContentLoaded', () => {
  
  // URL de tu puente en Cloudflare
  const WORKER_URL = 'https://puente-cerebro-unap.1984438.workers.dev/';

  // 1. REGISTRO DEL SERVICE WORKER (PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker Registrado'))
      .catch(err => console.log('Error en Service Worker', err));
  }

  // 2. NAVEGACIÓN Y MODO OSCURO
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

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Cargar preferencia guardada
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    } else {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    }
  }

  // 3. OBTENCIÓN Y RENDERIZADO DE DATOS DESDE NOTION
  async function fetchNotionData() {
    const container = document.getElementById('silabo-container');
    
    try {
      const response = await fetch(WORKER_URL);
      if (!response.ok) throw new Error('Error de red al contactar al Worker');
      
      const data = await response.json();
      renderSilabo(data.results);
    } catch (error) {
      console.error('Error fetching Notion:', error);
      container.innerHTML = `<div class="card empty-state"><p>Error al cargar el sílabo. Revisa tu conexión o la URL del Worker.</p></div>`;
    }
  }

  function renderSilabo(results) {
    const container = document.getElementById('silabo-container');
    container.innerHTML = ''; // Limpiamos el loader

    // Agrupamos las sesiones por "Unidad"
    const groupedData = {};

    results.forEach(row => {
      const props = row.properties;
      const unidad = props.Unidad?.select ? props.Unidad.select.name : 'Sin Unidad';
      const tema = props.Tema?.title[0] ? props.Tema.title[0].plain_text : 'Tema sin título';
      const docente = props.Docente?.select ? props.Docente.select.name : '';
      const tipo = props['Tipo de Sesión']?.select ? props['Tipo de Sesión'].select.name : '';
      const fecha = props.Fecha?.date ? props.Fecha.date.start : '';
      const id = row.id; 

      if (!groupedData[unidad]) {
        groupedData[unidad] = [];
      }

      groupedData[unidad].push({ id, tema, docente, tipo, fecha });
    });

    // Renderizamos el HTML
    for (const [unidad, sesiones] of Object.entries(groupedData)) {
      const detailsBox = document.createElement('details');
      detailsBox.className = 'week-accordion';
      // Mantenemos la primera unidad abierta por defecto
      if (unidad === 'Unidad I') detailsBox.open = true; 

      detailsBox.innerHTML = `
        <summary>
          <span class="week-title">${unidad}</span>
          <span class="icon-expand">+</span>
        </summary>
        <div class="week-content">
          ${sesiones.map(sesion => `
            <label class="task-item">
              <input type="checkbox" id="chk-${sesion.id}">
              <div class="task-text" style="display: flex; flex-direction: column;">
                <span style="font-weight: 500;">${sesion.tema}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">
                  ${sesion.fecha} | ${sesion.tipo} ${sesion.docente ? '| ' + sesion.docente : ''}
                </span>
              </div>
            </label>
          `).join('')}
        </div>
      `;
      container.appendChild(detailsBox);
    }

    // 4. REACTIVAR PERSISTENCIA DE CHECKBOXES
    attachCheckboxListeners();
  }

  function attachCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    checkboxes.forEach(chk => {
      const savedState = localStorage.getItem(chk.id);
      if (savedState === 'true') chk.checked = true;

      chk.addEventListener('change', (e) => {
        localStorage.setItem(chk.id, e.target.checked);
      });
    });
  }

  // Ejecutamos la carga inicial
  fetchNotionData();

});