import { renderListWithTemplate } from "./utils.mjs";



function menuCardTemplate(food, category) {
    return `<li class="meal-card">
          <a href="/food_pages/?id=${food.idMeal}">
            <img src="${food.strMealThumb}"alt="${food.strMeal}" />
            <h2>Category: ${category}</h2>
            <h3 class="card__name">${food.strMeal}</h3>
          </a>
        </li>`
}

export default class MenuList{
    constructor(category, data, listElement) {
        this.category = category;
        this.data = data;
        this.listElement = listElement;
        this.meals = [];
    }

    async init() {
        this.meals = await this.data.getData(this.category);
        this.meals = this.meals.filter(
            (meal, index, self) =>
                index === self.findIndex(m => m.idMeal === meal.idMeal)
        );
        this.renderList(this.meals)
        this.addSearchListener();
    }

    renderList(list) {
        const homeList = location.pathname === "/" || location.pathname.includes("index.html")

        const limited = homeList ? list.slice(0, 4) : list 
        renderListWithTemplate((food) => menuCardTemplate(food, this.category), this.listElement, limited, "afterbegin");
    }

    addSearchListener() {
        const searchInput = document.querySelector("#search")
        if (!searchInput) return;

        searchInput.addEventListener("input", () => {
            const text = searchInput.value.toLowerCase().trim();

            const filtered = this.meals.filter(meal =>
                meal.strMeal.toLowerCase().includes(text)
            );

            this.renderList(filtered)
        })
    }
}