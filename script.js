document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_PHONE = "51989701739"; 
  const WHATSAPP_MESSAGE = encodeURIComponent("Confirmo mi asistencia :D");
  const EVENT_DATE = new Date("October 30, 2026 20:00:00").getTime();

  const btnGo = document.getElementById("btn-go");
  const bgMusic = document.getElementById("bg-music");
  const screenLoading = document.getElementById("screen-loading");
  const screenJumpscare = document.getElementById("screen-jumpscare");
  const mainContent = document.getElementById("main-content");
  const batContainer = document.getElementById("bat-container");
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  const btnMap = document.getElementById("btn-map");
  const loadingText = document.getElementById("loading-text");
  const spinner = document.getElementById("spinner");

  // Temporizador de carga inicial
  setTimeout(() => {
    loadingText.innerText = "¡GO!";
    loadingText.style.color = "#e8f1f0";
    spinner.classList.add("hidden");
    btnGo.classList.remove("hidden");
  }, 2500);

  // Al presionar ¡PRESIONAME!
  btnGo.addEventListener("click", () => {
    bgMusic.play().catch(err => console.log("Audio autostart:", err));

    screenLoading.classList.add("hidden");
    screenJumpscare.classList.remove("hidden");

    setTimeout(() => {
      screenJumpscare.classList.add("strobe-bg");
    }, 1500);

    setTimeout(() => {
      screenJumpscare.classList.remove("strobe-bg");
      screenJumpscare.classList.add("hidden");

      triggerBatSwarm(70);
      mainContent.classList.remove("hidden");
      mainContent.classList.add("animate__animated", "animate__fadeInUp");
    }, 2300);
  });

  function triggerBatSwarm(totalCount = 70) {
    let created = 0;
    
    function spawnBat() {
      if (created >= totalCount) return;

      const bat = document.createElement("div");
      bat.className = "bat";
      bat.innerHTML = `<span class="bat-wings">🦇</span>`;

      const startX = (Math.random() * 80 + 10) + "vw";
      const endX = (Math.random() * 160 - 30) + "vw";
      const rot = (Math.random() * 60 - 30) + "deg";
      const scale = (Math.random() * 0.9 + 0.7).toFixed(2);
      const duration = (Math.random() * 1.0 + 1.5).toFixed(2);

      bat.style.left = startX;
      bat.style.setProperty("--bat-x-end", endX);
      bat.style.setProperty("--bat-rot", rot);
      bat.style.setProperty("--bat-scale", scale);
      bat.style.animationDuration = `${duration}s`;

      batContainer.appendChild(bat);
      created++;

      setTimeout(() => {
        bat.remove();
      }, parseFloat(duration) * 1000 + 100);

      requestAnimationFrame(spawnBat);
    }

    requestAnimationFrame(spawnBat);
  }

  // Contador Regresivo
  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = EVENT_DATE - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      document.getElementById("countdown").innerHTML = "<h3>¡LA FIESTA YA EMPEZÓ! 🎃👑</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
  }, 1000);

  // CONTROL DEL BOTÓN DE MAPA COMPATIBLE CON IOS Y ANDROID
  if (btnMap) {
    btnMap.addEventListener("click", (e) => {
      e.preventDefault();
      
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      const address = "El Alamo 1038, Comas, Lima";
      const fallbackUrl = "https://maps.app.goo.gl/fhvVDTWfzNJL191BA";

      if (isIOS) {
        // En iOS intenta abrir Apple Maps o abre el enlace directo
        window.location.href = `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
      } else {
        // En Android / PC usa el enlace corto de Maps
        window.open(fallbackUrl, "_blank");
      }
    });
  }

  // Botón de WhatsApp
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", () => {
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MESSAGE}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // AGENDAR EN GOOGLE CALENDAR
  const btnCalendar = document.getElementById("btn-calendar");
  if (btnCalendar) {
    const eventDetails = {
      title: "XV Años de Anghely 🎃👑",
      details: "¡Fiesta de XV años con temática Halloween! Código de vestimenta: Disfraz - OBLIGATORIO",
      location: "El Alamo 1038, Comas, Lima",
      startDate: "20261030T200000",
      endDate: "20261031T030000"
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;
    
    btnCalendar.href = calendarUrl;
  }

  // EFECTO SCROLL REVEAL (Aparición al deslizar)
  const observerOptions = { threshold: 0.15 };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal-on-scroll").forEach(el => {
    revealObserver.observe(el);
  });
}); // Cierre final de DOMContentLoaded