// ==================== TALLER PRO ENTERPRISE ====================

const STORAGE_KEY = 'taller_pro_v2';
const WELCOME_KEY = 'taller_pro_welcome_seen';

const DEFAULT_AREAS = ['Mecánica General', 'Pintura y Latonería', 'Electricidad', 'Suspensión y Frenos', 'Diagnóstico Computarizado', 'Lavado y Detailing'];
const DEFAULT_PERSONAL = ['Carlos Mendoza', 'Ana Rodríguez', 'Luis Herrera', 'María González', 'Diego Vargas'];

// Sample data so the system is not empty
function createSampleData() {
  const now = Date.now();
  const h = (hours) => new Date(now - hours * 3600000).toISOString();

  return {
    areas: [...DEFAULT_AREAS],
    personal: [...DEFAULT_PERSONAL],
    registros: [
      {
        id: 'demo1',
        placa: 'ABC-123',
        marca: 'Toyota',
        modelo: 'Corolla 2022',
        color: 'Blanco perla',
        cliente: 'Andrés Mejía',
        telefono: '300 456 7890',
        areaActual: 'Mecánica General',
        encargado: 'Carlos Mendoza',
        notas: 'Ruido en motor al acelerar. Revisar correa de distribución.',
        estado: 'en_taller',
        fechaEntrada: h(5),
        fechaSalida: null,
        historial: [
          { fecha: h(5), accion: 'Entrada al taller', area: 'Diagnóstico Computarizado', encargado: 'Diego Vargas', nota: 'Recepción inicial' },
          { fecha: h(3), accion: 'Cambio de área/encargado', area: 'Mecánica General', encargado: 'Carlos Mendoza', nota: 'Diagnóstico confirma problema de correa' }
        ]
      },
      {
        id: 'demo2',
        placa: 'XYZ-789',
        marca: 'Chevrolet',
        modelo: 'Onix 2021',
        color: 'Rojo',
        cliente: 'Laura Jiménez',
        telefono: '310 987 6543',
        areaActual: 'Pintura y Latonería',
        encargado: 'Ana Rodríguez',
        notas: 'Rayón profundo puerta delantera derecha + retoque de pintura.',
        estado: 'en_taller',
        fechaEntrada: h(28),
        fechaSalida: null,
        historial: [
          { fecha: h(28), accion: 'Entrada al taller', area: 'Pintura y Latonería', encargado: 'Ana Rodríguez', nota: 'Trabajo de pintura y latonería' }
        ]
      },
      {
        id: 'demo3',
        placa: 'DEF-456',
        marca: 'Mazda',
        modelo: 'CX-5 2023',
        color: 'Gris metálico',
        cliente: 'Roberto Castillo',
        telefono: '315 222 3344',
        areaActual: 'Suspensión y Frenos',
        encargado: 'Luis Herrera',
        notas: 'Cambio de pastillas y discos de freno + alineación.',
        estado: 'en_taller',
        fechaEntrada: h(8),
        fechaSalida: null,
        historial: [
          { fecha: h(8), accion: 'Entrada al taller', area: 'Suspensión y Frenos', encargado: 'Luis Herrera', nota: null }
        ]
      },
      {
        id: 'demo4',
        placa: 'GHI-321',
        marca: 'Kia',
        modelo: 'Sportage 2020',
        color: 'Negro',
        cliente: 'Patricia López',
        telefono: '320 555 1122',
        areaActual: 'Electricidad',
        encargado: 'María González',
        notas: 'Falla intermitente en sistema de luces LED y sensor ABS.',
        estado: 'en_taller',
        fechaEntrada: h(2),
        fechaSalida: null,
        historial: [
          { fecha: h(2), accion: 'Entrada al taller', area: 'Electricidad', encargado: 'María González', nota: 'Cliente reporta luces parpadeantes' }
        ]
      },
      {
        id: 'demo5',
        placa: 'JKL-654',
        marca: 'Hyundai',
        modelo: 'Tucson 2019',
        color: 'Azul oscuro',
        cliente: 'Fernando Ruiz',
        telefono: '301 777 8899',
        areaActual: 'Lavado y Detailing',
        encargado: 'Diego Vargas',
        notas: 'Lavado completo + encerado + limpieza interior premium.',
        estado: 'en_taller',
        fechaEntrada: h(1.5),
        fechaSalida: null,
        historial: [
          { fecha: h(1.5), accion: 'Entrada al taller', area: 'Lavado y Detailing', encargado: 'Diego Vargas', nota: 'Servicio de detailing' }
        ]
      },
      {
        id: 'demo6',
        placa: 'MNO-987',
        marca: 'Ford',
        modelo: 'Escape 2018',
        color: 'Plata',
        cliente: 'Claudia Vargas',
        telefono: '318 444 5566',
        areaActual: 'Mecánica General',
        encargado: 'Carlos Mendoza',
        notas: 'Cambio de aceite, filtros y revisión general de 60.000 km.',
        estado: 'entregado',
        fechaEntrada: h(72),
        fechaSalida: h(48),
        historial: [
          { fecha: h(72), accion: 'Entrada al taller', area: 'Mecánica General', encargado: 'Carlos Mendoza', nota: 'Mantenimiento preventivo' },
          { fecha: h(48), accion: 'Salida del taller', area: 'Mecánica General', encargado: 'Carlos Mendoza', nota: null }
        ]
      },
      {
        id: 'demo7',
        placa: 'PQR-111',
        marca: 'Nissan',
        modelo: 'Versa 2022',
        color: 'Blanco',
        cliente: 'Jorge Ramírez',
        telefono: '300 111 2233',
        areaActual: 'Diagnóstico Computarizado',
        encargado: 'Diego Vargas',
        notas: 'Check engine encendido. Diagnóstico completo.',
        estado: 'entregado',
        fechaEntrada: h(96),
        fechaSalida: h(70),
        historial: [
          { fecha: h(96), accion: 'Entrada al taller', area: 'Diagnóstico Computarizado', encargado: 'Diego Vargas', nota: 'Luz de check engine' },
          { fecha: h(80), accion: 'Cambio de área/encargado', area: 'Mecánica General', encargado: 'Carlos Mendoza', nota: 'Sensor MAF defectuoso' },
          { fecha: h(70), accion: 'Salida del taller', area: 'Mecánica General', encargado: 'Carlos Mendoza', nota: null }
        ]
      }
    ]
  };
}

