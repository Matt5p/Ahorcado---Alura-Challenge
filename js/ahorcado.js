const bancoPalabras = ["PELOTA", "AUTOMOVIL","TRANSITO","COMPUTADORA","TELEFONO","FUTBOLISTA","AVIONETA","HELICOPTERO","CASA","RADIO","GATO", "PERRO", "INFORMACION", "SUPERMERCADO", "BOLA", "TELA", "AURICULARES", "TECLADO", "CINE", "PELICULA", "PARLANTE", "INSTITUCION", "UNIVERSIDAD", "CABALLO", "PLATO", "VASO", "COPA", "TENEDOR", "COMIDA", "FOTO", "CARPETA", "HOTEL", "IDIOMA", "PATIN", "PATINETA", "MOTO", "LAPIZ", "LAPICERA", "GOMA", "CAMPERA", "MEDIA", "PANTALON", "RECIPIENTE", "INSPECTOR", "PUERTA", "ASIENTO", "VETERINARIA", "LLAVE", "SOL", "RIO", "FRIO", "CALOR", "AGUA", "TIERRA", "AIRE", "FUEGO", "ATOMO", "CALZADO", "CAMA", "SAL", "MAPA", "ARBOL", "CAMPO", "TRACTOR", "CAMINO", "RUTA", "COLECTIVO", "TERMINAL", "PUENTE", "ESTRELLA", "ESPACIO", "CABELLO", "CABALLO", "AMOR", "PALMERA", "MAR", "PLAYA", "CALOR", "FRIO", "DESTORNILLADOR", "MARTILLO", "CLAVO", "TIJERA", "POLVO", "CERRO", "CASTOR", "ELEFANTE", "SIERRA", "RUTA", "BARCO", "EDIFICIO", "DEPARTAMENTO", "PROGRAMACION", "BINARIO", "CODIGO", "FUNCION", "FUENTE", "PAYASO", "MASCARA", "GUANTE"];

//const bancoPalabras = ["CASA", "TELEFONO"]; // banco de pruebas

let palabraSecreta = ''; //Variable que almacena la palabra secreta.
let teclaPresionada = ''; //Variable que almacena la tecla presionada. Solo letras.
let arrayPalabra =[]; //Array creado para mostrar la cantidad de guiones, de la palabra secreta. Luego se compara con las posiciones del arrayPalabraSecreta[] y la tecla presionada.
let arrayPalabraSecreta =[]; //Array que contiene todos los caracteres de la palabra secreta.
let arrayErrores = []; //Array donde se registran la totalidad de las teclas presionadas.
let arrayErroresTotales = []; //Array donde se registra el contenido de arrayErrores[], sin caracteres duplicados. 
let deshabilitarTeclado = true; //Variable para deshabilitar el registro de teclas, en caso de ganar o perder.
var mostrarTeclado = document.querySelector("#mostrar-teclado");
var canvas = document.querySelector("#canvas");
var teclaInputMobile;

botonIniciar.addEventListener("click", crearPalabraSecreta);

//Funcion toma una palabra al azar, del array del banco de palabras. bancopalabras[];
function crearPalabraSecreta(){

    mostrarTeclado.focus();
    // let clickSound = new Audio("../sound/click.wav")
    // clickSound.play();
    deshabilitarTeclado = false;
    arrayErrores = []; //Resetea el arrayErrores[] al iniciar un nuevo juego.
    arrayErroresTotales = []; //Resetea el arrayErroresTotales[] al iniciar un nuevo juego.
    indicePalabraSecreta = Math.floor(Math.random() * bancoPalabras.length); //Busca un numero aleatorio entre 0 y el maximo del array de palabras    
    palabraSecreta = bancoPalabras[indicePalabraSecreta];     
    // console.log(palabraSecreta); log de testeo para ver la palabra secreta elegida al azar.

    document.getElementById("boton-agregar-palabra").disabled = true; //Deshabilita el botón para agregar palabras mientras el juego está en ejecución.
    document.getElementById("input-agregar-palabra").disabled = true; //Deshabilita la carga de nuevas palabras mientras el juego está en ejecución.

    arrayPalabraSecreta = Array.from(palabraSecreta); //Crea un array con todos los caracteres de la palabra secreta. Para luego comparar con un array vacío y determinar la letra correcta.
    // registrarTecla(); DESHABILITADA YA QUE NO FUNCIONA EN MOBILE
    mostrarGuiones();

    document.getElementById('boton-iniciar').scrollIntoView(); //Al iniciar juego, enfoca en el botón inicio para ver mejor el canvas.
}

// AGREGADO ULTIMO FIX MOBILE VERSION/////////////////////////////////////////////////////////
canvas.addEventListener("click", function () {
    mostrarTeclado.focus();
});

