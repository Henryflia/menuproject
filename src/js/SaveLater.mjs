import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function saveItemTemplate(item) {
    return `<li class="meal-card">
          <a href="/food_pages/?id=${item.idMeal}">
            <img src="${item.strMealThumb}"alt="${item.strMeal}" />
            <h2>Category: ${item.strCategory}</h2>
            <h3 class="card__name">${item.strMeal}</h3>
          </a>
        </li>`
}

export default class SaveLater{
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key) || [];

    cartItems.forEach(item => {
        if (!item.quantity || item.quantity < 1) item.quantity = 1;
    });
        
        const htmlItems = cartItems.map(item => saveItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

        setLocalStorage(this.key, cartItems);
    }
}


