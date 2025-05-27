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
// skill circle animation

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
