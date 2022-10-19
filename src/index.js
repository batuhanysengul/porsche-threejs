import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  CanvasSnipperPlugin,
} from "webgi";
import "./styles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { Pane } from "tweakpane";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ scroller: ".mainContainer" });

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas"),
    useRgbm: false,
    isAntialiased: true,
  });

 //    const data = {
 //   position: { x: 0, y: 0, z: 0 },
 //    rotation: { x: 0, y: 0, z: 0 },
 //  };

  // const pane = new Pane();

  viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  const camera = viewer.scene.activeCamera;
  

  await addBasePlugins(viewer);

  const importer = manager.importer;

  importer.addEventListener("onProgress", (ev) => {
    const progress = ev.loaded / ev.total;
    document.querySelector(".progress")
    .setAttribute("style", `transform: scaleX(${progress})`);
  });
  importer.addEventListener("onLoad", (ev) => {
    introAnimation();
  });

  await viewer.addPlugin(CanvasSnipperPlugin);

  viewer.renderer.refreshPipeline();

  const model = await manager.addFromPath("./assets/porsche.glb");
  const object3d = model[0].modelObject;
  const modelPosition = object3d.position;
  const modelRotation = object3d.rotation;

  const loaderElement = document.querySelector('.loader');

  function introAnimation() {
    const t1 = gsap.timeline()
    t1.to(".loader", {
      y: "-150%",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 1,
      onComplete: setupScrollAnimation,
    })

    .fromTo(
      ".header-container",
      { opacity: 0, y: "-100%" },
      { opacity: 1, y: "0%", ease: "power1.inOut", duration: 0.8 },
      "-=1"
    )
    .fromTo(
      ".hero-scroller",
      { opacity: 0, y: "150%" },
      { opacity: 1, y: "0%", ease: "power4.inOut", duration: 1 },
      "-=1"
    )
    .fromTo(
      ".hero-content",
      { opacity: 0, x: "-50%" },
      {
        opacity: 1,
        x: "0%",
        ease: "power4.inOut",
        duration: 1.8,
        onComplete: setupScrollAnimation,
      },
      "-=1"
    );
    
    ;
  }

   //pane.addInput(data, "position", {
   //  x: { step: 0.01 },
   //  y: { step: 0.01 },
   //  z: { step: 0.01 },
   // });
  // pane.addInput(data, "rotation", {
   //  x: { min: -6.28319, max: 6.28319, step: 0.001 },
   //  y: { min: -6.28319, max: 6.28319, step: 0.001 },
   //  z: { min: -6.28319, max: 6.28319, step: 0.001 },
   // });

   pane.on("change", (e) => {
     if (e.presetKey === "rotation") {
       const { x, y, z } = e.value;
       modelRotation.set(x, y, z);
     } else {
       const { x, y, z } = e.value;
       modelPosition.set(x, y, z);
     }

   onUpdate();
   });

  function setupScrollAnimation() {
    document.body.removeChild(loaderElement);

    const tl = gsap.timeline();

    tl.to(modelPosition, {
      x: 0,
      y: 0,
      z: 0,
      scrollTrigger: {
        trigger: ".first",
        start: "top top",
        end: "top top",
        scrub: 0.2,
        immediateRender: false,
      },
      onUpdate,
    })

      .to(modelPosition, {
        x: 3.5,
        y: -1.07,
        z: -0.22,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })

      .to(modelRotation, {
        x: 0,
        y: 0,
        z: -1.65,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })

      .to(modelPosition, {
        x: 2.38,
        y: 1,
        z: -3.24,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })

      .to(modelRotation, {
        x: 0.118,
        y: 0.929,
        z: 0,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })

      .to(modelPosition, {
        x: 1.57,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: ".fourth",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })

      .to(modelRotation, {
        x: 0.0,
        y: 1.8,
        z: 0,
        scrollTrigger: {
          trigger: ".fourth",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })
      .to(modelPosition, {
        x: 2,
        y: 1.7,
        z: 1.76,
        scrollTrigger: {
          trigger: ".fifth",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })
      .to(modelRotation, {
        x: -0.4,
        y: 2.411,
        z: 0.901,
        scrollTrigger: {
          trigger: ".fifth",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })

      .to(modelPosition, {
        x: 1,
        y: 0.31,
        z: -1.32,
        scrollTrigger: {
          trigger: ".sixth",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })

      .to(modelRotation, {
        x: 0.002,
        y: -1.213,
        z: -0.004,
        scrollTrigger: {
          trigger: ".sixth",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })
      .to(".section-one-container1", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".section-one-container1",
          start: "top top",
          end: "bottom top",
          scrub: true,
          immediateRender: false,
        },
      })
      .to(".section-one-container2", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top center",
          scrub: true,
          immediateRender: false,
        },
      })
      .to(".section-two-container1", {
        scrollTrigger: {
          trigger: ".section-two-container1",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "activeRightSpecific",
          scrub: true,
        },
      })
      .to(".section-two-container2", {
        scrollTrigger: {
          trigger: ".section-two-container2",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      })
      .to(".section-three-container", {
        scrollTrigger: {
          trigger: ".section-three-container",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      })
      .to(".section-four-container", {
        scrollTrigger: {
          trigger: ".section-four-container",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      })
      .to(".section-five-container ", {
        scrollTrigger: {
          trigger: ".section-five-container ",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      })
      .to(".section-six-container ", {
        scrollTrigger: {
          trigger: ".section-six-container ",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },

      })
  }

  function onUpdate() {
    viewer.setDirty();
  }
}

setupViewer();
