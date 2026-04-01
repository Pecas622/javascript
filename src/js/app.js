// Productos base
const productos = [
    { id: 1, nombre: "Remera Oversize", precio: 8000 },
    { id: 2, nombre: "Buzo Hoodie", precio: 15000 },
    { id: 3, nombre: "Pantalón Cargo", precio: 12000 },
    { id: 4, nombre: "Campera Denim", precio: 20000 }
]

// Storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// DOM
const contenedorProductos = document.getElementById("productos")
const listaCarrito = document.getElementById("carrito")
const total = document.getElementById("total")
const btnVaciar = document.getElementById("vaciar")

// Render productos
function renderProductos() {
    contenedorProductos.innerHTML = ""

    productos.forEach(prod => {
        const div = document.createElement("div")
        div.className = "card"

        div.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio}</p>
            <button>Agregar</button>
        `

        div.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(prod.id)
        })

        contenedorProductos.appendChild(div)
    })
}

// Agregar
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id)
    carrito.push(producto)

    guardarStorage()
    renderCarrito()
}

// Eliminar
function eliminarDelCarrito(index) {
    carrito.splice(index, 1)

    guardarStorage()
    renderCarrito()
}

// Render carrito
function renderCarrito() {
    listaCarrito.innerHTML = ""

    carrito.forEach((prod, index) => {
        const li = document.createElement("li")

        li.innerHTML = `
            ${prod.nombre} - $${prod.precio}
            <button>X</button>
        `

        li.querySelector("button").addEventListener("click", () => {
            eliminarDelCarrito(index)
        })

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
function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
    carrito = []
    guardarStorage()
    renderCarrito()
})

// Inicial
renderProductos()
renderCarrito()