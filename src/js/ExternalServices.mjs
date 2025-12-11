const baseURL = import.meta.env.VITE_SERVER_URL;
const fakeUrl = import.meta.env.VITE_FAKE_API;

async function convertToJson(res) {
  const data = await res.json()
  if (res.ok) {
    return data;
  }
  else {
        throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseURL}filter.php?c=${category}`);
    const data = await convertToJson(response);
    document.querySelector(".title").textContent = category.charAt(0).toUpperCase() + category.slice(1);

    return data.meals;
  }
  async findMealById(id) {
    const response = await fetch(`${baseURL}lookup.php?i=${id}`);
    const data = await convertToJson(response);
    const meal = { ...data.meals[0] };

    meal.price = await this.getPrice()
    meal.chef = await this.getChef()
    // console.log(data.Result);
    return meal
  }

  async getPrice() {
    const res = await fetch(`${fakeUrl}/products/${Math.floor(Math.random() * 20) + 1}`);
    const data = await res.json();
    return data.price;
  }

  async getChef() {
  const res = await fetch(`${fakeUrl}/users/${Math.floor(Math.random() * 10) + 1}`);
    const data = await res.json();
    const fullName = `${data.name.firstname.charAt(0).toUpperCase() + data.name.firstname.slice(1)} ${data.name.lastname.charAt(0).toUpperCase() + data.name.lastname.slice(1)}`
     
    return fullName;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${fakeUrl}/carts`, options).then(convertToJson);
  }
}
