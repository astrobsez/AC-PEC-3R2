// Lista de RUTs autorizados
const autorizados = ["123456789", "987654321", "112233445"];

function verificarIngreso() {
  const plataforma = document.getElementById("plataforma").value.trim();
  const rut = document.getElementById("rut").value.trim();
  const resultado = document.getElementById("resultado");

  if (!plataforma || !rut) {
    resultado.textContent = "⚠️ Debes ingresar ambos campos.";
    return;
  }

  const estado = autorizados.includes(rut) ? "✅ Personal autorizado" : "❌ Personal NO autorizado";
  const fechaHora = new Date().toLocaleString();

  resultado.textContent = `${estado} - ${fechaHora}`;

  const registro = { plataforma, rut, estado, fechaHora };
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push(registro);
  localStorage.setItem("historial", JSON.stringify(historial));

  document.getElementById("plataforma").value = "";
  document.getElementById("rut").value = "";
}

if (document.getElementById("tabla-ingresos")) {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  const tabla = document.getElementById("tabla-ingresos");

  historial.forEach(entry => {
    const row = tabla.insertRow();
    row.innerHTML = `
      <td>${entry.fechaHora}</td>
      <td>${entry.plataforma}</td>
      <td>${entry.rut}</td>
      <td>${entry.estado}</td>
    `;
  });
}
