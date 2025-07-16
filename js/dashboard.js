document.addEventListener('DOMContentLoaded', () => {
  const nombre = localStorage.getItem('p1fit-nombre') || 'Usuario';
  const saludoEl = document.getElementById('saludoUsuario');
  const fechaEl = document.getElementById('fechaActual');
  const caloriasHoyEl = document.getElementById('caloriasHoy');
  const caloriasTotalesEl = document.getElementById('caloriasTotales');
  const rachaEl = document.getElementById('rachaDias');
  const rachaBarEl = document.getElementById('barraRacha');
  const diasRachaTexto = document.getElementById('diasRachaTexto');
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

    function parseFecha(dmy) {
    const [d, m, y] = dmy.split('/').map(Number);
    return new Date(y, m - 1, d);
  }

  comidas.forEach(c => {
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

  const comidasOrdenadas = [...comidas].sort((a, b) => new Date(parseFecha(b.fecha)) - new Date(parseFecha(a.fecha)));
  comidasListEl.innerHTML = "";

  if (comidasOrdenadas.length > 0) {
    comidasOrdenadas.slice(0, 3).forEach((comida) => {
      const item = document.createElement("li");
      item.textContent = `${comida.nombre} - ${comida.calorias} kcal (${comida.fecha})`;
      comidasListEl.appendChild(item);
    });
    if (comidasOrdenadas.length > 3) {
  const verMas = document.createElement("button");
verMas.textContent = "Ver más";

// Estilos inline para que el botón se vea bonito
verMas.style.backgroundColor = "#1a9bff";
verMas.style.color = "white";
verMas.style.border = "none";
verMas.style.padding = "0.7rem 1.3rem";
verMas.style.borderRadius = "12px";
verMas.style.fontWeight = "700";
verMas.style.cursor = "pointer";
verMas.style.marginTop = "0.8rem";
verMas.style.boxShadow = "0 3px 8px rgba(26,155,255,0.7)";
verMas.style.transition = "background-color 0.3s ease";

verMas.addEventListener("mouseover", () => {
  verMas.style.backgroundColor = "#0077e6";
});
verMas.addEventListener("mouseout", () => {
  verMas.style.backgroundColor = "#1a9bff";
});

verMas.addEventListener("click", () => {
  comidasOrdenadas.slice(3).forEach((comida) => {
    const item = document.createElement("li");
    item.textContent = `${comida.nombre} - ${comida.calorias} kcal (${comida.fecha})`;
    comidasListEl.appendChild(item);
  });
  verMas.remove();
});

comidasListEl.appendChild(verMas);

    }
  } else {
    comidasListEl.innerHTML = '<li>No hay comidas registradas aún.</li>';
  }

  let metas = JSON.parse(localStorage.getItem('p1fit-metas')) || {
    proteinas: 150,
    carbohidratos: 275,
    grasas: 70
  };

  inputMetaProteinas.value = metas.proteinas;
  inputMetaCarbohidratos.value = metas.carbohidratos;
  inputMetaGrasas.value = metas.grasas;
  function crearGrafico(id, label, consumido, meta, color) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const porcentaje = Math.min((consumido / meta) * 100, 100);
    const restante = 100 - porcentaje;

    const textoSpan = document.getElementById(id.replace('Chart', 'Porcentaje'));
    if (textoSpan) {
      textoSpan.textContent = porcentaje.toFixed(0) + '%';
    }

    new Chart(canvas.getContext('2d'), {
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

  const ultimaFechaStr = localStorage.getItem('rachaUltimaFecha');
const hoyStr = `${dia}/${mes}/${anio}`;
const hoyDate = new Date(anio, parseInt(mes) - 1, parseInt(dia));
const rachaGuardada = parseInt(localStorage.getItem('rachaDias') || '0');

function fechaStringToDate(fechaStr) {
  const [d, m, a] = fechaStr.split('/').map(Number);
  return new Date(a, m - 1, d);
}

if (caloriasHoy > 0) {
  if (!ultimaFechaStr || rachaGuardada === 0) {
    // Primera vez o racha estaba en 0 → iniciar
    localStorage.setItem('rachaUltimaFecha', hoyStr);
    localStorage.setItem('rachaDias', '1');
  } else {
    const ultimaFecha = fechaStringToDate(ultimaFechaStr);
    const diffDias = Math.floor((hoyDate - ultimaFecha) / (1000 * 60 * 60 * 24));

    if (diffDias === 1) {
      // Día siguiente → aumentar racha
      const nuevaRacha = rachaGuardada + 1;
      localStorage.setItem('rachaUltimaFecha', hoyStr);
      localStorage.setItem('rachaDias', nuevaRacha.toString());
    } else if (diffDias > 1) {
      // Saltó días → reiniciar a 1
      localStorage.setItem('rachaUltimaFecha', hoyStr);
      localStorage.setItem('rachaDias', '1');
    }
    // Si es el mismo día (diffDias === 0), no hacemos nada
  }
}

const nuevaRacha = parseInt(localStorage.getItem('rachaDias') || '0');
rachaEl.textContent = `${nuevaRacha} día${nuevaRacha !== 1 ? 's' : ''}`;
rachaBarEl.value = nuevaRacha;
rachaBarEl.max = 30;

// Asegurarse de actualizar el texto de barra también
let barraText = document.getElementById('barraRachaTexto');
if (!barraText) {
  barraText = document.createElement('span');
  barraText.id = 'barraRachaTexto';
  barraText.style.marginLeft = '0.5rem';
  rachaBarEl.insertAdjacentElement('afterend', barraText);
}
barraText.textContent = `${nuevaRacha}/30 dias`;
barraText.style.fontWeight = 'bold';
barraText.style.color = '#3dbeff';
barraText.style.width = '7%';


    const btnMostrarReportes = document.getElementById('btnMostrarReportes');
  const reporteContainer = document.getElementById('reporteContainer');
  const previsualizacionReporte = document.getElementById('previsualizacionReporte');
  const btnDescargarReporte = document.getElementById('btnDescargarReporte');
  const btnDescargarHTML = document.getElementById('btnReporteHTML');
  const inputImportarArchivo = document.getElementById('inputImportarArchivo');
  const mensajeEnvio = document.getElementById('mensajeEnvio');

  function generarTextoReporte() {
    let texto = `Reporte de Progreso - ${dia}/${mes}/${anio}\n\n`;
    texto += `Nombre: ${localStorage.getItem('p1fit-nombre') || 'Usuario'}\n`;
    texto += `Edad: ${localStorage.getItem('p1fit-edad') || 'No registrado'}\n`;
    texto += `Género: ${localStorage.getItem('p1fit-genero') || 'No registrado'}\n`;
    texto += `Altura: ${localStorage.getItem('p1fit-altura') || 'No registrado'} cm\n`;
    texto += `Peso: ${localStorage.getItem('p1fit-peso') || 'No registrado'} kg\n\n`;
    
    const racha = localStorage.getItem('rachaDias') || '0';
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

btnMostrarReportes.addEventListener('click', () => {
  if (reporteContainer.style.display === 'none') {
    previsualizacionReporte.textContent = generarTextoReporte();
    reporteContainer.style.display = 'block';
    mensajeEnvio.style.display = 'none';
  } else {
    reporteContainer.style.display = 'none';
    mensajeEnvio.style.display = 'none';
  }
});


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
    const totalesHTML = {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    };

    comidas.forEach(c => {
      totalesHTML.calorias += c.calorias * (c.porciones || 1);
      totalesHTML.proteinas += c.proteinas * (c.porciones || 1);
      totalesHTML.carbohidratos += c.carbohidratos * (c.porciones || 1);
      totalesHTML.grasas += c.grasas * (c.porciones || 1);
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
  <div>Calorías: ${totalesHTML.calorias.toFixed(0)} kcal</div>
  <div>Proteínas: ${totalesHTML.proteinas.toFixed(1)} g</div>
  <div>Carbohidratos: ${totalesHTML.carbohidratos.toFixed(1)} g</div>
  <div>Grasas: ${totalesHTML.grasas.toFixed(1)} g</div>
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

  btnDescargarHTML.addEventListener('click', (e) => {
    e.preventDefault();
    const nombre = localStorage.getItem('p1fit-nombre') || 'Usuario';
    const fecha = new Date().toLocaleDateString('es-ES');
    const comidas = JSON.parse(localStorage.getItem('comidasHoy') || '[]');
    const metas = JSON.parse(localStorage.getItem('p1fit-metas')) || { proteinas: 150, carbohidratos: 275, grasas: 70 };
    const contenidoHTML = generarReporteHTML(comidas, metas, nombre, fecha);

    const blob = new Blob([contenidoHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_p1fit_${fecha.replace(/\//g, '-')}.html`;
    a.click();

    URL.revokeObjectURL(url);
  });

  inputImportarArchivo.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function (evento) {
      try {
        const contenido = evento.target.result;
        const lineas = contenido.split('\n').map(l => l.trim()).filter(Boolean);

        function extraerValor2(lineas, clave, seccion = null, esTexto = false) {
          let desde = 0;
          if (seccion) {
            const idx = lineas.findIndex(l => l.includes(seccion));
            if (idx !== -1) desde = idx;
          }
          const linea = lineas.slice(desde).find(l => l.startsWith(clave));
          if (!linea) throw new Error(`No se encontró: ${clave}`);
          let valor = linea.split(':')[1].trim();
          if (!esTexto) valor = valor.replace(/[^\d.]/g, '');
          return valor;
        }

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

        const nombre = extraerValor2(lineas, 'Nombre:', null, true);
        const altura = extraerValor2(lineas, 'Altura:', null, true);
        const peso = extraerValor(lineas, 'Peso:');
        const edad = extraerValor2(lineas, 'Edad:');
        const genero = extraerValor2(lineas, 'Género:', null, true);
        const rachaImportada = parseInt(extraerValor(lineas, 'Racha de días:'));
        const caloriasHoyImportadas = parseInt(extraerValor(lineas, 'Calorías consumidas hoy:'));
        const caloriasTotalesImportadas = parseInt(extraerValor(lineas, 'Calorías totales consumidas:'));

        const metasImportadas = {
          proteinas: parseFloat(extraerValor(lineas, '- Proteínas:', 'Metas')),
          carbohidratos: parseFloat(extraerValor(lineas, '- Carbohidratos:', 'Metas')),
          grasas: parseFloat(extraerValor(lineas, '- Grasas:', 'Metas'))
        };

        const indiceComidas = lineas.findIndex(l => l.startsWith('Comidas registradas:')) + 1;
        const comidasImportadas = [];

        for (let i = indiceComidas; i < lineas.length; i++) {
          const l = lineas[i];
          const match = l.match(/- (.+) \((\d{1,2}\/\d{1,2}\/\d{4})\): (\d+) kcal, ([\d.]+) g proteínas, ([\d.]+) g carbohidratos, ([\d.]+) g grasas/);
          if (match) {
            const [, nombreC, fechaC, kcal, prot, carb, gras] = match;
            comidasImportadas.push({
              nombre: nombreC,
              fecha: fechaC,
              calorias: parseInt(kcal),
              proteinas: parseFloat(prot),
              carbohidratos: parseFloat(carb),
              grasas: parseFloat(gras),
              porciones: 1
            });
          }
        }

        localStorage.setItem('p1fit-nombre', nombre);
        localStorage.setItem('rachaDias', rachaImportada);
        localStorage.setItem('caloriasHoy', caloriasHoyImportadas);
        localStorage.setItem('p1fit-metas', JSON.stringify(metasImportadas));
        localStorage.setItem('comidasHoy', JSON.stringify(comidasImportadas));
        localStorage.setItem('p1fit-altura', altura);
        localStorage.setItem('p1fit-peso', peso);
        localStorage.setItem('p1fit-edad', edad);
        localStorage.setItem('p1fit-genero', genero);

        alert('✅ ¡Datos importados y reemplazados con éxito!');
        location.reload();
      } catch (err) {
        console.error(err);
        alert('❌ Error al importar datos. Asegúrate de que el archivo esté en el formato correcto.');
      }
    };

    lector.readAsText(archivo);
  });

  const menuBtn = document.getElementById('menuBtn');
const menuOpciones = document.getElementById('menuOpciones');

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Evitar que el clic se propague y cierre inmediatamente
  if (menuOpciones.style.display === 'block') {
    menuOpciones.style.display = 'none';
  } else {
    menuOpciones.style.display = 'block';
  }
});

// Cerrar menú si se da clic fuera
document.addEventListener('click', () => {
  menuOpciones.style.display = 'none';
});

});