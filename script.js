const hmtl = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto');
const botnoEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const musicaPlay = new Audio('sonidos/play.wav');
const musicaPause = new Audio('sonidos/pause.mp3');
const musicaAlarma = new Audio('sonidos/beep.mp3');
const textoIniciarpausar = document.querySelector('#start-pause span');
const iconoPausa = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//listeners para cambiar colores de fondo.
botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botnoEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botnoEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})

function cambiarContexto(contexto) {
    mostrarTiempo()
    botones.forEach(function (contexto) {
        contexto.classList.remove("active")
    })

    hmtl.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagenes/${contexto}.png`)
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? <br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `
                    Hora de volver a la superficie<br><strong class="app__title-strong"> Haz una pausa larga.</strong>`
        default:
            break;
    }
}
const cuantaRegresiva = () => {
    if (tiempoTranscurridoEnSegundos <= 0) {
        musicaAlarma.play();
        alert('tiempo Final')
        reiniciar()
        return
    }
    textoIniciarpausar.textContent = "Pausar"
    iconoPausa.src = "imagenes/pause.png"
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo();

}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (idIntervalo) {
        musicaPause.play();
        reiniciar()
        iconoPausa.src = "imagenes/play_arrow.png"

        return
    }
    musicaPlay.play();
    idIntervalo = setInterval(cuantaRegresiva, 1000)

};

function reiniciar() {
    clearInterval(idIntervalo)
    idIntervalo = null
    textoIniciarpausar.textContent = "Comenzar"

}
function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-co',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo();