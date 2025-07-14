// js/comidas.js

let todosLosAlimentos = [];
let categoriasUnicas = [];

function abrirModal() {
  cargarCategoriasEnSelect();
  document.getElementById("modalNuevoAlimento").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalNuevoAlimento").style.display = "none";
}

function limpiarFormularioNuevoAlimento() {
  document.getElementById("nuevoNombre").value = "";
  document.getElementById("nuevoCalorias").value = "";
  document.getElementById("nuevoProteinas").value = "";
  document.getElementById("nuevoCarbohidratos").value = "";
  document.getElementById("nuevoGrasas").value = "";
  document.getElementById("nuevoVitaminas").value = "";
  document.getElementById("nuevaCategoria").value = "";
}

function guardarNuevoAlimento() {
  const categoriaSelect = document.getElementById("nuevaCategoria");
  const nuevo = {
    nombre: document.getElementById("nuevoNombre").value.trim(),
    calorias: parseFloat(document.getElementById("nuevoCalorias").value),
    proteinas: parseFloat(document.getElementById("nuevoProteinas").value),
    carbohidratos: parseFloat(document.getElementById("nuevoCarbohidratos").value),
    grasas: parseFloat(document.getElementById("nuevoGrasas").value),
    vitaminas: document.getElementById("nuevoVitaminas").value.trim(),
    categoria: categoriaSelect.value
  };

  if (!nuevo.nombre || isNaN(nuevo.calorias) || !nuevo.categoria) {
    alert("Por favor completa todos los campos requeridos.");
    return;
  }

  const alimentosGuardados = JSON.parse(localStorage.getItem("alimentosUsuario") || "[]");
  alimentosGuardados.push(nuevo);
  localStorage.setItem("alimentosUsuario", JSON.stringify(alimentosGuardados));

  cerrarModal();
  limpiarFormularioNuevoAlimento();
  cargarTodosLosAlimentos();
  renderizarCategorias();
}

function cargarCategoriasEnSelect() {
  const select = document.getElementById("nuevaCategoria");
  select.innerHTML = "";
  categoriasUnicas.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    select.appendChild(option);
  });
}

function cargarTodosLosAlimentos() {
  const alimentosUsuario = JSON.parse(localStorage.getItem("alimentosUsuario") || "[]");
  const originales = [];
  for (const categoria in alimentos) {
    alimentos[categoria].forEach(a => {
      originales.push({ ...a, categoria });
    });
  }
  todosLosAlimentos = [...originales, ...alimentosUsuario];
  const setCategorias = new Set(todosLosAlimentos.map(a => a.categoria));
  categoriasUnicas = Array.from(setCategorias).sort();
}

function renderizarCategorias(filtro = "") {
  const secciones = document.getElementById("seccionesCategorias");
  secciones.innerHTML = "";

  const alimentosFiltrados = filtro.trim()
    ? todosLosAlimentos.filter(a => a.nombre.toLowerCase().includes(filtro.toLowerCase()))
    : todosLosAlimentos;

  const categoriasMap = new Map();
  alimentosFiltrados.forEach(alimento => {
    if (!categoriasMap.has(alimento.categoria)) {
      categoriasMap.set(alimento.categoria, []);
    }
    categoriasMap.get(alimento.categoria).push(alimento);
  });

  if (categoriasMap.size === 0) {
    secciones.innerHTML = "<p>No se encontraron alimentos que coincidan con la búsqueda.</p>";
    return;
  }

  categoriasMap.forEach((alimentosCategoria, categoria) => {
    alimentosCategoria.sort((a, b) => a.nombre.localeCompare(b.nombre));

    const div = document.createElement("div");
    div.classList.add("categoria-box");
    div.setAttribute("data-categoria", categoria);
    div.style.border = `3px solid ${colorPorCategoria(categoria)}`;
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.cursor = "default";  // Sin toggle, cursor normal
    header.style.userSelect = "none";
    header.style.borderBottom = "1px solid #ddd";
    header.style.paddingBottom = "0.4rem";

    const titulo = document.createElement("h3");
    titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    titulo.style.margin = "0";
    titulo.style.color = "var(--celeste)";
    titulo.style.flexGrow = "1";
    titulo.style.color = colorPorCategoria(categoria);

    const flecha = document.createElement("span");
    flecha.textContent = "▼";  // Siempre flecha hacia abajo
    flecha.style.fontSize = "1.4rem";

    header.appendChild(titulo);

    const lista = document.createElement("div");
    lista.style.display = "flex";  // Siempre visible
    lista.style.marginTop = "0.8rem";
    lista.style.flexDirection = "column";
    lista.style.gap = "10px";
    lista.style.maxHeight = "700px";
    lista.style.overflowY = "auto";

    const alimentosUsuario = JSON.parse(localStorage.getItem("alimentosUsuario") || "[]");
    alimentosCategoria.forEach(alimento => {
      const esCustom = alimentosUsuario.some(u => u.nombre === alimento.nombre);
      const item = crearItemAlimento(alimento, categoria, esCustom);
      lista.appendChild(item);
    });

    div.appendChild(header);
    div.appendChild(lista);

    div.classList.add("abierta"); // Opcional para CSS si usas estilos específicos

    secciones.appendChild(div);
  });
}

