  // PRELOADER EKRAN
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
    }, 2000);
  });

  // SCROLL BEHAVIOUR
  setTimeout(function () {
    document.body.style.overflow = 'auto';
  }, 2000);

  // ZVJEZDANO DUGME
  const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const PARTICLES = document.querySelectorAll('.particle');
  PARTICLES.forEach(P => {
    P.setAttribute('style', `
      --x: ${RANDOM(20, 80)};
      --y: ${RANDOM(20, 80)};
      --duration: ${RANDOM(6, 20)};
      --delay: ${RANDOM(1, 10)};
      --opacity: ${RANDOM(40, 90) / 100};
      --originX: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
      --originY: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
      --size: ${RANDOM(40, 90) / 100};
    `);
  });

  // ANIMACIJA ROTIRANJA DUGMADI
  const rotated = document.getElementById('parallaxBigButton');
  let rotation = 0;
  const angle = -60;

  function rotateImage() {
    rotation = (rotation + angle) % 360;
    rotated.style.transform = `rotate(${rotation}deg)`;
  }

  // PROMJENA SCENA
  var scenes = [
    ["scene1_1.jpg", "scene1_2.png", "scene1_3.png"],
    ["scene2_1.jpg", , "scene2_3.png"],
    ["scene3_1.jpg", , "scene3_3.png"],
    ["scene4_1.jpeg", , "scene4_3.png"],
  ];

  var currentSceneIndex = 0;
  var currentImageIndex = 0;

  function changeScene() {
    scenes[currentSceneIndex].forEach(function (image, index) {
      document.getElementById("scene" + (currentSceneIndex + 1) + "_" + (index + 1)).classList.remove("visible");
    });
    currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
    scenes[currentSceneIndex].forEach(function (image, index) {
      document.getElementById("scene" + (currentSceneIndex + 1) + "_" + (index + 1)).classList.add("visible");
    });
  }

// ANIMACIJA KNJIGE
$(document).ready(function () {
  var winWidth = $(window).width();
  var ratio = winWidth / 1920;
  var bodyFontSize = Math.max(16 * ratio, 10);
  var posX = Math.max(80 * ratio, 30);
  $("body").css("font-size", bodyFontSize + "px");

  var played = [0, 0, 0];

  $(".front:not(.last)").click(function () {
    var ix = $(this).parent(".paper").index();
    $(".book").addClass("open");
    $(this).parent(".paper").addClass("open");
    if (!played[ix]) {
      played[ix] = 1;
    }
  });

  $(".back").click(function () {
    if ($(this).parent(".paper").index() == 0)
      $(".book").removeClass("open");
    $(this).parent(".paper").removeClass("open");
  });
});