let data = createSampleData();

// ==================== UTILS ====================

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function nowISO() { return new Date().toISOString(); }

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-CO', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatDuration(entrada, salida) {
  if (!entrada) return '—';
  const end = salida ? new Date(salida) : new Date();
  const mins = Math.floor((end - new Date(entrada)) / 60000);
  if (mins < 60) return mins + ' min';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h < 24) return h + 'h ' + m + 'm';
  const d = Math.floor(h / 24);
  return d + 'd ' + (h % 24) + 'h';
}

function toast(msg, type = 'success') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3200);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.registros && Array.isArray(parsed.registros)) {
        data = parsed;
        data.areas = data.areas || [...DEFAULT_AREAS];
        data.personal = data.personal || [...DEFAULT_PERSONAL];
      }
    } catch (e) { /* keep sample */ }
  } else {
    // First visit → save sample data
    save();
  }
}

// ==================== NAVIGATION ====================

const viewMeta = {
  dashboard: { title: 'Dashboard', sub: 'Panel de control en tiempo real' },
  entrada: { title: 'Nueva Entrada', sub: 'Registro de ingreso de vehículo' },
  historial: { title: 'Historial', sub: 'Registro histórico completo' },
  tutorial: { title: 'Tutoriales', sub: 'Aprende a dominar el sistema' },
  config: { title: 'Configuración', sub: 'Áreas, personal y datos' }
};

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const el = document.getElementById('view-' + name);
  if (el) el.classList.add('active');

  const btn = document.querySelector(`.nav-btn[data-view="${name}"]`);
  if (btn) btn.classList.add('active');

  const meta = viewMeta[name] || { title: name, sub: '' };
  document.getElementById('viewTitle').textContent = meta.title;
  document.getElementById('viewSubtitle').textContent = meta.sub;

  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');

  if (name === 'dashboard') renderDashboard();
  if (name === 'historial') renderHistorial();
  if (name === 'config') renderConfig();
  if (name === 'entrada') fillSelects();
}

window.showView = showView;

// ==================== SELECTS ====================

function fillSelects() {
  const a = document.getElementById('selectAreaEntrada');
  const e = document.getElementById('selectEncargadoEntrada');
  if (!a || !e) return;
  a.innerHTML = data.areas.map(x => `<option value="${x}">${x}</option>`).join('');
  e.innerHTML = data.personal.map(x => `<option value="${x}">${x}</option>`).join('');
}

// ==================== DASHBOARD ====================

