function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  tl.from("#line1-part1 ", {
    opacity: 0,
    onstart: function () {
      var h5timer = document.querySelector("#line1-part1 h5");
      var grow = 0;
      setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 33);
    },
  });
  tl.to(".line h2", {
    animationName: "loaderAnime",
    opacity: 1,
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 4,
  });

  tl.from("#page1", {
    delay: 0.2,
    y: 1600,
    duration: 0.6,
    ease: Power4,
  });

  tl.to("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    opacity: 0,
  });

  tl.from("#hero1 h1, #hero2 h1,  #hero3 h2, #hero4 h1", {
    y: 140,
    stagger: 0.2,
  });

  tl.from(
    "#hero1 ",
    "#page2",
    {
      opacity: 0,
    },
    "-=1.2"
  ); //it should run this code first//
}

function cursorAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet("#nav-part2 h4");
  var videoContainer = document.querySelector("video-container");
  var video = document.querySelector("#video-container  video");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        left: dets.x - 570,
        top: dets.y - 300,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      left: "70%",
      top: "-15%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function sheryAnimation() {
  shery.imageEffect(".image-div", {
    style: 5,
    debugger: true,
    gooey: true,
  });
}

loadingAnimation();
cursorAnimation();
locomotiveAnimation();

sheryAnimation();
