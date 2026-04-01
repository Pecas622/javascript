// Productos base
const productos = [
    { id: 1, nombre: "Remera Oversize", precio: 8000 },
    { id: 2, nombre: "Buzo Hoodie", precio: 15000 },
    { id: 3, nombre: "Pantalón Cargo", precio: 12000 },
    { id: 4, nombre: "Campera Denim", precio: 20000 }
]

// Carrito con storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// DOM
const contenedorProductos = document.getElementById("productos")
const listaCarrito = document.getElementById("carrito")
const total = document.getElementById("total")
const btnGuardar = document.getElementById("guardar")

// Render productos (cards)
function renderProductos() {
    productos.forEach(prod => {
        const div = document.createElement("div")
        div.className = "card"

        div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
    `

        contenedorProductos.appendChild(div)
    })
}

// Agregar
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id)
    carrito.push(producto)
    renderCarrito()
}

// Eliminar
function eliminarDelCarrito(index) {
    carrito.splice(index, 1)
    renderCarrito()
}

// Render carrito
function renderCarrito() {
    listaCarrito.innerHTML = ""

    carrito.forEach((prod, index) => {
        const li = document.createElement("li")

        li.innerHTML = `
      ${prod.nombre} - $${prod.precio}
      <button onclick="eliminarDelCarrito(${index})">X</button>
    `

        listaCarrito.appendChild(li)
    })

    calcularTotal()
}

// Total
function calcularTotal() {
    const suma = carrito.reduce((acc, prod) => acc + prod.precio, 0)
    total.textContent = "Total: $" + suma
}

// Guardar
btnGuardar.addEventListener("click", () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
})

// Inicial
renderProductos()
renderCarrito()