import { getLocalStorage, setLocalStorage, alertMessage, } from "./utils.mjs";

export default class foodDetails{
    constructor(mealId, dataSource) {
        this.mealId = mealId;
        this.meal = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.meal = await this.dataSource.findMealById(this.mealId);

        if (!this.meal || this.meal.length === 0) {
        console.error("Meal not found for ID:", this.mealId);
        alertMessage("Meal not found");
        return;
    }
        this.renderMealDetails();

        document.getElementById("add-to-cart").addEventListener("click", this.addMealToCart.bind(this));
        document.getElementById("add-to-save").addEventListener("click", this.addMealToSave.bind(this));
    }

    addMealToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.meal)
        setLocalStorage("so-cart", cartItems);
        alertMessage(`${this.meal.strMeal} added to cart!`);
    }

    addMealToSave() {
        const saveItems = getLocalStorage("so-save") || [];
        saveItems.push(this.meal)
        setLocalStorage("so-save", saveItems);
        alertMessage(`${this.meal.strMeal} added to the Wish List!`);
    }
    renderMealDetails() {
        mealDetailsTemplate(this.meal)
    }
}

function mealDetailsTemplate(meal) {
    document.querySelector("h2").textContent = `Meal Details: ${meal.strCategory.charAt(0).toUpperCase() + meal.strCategory.slice(1)}`;
    const mealImg = document.querySelector("#m-image");
    mealImg.src = meal.strMealThumb;
    mealImg.alt = meal.strMeal; 
    document.querySelector("#m-category").textContent = `Category: ${meal.strCategory.charAt(0).toUpperCase() + meal.strCategory.slice(1)}`;

    document.querySelector("#m-name").textContent = `Name: ${meal.strMeal}`;
    document.querySelector("#m-area").textContent = `${meal.strArea}`;
    document.querySelector("#m-chef").textContent = ` ${meal.chef}`;

    // Add Tags
    const tagsContainer = document.querySelector("#m-tags");
    tagsContainer.innerHTML = "";
    const tags = meal.strTags ? meal.strTags.split(",") : [];
    tags.forEach(tag => {
        const span = document.createElement("span");
        span.classList.add("tag");
        span.textContent = tag.trim();
        tagsContainer.appendChild(span)
    })

    // Add Ingredients
    document.querySelector("#m-ingredients").innerHTML = getIngredients(meal);

    document.querySelector("#m-instructions").textContent = meal.strInstructions;
    document.querySelector("#m-price").textContent = `For Delivery: $${meal.price}`;


}

function getIngredients(meal) {
    let ingredients = "";

    for (let i = 1; i <= 20; i++){
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`];
       if (ingredient && ingredient.trim() !== "") {
            const cleanIngredient = ingredient.trim();
            const cleanMeasure = measure ? measure.trim() : "";

            ingredients += `<li>${cleanMeasure} ${cleanIngredient}</li>`;
        }
    }

   return ingredients
}
