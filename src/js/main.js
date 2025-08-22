// main.js - UX y mejoras funcionales
document.addEventListener('DOMContentLoaded', function () {
  // Año dinámico en footer
  document.getElementById('year').textContent = String(new Date().getFullYear());

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

// Dark mode toggle
const darkToggle = document.getElementById('darkmode-toggle');
if (darkToggle) {
  darkToggle.checked = localStorage.getItem('darkmode') === 'yes';
  document.body.classList.toggle('darkmode', darkToggle.checked);
  darkToggle.addEventListener('change', (e) => {
    document.body.classList.toggle('darkmode', e.target.checked);
    localStorage.setItem('darkmode', e.target.checked ? 'yes' : 'no');
  });
}

window.gtag = undefined;
document.querySelectorAll('.btn-primary, .cta-float').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(window.gtag) gtag('event', 'cta_click', {label: btn.textContent});
  });
});

const langSwitch = document.getElementById('lang-switch');
if(langSwitch){
  langSwitch.value = localStorage.getItem('lang') || 'es';
  langSwitch.addEventListener('change', e=>{
    localStorage.setItem('lang', e.target.value);
    location.reload(); // O cambia el contenido dinámicamente
  });
}

// Mensaje "Pronto disponible" para enlaces de blog sin destino real
document.querySelectorAll('.blog-list a[href="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    alert('¡Pronto disponible! Muy pronto publicaremos este artículo.');
  });
});