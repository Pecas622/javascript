const IVA = 0.21;
let presupuestos = [];
let continuar = true;

// FUNCION 1 - Crear presupuesto

function crearPresupuesto() {

    let cliente = prompt("Ingrese nombre del cliente:");
    let servicio = prompt("Ingrese tipo de servicio:");
    let horas = parseFloat(prompt("Ingrese cantidad de horas estimadas:"));
    let valorHora = parseFloat(prompt("Ingrese valor por hora:"));
    let materiales = parseFloat(prompt("Ingrese costo de materiales:"));

    if (horas > 0 && valorHora > 0 && materiales >= 0) {

        let costoManoObra = horas * valorHora;
        let subtotal = costoManoObra + materiales;
        let impuestos = subtotal * IVA;
        let totalFinal = subtotal + impuestos;

        let presupuesto = {
            cliente: cliente,
            servicio: servicio,
            horas: horas,
            subtotal: subtotal,
            total: totalFinal
        };

        presupuestos.push(presupuesto);

        alert(
            "Presupuesto generado correctamente.\n" +
            "Subtotal: $" + subtotal +
            "\nIVA (21%): $" + impuestos +
            "\nTotal Final: $" + totalFinal
        );

    } else {
        alert("Datos inválidos. Intente nuevamente.");
    }
}


// ==============================
// FUNCION 2 - Mostrar historial
// ==============================

function mostrarHistorial() {

    console.log("===== HISTORIAL DE PRESUPUESTOS =====");

    if (presupuestos.length === 0) {
        alert("No hay presupuestos registrados.");
        return;
    }

    for (let presupuesto of presupuestos) {
        console.log(
            "Cliente: " + presupuesto.cliente +
            " | Servicio: " + presupuesto.servicio +
            " | Total: $" + presupuesto.total
        );
    }

    alert("Historial mostrado en consola.");
}


// ==============================
// FUNCION 3 - Calcular promedio
// ==============================

function calcularPromedio() {

    if (presupuestos.length === 0) {
        alert("No hay datos para calcular promedio.");
        return;
    }

    let suma = 0;

    for (let presupuesto of presupuestos) {
        suma += presupuesto.total;
    }

    let promedio = suma / presupuestos.length;

    alert("Promedio de presupuestos generados: $" + promedio);
}


// ==============================
// PROGRAMA PRINCIPAL
// ==============================

alert("Bienvenido al Simulador de Presupuestos");

while (continuar) {

    let opcion = prompt(
        "Seleccione una opción:\n" +
        "1 - Crear Presupuesto\n" +
        "2 - Ver Historial\n" +
        "3 - Ver Promedio\n" +
        "4 - Salir"
    );

    switch (opcion) {
        case "1":
            crearPresupuesto();
            break;

        case "2":
            mostrarHistorial();
            break;

        case "3":
            calcularPromedio();
            break;

        case "4":
            continuar = false;
            alert("Gracias por usar el sistema.");
            break;

        default:
            alert("Opción inválida.");
    }
}