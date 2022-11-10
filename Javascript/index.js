//Ttodas las constantes creadas para llamarlas con los getElementById.
const contenedorProductos = document.getElementById("cards");
const boton = document.getElementById("boton");
const inputAfter = document.getElementById("inputAfter");
const botonInput = document.getElementById("botonInput");
const botonVaciar = document.getElementById("botonVaciar");
const listaProductosComprados = document.getElementById("listaProductosComprados");
const iconoCarrito = document.getElementById("botonCarrito")


//Carrito vacio para pushearle objetos.
let carrito = [];


//Function nueva con objetos del array en "data.json".
function nuevaCanilla(id, nombre, precio, imagen){
    this.id = id,
    this.nombre =nombre,
    this.precio = precio,
    this.imagen = imagen
};


//Declaracion variable comprar y agregado de la funcion con arrow function. Operadores de 3 tipos para optimizar el codigo.
const comprar = (canilla) =>{        
    let productoComprado = carrito.find(item => {
                        return item.id === canilla.id
})
                productoComprado == undefined 
                ? carrito.push({ ...canilla, cantidad: 1 }) 
                : (productoComprado.precio = productoComprado.precio + canilla.precio,
                productoComprado.cantidad++);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert("usted selecciono " +canilla);
};

//Variable canillas con fetch y then para traer el array desde data.json.
let canillas
fetch("./Json/data.json")
.then((response) => response.json())
  .then((data) => {
    data.forEach((nuevaCanilla) => {
      const { id, nombre, precio, imagen } = nuevaCanilla;
      const div = document.createElement("div");
      div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-title">$${precio}</p>
            <button class= btn id=${id}>Comprar</button>
        </div>
    </div>`;
    contenedorProductos.appendChild(div);
    const boton = document.getElementById(id);
    boton.addEventListener("click", () => comprar(nuevaCanilla))
    canillas=data
  });
});


const actualizarCarrito = () => {
    carrito.length = 0
    actualizarCarrito()
}


//Buscador de canillas funcional. Mi problema es que si no aclaro que sea la de 50 lts busca automaticamente la de 30, pero ambas se pueden econtrar.
const buscadorCanillas = (search) => {
	search = search.toLowerCase()
	let buscadorCanillas = canillas.find(canillas => canillas.nombre.toLowerCase().includes(search));
	alert(buscadorCanillas.nombre);
	inputAfter.value = ``
}

//Todos los addEventListener para los respectivos botones y sus funciones.
listaProductosComprados.addEventListener("click",() => alert(carrito))
botonInput.addEventListener("click",() => buscadorCanillas(inputAfter.value));
botonVaciar.addEventListener("click", () => localStorage.clear(carrito))
botonVaciar.addEventListener("click", () => {carrito.length = 0 && Swal.fire({
    title: "¡Desea vaciar el carrito?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Vaciar",
    denyButtonText: "Seguir comprando",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Vaciado', '', 'success')
    } else if (result.isDenied) {
      Swal.fire("El carrito sigue lleno", '', 'info')
        }})})