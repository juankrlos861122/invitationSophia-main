// ===== HOJAS CAYENDO =====
const flores = ["🌸"];

function crearHoja() {
  const hoja = document.createElement("div");
  hoja.classList.add("hoja");

  hoja.innerHTML = flores[Math.floor(Math.random() * flores.length)];

  hoja.style.left = Math.random() * 100 + "vw";
  hoja.style.animationDuration = 5 + Math.random() * 5 + "s";
  hoja.style.fontSize = 20 + Math.random() * 20 + "px";

  document.querySelector(".hojas-container").appendChild(hoja);

  setTimeout(() => hoja.remove(), 10000);
}

setInterval(crearHoja, 700);

// Cuenta regresiva
function actualizarCuentaRegresiva() {
  const fechaFiesta = new Date("April 11, 2026 20:00:00").getTime();
  const ahora = new Date().getTime();
  const diferencia = fechaFiesta - ahora;

  if (diferencia > 0) {
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos
      .toString()
      .padStart(2, "0");
    document.getElementById("segundos").textContent = segundos
      .toString()
      .padStart(2, "0");
  } else {
    // Si ya pasó la fecha
    document.querySelector(".contador").innerHTML =
      '<div class="alert alert-success" style="font-size: 2rem; border-radius: 15px;">¡La fiesta ha comenzado!</div>';
  }
}

// Actualizar la cuenta cada segundo
setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva(); // Llamar inmediatamente al cargar

// Navegación entre secciones
document.addEventListener("DOMContentLoaded", function () {
  const navDots = document.querySelectorAll(".nav-dot");
  const sections = document.querySelectorAll("section");
  const btnTop = document.getElementById("btnTop");

  // Función para actualizar los puntos de navegación
  function actualizarNavDots() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.id;
      }
    });

    navDots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("data-target") === currentSection) {
        dot.classList.add("active");
      }
    });

    // Mostrar u ocultar botón para volver arriba
    if (window.scrollY > 500) {
      btnTop.classList.add("show");
    } else {
      btnTop.classList.remove("show");
    }
  }

  // Agregar evento click a los puntos de navegación
  navDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Botón para volver arriba
  btnTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Actualizar navegación al hacer scroll
  window.addEventListener("scroll", actualizarNavDots);
  actualizarNavDots(); // Llamar al cargar la página

  // Manejo del formulario de confirmación
  const formulario = document.getElementById("formConfirmacion");
  const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(formulario);
    const action =
      "https://script.google.com/macros/s/AKfycbyRDz31s_in0sbux1qJzqHlPGupzms6Zn5nlrU2DRhx1yDVfYHbC774-ZhLGFXNFxmnfQ/exec";

    fetch(action, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          mensajeConfirmacion.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ${data.message}`;
          mensajeConfirmacion.classList.remove("alert-danger");
          mensajeConfirmacion.classList.add("alert-success");
          mensajeConfirmacion.classList.remove("d-none");
          formulario.reset();
        } else {
          mensajeConfirmacion.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> ${data.message}`;
          mensajeConfirmacion.classList.remove("alert-success");
          mensajeConfirmacion.classList.add("alert-danger");
          mensajeConfirmacion.classList.remove("d-none");
        }

        // Ocultar después de 6 segundos
        setTimeout(() => mensajeConfirmacion.classList.add("d-none"), 6000);
      })
      .catch((error) => {
        mensajeConfirmacion.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> Error de conexión. Intenta de nuevo.`;
        mensajeConfirmacion.classList.remove("alert-success");
        mensajeConfirmacion.classList.add("alert-danger");
        mensajeConfirmacion.classList.remove("d-none");
      });
  });

  // Efecto de palpitar más rápido al hacer clic en el corazón
  const corazon = document.querySelector(".corazon");
  corazon.addEventListener("click", function () {
    this.style.animation = "palpitar 0.6s infinite";

    setTimeout(() => {
      this.style.animation = "palpitar 1.2s infinite";
    }, 3000);
  });

  // Animación de rebote para la flecha indicadora
  const style = document.createElement("style");
  style.textContent = `
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                    40% {transform: translateY(-20px);}
                    60% {transform: translateY(-10px);}
                }
            `;
  document.head.appendChild(style);

  // Efecto parallax mejorado para la portada
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.getElementById("portada");
    const rate = scrolled * 0.5;

    // Solo aplicar parallax en pantallas grandes
    if (window.innerWidth > 768) {
      parallaxElement.style.backgroundPosition = "center " + rate + "px";
    }
  });
});

// ===== MÚSICA DE FONDO =====
const musica = document.getElementById("musicaFondo");
const btnMusica = document.getElementById("btnMusica");
const iconoMusica = btnMusica.querySelector("i");

let reproduciendo = false;

// Intentar autoplay al cargar
window.addEventListener("load", () => {
  musica
    .play()
    .then(() => {
      reproduciendo = true;
      iconoMusica.className = "bi bi-pause-fill";
    })
    .catch(() => {
      console.log("Autoplay bloqueado por navegador");
    });
});

// Botón Play / Pause
btnMusica.addEventListener("click", () => {
  if (reproduciendo) {
    musica.pause();
    iconoMusica.className = "bi bi-play-fill";
  } else {
    musica.play();
    iconoMusica.className = "bi bi-pause-fill";
  }
  reproduciendo = !reproduciendo;
});

// Si autoplay fue bloqueado → activar en primer clic
document.addEventListener(
  "click",
  () => {
    if (!reproduciendo) {
      musica
        .play()
        .then(() => {
          reproduciendo = true;
          iconoMusica.className = "bi bi-pause-fill";
        })
        .catch(() => {});
    }
  },
  { once: true },
);
