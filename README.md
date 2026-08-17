# 🔧 Taller Pro — Sistema de Gestión de Taller

Sistema completo para registrar y controlar vehículos en un taller mecánico.  
**100% estático** → ideal para **GitHub Pages**. Funciona offline y guarda los datos en el navegador.

## Características

- ✅ Registro de entrada de vehículos (placa, marca, modelo, cliente, teléfono, área, encargado, notas)
- ✅ Cambio de área de trabajo y personal encargado
- ✅ Marcar salida con hora automática
- ✅ Dashboard con vehículos actualmente en el taller
- ✅ Historial completo de movimientos
- ✅ Gestión de áreas y personal
- ✅ Búsqueda y filtros
- ✅ Exportar / Importar datos (backup en JSON)
- ✅ Diseño moderno y responsive (móvil y PC)

## Cómo subirlo a GitHub Pages

### 1. Crear un repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `taller-pro` (o el que prefieras)
3. Déjalo **público**
4. **No** marques "Add a README"
5. Crea el repositorio

### 2. Subir los archivos

Puedes hacerlo de dos formas:

#### Opción A — Desde la web de GitHub
1. En tu repositorio vacío haz clic en **uploading an existing file**
2. Arrastra los 3 archivos: `index.html`, `styles.css`, `app.js`
3. Haz commit

#### Opción B — Con Git (recomendado)
```bash
git clone https://github.com/TU-USUARIO/taller-pro.git
cd taller-pro
# Copia aquí los 3 archivos (index.html, styles.css, app.js)
git add .
git commit -m "Sistema de gestión de taller"
git push
```

### 3. Activar GitHub Pages

1. En el repositorio ve a **Settings** → **Pages**
2. En **Source** selecciona la rama `main` (o `master`) y carpeta `/ (root)`
3. Guarda
4. Espera 1-2 minutos
5. Tu sistema estará en:  
   `https://TU-USUARIO.github.io/taller-pro/`

## Uso

1. Abre la página
2. Ve a **Configuración** y agrega tus áreas reales y personal
3. Usa **Nueva Entrada** para registrar vehículos
4. En el **Dashboard** puedes:
   - Ver el detalle
   - Cambiar de área / encargado
   - Marcar la salida
5. Todo queda guardado automáticamente en el navegador

### Importante sobre los datos

- Los datos se guardan en el **localStorage** del navegador
- Si borras el caché o usas otro navegador/dispositivo, no verás los mismos datos
- Usa el botón **Exportar** periódicamente para hacer backup
- Puedes **Importar** el archivo JSON en otro equipo o después de limpiar el navegador

## Personalización rápida

Puedes editar en `app.js` las listas por defecto:

```js
const DEFAULT_AREAS = ['Mecánica', 'Pintura', 'Electricidad', ...];
const DEFAULT_PERSONAL = ['Juan Pérez', 'Carlos Ramírez', ...];
```

## Estructura de archivos

```
taller-pro/
├── index.html      # Página principal
├── styles.css      # Estilos
├── app.js          # Lógica de la aplicación
└── README.md       # Este archivo
```

---

Hecho para talleres que necesitan algo simple, rápido y sin costos de servidor.
