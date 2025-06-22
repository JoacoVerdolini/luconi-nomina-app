
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-content");
  window.showTab = function (id) {
    tabs.forEach(tab => tab.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  };

  // Unidades de negocio - carga y almacenamiento
  const unidadSelect = document.getElementById("unidadNegocio");
  const listaUnidades = document.getElementById("listaUnidades");

  function cargarUnidades() {
    const unidades = JSON.parse(localStorage.getItem("unidadesLuconi")) || ["Mayorista Río Tercero", "Mayorista Santa Rosa", "Distribuidora"];
    unidadSelect.innerHTML = '<option value="">Seleccionar unidad</option>';
    listaUnidades.innerHTML = "";
    unidades.forEach(u => {
      unidadSelect.innerHTML += `<option value="${u}">${u}</option>`;
      listaUnidades.innerHTML += `<li>${u}</li>`;
    });
  }
  window.agregarUnidad = () => {
    const input = document.getElementById("nuevaUnidad");
    const nuevaUnidad = input.value.trim();
    if (!nuevaUnidad) return;
    const unidades = JSON.parse(localStorage.getItem("unidadesLuconi")) || [];
    if (!unidades.includes(nuevaUnidad)) {
      unidades.push(nuevaUnidad);
      localStorage.setItem("unidadesLuconi", JSON.stringify(unidades));
      input.value = "";
      cargarUnidades();
    }
  };

  // Guardar empleados
  document.getElementById("empleadoForm").addEventListener("submit", e => {
    e.preventDefault();
    const empleado = {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      dni: document.getElementById("dni").value.trim(),
      fechaIngreso: document.getElementById("fechaIngreso").value,
      puesto: document.getElementById("puesto").value.trim(),
      unidad: document.getElementById("unidadNegocio").value
    };
    const empleados = JSON.parse(localStorage.getItem("empleadosLuconi")) || [];
    empleados.push(empleado);
    localStorage.setItem("empleadosLuconi", JSON.stringify(empleados));
    renderEmpleados();
    e.target.reset();
  });

  function renderEmpleados() {
    const empleados = JSON.parse(localStorage.getItem("empleadosLuconi")) || [];
    const tbody = document.getElementById("empleadosTable");
    tbody.innerHTML = "";
    empleados.forEach(emp => {
      const ingreso = new Date(emp.fechaIngreso);
      const hoy = new Date();
      const antig = ((hoy - ingreso) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);
      tbody.innerHTML += `<tr>
        <td class="border px-2 py-1">${emp.nombre}</td>
        <td class="border px-2 py-1">${emp.apellido}</td>
        <td class="border px-2 py-1">${emp.dni}</td>
        <td class="border px-2 py-1">${antig}</td>
        <td class="border px-2 py-1">${emp.puesto}</td>
        <td class="border px-2 py-1">${emp.unidad}</td>
      </tr>`;
    });
  }

  cargarUnidades();
  renderEmpleados();
});
