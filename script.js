const botonMenu = document.getElementById("menu-toggle");
const menu = document.querySelector("nav");
const enlacesMenu = document.querySelectorAll("nav a");

botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");

    if (menu.classList.contains("activo")) {
        botonMenu.textContent = "✕";
        botonMenu.setAttribute("aria-label", "Cerrar menú");
    } else {
        botonMenu.textContent = "☰";
        botonMenu.setAttribute("aria-label", "Abrir menú");
    }
});

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("activo");
        botonMenu.textContent = "☰";
        botonMenu.setAttribute("aria-label", "Abrir menú");
    });
});
const elementosAnimados = document.querySelectorAll(
    ".titulo-seccion, .tarjeta-servicio, .foto-jornada, .contacto-tarjeta"
);

elementosAnimados.forEach(elemento => {
    elemento.classList.add("animar");
});

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

elementosAnimados.forEach(elemento => {
    observador.observe(elemento);
});
