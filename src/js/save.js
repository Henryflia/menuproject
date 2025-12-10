import SaveLater from "./SaveLater.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const save = new SaveLater("so-save", ".save-list");
loadHeaderFooter();
save.renderCartContents();
