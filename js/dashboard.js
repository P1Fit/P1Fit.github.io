document.addEventListener('DOMContentLoaded', () => {
  const nombre = localStorage.getItem('p1fit-nombre') || 'Usuario';
  const saludoEl = document.getElementById('saludoUsuario');
  const fechaEl = document.getElementById('fechaActual');
  const caloriasHoyEl = document.getElementById('caloriasHoy');
  const caloriasTotalesEl = document.getElementById('caloriasTotales');
  const rachaEl = document.getElementById('rachaDias');
  const rachaBarEl = document.getElementById('barraRacha');
  const comidasEl = document.getElementById('comidasHoy');
  const recomendacionEl = document.getElementById('mensajeRecomendacion');
  const comidasListEl = document.getElementById('listaComidas');
  const desplegarBtn = document.getElementById('desplegarBtn');

  const inputMetaProteinas = document.getElementById('metaProteinas');
  const inputMetaCarbohidratos = document.getElementById('metaCarbohidratos');
  const inputMetaGrasas = document.getElementById('metaGrasas');
  const formMetas = document.getElementById('formMetas');

  saludoEl.textContent = `¡Bienvenido de nuevo, ${nombre}!`;

  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  const hoyStrFormateado = `${anio}-${mes}-${dia}`;
  fechaEl.textContent = `${dia}/${mes}/${anio}`;

  const comidas = JSON.parse(localStorage.getItem("comidasHoy") || "[]");

  let caloriasHoy = 0;
  const totales = {
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0
  };

  comidas.forEach(c => {
function parseFecha(dmy) {
  const [d, m, y] = dmy.split('/').map(Number);
  return new Date(y, m - 1, d); 
}

// En el código donde sumas calorías:
const esHoy = (() => {
  if (!c.fecha) return false;
  const fechaComida = parseFecha(c.fecha);
  return fechaComida.toDateString() === hoy.toDateString();
})();

    if (esHoy) caloriasHoy += c.calorias * (c.porciones || 1);
    totales.calorias += c.calorias * (c.porciones || 1);
    totales.proteinas += c.proteinas * (c.porciones || 1);
    totales.carbohidratos += c.carbohidratos * (c.porciones || 1);
    totales.grasas += c.grasas * (c.porciones || 1);
  });

  caloriasHoyEl.textContent = `${caloriasHoy.toFixed(0)} kcal`;
  caloriasTotalesEl.textContent = `${totales.calorias.toFixed(0)} kcal`;
  comidasEl.textContent = comidas.length;

  const comidasOrdenadas = [...comidas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  if (comidasOrdenadas.length > 0) {
    comidasOrdenadas.forEach((comida, index) => {
      const item = document.createElement("li");
      item.textContent = `${comida.nombre} - ${comida.calorias} kcal (${comida.fecha})`;
      if (index >= 3) item.style.display = 'none';
      comidasListEl.appendChild(item);
    });
    if (comidasOrdenadas.length > 3) {
      desplegarBtn.style.display = 'inline-block';
      desplegarBtn.onclick = () => {
        document.querySelectorAll('#listaComidas li').forEach(li => li.style.display = 'list-item');
        desplegarBtn.style.display = 'none';
      };
    }
  } else {
    comidasListEl.innerHTML = '<li>No hay comidas registradas aún.</li>';
  }

  let metas = JSON.parse(localStorage.getItem('p1fit-metas')) || {
    proteinas: 150,
    carbohidratos: 275,
    grasas: 70
  };

  if (inputMetaProteinas && inputMetaCarbohidratos && inputMetaGrasas) {
    inputMetaProteinas.value = metas.proteinas;
    inputMetaCarbohidratos.value = metas.carbohidratos;
    inputMetaGrasas.value = metas.grasas;
  }

function crearGrafico(id, label, consumido, meta, color) {
  const canvas = document.getElementById(id);
  if (!canvas) return;

  const porcentaje = Math.min((consumido / meta) * 100, 100);
  const restante = 100 - porcentaje;

  // Actualizar el texto debajo del gráfico
  const textoSpan = document.getElementById(id.replace('Chart', 'Porcentaje'));
  if (textoSpan) {
    textoSpan.textContent = porcentaje.toFixed(0) + '%';
  }

  return new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: [label, 'Restante'],
      datasets: [{
        data: [porcentaje, restante],
        backgroundColor: [color, '#e0e0e0'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '75%',
      responsive: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}


 
  crearGrafico('proteinasChart', 'Proteínas', totales.proteinas, metas.proteinas, '#3dbeff');
  crearGrafico('carbosChart', 'Carbohidratos', totales.carbohidratos, metas.carbohidratos, '#00bcd4');
  crearGrafico('grasasChart', 'Grasas', totales.grasas, metas.grasas, '#ff9800');

  if (formMetas) {
    formMetas.addEventListener('submit', (e) => {
      e.preventDefault();
      metas = {
        proteinas: parseFloat(inputMetaProteinas.value) || 0,
        carbohidratos: parseFloat(inputMetaCarbohidratos.value) || 0,
        grasas: parseFloat(inputMetaGrasas.value) || 0
      };
      localStorage.setItem('p1fit-metas', JSON.stringify(metas));
      location.reload();
    });
  }

  const recomendaciones = [
    "¡No olvides tomar suficiente agua hoy!",
    "Incorpora más vegetales verdes en tu dieta.",
    "Una caminata de 30 minutos puede hacer maravillas.",
    "Evita el azúcar en exceso, tu cuerpo lo agradecerá.",
    "¡Excelente momento para probar una nueva receta saludable!"
  ];
  const indexAleatorio = Math.floor(Math.random() * recomendaciones.length);
  if (recomendacionEl) recomendacionEl.textContent = recomendaciones[indexAleatorio];

  // función parseFecha declarada arriba

// Función para parsear fechas "d/m/yyyy"
function parseFecha(dmy) {
  const [d, m, y] = dmy.split('/').map(Number);
  return new Date(y, m - 1, d);
}

// Obtener fechas únicas en formato ISO, ordenadas ascendentemente
const diasUnicos = [...new Set(comidas.map(c => parseFecha(c.fecha).toISOString().split('T')[0]))].sort();

// Calcular racha de días consecutivos hacia atrás desde hoy
let racha = 0;
let fechaEsperada = new Date(hoy); // empieza en hoy

// Recorremos las fechas desde el final (más recientes) hacia atrás
for (let i = diasUnicos.length - 1; i >= 0; i--) {
  const fechaActual = diasUnicos[i];
  const fechaEsperadaStr = fechaEsperada.toISOString().split('T')[0];

  if (fechaActual === fechaEsperadaStr) {
    // Si la fecha coincide con la esperada, incrementa racha y retrocede 1 día
    racha++;
    fechaEsperada.setDate(fechaEsperada.getDate() - 1);
  } else if (fechaActual < fechaEsperadaStr) {
    // Si la fecha es anterior a la esperada, entonces hubo un día perdido,
    // la racha se corta aquí porque no es consecutivo.
    break;
  } else {
    // En caso de que por alguna razón la fecha sea mayor que la esperada (no esperado),
    // simplemente ignoramos y seguimos (puede pasar si las fechas no están ordenadas)
    continue;
  }
}

rachaEl.textContent = `${racha} día${racha !== 1 ? 's' : ''}`;
rachaBarEl.value = racha;
rachaBarEl.max = 30;


  const btnMostrarReportes = document.getElementById('btnMostrarReportes');
  const reporteContainer = document.getElementById('reporteContainer');
  const previsualizacionReporte = document.getElementById('previsualizacionReporte');
  const btnDescargarReporte = document.getElementById('btnDescargarReporte');
  const btnDescargarHTML = document.getElementById('btnReporteHTML');
  const formEnviarCorreo = document.getElementById('formEnviarCorreo');
  const inputCorreo = document.getElementById('inputCorreo');
  const mensajeEnvio = document.getElementById('mensajeEnvio');

  // Función para generar el texto del reporte
  function generarTextoReporte() {
    let texto = `Reporte de Progreso - ${dia}/${mes}/${anio}\n\n`;
    texto += `Nombre: ${localStorage.getItem('p1fit-nombre')}\n`;
    texto += `Edad: ${localStorage.getItem('p1fit-edad') || 'No registrado'}\n`;
    texto += `Género: ${localStorage.getItem('p1fit-genero') || 'No registrado'}\n`;
    texto += `Altura: ${localStorage.getItem('p1fit-altura') || 'No registrado'} cm\n`;
    texto += `Peso: ${localStorage.getItem('p1fit-peso') || 'No registrado'} kg\n\n`;
    texto += `Racha de días: ${racha}\n`;
    texto += `Calorías consumidas hoy: ${caloriasHoy.toFixed(0)} kcal\n`;
    texto += `Calorías totales consumidas: ${totales.calorias.toFixed(0)} kcal\n\n`;

    texto += 'Metas:\n';
    texto += `- Proteínas: ${metas.proteinas} g\n`;
    texto += `- Carbohidratos: ${metas.carbohidratos} g\n`;
    texto += `- Grasas: ${metas.grasas} g\n\n`;

    texto += 'Consumo total:\n';
    texto += `- Proteínas: ${totales.proteinas.toFixed(1)} g\n`;
    texto += `- Carbohidratos: ${totales.carbohidratos.toFixed(1)} g\n`;
    texto += `- Grasas: ${totales.grasas.toFixed(1)} g\n\n`;

    texto += 'Comidas registradas:\n';
    comidas.forEach(c => {
      texto += `- ${c.nombre} (${c.fecha}): ${c.calorias} kcal, ${c.proteinas} g proteínas, ${c.carbohidratos} g carbohidratos, ${c.grasas} g grasas\n`;
    });

    return texto;
  }

  // Mostrar/ocultar el reporte al hacer click
  btnMostrarReportes.addEventListener('click', () => {
    if (reporteContainer.style.display === 'none') {
      previsualizacionReporte.textContent = generarTextoReporte();
      reporteContainer.style.display = 'block';
    } else {
      reporteContainer.style.display = 'none';
      mensajeEnvio.style.display = 'none';
      inputCorreo.value = '';
    }
  });

  // Descargar reporte en txt
  btnDescargarReporte.addEventListener('click', () => {
    const texto = generarTextoReporte();
    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_p1fit_${dia}${mes}${anio}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });

  function generarReporteHTML(comidas, metas, nombre, fecha) {
  const totales = {
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0
  };
  comidas.forEach(c => {
    totales.calorias += c.calorias * (c.porciones || 1);
    totales.proteinas += c.proteinas * (c.porciones || 1);
    totales.carbohidratos += c.carbohidratos * (c.porciones || 1);
    totales.grasas += c.grasas * (c.porciones || 1);
  });

  const filasComidas = comidas.map(c => `
    <tr>
      <td>${c.nombre}</td>
      <td>${c.fecha}</td>
      <td>${(c.calorias * (c.porciones || 1)).toFixed(0)}</td>
      <td>${(c.proteinas * (c.porciones || 1)).toFixed(1)}</td>
      <td>${(c.carbohidratos * (c.porciones || 1)).toFixed(1)}</td>
      <td>${(c.grasas * (c.porciones || 1)).toFixed(1)}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Reporte de progreso de ${nombre}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f8fa; padding: 2rem; color: #333; }
    h1 { color: #3dbeff; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: center; }
    th { background-color: #3dbeff; color: white; }
    tr:nth-child(even) { background-color: #f2f9ff; }
    .totales, .metas { margin-top: 2rem; }
    .totales div, .metas div { margin-bottom: 0.3rem; font-weight: bold; }
    footer { margin-top: 3rem; font-size: 0.9rem; color: #777; }
  </style>
</head>
<body>
  <h1>Reporte de progreso de ${nombre}</h1>
  <p>Fecha del reporte: ${fecha}</p>

  <h2>Comidas registradas</h2>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Fecha</th>
        <th>Calorías (kcal)</th>
        <th>Proteínas (g)</th>
        <th>Carbohidratos (g)</th>
        <th>Grasas (g)</th>
      </tr>
    </thead>
    <tbody>
      ${filasComidas}
    </tbody>
  </table>

  <div class="totales">
    <h2>Consumo total</h2>
    <div>Calorías: ${totales.calorias.toFixed(0)} kcal</div>
    <div>Proteínas: ${totales.proteinas.toFixed(1)} g</div>
    <div>Carbohidratos: ${totales.carbohidratos.toFixed(1)} g</div>
    <div>Grasas: ${totales.grasas.toFixed(1)} g</div>
  </div>

  <div class="metas">
    <h2>Metas diarias</h2>
    <div>Proteínas: ${metas.proteinas} g</div>
    <div>Carbohidratos: ${metas.carbohidratos} g</div>
    <div>Grasas: ${metas.grasas} g</div>
  </div>

  <footer>
    <p>Generado por P1Fit - Tu progreso, tu salud, tu ritmo.</p>
  </footer>
</body>
</html>`;
}


function extraerValor2(lineas, clave, seccion = null, esTexto = false) {
  let desde = 0;
  if (seccion) {
    const idx = lineas.findIndex(l => l.includes(seccion));
    if (idx !== -1) desde = idx;
  }

  const linea = lineas.slice(desde).find(l => l.startsWith(clave));
  if (!linea) throw new Error(`No se encontró: ${clave}`);

  let valor = linea.split(':')[1].trim();

  if (!esTexto) {
    // Para números, extraer solo dígitos y puntos
    valor = valor.replace(/[^\d.]/g, '');
  }
  
  return valor;
}

btnDescargarHTML.addEventListener('click', (e) => {
  e.preventDefault();

  const nombre = localStorage.getItem('p1fit-nombre') || 'Usuario';
  const fecha = new Date().toLocaleDateString('es-ES');
  const comidas = JSON.parse(localStorage.getItem('comidasHoy') || '[]');
  const metas = JSON.parse(localStorage.getItem('p1fit-metas')) || {
    proteinas: 150,
    carbohidratos: 275,
    grasas: 70
  };

  const contenidoHTML = generarReporteHTML(comidas, metas, nombre, fecha);

  const blob = new Blob([contenidoHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `reporte_p1fit_${fecha.replace(/\//g, '-')}.html`;
  a.click();

  URL.revokeObjectURL(url);
});

document.getElementById('menuBtn').addEventListener('click', () => {
  const menu = document.getElementById('menuOpciones');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  const menu = document.getElementById('menuOpciones');
  const button = document.getElementById('menuBtn');
  if (!menu.contains(e.target) && e.target !== button && !button.contains(e.target)) {
    menu.style.display = 'none';
  }
});

document.getElementById('inputImportarArchivo').addEventListener('change', (e) => {
  const archivo = e.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();

  lector.onload = function (evento) {
    try {
      const contenido = evento.target.result;
      const lineas = contenido.split('\n').map(l => l.trim()).filter(Boolean);

      // Extraer valores clave
      const nombre = extraerValor2(lineas, 'Nombre:', null, true); // esTexto = true
      const altura = extraerValor2(lineas, 'Altura:'); // esTexto = true
      const peso = extraerValor(lineas, 'Peso:');
      const edad = extraerValor2(lineas, 'Edad:');
      const genero = extraerValor2(lineas, 'Género:', null, true); // esTexto = true

      const racha = parseInt(extraerValor(lineas, 'Racha de días:'));
      const caloriasHoy = parseInt(extraerValor(lineas, 'Calorías consumidas hoy:'));
      const caloriasTotales = parseInt(extraerValor(lineas, 'Calorías totales consumidas:'));

      const metas = {
        proteinas: parseFloat(extraerValor(lineas, '- Proteínas:', 'Metas')),
        carbohidratos: parseFloat(extraerValor(lineas, '- Carbohidratos:', 'Metas')),
        grasas: parseFloat(extraerValor(lineas, '- Grasas:', 'Metas')),
      };

      const indiceComidas = lineas.findIndex(l => l.startsWith('Comidas registradas:')) + 1;
      const comidas = [];

      for (let i = indiceComidas; i < lineas.length; i++) {
        const l = lineas[i];
        const match = l.match(/- (.+) \((\d{1,2}\/\d{1,2}\/\d{4})\): (\d+) kcal, ([\d.]+) g proteínas, ([\d.]+) g carbohidratos, ([\d.]+) g grasas/);
        if (match) {
          const [, nombreC, fecha, kcal, prot, carb, gras] = match;
          comidas.push({
            nombre: nombreC,
            fecha,
            calorias: parseInt(kcal),
            proteinas: parseFloat(prot),
            carbohidratos: parseFloat(carb),
            grasas: parseFloat(gras),
            porciones: 1
          });
        }
      }

      // Guardar en localStorage
      localStorage.setItem('p1fit-nombre', nombre);
      localStorage.setItem('rachaDias', racha);
      localStorage.setItem('caloriasHoy', caloriasHoy);
      localStorage.setItem('p1fit-metas', JSON.stringify(metas));
      localStorage.setItem('comidasHoy', JSON.stringify(comidas));
      localStorage.setItem('p1fit-altura', altura);
      localStorage.setItem('p1fit-peso', peso);
      localStorage.setItem('p1fit-edad', edad);
      localStorage.setItem('p1fit-genero', genero);

      const totales = {
        calorias: caloriasTotales,
        proteinas: comidas.reduce((s, c) => s + c.proteinas, 0),
        carbohidratos: comidas.reduce((s, c) => s + c.carbohidratos, 0),
        grasas: comidas.reduce((s, c) => s + c.grasas, 0),
      };
      localStorage.setItem('totales', JSON.stringify(totales));

      alert('✅ ¡Datos importados y reemplazados con éxito!');
      location.reload();

    } catch (err) {
      console.error(err);
      alert('❌ Error al importar datos. Verificá que el archivo esté en formato válido.');
    }
  };

  lector.readAsText(archivo);
});

function extraerValor(lineas, clave, seccion = null) {
  let desde = 0;
  if (seccion) {
    const idx = lineas.findIndex(l => l.includes(seccion));
    if (idx !== -1) desde = idx;
  }

  const linea = lineas.slice(desde).find(l => l.startsWith(clave));
  if (!linea) throw new Error(`No se encontró: ${clave}`);
  return linea.split(':')[1].replace(/[^\d.]/g, '').trim();
}

});
