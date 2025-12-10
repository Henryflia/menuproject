import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MenuList from "./MenuList.mjs";

loadHeaderFooter();

const grid = document.getElementById("product-grid");

document.getElementById("left-btn").addEventListener("click", () => {
  grid.scrollBy({ left: -200, behavior: "smooth" });
});

document.getElementById("right-btn").addEventListener("click", () => {
  grid.scrollBy({ left: 200, behavior: "smooth" });
});

function getTopCategoryByTime() {
  const Top_Category = {
    breakfast: "Dessert",
    lunch: "Chicken",
    dinner: "Seafood"
  };

    const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return Top_Category.breakfast;
  if (hour >= 12 && hour < 17) return Top_Category.lunch;
  return Top_Category.dinner;
}

const homeList = location.pathname === "/" || location.pathname.includes("index.html");

let categoryUse = "beef";

if (homeList) {
  categoryUse = getTopCategoryByTime();
}

const data = new ExternalServices();

const list = document.querySelector(".meal-list");

const menu = new MenuList(categoryUse, data, list);

menu.init()