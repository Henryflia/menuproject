import ExternalServices from "./ExternalServices.mjs";
import MenuList from "./MenuList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");

const data = new ExternalServices();

const list = document.querySelector(".meal-list");

const menu = new MenuList(category, data, list);

menu.init()