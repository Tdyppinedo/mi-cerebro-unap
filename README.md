# 🚀 Segundo Cerebro Académico (PWA)

> **Breve descripción:** Aplicación web progresiva (PWA) diseñada para organizar, gestionar y repasar sílabos universitarios. Sirve como un tablero de control unificado que integra calendarios de estudio, seguimiento de temas y enlaces a ecosistemas de investigación.

---

## 🏗️ Arquitectura y Escalabilidad (Visión del Proyecto)

Este proyecto está diseñado bajo el principio de **Separación de Preocupaciones (Separation of Concerns)**, separando estrictamente la interfaz gráfica de los datos.

*   **Fase 1 (MVP Actual - Local/Cohorte):** Diseñado para el quinto nivel de medicina humana. La aplicación es estática. Consume un archivo `data.json` local que contiene el sílabo específico del semestre (ej. Enfermedades Infecciosas y Tropicales). Está optimizado para un despliegue rápido en GitHub Pages de cara al inicio de clases el 10 de agosto.
*   **Fase 2 (Escalabilidad Masiva):** La interfaz y el código base (Frontend) se mantendrán idénticos. Se implementará un backend o base de datos (BaaS) para que cualquier estudiante universitario pueda crear una cuenta, cargar su propio sílabo y generar su entorno personalizado dinámicamente.

---

## 🤖 Guía de Inicio para Agentes de IA

Si eres una Inteligencia Artificial (Antigravity, DeepSeek, Claude, etc.) tomando el relevo de este proyecto, lee atentamente estas instrucciones antes de generar código:

1. **Lee la arquitectura:** Revisa `docs/architecture.md` para entender el diseño técnico.
2. **Revisa las reglas del proyecto:** Aplica los estándares definidos en `prompts/SYSTEM_PROMPT.md`.
3. **Manejo de Datos:** Los datos del curso NO deben quemarse (hardcodearse) en el HTML. Todo debe renderizarse dinámicamente leyendo la carpeta `src/data/`.
4. **Consulta el estado actual:** Revisa la sección **"Estado de Avance"** de este archivo y el último registro en `CHANGELOG.md`.

---

## 🛠️ Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3 moderno (Mobile-First), Vanilla JavaScript.
- **Integraciones de Estudio (Enlaces Externos):** Zotero (Gestión bibliográfica), NotebookLM (Procesamiento de PDFs y PPTXs).
- **Despliegue:** GitHub Pages (Fase 1).

---

## 📌 Estado de Avance y Próximos Pasos

### 🛑 En Progreso (Tarea Actual)
- [ ] Creación del esquema de datos (JSON) basado en los sílabos del semestre actual y conexión mediante `fetch` en `app.js`.

### 📋 Pendientes
- [ ] Implementar la funcionalidad de Service Worker en el `manifest.json` para capacidad offline completa (PWA).
- [ ] Ajustar la paleta de colores y reemplazar textos de navegación por iconos SVG.
- [ ] Configurar el archivo `CHANGELOG.md` para el registro del relevo de modelos.

### ✅ Completado
- [x] Despliegue inicial exitoso en GitHub Pages (`index.html`, `styles.css`, `app.js` básicos).
- [x] Estructura inicial del repositorio y documentación maestra.

---

## ⚙️ Instrucciones para Ejecución Local

Para clonar y probar esta aplicación sin necesidad de servidores complejos:

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# 2. Abrir la carpeta
cd mi-cerebro-unap

# 3. Lanzar un servidor local ligero (requiere Node.js instalado o usar Live Server en VS Code)
npx serve .