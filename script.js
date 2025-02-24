// Initialize Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// -------------------------------------------------------------------------------------------------

// animation for the menu

function toggleMenu() {
  const menuItems = document.getElementById("menu-items");
  const menuLinks = document.querySelectorAll("#menu-items a");

  if (!menuItems.classList.contains("active")) {
    menuItems.classList.add("active");

    // Animate the menu from top to bottom
    gsap.fromTo(
      menuItems,
      { y: "-100%", opacity: 0 }, // Start from top
      { y: "0%", opacity: 1, duration: 0.5, ease: "power3.in" }
    );

    // from bottom to top 
    gsap.fromTo(
      menuLinks,
      { y: 20, opacity: 0 }, // Start from below
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.in", stagger: 0.2 } // Animate up
    );
  }
}

function closeMenu() {
  const menuItems = document.getElementById("menu-items");
  const menuLinks = document.querySelectorAll("#menu-items a");

  if (menuItems.classList.contains("active")) {
    gsap.to(
      menuLinks,
      { y: 20, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.2, 
        onComplete: () => {
  
          gsap.to(menuItems, { 
            y: "-100%", opacity: 0, duration: 0.5, ease: "power3.in", 
            onComplete: () => menuItems.classList.remove("active") 
          });
        }
      }
    );
  }
}

// -------------------------------------------------------------------------------------------------

// in mobile animation won't work

document.addEventListener("DOMContentLoaded", function () {
  function isMobile(){
    return window.innerWidth > 768 && !("ontouchstart" in window);
  }
  
  const images = document.querySelectorAll(".images img");
  const headingTexts = document.querySelectorAll(".heading h1");
  
  gsap.fromTo(
    images,
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.5 }
  );
  
  gsap.fromTo(
    ".heading h1",
    {
      y: 40,
      clipPath: "inset(100% 0 0 0)", 
    },
    {
      y: 0,
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2,
    }
  );
  
// ----------------------------------------------------------------------------------------------------
  
// animations for images

if(isMobile()){

  images.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      images.forEach((otherImg) => {
        if (otherImg !== img) {
          gsap.to(otherImg, {
            opacity: 0,
          });
          otherImg.parentElement.style.boxShadow = "0 0 1px .5px gray"; // Add outline
        }
      });

      gsap.to(headingTexts, {
        opacity: 0.5,
        duration: 0,
        onComplete: () => {
          headingTexts.forEach((el) => {
            el.style.webkitTextStroke = ".5px gray";
            el.style.webkitTextFillColor = "transparent";
          });
        },
      });

      // Reset
      gsap.to(img, { opacity: 1, filter: "none" });
    });

      img.addEventListener("mousemove", (e) => {
            // Move image
        const rect = img.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width / 1.5) * 0;
        const offsetY = (e.clientY - rect.top - rect.height / 1.5) * 0;
        gsap.to(img, { x: offsetX, y: offsetY });
      });

    img.addEventListener("mouseleave", () => {
      // Reset the hovered image
      images.forEach((otherImg) => {
        gsap.to(otherImg, {
          opacity: 1,
        });
        otherImg.parentElement.style.boxShadow = "none";
      });

      gsap.to(images, {
         opacity: 1,
          filter: "none"
      });
      gsap.to(headingTexts, {
        opacity: 1,
        filter: "none",
        duration: 0,
        onComplete: () => {
          headingTexts.forEach((el) => {
            el.style.webkitTextStroke = "";
            el.style.webkitTextFillColor = "";
          });
        },
      });
      // Reset
      gsap.to(images, { opacity: 1, filter: "none" });
      gsap.to(headingTexts, { opacity: 1, filter: "none" });
    });
  });

  // -----------------------------------------------------------------------------------------------------
  // same animation for text

  const imageContainers = document.querySelectorAll(".images > div"); 
  
  imageContainers.forEach((container) => {
    const img = container.querySelector("img");
    const imageText = container.querySelector(".image-text");
  
    container.addEventListener("mouseenter", () => {
      // Bring front
      gsap.to(container, { zIndex: 10, duration: 0.3 });
  
      // Move
        container.addEventListener("mousemove", (e) => {
          const rect = container.getBoundingClientRect();
          const offsetX = (e.clientX - rect.left - rect.width / 1.5) * 0.5;
          const offsetY = (e.clientY - rect.top - rect.height / 1.5) * 0.5;
          gsap.to(container, { x: offsetX, y: offsetY, duration: 0.2 });
        });
  
      // Show text
      if (imageText) {
        gsap.to(imageText, { opacity: 1, duration: 0.3 });
      }
    });
  
    container.addEventListener("mouseleave", () => {
      // Reset
      gsap.to(container, {
        zIndex: 1,
        x: 0,
        y: 0,
        duration: 0.3,
      });
  
      // Hide text
      if (imageText) {
        gsap.to(imageText, { opacity: 0, duration: 0.3 });
      }
    });
  });
}
  if(!isMobile()){
    images.forEach((img) => {
      img.style.pointerEvents = "none";
    });
  }
});  



