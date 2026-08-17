// ==================== TALLER PRO - Sistema de Gestión ====================

const STORAGE_KEY = 'taller_pro_data';

const DEFAULT_AREAS = ['Mecánica', 'Pintura', 'Electricidad', 'Suspensión', 'Diagnóstico', 'Lavado'];
const DEFAULT_PERSONAL = ['Juan Pérez', 'Carlos Ramírez', 'Ana López', 'Miguel Torres'];

// Estado inicial
let data = {
  areas: [...DEFAULT_AREAS],
  personal: [...DEFAULT_PERSONAL],
  registros: []
};

// ==================== UTILIDADES ====================

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function nowISO() {
  return new Date().toISOString();
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDuration(entrada, salida) {
  if (!entrada) return '—';
  const end = salida ? new Date(salida) : new Date();
  const start = new Date(entrada);
  const mins = Math.floor((end - start) / 60000);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h < 24) return `${h}h ${m}m`;
  const d = Math.floor(h / 24);
  return `${d}d ${h % 24}h`;
}

function toast(msg, type = 'success') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast show ${type}`;
  setTimeout(() => el.classList.remove('show'), 3000);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      data = JSON.parse(raw);
      // Asegurar arrays
      data.areas = data.areas || [...DEFAULT_AREAS];
      data.personal = data.personal || [...DEFAULT_PERSONAL];
      data.registros = data.registros || [];
    } catch (e) {
      console.error('Error cargando datos', e);
    }
  }
}

// ==================== NAVEGACIÓN ====================

const views = {
  dashboard: { title: 'Dashboard', el: 'view-dashboard' },
  entrada: { title: 'Nueva Entrada', el: 'view-entrada' },
  historial: { title: 'Historial', el: 'view-historial' },
  config: { title: 'Configuración', el: 'view-config' }
};

function showView(name) {
  Object.keys(views).forEach(k => {
    document.getElementById(views[k].el).classList.remove('active');
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(views[name].el).classList.add('active');
  document.querySelector(`.nav-btn[data-view="${name}"]`).classList.add('active');
  document.getElementById('viewTitle').textContent = views[name].title;
  document.getElementById('sidebar').classList.remove('open');

  if (name === 'dashboard') renderDashboard();
  if (name === 'historial') renderHistorial();
  if (name === 'config') renderConfig();
  if (name === 'entrada') fillSelectsEntrada();
}

// ==================== SELECTS ====================

function fillSelectsEntrada() {
  const areaSel = document.getElementById('selectAreaEntrada');
  const encSel = document.getElementById('selectEncargadoEntrada');
  areaSel.innerHTML = data.areas.map(a => `<option value="${a}">${a}</option>`).join('');
  encSel.innerHTML = data.personal.map(p => `<option value="${p}">${p}</option>`).join('');
}

// ==================== DASHBOARD ====================

function renderDashboard() {
  const activos = data.registros.filter(r => r.estado === 'en_taller');
  const entregados = data.registros.filter(r => r.estado === 'entregado');
  const hoy = new Date().toDateString();
  const entradasHoy = data.registros.filter(r => new Date(r.fechaEntrada).toDateString() === hoy).length;
  const salidasHoy = data.registros.filter(r => r.fechaSalida && new Date(r.fechaSalida).toDateString() === hoy).length;

  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card"><div class="number">${activos.length}</div><div class="label">En taller</div></div>
    <div class="stat-card"><div class="number">${entradasHoy}</div><div class="label">Entradas hoy</div></div>
    <div class="stat-card"><div class="number">${salidasHoy}</div><div class="label">Salidas hoy</div></div>
    <div class="stat-card"><div class="number">${entregados.length}</div><div class="label">Total entregados</div></div>
  `;

  document.getElementById('statsMini').textContent = `${activos.length} vehículos activos`;

  const tbody = document.getElementById('tablaActivos');
  const empty = document.getElementById('emptyActivos');

  if (activos.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = activos.map(r => `
    <tr>
      <td><strong>${r.placa}</strong></td>
      <td>${r.marca} ${r.modelo}${r.color ? ' · ' + r.color : ''}</td>
      <td>${r.cliente}</td>
      <td>${r.areaActual}</td>
      <td>${r.encargado}</td>
      <td>${formatDate(r.fechaEntrada)}</td>
      <td>
        <button class="btn-sm" onclick="abrirDetalle('${r.id}')">Ver</button>
        <button class="btn-sm" onclick="abrirCambio('${r.id}')">Mover</button>
        <button class="btn-sm success" onclick="marcarSalida('${r.id}')">Salida</button>
      </td>
    </tr>
  `).join('');
}

