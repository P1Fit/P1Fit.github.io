document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos guardados (si existen)
  const nombre = localStorage.getItem('p1fit-nombre') || '';
  const altura = localStorage.getItem('p1fit-altura') || '';
  const peso = localStorage.getItem('p1fit-peso') || '';
  const edad = localStorage.getItem('p1fit-edad') || '';
  const genero = localStorage.getItem('p1fit-genero') || '';

  // Llenar inputs si hay datos guardados
  document.getElementById('nombre').value = nombre;
  document.getElementById('altura').value = altura;
  document.getElementById('peso').value = peso;
  document.getElementById('edad').value = edad;
  if (genero) {
    document.getElementById('genero').value = genero;
  }

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById('nombre').value.trim();
    const correoInput = document.getElementById('correo').value.trim();
    const alturaInput = parseFloat(document.getElementById('altura').value);
    const pesoInput = parseFloat(document.getElementById('peso').value);
    const edadInput = parseInt(document.getElementById('edad').value, 10);
    const generoInput = document.getElementById('genero').value;

    if (!nombreInput) return alert('Por favor ingresá tu nombre.');
    if (!alturaInput || alturaInput <= 0) return alert('Por favor ingresá una altura válida.');
    if (!pesoInput || pesoInput <= 0) return alert('Por favor ingresá un peso válido.');
    if (!edadInput || edadInput <= 0) return alert('Por favor ingresá una edad válida.');
    if (!generoInput) return alert('Por favor seleccioná tu género.');

    localStorage.setItem('p1fit-nombre', nombreInput);
    localStorage.setItem('p1fit-altura', alturaInput);
    localStorage.setItem('p1fit-peso', pesoInput);
    localStorage.setItem('p1fit-edad', edadInput);
    localStorage.setItem('p1fit-genero', generoInput);

    // Cálculo TMB
    let tmb;
    if (generoInput === 'hombre') {
      tmb = 10 * pesoInput + 6.25 * alturaInput - 5 * edadInput + 5;
    } else {
      tmb = 10 * pesoInput + 6.25 * alturaInput - 5 * edadInput - 161;
    }
    const caloriasDiarias = Math.round(tmb * 1.55);

    const proteinas = Math.round((caloriasDiarias * 0.20) / 4);
    const grasas = Math.round((caloriasDiarias * 0.25) / 9);
    const carbohidratos = Math.round((caloriasDiarias * 0.55) / 4);

    const metas = { proteinas, carbohidratos, grasas };
    localStorage.setItem('p1fit-metas', JSON.stringify(metas));

    alert('Datos guardados correctamente. Ahora podés ir al Dashboard.');
    // Si quieres redirigir luego, descomenta la línea siguiente:
    window.location.href = 'dashboard.html';
  });
});
