export function createRecipeModalContent(recipe) {
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("modal-content__img-container");

  const image = document.createElement("img");
  image.classList.add("modal-content__image");
  image.setAttribute("src", "img/recipes/" + recipe.id + ".jpg");
  image.setAttribute("alt", recipe.name);
  imgContainer.appendChild(image);
  modalContent.appendChild(imgContainer);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("modal-content__container");
  modalContent.appendChild(contentContainer);

  const titleTimeContainer = document.createElement("div");
  titleTimeContainer.classList.add("modal-content__title-time-container");

  const title = document.createElement("h2");
  title.classList.add("modal-content__title");
  title.textContent = recipe.name;
  titleTimeContainer.appendChild(title);

  const time = document.createElement("p");
  time.classList.add("modal-content__time");
  time.innerHTML = '<i class="far fa-clock"></i> ' + recipe.time + ' min';
  titleTimeContainer.appendChild(time);

  contentContainer.appendChild(titleTimeContainer);

  const descriptionIngredientsContainer = document.createElement("div");
  descriptionIngredientsContainer.classList.add("modal-content__description-ingredients-container");
  const servingsIngredientsContainer = document.createElement("div");
  servingsIngredientsContainer.classList.add("modal-content__servings-ingredients-container");

  const servings = document.createElement("p");
  servings.classList.add("modal-content__servings");
  servings.textContent = "Pour " + recipe.servings + " personnes";
  servingsIngredientsContainer.appendChild(servings);

  const ingredients = document.createElement("ul");
  ingredients.classList.add("modal-content__ingredients");
  recipe.originalData.ingredients.forEach(ingredient => {
    const li = document.createElement("li");
    const quantityText = ingredient.quantity ? ` : ${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ""}` : "";
    li.textContent = `${ingredient.ingredient}${quantityText}`;
    ingredients.appendChild(li);
  });
  servingsIngredientsContainer.appendChild(ingredients);

  descriptionIngredientsContainer.appendChild(servingsIngredientsContainer);

  const description = document.createElement("div");
  description.classList.add("modal-content__description-container");

  const descriptionTitle = document.createElement("h3");
  descriptionTitle.classList.add("modal-content__description-title");
  description.appendChild(descriptionTitle);

  const descriptionText = document.createElement("p");
  descriptionText.classList.add("modal-content__description");
  descriptionText.textContent = recipe.description;
  description.appendChild(descriptionText);

  descriptionIngredientsContainer.appendChild(description);
  contentContainer.appendChild(descriptionIngredientsContainer);

  return modalContent;
}