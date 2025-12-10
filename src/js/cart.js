import DeliveryCart from "./DeliveryCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const cart = new DeliveryCart("so-cart", ".meal-list");
loadHeaderFooter();
cart.renderCartContents();
