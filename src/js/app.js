const opcionesContainer = document.querySelector('.men');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnComerciales = document.querySelector('.comerciales');
const btnMilitares = document.querySelector('.militares');
const btnParatrabajo = document.querySelector('.paratrabajo');
const contenedorOpciones = document.querySelector('.opciones');

document.addEventListener('DOMContentLoaded', () => {
    eventos();
    cargarOpciones();
});

const eventos = () => {
    opcionesContainer.addEventListener('click', abrirOpciones);
}

const abrirOpciones = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if (document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    navegacion.appendChild(btnCerrar);
    cerrarOpciones(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen => {
    observer.observe(imagen);
});

const cerrarOpciones = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function () {
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}


const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}