function crearItemAlimento(alimento, categoria, esCustom) {
  const item = document.createElement("div");
 
  item.classList.add("alimento-tarjeta");
  item.style.display = "flex";
  item.style.flexDirection = "column";
  item.style.backgroundColor = "#e6f2ff";
  item.style.padding = "14px 20px";
  item.style.borderRadius = "16px";
  item.style.gap = "8px";
  item.style.position = "relative";
  item.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  item.style.border = `2px solid ${colorPorCategoria(categoria)}`;
  item.style.boxSizing = "border-box";

  const filaPrincipal = document.createElement("div");
  filaPrincipal.style.display = "flex";
  filaPrincipal.style.alignItems = "center";
  filaPrincipal.style.gap = "16px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = `check-${categoria}`;
  checkbox.value = alimento.nombre;
  checkbox.style.width = "20px";
  checkbox.style.height = "20px";
  checkbox.style.accentColor = colorPorCategoria(categoria);

  checkbox.onclick = (e) => {
    const checkboxes = document.getElementsByName(`check-${categoria}`);
    checkboxes.forEach(cb => {
      if (cb !== e.target) cb.checked = false;
    });
  };

  const circulo = document.createElement("div");
  circulo.style.width = "80px";
  circulo.style.height = "80px";
  circulo.style.borderRadius = "50%";
  circulo.style.backgroundColor = ajustarColor(colorPorCategoria(categoria), -30);
  circulo.style.border = `3px solid ${colorPorCategoria(categoria)}`;
  circulo.style.color = "white";
  circulo.style.display = "flex";
  circulo.style.alignItems = "center";
  circulo.style.justifyContent = "center";
  circulo.style.fontWeight = "700";
  circulo.style.fontSize = "14px";
  circulo.style.userSelect = "none";
  circulo.style.textAlign = "center";
  circulo.style.padding = "0 6px";

  const primeraPalabra = alimento.nombre.split(" ")[0];
  circulo.textContent = primeraPalabra;

  const texto = document.createElement("span");
  texto.textContent = alimento.nombre;
  texto.style.flex = "1";

  const btnToggle = document.createElement("button");
  btnToggle.textContent = "►";
  btnToggle.style.background = "transparent";
  btnToggle.style.border = "none";
  btnToggle.style.cursor = "pointer";

  const detalles = document.createElement("div");
  detalles.style.display = "none";
  detalles.style.marginTop = "8px";
  detalles.style.paddingLeft = "106px";
  detalles.innerHTML = `
    <div style="background-color: rgba(0,0,0,0.12); border-radius: 12px; padding: 10px 15px;">
      <div><strong>Calorías:</strong> ${alimento.calorias} kcal</div>
      <div><strong>Proteínas:</strong> ${alimento.proteinas} g</div>
      <div><strong>Carbohidratos:</strong> ${alimento.carbohidratos} g</div>
      <div><strong>Grasas:</strong> ${alimento.grasas} g</div>
      <div><strong>Vitaminas:</strong> ${alimento.vitaminas || "N/A"}</div>
    </div>`;

  btnToggle.onclick = () => {
    detalles.style.display = detalles.style.display === "none" ? "block" : "none";
    btnToggle.textContent = detalles.style.display === "block" ? "▼" : "►";
  };

  filaPrincipal.appendChild(checkbox);
  filaPrincipal.appendChild(circulo);
  filaPrincipal.appendChild(texto);
  filaPrincipal.appendChild(btnToggle);

  if (esCustom) {
    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "✕";
    btnBorrar.title = "Eliminar alimento personalizado";
    btnBorrar.style.backgroundColor = "transparent";
    btnBorrar.style.border = "none";
    btnBorrar.style.color = "#ff4d4d";
    btnBorrar.style.fontWeight = "700";
    btnBorrar.style.cursor = "pointer";
    btnBorrar.style.fontSize = "20px";
    btnBorrar.style.marginLeft = "auto";
    btnBorrar.style.marginTop = "-20px";
    btnBorrar.onclick = () => {
      if (confirm(`¿Seguro que quieres eliminar "${alimento.nombre}"?`)) {
        borrarAlimentoCustom(alimento.nombre);
      }
    };
    filaPrincipal.appendChild(btnBorrar);
  }

  item.appendChild(filaPrincipal);
  item.appendChild(detalles);
  return item;
}

