/* ================================THEME================================= */
//cambiar theme
const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")
//chequeo el localStorage para ver si hay guardado el theme
let lightMode

if (localStorage.getItem("theme")) { //devuelve Falso si no extiste y verdadero si existe
    lightMode = localStorage.getItem("theme")//aca lo consulto
} else {
    localStorage.setItem("theme", "dark")//aca lo creo si no existe
}

if (lightMode == "light") {
    document.body.classList.add("lightMode")
}

//BOTONES

botonLightMode.addEventListener("click", () => {
    document.body.classList.add("lightMode")
    localStorage.setItem("theme", "light")
})

botonDarkMode.addEventListener("click", () => {
    document.body.classList.remove("lightMode")
    localStorage.setItem("theme", "dark")
})

/* =================================Ingreso datos usuarios================== */
//creo la clase Usuario
class Usuario {
    constructor(nombreDeUsuario, email, pesosCambio, cotizDolar) {
        this.nombreDeUsuario = nombreDeUsuario
        this.email = email
        this.pesosCambio = pesosCambio
        this.cotizDolar = cotizDolar

    }
    dolaresEquiv() {
        return this.pesosCambio / this.cotizDolar
    }
}
//creo el array de objetos para los usuarios, vacio
const usuarios = []

//chequeo el localStorage para ver si hay guardado algo
/* if (localStorage.getItem("usuarios")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
} else {
    localStorage.setItem("usuarios", JSON.stringify("usuarios"));
} */

//Para tomar los datos del formulario, creo las variables que necesito
const idFormulario = document.getElementById("formulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombreDeUsuario = document.getElementById("nombreDeUsuario").value;
    const email = document.getElementById("email").value;
    const pesosCambio = document.getElementById("pesosCambio").value;
    const cotizDolar = document.getElementById("cotizDolar").value;

    //creo el objeto usuario
    const usuario = new Usuario(nombreDeUsuario, email, pesosCambio, cotizDolar)

    //Agrego los datos del usuario al array
    usuarios.push(usuario);
    //Guardo los datos del usuario en LocalStorage
    localStorage.setItem("Usuario", JSON.stringify(usuarios));
    //Ahora limpio el formulario
    idFormulario.reset();

    //Muestro el resultado creando una funcion
    realizarCambio(usuario);

})

//Creo la funcion para mostrar el resultado
const resultado = document.getElementById("infoUsuarios");

const realizarCambio = (usuario) => {
    let aux = "";
    aux +=  `
    <div class="card cardUsuarios" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Hola ${usuario.nombreDeUsuario}</h5>
            <h6 class="card-subtitle mb-2 ">los $ que ingresaste equivalen a USD ${usuario.dolaresEquiv()}</h6>
            <a href="#" class="card-link ">Comprar USD</a>
            <a href="#" class="card-link">Comprar Crypto</a>
        </div>
    </div>`
    resultado.innerHTML = aux;
}

//Muestro el localStorage
const botonIngresos = document.getElementById("botonIngresos");
const datosIngresos = document.getElementById("datosIngresos");

botonIngresos.addEventListener("click", () => {
    const usuarios = JSON.parse(localStorage.getItem("Usuario"));
    let aux = "";
    usuarios.forEach(usuario => {
        aux +=  
        `<p class="resultado"> Usuario: ${usuario.nombreDeUsuario} </p>
        <p class="resultado"> Pesos Ingresados: $${usuario.pesosCambio}</p><hr>`
        
        /* `
        <div class="table-responsive">
            <table class="table table-borderless">
                <thead>
                    <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Pesos Ingresados</th>
                    <th scope="col">Dolares Equivalentes</th>
                    <th scope="col">Tipo de Cambio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">${usuario.nombreDeUsuario}</th>
                    <td>$ ${usuario.pesosCambio}</td>
                    <td>USD ${usuario.dolaresEquiv()}</td>
                    <td>USD1 = $${usuario.cotizDolar}</td>
                    </tr>
                </tbody>
            </table>
        </div>` */
    });
    datosIngresos.innerHTML = aux;
});