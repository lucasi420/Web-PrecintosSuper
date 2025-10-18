let dataCable = [], dataInternet = [], dataGpon = [], probableGpon = [];

// --- Cargar JSON automáticamente ---
async function cargarDatos() {
  dataCable = await fetch('data/clientes_cable.json').then(r => r.json());
  dataInternet = await fetch('data/clientes_internet.json').then(r => r.json());
  dataGpon = await fetch('data/clientes_gpon_borrados.json').then(r => r.json());
  probableGpon = await fetch('data/probable_gpon.json').then(r => r.json());
}
cargarDatos();

// --- Cambiar pestañas ---
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// --- Buscar en CABLE ---
document.getElementById('busquedaCable').addEventListener('input', e => {
  const term = e.target.value.trim().toLowerCase();
  const resultados = dataCable.filter(c => c.precinto?.toLowerCase().includes(term));
  mostrarResultados(resultados, 'resultadosCable');
});

// --- Buscar en INTERNET ---
document.getElementById('busquedaInternet').addEventListener('input', e => {
  const term = e.target.value.trim().toLowerCase();
  const resultados = dataInternet.filter(c =>
    c.precinto?.toLowerCase().includes(term) || c.nap?.toLowerCase().includes(term)
  );
  mostrarResultados(resultados, 'resultadosInternet');
});

// --- Botón Copiar ---
document.getElementById('copiarInternet').addEventListener('click', () => {
  const texto = dataInternet.map(c => `${c.nombre}`).join('\n');
  navigator.clipboard.writeText(texto);
  alert("Clientes copiados al portapapeles ✅");
});

// --- Buscar en GPON + botón “Probable datos GPON” ---
document.getElementById('busquedaGpon').addEventListener('input', e => {
  const term = e.target.value.trim().toLowerCase();
  const resultados = dataGpon.filter(c =>
    c.numero_cliente?.toString().includes(term) ||
    c.nombre?.toLowerCase().includes(term)
  );
  const html = resultados.map(c => `
    <div class="cliente">
      <strong>${c.nombre}</strong> - ${c.domicilio} - ${c.estado}
      <button onclick="verProbableGpon('${c.numero_cliente}')">Probable datos GPON</button>
    </div>
  `).join('');
  document.getElementById('resultadosGpon').innerHTML = html || "Sin resultados";
});

function verProbableGpon(numero) {
  const encontrado = probableGpon.find(p => p.numero_cliente == numero);
  if (encontrado) {
    alert(`Cliente ${numero}
NAP: ${encontrado.nap}
Nodo: ${encontrado.nodo}
Puerto: ${encontrado.puerto}
Estado probable: ${encontrado.estado_probable}`);
  } else {
    alert("No se encontraron datos probables para este cliente.");
  }
}

// --- Función general para mostrar resultados ---
function mostrarResultados(lista, idDestino) {
  const html = lista.map(c => `
    <div class="cliente">
      <strong>${c.nombre}</strong> - ${c.domicilio} - ${c.estado}
    </div>
  `).join('');
  document.getElementById(idDestino).innerHTML = html || "Sin resultados";
}
