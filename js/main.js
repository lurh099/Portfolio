///////////////////////////////////////////////////////////
// Active nav link color

const navLinks = document.querySelectorAll(".main-nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

///////////////////////////////////////////////////////////
// Typing text animation

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "Full Stack Developer",
  "Frontend Developer",
  "Mobile Developer",
];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 1500; // Pause nach vollständigem Schreiben
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, newTextDelay);
});

///////////////////////////////////////////////////////////
// Skill circle animation

document.addEventListener("DOMContentLoaded", () => {
  const skillCircles = document.querySelectorAll(".skill-circle");

  const animateCircle = (circle) => {
    const percentageElement = circle.querySelector(".percentage");
    const target = parseInt(circle.getAttribute("data-percentage"));
    let current = 0;

    const update = () => {
      if (current <= target) {
        percentageElement.textContent = `${current} %`;
        circle.style.background = `conic-gradient(#ffdb70 0% ${current}%, #2e2e2e ${current}% 100%)`;
        current++;
        requestAnimationFrame(update);
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCircle(entry.target);
          obs.unobserve(entry.target); // nur einmal animieren
        }
      });
    },
    {
      threshold: 0.6, // mindestens 60% sichtbar
    }
  );

  skillCircles.forEach((circle) => observer.observe(circle));
});

///////////////////////////////////////////////////////////
// Skill slider
document.addEventListener("DOMContentLoaded", function () {
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const viewportWrapper = document.querySelector(".viewport");
  const icons = Array.from(
    document.querySelectorAll(".tech-link-box, .empty-box")
  );

  let viewports = [];
  let currentIndex = 0;

  function updateCarousel() {
    viewports.forEach((v, i) => {
      v.style.opacity = i === currentIndex ? "1" : "0";
      v.style.transition = "opacity 0.5s ease-in-out";
      v.style.display = i === currentIndex ? "flex" : "none";
    });

    leftArrow.disabled = currentIndex === 0;
    rightArrow.disabled = currentIndex === viewports.length - 1;
  }

  function initMobileCarousel() {
    viewportWrapper.innerHTML = ""; // leeren

    const iconsPerViewport = 3;
    const totalViewports = Math.ceil(icons.length / iconsPerViewport);

    for (let i = 0; i < totalViewports; i++) {
      const viewport = document.createElement("div");
      viewport.classList.add(`viewport-${i + 1}`);
      viewport.style.display = "none";
      viewport.style.flex = "0 0 100%";
      viewport.style.justifyContent = "center";
      viewport.style.flexWrap = "wrap";
      viewport.style.gap = "2rem";

      const start = i * iconsPerViewport;
      const end = start + iconsPerViewport;
      icons.slice(start, end).forEach((icon) => viewport.appendChild(icon));

      viewportWrapper.appendChild(viewport);
    }

    viewports = Array.from(viewportWrapper.children);
    updateCarousel();
  }

  function initDesktopCarousel() {
    viewports = [
      document.querySelector(".viewport-1"),
      document.querySelector(".viewport-2"),
      document.querySelector(".viewport-3"),
    ];
    updateCarousel();
  }

  function setupCarousel() {
    if (window.innerWidth < 1024) {
      initMobileCarousel();
    } else {
      initDesktopCarousel();
    }
  }

  leftArrow.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  rightArrow.addEventListener("click", function () {
    if (currentIndex < viewports.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  setupCarousel();
  window.addEventListener("resize", () => {
    setupCarousel();
  });
});

///////////////////////////////////////////////////////////
// Dropdown menu
const contactBtn = document.querySelector(".show-contacts .profile-btn");
const skillBtnContainer = document.querySelector(".show-skill-set");
const skillBtn = skillBtnContainer.querySelector(".profile-btn");

const contactSection = document.querySelector(".section-contact");
const skillSection = document.querySelector(".section-skills");

const toggleSection = (btn, section, label) => {
  const icon = btn.querySelector(".arr-icon");

  section.classList.toggle("visible");

  const isOpen = section.classList.contains("visible");
  btn.innerHTML = `${
    isOpen ? "Close" : "Show"
  } ${label} <ion-icon class="arr-icon" name="chevron-${
    isOpen ? "up" : "down"
  }-outline"></ion-icon>`;

  if (label === "Contacts") {
    // Skill-Button nur anzeigen, wenn Contacts sichtbar
    skillBtnContainer.style.display = isOpen ? "flex" : "none";
    // Skills ausblenden, wenn Contacts geschlossen werden
    if (!isOpen) {
      skillSection.classList.remove("visible");
      skillBtn.innerHTML = `Show Skill Set <ion-icon class="arr-icon" name="chevron-down-outline"></ion-icon>`;
    }
  }
};

contactBtn.addEventListener("click", () =>
  toggleSection(contactBtn, contactSection, "Contacts")
);
skillBtn.addEventListener("click", () =>
  toggleSection(skillBtn, skillSection, "Skill Set")
);

///////////////////////////////////////////////////////////
// TEST
document.addEventListener("DOMContentLoaded", () => {
  console.log("JS ist aktiv");
});
