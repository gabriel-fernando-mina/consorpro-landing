// main.js - UX y mejoras funcionales
document.addEventListener('DOMContentLoaded', function () {
  // Año dinámico en footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if(href.length > 1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Contacto: validación simple y mensaje
  const form = document.getElementById('contactForm');
  if(form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // Validación básica
      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();
      const msgElem = document.getElementById('formMsg');
      if(!nombre || !email || !mensaje) {
        msgElem.textContent = 'Por favor completa todos los campos.';
        msgElem.style.color = '#c0392b';
        return;
      }
      // Simulación de "envío"
      msgElem.textContent = '¡Gracias por tu consulta! Te responderemos pronto.';
      msgElem.style.color = '#15803d';
      form.reset();
    });
  }

  // Animación fadein al hacer scroll
  function revealOnScroll() {
    const elems = document.querySelectorAll('.anim-fadein');
    const windowBottom = window.innerHeight + window.scrollY;
    elems.forEach(el => {
      if(el.getBoundingClientRect().top + window.scrollY < windowBottom - 60) {
        el.classList.add('visible');
      }
    });
  }
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
});