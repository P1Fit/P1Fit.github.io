// js/comidas.js

// Abrir/Cerrar Modal
function abrirModal() {
  document.getElementById("modalNuevoAlimento").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalNuevoAlimento").style.display = "none";
}

// Guardar alimento nuevo en localStorage
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
  cargarTodosLosAlimentos();
  renderizarCategorias();
  limpiarFormularioNuevoAlimento();
}

function limpiarFormularioNuevoAlimento() {
  document.getElementById("nuevoNombre").value = "";
  document.getElementById("nuevoCalorias").value = "";
  document.getElementById("nuevoProteinas").value = "";
  document.getElementById("nuevoCarbohidratos").value = "";
  document.getElementById("nuevoGrasas").value = "";
  document.getElementById("nuevoVitaminas").value = "";
}

let todosLosAlimentos = [];

function cargarTodosLosAlimentos() {
  const alimentosUsuario = JSON.parse(localStorage.getItem("alimentosUsuario") || "[]");
  const originales = [];
  for (const categoria in alimentos) {
    alimentos[categoria].forEach(a => {
      originales.push({ ...a, categoria });
    });
  }
  todosLosAlimentos = [...originales, ...alimentosUsuario];
}

function renderizarCategorias() {
  const secciones = document.getElementById("seccionesCategorias");
  secciones.innerHTML = "";

  const alimentosUsuario = JSON.parse(localStorage.getItem("alimentosUsuario") || "[]");
  const categorias = [...new Set(todosLosAlimentos.map(a => a.categoria))];

  categorias.forEach(categoria => {
    const alimentosCategoria = todosLosAlimentos.filter(a => a.categoria === categoria);
    if (alimentosCategoria.length > 0) {
      const div = document.createElement("div");
      div.classList.add("categoria-box");

      const h3 = document.createElement("h3");
      h3.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      div.appendChild(h3);

      const lista = document.createElement("div");
      lista.style.display = "flex";
      lista.style.flexDirection = "column";
      lista.style.gap = "14px";

      alimentosCategoria.forEach(alimento => {
        const esCustom = alimentosUsuario.some(u => u.nombre === alimento.nombre);
        const item = crearItemAlimento(alimento, categoria, esCustom);
        lista.appendChild(item);
      });

      div.appendChild(lista);
      secciones.appendChild(div);
    }
  });
}

function crearItemAlimento(alimento, categoria, esCustom) {
  const item = document.createElement("div");
  item.style.display = "flex";
  item.style.flexDirection = "column"; // para poder mostrar detalles abajo
  item.style.backgroundColor = "#e6f2ff";
  item.style.padding = "14px 20px";
  item.style.borderRadius = "16px";
  item.style.gap = "8px"; // un poco menos entre filas
  item.style.position = "relative";
  item.style.fontSize = "1.2rem";
  item.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  item.style.border = `2px solid ${colorPorCategoria(categoria)}`;

  // Contenedor principal fila
  const filaPrincipal = document.createElement("div");
  filaPrincipal.style.display = "flex";
  filaPrincipal.style.alignItems = "center";
  filaPrincipal.style.gap = "16px";

  // Checkbox
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

  // Circulo
  const circulo = document.createElement("div");
  circulo.style.width = "70px";
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
  circulo.style.flexShrink = "0";
  circulo.style.overflow = "hidden";
  circulo.style.textAlign = "center";
  circulo.style.padding = "0 6px";

  const primeraPalabra = alimento.nombre.split(" ")[0];
  circulo.textContent = primeraPalabra;
  if (primeraPalabra.length > 4) {
    circulo.style.fontSize = "11px";
  } else if (primeraPalabra.length > 2) {
    circulo.style.fontSize = "13px";
  }

  // Texto nombre alimento
  const texto = document.createElement("span");
  texto.textContent = alimento.nombre;
  texto.style.flex = "1";

   // Botón flecha desplegable
  const btnToggle = document.createElement("button");
  btnToggle.textContent = "►"; // Flecha derecha inicialmente
  btnToggle.style.fontSize = "18px";
  btnToggle.style.background = "transparent";
  btnToggle.style.border = "none";
  btnToggle.style.cursor = "pointer";
  btnToggle.style.userSelect = "none";
  btnToggle.style.width = "24px";
  btnToggle.style.height = "24px";
  btnToggle.style.padding = "0";
  btnToggle.style.color = "#333";  // Color visible
  btnToggle.style.transition = "transform 0.3s ease";
  
  // Contenedor detalles, oculto por defecto
  const detalles = document.createElement("div");
  detalles.style.display = "none";
  detalles.style.marginTop = "8px";
  detalles.style.paddingLeft = "106px"; // para alinearlo con texto (70px circulo + 16px gap + 20px checkbox aprox)
  detalles.style.fontSize = "0.95rem";
  detalles.style.color = "#333";

  detalles.innerHTML = `
  <div style="
    background-color: rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    padding: 10px 15px;
    margin-top: 8px;
    font-size: 0.9rem;
    color: #222;
  ">
    <div><strong>Calorías:</strong> ${alimento.calorias} kcal</div>
    <div><strong>Proteínas:</strong> ${alimento.proteinas} g</div>
    <div><strong>Carbohidratos:</strong> ${alimento.carbohidratos} g</div>
    <div><strong>Grasas:</strong> ${alimento.grasas} g</div>
    <div><strong>Vitaminas:</strong> ${alimento.vitaminas || "N/A"}</div>
  </div>
`;

  // Evento para mostrar/ocultar detalles y cambiar la flecha
  btnToggle.onclick = () => {
    if (detalles.style.display === "none" || detalles.style.display === "") {
      detalles.style.display = "block";
      btnToggle.textContent = "▼"; // Flecha abajo
    } else {
      detalles.style.display = "none";
      btnToggle.textContent = "►"; // Flecha derecha
    }
  };


  // Armar fila principal
  filaPrincipal.appendChild(checkbox);
  filaPrincipal.appendChild(circulo);
  filaPrincipal.appendChild(texto);
  filaPrincipal.appendChild(btnToggle);

  // Si es custom, botón borrar
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

    btnBorrar.onclick = (ev) => {
      ev.preventDefault();
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


function colorPorCategoria(cat) {
  const colores = {
    desayunos: "#FFA07A",
    fondo: "#90EE90",
    frutas: "#DDA0DD",
    entradas: "#FFD700",
    bebidas: "#00CED1",
    postres: "#FF69B4"
  };
  return colores[cat] || "#cccccc";
}

function ajustarColor(hex, amount) {
  let usePound = false;
  if (hex[0] === "#") {
    hex = hex.slice(1);
    usePound = true;
  }
  let num = parseInt(hex, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, "0");
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
        const porcion = 100;
        const comida = {
          nombre: alimento.nombre,
          fecha: new Date().toLocaleDateString("es-NI"),
          porcion,
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

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  cargarTodosLosAlimentos();
  renderizarCategorias();
  cargarCategoriasEnModal();
});

function cargarCategoriasEnModal() {
  const select = document.getElementById("nuevaCategoria");
  select.innerHTML = "";

  const categorias = [...new Set(Object.keys(alimentos))];
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    select.appendChild(option);
  });
}
