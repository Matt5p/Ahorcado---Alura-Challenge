let botonIniciar = document.querySelector("#boton-iniciar");
botonIniciar.addEventListener("click", pintarCanvas);
let pantalla;
let pincel;

function pintarCanvas(){    
    pantalla = document.querySelector("canvas");
    pincel = pantalla.getContext("2d");
    
    pincel.fillStyle = "lightgrey"; //Color de fondo del canvas.
    pincel.fillRect(0,0,1200,800);

    //Dibujo de la horca
    pincel.fillStyle = "#A57103"; //Color de la horca.
    
    pincel.fillRect(300,170,5,480); //Primera parte del poste vertical.
    pincel.fillRect(330,170,5,480); //Segunda parte del poste vertical.

    pincel.fillRect(300,170,30,5); //Linea superior del poste vertical.
    

    pincel.fillRect(330,200,210,5); //Linea horizontal superior derecha del poste.
    pincel.fillRect(330,230,210,5) //Linea horizontal inferior derecha del poste.

    pincel.fillRect(270,200,30,5); //Linea horizontal superior izquierda del poste.
    pincel.fillRect(270,230,30,5); //Linea horizontal inferior izquierda del poste.

    pincel.fillRect(270,200,5,30); //Tope vertical izquierdo.
    pincel.fillRect(535,200,5,30); //Tope vertical derecho.

    pincel.fillStyle = "#9D9F0B"; //Color de la soga.
    pincel.fillRect(500,200,5,100); //Soga.

    pincel.fillStyle = "black"; //Color del suelo.
    pincel.fillRect(270,650,300,5); //Linea horizontal del suelo.

    //Guiones y texto de la palabra secreta.
    /////////////////////////////////////////////////////
    // pincel.font = "35px Roboto";
    // pincel.fillStyle = "blue";
    // pincel.textAlign = "center";
    // pincel.fillText(arrayPalabra.join(""), 850, 650);

    pincel.font = "4rem Roboto";
    pincel.fillStyle = "blue";
    pincel.textAlign = "center";
    pincel.fillText(arrayPalabra.join(""), 600, 750);
    /////////////////////////////////////////////////////

    //Letras incorrectas
    /////////////////////////////////////////////////////
    pincel.fillStyle = "red";
    if(arrayErrores.length >= 1) {
        pincel.font = "25px Roboto";
        pincel.fillText("LETRAS INCORRECTAS: ", 900, 300);
    }
    
    if(arrayErroresTotales.length > 0) {
        pincel.font = "30px Roboto";
        pincel.textAlign = "center";
        pincel.fillText(arrayErroresTotales.join(""), 900, 350);
    }    
    /////////////////////////////////////////////////////

    pincel.lineWidth = 5;
    pincel.fillStyle = "black"; //Color del hombre.
    pincel.strokeStyle = "black";
    //Dibuja la cabeza.
    if(arrayErroresTotales.length >= 1) {
        pincel.beginPath();
        pincel.arc(502.5, 330, 30, 0, 2*3.14);
        pincel.stroke();
    }

    //Dibuja el cuerpo
    if(arrayErroresTotales.length >= 2) {
        pincel.beginPath();
        pincel.moveTo(502.5, 360);
        pincel.lineTo(502.5, 480);
        pincel.stroke();
    }

    //Dibuja el brazo izquierdo
    if(arrayErroresTotales.length >= 3) {
        pincel.moveTo(502.5, 370);
        pincel.lineTo(452.5, 420);
        pincel.stroke();
    }

    //Dibuja el brazo derecho
    if(arrayErroresTotales.length >= 4) {
        pincel.moveTo(502.5, 370);
        pincel.lineTo(552.5, 420);
        pincel.stroke();
    }

    //Dibuja la pierna izquierda
    if(arrayErroresTotales.length >= 5) {
        pincel.moveTo(502.5, 478);
        pincel.lineTo(462.5, 548);
        pincel.stroke();
    }

    //Dibuja la pierna derecha y la cara = final del juego
    if(arrayErroresTotales.length >= 6) {
        //Pierna derecha
        pincel.moveTo(502.5, 478);
        pincel.lineTo(542.5, 548);
        pincel.stroke();        

        pincel.lineWidth = 2;
        //Ojo izquierdo
        pincel.moveTo(485, 329); 
        pincel.lineTo(498, 317);

        pincel.moveTo(485, 317);
        pincel.lineTo(498, 329);
        //Ojo derecho
        pincel.moveTo(506, 317);
        pincel.lineTo(519, 329);

        pincel.moveTo(519, 317);
        pincel.lineTo(506, 329);

        //Boca
        pincel.moveTo(488, 344);
        pincel.lineTo(517, 343);
        
        //Lengua
        pincel.moveTo(492, 343);
        pincel.lineTo(494, 351);

        pincel.moveTo(494, 351);
        pincel.lineTo(501, 351);

        pincel.moveTo(501, 351);
        pincel.lineTo(501, 343);
        pincel.stroke();
    }
}

function dibujarJuegoTerminado () {
    pincel.font = "35px Roboto";
    pincel.textAlign = "center";
    pincel.fillStyle = "red";
    pincel.fillText("PERDISTE!. La palabra secreta era " + palabraSecreta, 600, 100);
}

function dibujarVictoria () {
    pincel.fillStyle = "lightgrey" ;//Color de fondo del canvas.
    pincel.fillRect(0,0,1200,800);//Se resetea el canvas para mostrar la pantalla de victoria.
    pincel.font = "35px Roboto"; 
    pincel.textAlign = "center";
    pincel.fillStyle = "green";
    pincel.fillText("GANASTE! FELICIDADES :)", 600, 100);
    pincel.fillText("La palabra secreta era " + palabraSecreta, 600, 150);


    pincel.lineWidth = 5;
    pincel.fillStyle = "black"; //Color del hombre.
    pincel.strokeStyle = "black";

    //Dibuja la cabeza.
    pincel.beginPath();
    pincel.arc(600, 360, 30, 0, 2*3.14);
    pincel.stroke();

    //Dibuja el cuerpo
    pincel.beginPath();
    pincel.moveTo(600, 390);
    pincel.lineTo(600, 510);

    //Dibuja el brazo izquierdo
    pincel.moveTo(600, 400);
    pincel.lineTo(550, 450);

    //Dibuja el brazo derecho
    pincel.moveTo(600, 400);
    pincel.lineTo(650, 450);

    //Dibuja la pierna izquierda
    pincel.moveTo(600, 508);
    pincel.lineTo(560, 578);
    
    //Dibuja la pierna derecha
    pincel.moveTo(600, 508);
    pincel.lineTo(640, 578);
    pincel.stroke();        
    pincel.lineWidth = 2;

    //Dibuja el ojo izquierdo
    pincel.moveTo(584, 353);
    pincel.lineTo(590, 348);
    pincel.lineTo(596, 353);
    
    //Dibuja el ojo derecho
    pincel.moveTo(605, 353);
    pincel.lineTo(611, 348);
    pincel.lineTo(617, 353);

    //Dibuja la boca
    pincel.moveTo(600, 367);
    pincel.arc(600, 367, 11, 0, Math.PI);
    pincel.closePath();
    pincel.stroke();
}