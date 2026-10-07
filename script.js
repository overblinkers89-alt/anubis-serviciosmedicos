const botonMenu = document.getElementById('menu-toggle');
const menu = document.getElementById('menu-principal');
function cambiarMenu(abierto) {
  menu.classList.toggle('activo', abierto);
  botonMenu.textContent = abierto ? '✕' : '☰';
  botonMenu.setAttribute('aria-expanded', String(abierto));
  botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
}
botonMenu.addEventListener('click', () => cambiarMenu(botonMenu.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', () => cambiarMenu(false)));
document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && menu.classList.contains('activo')) {
    cambiarMenu(false);
    botonMenu.focus();
  }
});
document.addEventListener('click', evento => {
  if (!evento.target.closest('header')) cambiarMenu(false);
});
window.matchMedia('(min-width: 761px)').addEventListener('change', () => cambiarMenu(false));
if ('IntersectionObserver' in window) {
  const enlaces = [...menu.querySelectorAll('a')];
  const secciones = document.querySelectorAll('main section');
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        const destino = entrada.target.id || 'inicio';
        enlaces.forEach(enlace => {
          if (enlace.hash === '#' + destino) enlace.setAttribute('aria-current', 'location');
          else enlace.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  secciones.forEach(seccion => observador.observe(seccion));
}
