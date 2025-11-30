import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const grid = document.getElementById("product-grid");

document.getElementById("left-btn").addEventListener("click", () => {
  grid.scrollBy({ left: -200, behavior: "smooth" });
});

document.getElementById("right-btn").addEventListener("click", () => {
  grid.scrollBy({ left: 200, behavior: "smooth" });
});