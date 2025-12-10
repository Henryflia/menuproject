import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import foodDetails from "./foodDetails.mjs";

loadHeaderFooter();
const dataSource = new ExternalServices();
const mealId = getParam("id");

const meal = new foodDetails(mealId, dataSource);
meal.init();