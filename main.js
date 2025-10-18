let dataCable = [{nombre:"Juan Pérez", numero_cliente:"1001", precinto:"C-001", estado:"Conectado", domicilio:"San Martín 452"}];
let dataInternet = [{nombre:"Juan Pérez", numero_cliente:"1001", precinto:"I-001", estado:"Conectado", domicilio:"San Martín 452", nap:"NAP-01", nodo:"Nodo-01", puerto:"12"}];
let dataGPON = [{nombre:"Juan Pérez", numero_cliente:"1001", precinto:"GPON-01", estado:"Borrado", domicilio:"San Martín 452", nap:"NAP-01", nodo:"Nodo-01", puerto:"12"}];
let probableGPONData = [{numero_cliente:"1001", nap:"NAP-01", nodo:"Nodo-01", puerto:"12", estado_probable:"Conectado"}];

// Función para mostrar sección
function mostrarSeccion(seccion){
  document.querySelectorAll('.seccion').forEach(s=>s.classList.remove('active'));
  document.getElementById(seccion).classList.add('active');
}

// Función copiar al portapapeles
function copiarClientes(clientes){
  const texto = clientes.map(c=>c.nombre).join("\n");
  navigator.clipboard.writeText(texto)
    .then(()=>alert(Se copiaron ${clientes.length} clientes))
    .catch(err=>console.error("Error:", err));
}

// CABLE
function buscarPrecintoCable(){
  const precinto = document.getElementById("inputPrecintoCable").value.trim();
  const resultados = dataCable.filter(c=>c.precinto === precinto);
  const div = document.getElementById("resultadoCable");
  if(resultados.length===0) return div.innerHTML="<p>No se encontró</p>";
  div.innerHTML = <button class="copyBtn" onclick="copiarClientes(dataCable)">Copiar todos al portapapeles</button> +
    resultados.map(c=><p>${c.nombre} - ${c.domicilio} - <span class="${c.estado.toLowerCase()}">${c.estado}</span></p>).join("");
}

// INTERNET
function buscarNAP(){
  const nap = document.getElementById("inputNAP").value.trim();
  const resultados = dataInternet.filter(c=>c.nap === nap);
  const div = document.getElementById("resultadoNAP");
  if(resultados.length===0) return div.innerHTML="<p>No se encontró</p>";
  div.innerHTML = <button class="copyBtn" onclick="copiarClientes(dataInternet)">Copiar todos al portapapeles</button> +
    resultados.map(c=><p>${c.nombre} - ${c.domicilio} - ${c.estado} - Nodo: ${c.nodo} - Puerto: ${c.puerto}</p>).join("");
}

// GPON
function buscarGPON(){
  const precinto = document.getElementById("inputPrecintoGPON").value.trim();
  const resultados = dataGPON.filter(c=>c.precinto === precinto);
  const div = document.getElementById("resultadoGPON");
  if(resultados.length===0) return div.innerHTML="<p>No se encontró</p>";
  div.innerHTML = <button class="copyBtn" onclick="copiarClientes(dataGPON)">Copiar todos al portapapeles</button> +
    resultados.map(c=>`<p>${c.nombre} - ${c.domicilio} - <span class="${c.estado.toLowerCase()}">${c.estado}</span>
    <button onclick="mostrarProbableGPON('${c.numero_cliente}')">Probable datos GPON</button></p>`).join("");
}

// Probable GPON
function mostrarProbableGPON(numeroCliente){
  const datos = probableGPONData.find(c=>c.numero_cliente==numeroCliente);
  if(datos){
    alert(Cliente: ${numeroCliente}\nNAP: ${datos.nap}\nNodo: ${datos.nodo}\nPuerto: ${datos.puerto}\nEstado probable: ${datos.estado_probable});
  } else {
    alert("No se encontraron datos probables para este cliente.");
  }
}
