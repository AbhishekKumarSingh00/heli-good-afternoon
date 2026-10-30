"use strict";

const delivery = document.querySelector(".story-delivery");
const greeting = document.getElementById("greeting");
const confetti = document.getElementById("confetti");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const timers = [];

function celebrate() {
  delivery.dataset.step = "celebrate";
  greeting.hidden = false;
  if (reducedMotion.matches) return;

  const colors = ["#e7b452", "#c77e72", "#fff1c4", "#8ba87a", "#e7a9a0"];
  const pieces = document.createDocumentFragment();
  for (let index = 0; index < 110; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--x", index % 2 ? "20%" : "80%");
    piece.style.setProperty("--size", `${5 + Math.random() * 7}px`);
    piece.style.setProperty("--color", colors[index % colors.length]);
    piece.style.setProperty("--duration", `${2.8 + Math.random() * 1.7}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.3}s`);
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * window.innerWidth}px`);
    piece.style.setProperty("--height", `${-45 - Math.random() * 35}vh`);
    piece.style.setProperty("--rotation", `${Math.random() * 720 - 360}deg`);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
    pieces.append(piece);
  }
  confetti.replaceChildren(pieces);
  window.setTimeout(() => confetti.replaceChildren(), 5200);
}

function finishWithoutMotion() {
  timers.forEach(window.clearTimeout);
  confetti.replaceChildren();
  celebrate();
}

if (reducedMotion.matches) {
  finishWithoutMotion();
} else {
  const steps = [
    [300, "arriving"],
    [2600, "delivered"],
    [3600, "pickup"],
    [5100, "opening"],
    [6400, "celebrate"]
  ];
  steps.forEach(([delay, step]) => {
    timers.push(window.setTimeout(() => { delivery.dataset.step = step; }, delay));
  });
  timers.push(window.setTimeout(celebrate, 7300));
}

reducedMotion.addEventListener("change", (event) => {
  if (event.matches) finishWithoutMotion();
});
