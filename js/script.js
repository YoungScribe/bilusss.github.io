$(function () {
  var controller = new ScrollMagic.Controller();
  var amount = 4; // Define amount of slides
  updateCSSVariables(amount); // Update CSS variables
  var wipeAnimation = gsap.timeline();
  for (var i = 1; i < amount; i++) {
    var minus = (-100 / (amount + 0)) * i + "%";
    console.log(minus);
    if (i == 1) {
      wipeAnimation
        .to("#slideContainer", { z: -150, duration: 0.5 })
        .to("#slideContainer", { x: minus, duration: 1 })
        .to("#slideContainer", { z: 0, duration: 0.5 });
    } else {
      wipeAnimation
        .to("#slideContainer", { z: -150, duration: 0.5, delay: 1 })
        .to("#slideContainer", { x: minus, duration: 1 })
        .to("#slideContainer", { z: 0, duration: 0.5 });
    }
  }

  // create scene to pin and link animation
  new ScrollMagic.Scene({
    triggerElement: "#pinContainer",
    triggerHook: "onLeave",
    duration: (amount + 1) * 100 + "%",
  })
    .setPin("#pinContainer")
    .setTween(wipeAnimation)
    // .addIndicators() // (remove later) add indicators (requires plugin)
    .addTo(controller);
});

function updateCSSVariables(amount) {
  document.documentElement.style.setProperty("--slide-amount", amount);
}
document.addEventListener("DOMContentLoaded", function () {
  // Pobranie wszystkich przycisków "Więcej informacji"
  const moreInfoBtns = document.querySelectorAll(".more-info-btn");

  // Pobranie wszystkich przycisków zamykających modala
  const closeModalBtns = document.querySelectorAll(".modal-close");

  // Funkcja otwierająca modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      // Najpierw ustaw display:flex, a potem dodaj klasę active dla animacji
      modal.style.display = "flex";
      // Force reflow
      void modal.offsetWidth;
      modal.classList.add("active");
      document.body.classList.add("modal-open");

      // Obsługa zamykania przez kliknięcie poza modalem
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeModal(modalId);
        }
      });

      // Obsługa klawisza Escape
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeModal(modalId);
        }
      });
    }
  }

  // Funkcja zamykająca modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      // Poczekaj na zakończenie animacji przed ukryciem
      setTimeout(function () {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      }, 300); // Ten sam czas co transition w CSS
    }
  }

  // Przypisanie zdarzeń do przycisków "Więcej informacji"
  moreInfoBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      openModal(modalId);
    });
  });

  // Przypisanie zdarzeń do przycisków zamykających
  closeModalBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal-container");
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
});
