const busqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const listaUsuarios = document.querySelector("#lista-usuarios");
const botonLimpiar = document.querySelector("#limpiar-busqueda");

let usuarios = [];

function mostrarUsuarios(lista) {
    listaUsuarios.innerHTML = "";

    lista.forEach((usuario) => {
        const li = document.createElement("li");

        li.textContent =
            `Nombre: ${usuario.name} | Correo: ${usuario.email}`;

        listaUsuarios.appendChild(li);
    });
}

async function cargarUsuarios() {
    try {
        mensaje.textContent = "Cargando usuarios...";

        const respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los usuarios");
        }

        usuarios = await respuesta.json();

        mensaje.textContent = `Se cargaron ${usuarios.length} usuarios`;

        // Mostrar todos los usuarios al iniciar.
        mostrarUsuarios(usuarios);

    } catch (error) {
        mensaje.textContent = error.message;
        console.log("Error:", error.message);
    }
}

busqueda.addEventListener("input", () => {
    const textoBuscado = busqueda.value.trim().toLowerCase();

    
 
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(textoBuscado) || usuario.email.toLowerCase().includes(textoBuscado)
    );

    mostrarUsuarios(usuariosFiltrados);

    if (textoBuscado === "") {
    mensaje.textContent = `Se muestran ${usuarios.length} usuarios`;
    } else if (usuariosFiltrados.length === 0) {
    mensaje.textContent = "No se encontraron usuarios";
    } else {
    mensaje.textContent =
        `Resultados encontrados: ${usuariosFiltrados.length}`;
    }

});

botonLimpiar.addEventListener("click", () =>{
    busqueda.value = "";
    mostrarUsuarios(usuarios);
    mensaje.textContent = `Se muestran ${usuarios.length} usuarios`;

});



cargarUsuarios();