function borrarAlimentoCustom(nombre) {
  let alimentosUsuario = JSON.parse(localStorage.getItem("alimentosUsuario") || "[]");
  alimentosUsuario = alimentosUsuario.filter(a => a.nombre !== nombre);
  localStorage.setItem("alimentosUsuario", JSON.stringify(alimentosUsuario));
  cargarTodosLosAlimentos();
  renderizarCategorias();
}

function registrarTodasLasComidas() {
  const categorias = [...new Set(todosLosAlimentos.map(a => a.categoria))];
  let comidasHoy = JSON.parse(localStorage.getItem("comidasHoy") || "[]");
  let haySeleccion = false;

  categorias.forEach(cat => {
    const checkboxes = document.getElementsByName(`check-${cat}`);
    const seleccionado = Array.from(checkboxes).find(cb => cb.checked);
    if (seleccionado) {
      haySeleccion = true;
      const alimento = todosLosAlimentos.find(a => a.nombre === seleccionado.value);
      if (alimento) {
        const comida = {
          nombre: alimento.nombre,
          fecha: new Date().toLocaleDateString("es-NI"),
          porcion: 100,
          calorias: alimento.calorias,
          proteinas: alimento.proteinas,
          carbohidratos: alimento.carbohidratos,
          grasas: alimento.grasas,
          vitaminas: alimento.vitaminas
        };
        comidasHoy.push(comida);
      }
    }
  });

  if (!haySeleccion) {
    alert("¡Debes seleccionar al menos un alimento antes de registrar!");
    return;
  }

  localStorage.setItem("comidasHoy", JSON.stringify(comidasHoy));
  alert("¡Comidas registradas exitosamente!");
  window.location.href = "dashboard.html";
}

function colorPorCategoria(categoria) {
  switch (categoria) {
    case "entradas": return "#3dbeff";
    case "fondo": return "#007acc";
    case "postres": return "#ff7f50";
    case "bebidas": return "#00b894";
    case "frutas": return "#ff6f61";
    case "desayunos": return "#fdcb6e";
    default: return "#999";
  }
}

function ajustarColor(hex, amount) {
  let usePound = false;
  if (hex[0] === "#") {
    hex = hex.slice(1);
    usePound = true;
  }
  const num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return (usePound ? "#" : "") + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

function inicializarBusqueda() {
  const barra = document.getElementById("barraBusqueda");
  barra.addEventListener("input", () => {
    renderizarCategorias(barra.value);
  });
}

function asignarEventosBotones() {
  document.getElementById("btnAgregarNuevo").addEventListener("click", abrirModal);
  document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);
  document.getElementById("btnGuardarNuevo").addEventListener("click", guardarNuevoAlimento);
  document.getElementById("btnRegistrarComida").addEventListener("click", registrarTodasLasComidas);
}

function iniciarApp() {
  cargarTodosLosAlimentos();
  renderizarCategorias();
  inicializarBusqueda();
  asignarEventosBotones();
}

window.onload = iniciarApp;
