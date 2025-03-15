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
  console.log((amount + 1) * 100 + "%");
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
