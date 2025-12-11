import SaveLater from "./SaveLater.mjs";
import { loadHeaderFooter, removeMeal } from "./utils.mjs";

const save = new SaveLater("so-save", ".save-list");
loadHeaderFooter();
save.renderCartContents();
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const id = e.target.dataset.id
        removeMeal(id, "so-save")

        save.renderCartContents()
    }
});