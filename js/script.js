$(function () {
  // wait for document ready
  // init
  var controller = new ScrollMagic.Controller();

  // define movement of panels
  var wipeAnimation = gsap
    .timeline()
    // animate to second panel
    .to("#slideContainer", { z: -150, duration: 0.5 }) // move back in 3D space
    .to("#slideContainer", { x: "-25%", duration: 1 }) // move in to first panel
    .to("#slideContainer", { z: 0, duration: 0.5 }) // move back to origin in 3D space
    // animate to third panel
    .to("#slideContainer", { z: -150, duration: 0.5, delay: 1 })
    .to("#slideContainer", { x: "-50%", duration: 1 })
    .to("#slideContainer", { z: 0, duration: 0.5 })
    // animate to forth panel
    .to("#slideContainer", { z: -150, duration: 0.5, delay: 1 })
    .to("#slideContainer", { x: "-75%", duration: 1 })
    .to("#slideContainer", { z: 0, duration: 0.5 });

  // create scene to pin and link animation
  new ScrollMagic.Scene({
    triggerElement: "#pinContainer",
    triggerHook: "onLeave",
    duration: "500%",
  })
    .setPin("#pinContainer")
    .setTween(wipeAnimation)
    .addIndicators() // add indicators (requires plugin)
    .addTo(controller);
});
