import DeliveryCart from "./DeliveryCart.mjs";
import { loadHeaderFooter, removeMeal } from "./utils.mjs";

const cart = new DeliveryCart("so-cart", ".meal-list");
loadHeaderFooter();
cart.renderCartContents();


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.dataset.id
        removeMeal(id, "so-cart")

        cart.renderCartContents()
    }
});