// ==================== HISTORIAL ====================

function renderHistorial() {
  const search = (document.getElementById('searchHistorial').value || '').toLowerCase();
  const filtro = document.getElementById('filtroEstado').value;

  let lista = [...data.registros].sort((a, b) => new Date(b.fechaEntrada) - new Date(a.fechaEntrada));

  if (filtro !== 'todos') {
    lista = lista.filter(r => r.estado === filtro);
  }
  if (search) {
    lista = lista.filter(r =>
      r.placa.toLowerCase().includes(search) ||
      r.cliente.toLowerCase().includes(search) ||
      r.marca.toLowerCase().includes(search) ||
      r.modelo.toLowerCase().includes(search)
    );
  }

  const tbody = document.getElementById('tablaHistorial');
  tbody.innerHTML = lista.map(r => `
    <tr>
      <td><strong>${r.placa}</strong></td>
      <td>${r.marca} ${r.modelo}</td>
      <td>${r.cliente}</td>
      <td><span class="badge ${r.estado === 'en_taller' ? 'badge-taller' : 'badge-entregado'}">${r.estado === 'en_taller' ? 'En taller' : 'Entregado'}</span></td>
      <td>${formatDate(r.fechaEntrada)}</td>
      <td>${formatDate(r.fechaSalida)}</td>
      <td>${formatDuration(r.fechaEntrada, r.fechaSalida)}</td>
      <td><button class="btn-sm" onclick="abrirDetalle('${r.id}')">Ver</button></td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--text-muted)">Sin registros</td></tr>';
}

// ==================== CONFIG ====================

function renderConfig() {
  document.getElementById('listaAreas').innerHTML = data.areas.map((a, i) => `
    <li>${a} <button class="delete-btn" onclick="eliminarArea(${i})">✕</button></li>
  `).join('') || '<li style="color:var(--text-muted)">Sin áreas</li>';

  document.getElementById('listaPersonal').innerHTML = data.personal.map((p, i) => `
    <li>${p} <button class="delete-btn" onclick="eliminarPersonal(${i})">✕</button></li>
  `).join('') || '<li style="color:var(--text-muted)">Sin personal</li>';
}

function eliminarArea(i) {
  if (data.areas.length <= 1) return toast('Debe haber al menos un área', 'error');
  data.areas.splice(i, 1);
  save();
  renderConfig();
  toast('Área eliminada');
}

function eliminarPersonal(i) {
  if (data.personal.length <= 1) return toast('Debe haber al menos una persona', 'error');
  data.personal.splice(i, 1);
  save();
  renderConfig();
  toast('Personal eliminado');
}

// ==================== MODAL ====================

function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

function abrirDetalle(id) {
  const r = data.registros.find(x => x.id === id);
  if (!r) return;

  const hist = (r.historial || []).map(h => `
    <div class="item">
      <div class="fecha">${formatDate(h.fecha)}</div>
      <div><strong>${h.accion}</strong>${h.area ? ' → ' + h.area : ''}${h.encargado ? ' · ' + h.encargado : ''}</div>
      ${h.nota ? `<div style="color:var(--text-muted);font-size:0.85rem">${h.nota}</div>` : ''}
    </div>
  `).join('');

  openModal(`
    <h3>${r.placa} — ${r.marca} ${r.modelo}</h3>
    <div class="info-grid">
      <div class="info-item"><label>Cliente</label><span>${r.cliente}</span></div>
      <div class="info-item"><label>Teléfono</label><span>${r.telefono || '—'}</span></div>
      <div class="info-item"><label>Color</label><span>${r.color || '—'}</span></div>
      <div class="info-item"><label>Estado</label><span class="badge ${r.estado === 'en_taller' ? 'badge-taller' : 'badge-entregado'}">${r.estado === 'en_taller' ? 'En taller' : 'Entregado'}</span></div>
      <div class="info-item"><label>Área actual</label><span>${r.areaActual}</span></div>
      <div class="info-item"><label>Encargado</label><span>${r.encargado}</span></div>
      <div class="info-item"><label>Entrada</label><span>${formatDate(r.fechaEntrada)}</span></div>
      <div class="info-item"><label>Salida</label><span>${formatDate(r.fechaSalida)}</span></div>
      <div class="info-item"><label>Tiempo</label><span>${formatDuration(r.fechaEntrada, r.fechaSalida)}</span></div>
    </div>
    ${r.notas ? `<p style="margin-bottom:16px"><strong>Notas iniciales:</strong> ${r.notas}</p>` : ''}
    <h4 style="margin-bottom:8px">Historial de movimientos</h4>
    <div class="historial-timeline">${hist || '<p style="color:var(--text-muted)">Sin movimientos</p>'}</div>
    ${r.estado === 'en_taller' ? `
      <div style="display:flex;gap:8px;margin-top:20px">
        <button class="btn-primary" onclick="abrirCambio('${r.id}');closeModal()">Cambiar área</button>
        <button class="btn-primary" style="background:var(--success)" onclick="marcarSalida('${r.id}');closeModal()">Marcar salida</button>
      </div>
    ` : ''}
  `);
}

function abrirCambio(id) {
  const r = data.registros.find(x => x.id === id);
  if (!r || r.estado !== 'en_taller') return;

  const areasOpts = data.areas.map(a => `<option value="${a}" ${a === r.areaActual ? 'selected' : ''}>${a}</option>`).join('');
  const encOpts = data.personal.map(p => `<option value="${p}" ${p === r.encargado ? 'selected' : ''}>${p}</option>`).join('');

  openModal(`
    <h3>Mover vehículo — ${r.placa}</h3>
    <form id="formCambio" onsubmit="guardarCambio(event, '${id}')">
      <div class="form-group" style="margin-bottom:12px">
        <label>Nueva área</label>
        <select name="area" required>${areasOpts}</select>
      </div>
      <div class="form-group" style="margin-bottom:12px">
        <label>Encargado</label>
        <select name="encargado" required>${encOpts}</select>
      </div>
      <div class="form-group" style="margin-bottom:16px">
        <label>Nota (opcional)</label>
        <input type="text" name="nota" placeholder="Motivo del cambio..." />
      </div>
      <button type="submit" class="btn-primary">Guardar cambio</button>
    </form>
  `);
}

function guardarCambio(e, id) {
  e.preventDefault();
  const form = e.target;
  const area = form.area.value;
  const encargado = form.encargado.value;
  const nota = form.nota.value.trim();

  const r = data.registros.find(x => x.id === id);
  if (!r) return;

  r.areaActual = area;
  r.encargado = encargado;
  r.historial = r.historial || [];
  r.historial.push({
    fecha: nowISO(),
    accion: 'Cambio de área/encargado',
    area,
    encargado,
    nota: nota || null
  });

  save();
  closeModal();
  renderDashboard();
  toast(`Vehículo ${r.placa} movido a ${area}`);
}

function marcarSalida(id) {
  const r = data.registros.find(x => x.id === id);
  if (!r || r.estado !== 'en_taller') return;

  if (!confirm(`¿Marcar salida del vehículo ${r.placa}?`)) return;

  r.estado = 'entregado';
  r.fechaSalida = nowISO();
  r.historial = r.historial || [];
  r.historial.push({
    fecha: r.fechaSalida,
    accion: 'Salida del taller',
    area: r.areaActual,
    encargado: r.encargado
  });

  save();
  renderDashboard();
  toast(`Salida registrada: ${r.placa}`);
}

// ==================== EVENTOS ====================

document.addEventListener('DOMContentLoaded', () => {
  load();

  // Navegación
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') closeModal();
  });

  // Form entrada
  document.getElementById('formEntrada').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const placa = f.placa.value.trim().toUpperCase();

    // Evitar duplicados activos
    const yaActivo = data.registros.find(r => r.placa === placa && r.estado === 'en_taller');
    if (yaActivo) {
      toast(`La placa ${placa} ya está registrada en el taller`, 'error');
      return;
    }

    const registro = {
      id: uid(),
      placa,
      marca: f.marca.value.trim(),
      modelo: f.modelo.value.trim(),
      color: f.color.value.trim(),
      cliente: f.cliente.value.trim(),
      telefono: f.telefono.value.trim(),
      areaActual: f.area.value,
      encargado: f.encargado.value,
      notas: f.notas.value.trim(),
      estado: 'en_taller',
      fechaEntrada: nowISO(),
      fechaSalida: null,
      historial: [{
        fecha: nowISO(),
        accion: 'Entrada al taller',
        area: f.area.value,
        encargado: f.encargado.value,
        nota: f.notas.value.trim() || null
      }]
    };

    data.registros.push(registro);
    save();
    f.reset();
    toast(`Entrada registrada: ${placa}`);
    showView('dashboard');
  });

  // Config áreas
  document.getElementById('formArea').addEventListener('submit', e => {
    e.preventDefault();
    const nombre = e.target.nombre.value.trim();
    if (!nombre) return;
    if (data.areas.includes(nombre)) {
      toast('Esa área ya existe', 'error');
      return;
    }
    data.areas.push(nombre);
    save();
    e.target.reset();
    renderConfig();
    toast('Área agregada');
  });

  // Config personal
  document.getElementById('formPersonal').addEventListener('submit', e => {
    e.preventDefault();
    const nombre = e.target.nombre.value.trim();
    if (!nombre) return;
    if (data.personal.includes(nombre)) {
      toast('Esa persona ya existe', 'error');
      return;
    }
    data.personal.push(nombre);
    save();
    e.target.reset();
    renderConfig();
    toast('Personal agregado');
  });

  // Búsqueda dashboard
  document.getElementById('searchDashboard').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#tablaActivos tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });

  // Historial filtros
  document.getElementById('searchHistorial').addEventListener('input', renderHistorial);
  document.getElementById('filtroEstado').addEventListener('change', renderHistorial);

  // Export / Import
  document.getElementById('btnExport').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taller-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Backup exportado');
  });

  document.getElementById('btnImport').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });

  document.getElementById('importFile').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!imported.registros || !Array.isArray(imported.registros)) {
          throw new Error('Formato inválido');
        }
        if (confirm('¿Reemplazar todos los datos actuales con el archivo importado?')) {
          data = {
            areas: imported.areas || DEFAULT_AREAS,
            personal: imported.personal || DEFAULT_PERSONAL,
            registros: imported.registros
          };
          save();
          showView('dashboard');
          toast('Datos importados correctamente');
        }
      } catch (err) {
        toast('Error al importar archivo', 'error');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  // Limpiar todo
  document.getElementById('btnLimpiarTodo').addEventListener('click', () => {
    if (confirm('¿Estás seguro de borrar TODOS los datos? Esta acción no se puede deshacer.')) {
      if (confirm('Confirma de nuevo: se eliminarán todos los registros, áreas y personal.')) {
        data = {
          areas: [...DEFAULT_AREAS],
          personal: [...DEFAULT_PERSONAL],
          registros: []
        };
        save();
        showView('dashboard');
        toast('Todos los datos han sido borrados');
      }
    }
  });

  // Iniciar
  fillSelectsEntrada();
  showView('dashboard');
});

// Exponer funciones globales para onclick
window.abrirDetalle = abrirDetalle;
window.abrirCambio = abrirCambio;
window.marcarSalida = marcarSalida;
window.guardarCambio = guardarCambio;
window.eliminarArea = eliminarArea;
window.eliminarPersonal = eliminarPersonal;
window.closeModal = closeModal;