function renderDashboard() {
  const activos = data.registros.filter(r => r.estado === 'en_taller');
  const entregados = data.registros.filter(r => r.estado === 'entregado');
  const hoy = new Date().toDateString();
  const entradasHoy = data.registros.filter(r => new Date(r.fechaEntrada).toDateString() === hoy).length;
  const salidasHoy = data.registros.filter(r => r.fechaSalida && new Date(r.fechaSalida).toDateString() === hoy).length;

  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card"><div class="number">${activos.length}</div><div class="label">En taller ahora</div></div>
    <div class="stat-card"><div class="number">${entradasHoy}</div><div class="label">Entradas hoy</div></div>
    <div class="stat-card"><div class="number">${salidasHoy}</div><div class="label">Salidas hoy</div></div>
    <div class="stat-card"><div class="number">${entregados.length}</div><div class="label">Total entregados</div></div>
  `;

  document.getElementById('liveCount').textContent = activos.length + ' activos';

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
      <td><span class="placa">${r.placa}</span></td>
      <td>${r.marca} ${r.modelo}${r.color ? '<br><small style="color:var(--text-muted)">' + r.color + '</small>' : ''}</td>
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
  const search = (document.getElementById('searchHistorial')?.value || '').toLowerCase();
  const filtro = document.getElementById('filtroEstado')?.value || 'todos';

  let lista = [...data.registros].sort((a, b) => new Date(b.fechaEntrada) - new Date(a.fechaEntrada));

  if (filtro !== 'todos') lista = lista.filter(r => r.estado === filtro);
  if (search) {
    lista = lista.filter(r =>
      r.placa.toLowerCase().includes(search) ||
      r.cliente.toLowerCase().includes(search) ||
      r.marca.toLowerCase().includes(search) ||
      (r.modelo || '').toLowerCase().includes(search)
    );
  }

  const tbody = document.getElementById('tablaHistorial');
  tbody.innerHTML = lista.length ? lista.map(r => `
    <tr>
      <td><span class="placa">${r.placa}</span></td>
      <td>${r.marca} ${r.modelo}</td>
      <td>${r.cliente}</td>
      <td><span class="badge ${r.estado === 'en_taller' ? 'badge-taller' : 'badge-entregado'}">${r.estado === 'en_taller' ? 'En taller' : 'Entregado'}</span></td>
      <td>${formatDate(r.fechaEntrada)}</td>
      <td>${formatDate(r.fechaSalida)}</td>
      <td>${formatDuration(r.fechaEntrada, r.fechaSalida)}</td>
      <td><button class="btn-sm" onclick="abrirDetalle('${r.id}')">Ver</button></td>
    </tr>
  `).join('') : '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:40px">Sin registros</td></tr>';
}

// ==================== CONFIG ====================

function renderConfig() {
  document.getElementById('listaAreas').innerHTML = data.areas.map((a, i) =>
    `<li>${a} <button class="delete-btn" onclick="eliminarArea(${i})" title="Eliminar">✕</button></li>`
  ).join('') || '<li style="color:var(--text-muted)">Sin áreas</li>';

  document.getElementById('listaPersonal').innerHTML = data.personal.map((p, i) =>
    `<li>${p} <button class="delete-btn" onclick="eliminarPersonal(${i})" title="Eliminar">✕</button></li>`
  ).join('') || '<li style="color:var(--text-muted)">Sin personal</li>';
}

function eliminarArea(i) {
  if (data.areas.length <= 1) return toast('Debe quedar al menos un área', 'error');
  data.areas.splice(i, 1);
  save(); renderConfig(); toast('Área eliminada');
}

function eliminarPersonal(i) {
  if (data.personal.length <= 1) return toast('Debe quedar al menos una persona', 'error');
  data.personal.splice(i, 1);
  save(); renderConfig(); toast('Personal eliminado');
}

window.eliminarArea = eliminarArea;
window.eliminarPersonal = eliminarPersonal;

// ==================== MODAL ====================

function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

window.closeModal = closeModal;

function abrirDetalle(id) {
  const r = data.registros.find(x => x.id === id);
  if (!r) return;

  const hist = (r.historial || []).map(h => `
    <div class="item">
      <div class="fecha">${formatDate(h.fecha)}</div>
      <div><strong>${h.accion}</strong>${h.area ? ' → ' + h.area : ''}${h.encargado ? ' · ' + h.encargado : ''}</div>
      ${h.nota ? `<div style="color:var(--text-muted);font-size:0.82rem;margin-top:2px">${h.nota}</div>` : ''}
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
      <div class="info-item"><label>Tiempo total</label><span>${formatDuration(r.fechaEntrada, r.fechaSalida)}</span></div>
    </div>
    ${r.notas ? `<p style="margin-bottom:18px;font-size:0.9rem"><strong>Notas:</strong> ${r.notas}</p>` : ''}
    <h4 style="font-size:0.9rem;margin-bottom:10px;color:var(--text-secondary)">Historial de movimientos</h4>
    <div class="timeline">${hist || '<p style="color:var(--text-muted)">Sin movimientos</p>'}</div>
    ${r.estado === 'en_taller' ? `
      <div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">
        <button class="btn-primary" onclick="abrirCambio('${r.id}');closeModal()">Cambiar área</button>
        <button class="btn-primary" style="background:linear-gradient(135deg,#10b981,#059669)" onclick="marcarSalida('${r.id}');closeModal()">Marcar salida</button>
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
    <h3>Mover — ${r.placa}</h3>
    <form id="formCambio" onsubmit="guardarCambio(event,'${id}')">
      <div class="form-group" style="margin-bottom:14px">
        <label>Nueva área</label>
        <select name="area" required>${areasOpts}</select>
      </div>
      <div class="form-group" style="margin-bottom:14px">
        <label>Encargado</label>
        <select name="encargado" required>${encOpts}</select>
      </div>
      <div class="form-group" style="margin-bottom:20px">
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
  const r = data.registros.find(x => x.id === id);
  if (!r) return;

  r.areaActual = form.area.value;
  r.encargado = form.encargado.value;
  r.historial = r.historial || [];
  r.historial.push({
    fecha: nowISO(),
    accion: 'Cambio de área/encargado',
    area: form.area.value,
    encargado: form.encargado.value,
    nota: form.nota.value.trim() || null
  });

  save();
  closeModal();
  renderDashboard();
  toast(`Vehículo ${r.placa} movido a ${form.area.value}`);
}

function marcarSalida(id) {
  const r = data.registros.find(x => x.id === id);
  if (!r || r.estado !== 'en_taller') return;
  if (!confirm(`¿Confirmar salida del vehículo ${r.placa}?`)) return;

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

window.abrirDetalle = abrirDetalle;
window.abrirCambio = abrirCambio;
window.marcarSalida = marcarSalida;
window.guardarCambio = guardarCambio;

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  load();

  // Navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
  });

  document.getElementById('sidebarOverlay')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  });

  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modal')?.addEventListener('click', e => {
    if (e.target.id === 'modal') closeModal();
  });

  // Welcome modal
  if (!localStorage.getItem(WELCOME_KEY)) {
    document.getElementById('welcomeModal').classList.add('open');
  }
  document.getElementById('btnStart')?.addEventListener('click', () => {
    localStorage.setItem(WELCOME_KEY, '1');
    document.getElementById('welcomeModal').classList.remove('open');
  });

  // Form entrada
  document.getElementById('formEntrada')?.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const placa = f.placa.value.trim().toUpperCase();

    if (data.registros.find(r => r.placa === placa && r.estado === 'en_taller')) {
      toast(`La placa ${placa} ya está en el taller`, 'error');
      return;
    }

    data.registros.push({
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
    });

    save();
    f.reset();
    toast(`Entrada registrada: ${placa}`);
    showView('dashboard');
  });

  // Config forms
  document.getElementById('formArea')?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = e.target.nombre.value.trim();
    if (!nombre) return;
    if (data.areas.includes(nombre)) return toast('Esa área ya existe', 'error');
    data.areas.push(nombre);
    save(); e.target.reset(); renderConfig(); toast('Área agregada');
  });

  document.getElementById('formPersonal')?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = e.target.nombre.value.trim();
    if (!nombre) return;
    if (data.personal.includes(nombre)) return toast('Ya existe', 'error');
    data.personal.push(nombre);
    save(); e.target.reset(); renderConfig(); toast('Personal agregado');
  });

  // Search & filters
  document.getElementById('searchDashboard')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#tablaActivos tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });

  document.getElementById('searchHistorial')?.addEventListener('input', renderHistorial);
  document.getElementById('filtroEstado')?.addEventListener('change', renderHistorial);

  // Export / Import
  document.getElementById('btnExport')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `taller-pro-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    toast('Backup exportado');
  });

  document.getElementById('btnImport')?.addEventListener('click', () => {
    document.getElementById('importFile').click();
  });

  document.getElementById('importFile')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!imported.registros) throw new Error('invalid');
        if (confirm('¿Reemplazar todos los datos actuales?')) {
          data = {
            areas: imported.areas || DEFAULT_AREAS,
            personal: imported.personal || DEFAULT_PERSONAL,
            registros: imported.registros
          };
          save();
          showView('dashboard');
          toast('Datos importados');
        }
      } catch {
        toast('Archivo inválido', 'error');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  document.getElementById('btnLimpiarTodo')?.addEventListener('click', () => {
    if (confirm('¿Borrar TODOS los datos? Esta acción no se puede deshacer.')) {
      if (confirm('Confirma de nuevo: se eliminará todo.')) {
        data = createSampleData();
        // Clear and re-save sample so it is not empty again
        localStorage.removeItem(STORAGE_KEY);
        save();
        showView('dashboard');
        toast('Datos restablecidos con ejemplos');
      }
    }
  });

  fillSelects();
  showView('dashboard');
});