mostrarTeclado.addEventListener("input", function () {
    teclaInputMobile = mostrarTeclado.value.toUpperCase();
    mostrarTeclado.value = "";
    if(teclaInputMobile.charCodeAt() >= 65  && teclaInputMobile.charCodeAt() <= 90) {
        teclaPresionada = teclaInputMobile;
        verificarTeclaPresionada();
        dibujarLetraIncorrecta();
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
//Función que dibuja en el Canvas la cantidad de guiones que contiene una palabra, segun la cantidad de caracteres de la misma
function mostrarGuiones () {
    arrayPalabra =[]; //Resetea el array de guiones al iniciar un nuevo juego.
    for (let i=0; i<palabraSecreta.length;i++){
        arrayPalabra[i] = "_ ";
    }
    pintarCanvas();
}

///////////////////////////////////////////////////////////////////////////////////////////////
//Función: Dibujar Letra Incorrecta - Esta función dibuja las letras incorrectas, duh.
function dibujarLetraIncorrecta(){
    let bandera = false; 

    //Si el elemento en el indice dentro del array es igual a la tecla presionada y cambia la bandera a true. 
    for(let i=0; i<palabraSecreta.length; i++) {
        if(arrayPalabraSecreta[i] == teclaPresionada){
            bandera = true;
        }
    }
    //En caso contrario, la bandera permanece en false. Y coloca la tecla erronea dentro de arrayErrores[];
    if(bandera == false) {        
        arrayErrores.push(teclaPresionada); //array que contiene las teclas erroneas presionadas.
        arrayErroresTotales = [...new Set(arrayErrores)]; //array creado para remover las teclas erroneas duplicadas, en el arrayErrores[].
        pintarCanvas();
    }

    verificarFinJuego();
    verificarGanador();
}

//Función que verifica si perdiste y muestra el mensaje de "PERDISTE"
function verificarFinJuego() {
    //Se verifica ci la cantidad de errores llega al móximo y muestra el mensaje de juego finalizado: "Perdiste!"
    // let deathSound = new Audio("../sound/death-sound-effect.mp3");

    if(arrayErroresTotales.length == 6){
        // deathSound.play();
        deshabilitarTeclado = true;
        dibujarJuegoTerminado();
        mostrarTeclado.blur();

        document.getElementById("boton-agregar-palabra").disabled = false;
        document.getElementById("input-agregar-palabra").disabled = false;
    }
}

//Función que verifica si ganaste y muestra el mensaje de "GANASTE"
function verificarGanador() {
    //Se verifica si el array de guiones, contiene todos los elementos del array de palabra secreta, antes de que los errores lleguen al máximo, para mostrar el mensaje ganador.
    let contieneTodosElementos = true;
    // let ganador = new Audio("../sound/win.wav");

    for (let i = 0; i < arrayPalabraSecreta.length; i++) {
        if (arrayPalabra.indexOf(arrayPalabraSecreta[i]) === -1) {
            contieneTodosElementos = false;
            break;
        }
    }

    if(contieneTodosElementos == true) {
        deshabilitarTeclado = true;
        // ganador.play();
        dibujarVictoria();
        mostrarTeclado.blur();

        document.getElementById("boton-agregar-palabra").disabled = false;
        document.getElementById("input-agregar-palabra").disabled = false;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////
//Función que controla que tecla es presionada y si está dentro de los caracteres correspondientes te las teclas. //REMOVIDA YA QUE NO FUNCIONA EN VERSION MOBILE
// function registrarTecla() {
//     window.addEventListener('keydown', (event) => {
//         if(deshabilitarTeclado == false){
//             if(event.keyCode >= 65  && event.keyCode <= 90){
//                 teclaPresionada = event.key.toUpperCase();
//                 // console.log(teclaPresionada);
//                 // console.log(arrayPalabraSecreta);
//                 verificarTeclaPresionada();
//                 dibujarLetraIncorrecta();
//             }
//         }
//     });
// }

///////////////////////////////////////////////////////////////////////////////////////////////
//Función que verifica si la tecla presionada es igual a alguna de las letras del array de palabra secreta.
function verificarTeclaPresionada () {    
    for(let i=0; i<palabraSecreta.length; i++) {
        if(teclaPresionada === arrayPalabraSecreta[i]){
            arrayPalabra[i] = teclaPresionada;
            pintarCanvas();
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////
let botonAgregarPalabra = document.querySelector("#boton-agregar-palabra");
botonAgregarPalabra.addEventListener("click", agregarPalabraDiccionario);

//Función para agregar una palabra al diccionario, con sus respectivas limitaciones. 
function agregarPalabraDiccionario() {
    let nuevaPalabra = document.querySelector("#input-agregar-palabra").value;

    if(nuevaPalabra !="") {
        if(nuevaPalabra.match(/^[A-Za-z]*$/) && nuevaPalabra.match(/^.{3,15}$/)) {
            bancoPalabras.push(nuevaPalabra.toUpperCase());//Se agrega la palabra al banco de palabras. Convierte las minusculas en mayusculas. 
            document.getElementById("input-agregar-palabra").value = ''; //Devuelve el placeholcer a su valor inicial al agregar una nueva palabra.
            alert("Palabra agregada");
        } else {
            alert("Solo se permiten palabras entre 3 y 15 letras, sin caracteres especiales.");
        }
    }else{
        alert("No escribió ninguna palabra.");
    }
}

//p.d: No se rían de mi código. Podrían tener un hijo igual.

//Realizado por Matías Albornoz - Alura Challenge Hangman - Oracle Next Education 2022