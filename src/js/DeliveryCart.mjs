import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider" data-id=${item.idMeal}>
                <button class="delete" data-id="${item.idMeal}">x</button>
                <a href="#" class="cart-card__image">
                    <img src="${item.strMealThumb}" alt="${item.strMeal}">
                </a>
                <a class="information" href="#">
                    <h2 class="card__name">Meal:Name: ${item.strMeal}</h2>
                    <h3 class="card__category">Category: ${item.strCategory}</h3>
                    <h3 class="card__area">Origin: ${item.strArea}</h3>
                </a>
                
                <p class="cart-card__quantity">
                <button class="decrease">-</button>
                qty: ${item.quantity}
                <button class="increase">+</button>
                </p>
                
                <p class="cart-card__price">Price: $${item.price}</p>
            </li>`;
}

export default class DeliveryCart{
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key) || [];

    cartItems.forEach(item => {
        if (!item.quantity || item.quantity < 1) item.quantity = 1;
    });
        
        const htmlItems = cartItems.map(item => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

        const totalprice = this.sumtotalprice(cartItems);
        document.querySelector(".cart-total").textContent = totalprice.toFixed(2);
        setLocalStorage(".cart-total", totalprice)
        setLocalStorage(this.key, cartItems);
    }
    sumtotalprice(items) {
    return items.reduce(
      (total, item) => total + (Number(item.price) * item.quantity),
      0
    );
  }
}

document.querySelector(".meal-list").addEventListener("click", (e) => {
  const cart = getLocalStorage("so-cart") || [];

  if (!e.target.classList.contains("increase") &&
      !e.target.classList.contains("decrease")) return;

  const parent = e.target.closest(".cart-card");
  if (!parent) return;

  const cards = Array.from(document.querySelectorAll(".cart-card"));
  const index = cards.indexOf(parent);
  if (index === -1) return;

  let currentQty = cart[index].quantity;

  if (e.target.classList.contains("increase")) currentQty++;
  if (e.target.classList.contains("decrease") && currentQty > 1) currentQty--;

  cart[index].quantity = currentQty;

  setLocalStorage("so-cart", cart);

  const cartView = new DeliveryCart("so-cart", ".meal-list");
  cartView.renderCartContents();
});



