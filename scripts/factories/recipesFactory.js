/**
 * Fonction factory qui crée une carte de recette HTML
 * en se basant sur un objet de recette passé en paramètre.
 *
 * @param {Object} recipe - L'objet recette à afficher dans la carte.
 * @returns {HTMLDivElement} - Un élément article représentant la carte de recette.
 */

export function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.classList.add("recipe-card");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("recipe-card__img-container");

  const image = document.createElement("img");
  image.classList.add("recipe-card__image");
  image.setAttribute("src", "img/recipes/" + recipe.id + ".jpg");
  image.setAttribute("alt", recipe.name);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);

  const titleTimeContainer = document.createElement("div");
  titleTimeContainer.classList.add("recipe-card__title-time-container");

  const title = document.createElement("h2");
  title.classList.add("recipe-card__title");
  title.textContent = recipe.name;
  titleTimeContainer.appendChild(title);

  const time = document.createElement("p");
  time.classList.add("recipe-card__time");
  time.innerHTML = '<i class="far fa-clock"></i> ' + recipe.time + ' min';
  titleTimeContainer.appendChild(time);

  card.appendChild(titleTimeContainer);

  const descriptionIngredientsContainer = document.createElement("div");
  descriptionIngredientsContainer.classList.add("recipe-card__description-ingredients-container");

  const servingsIngredientsContainer = document.createElement("div");
  servingsIngredientsContainer.classList.add("recipe-card__servings-ingredients-container");

  const servings = document.createElement("p");
  servings.classList.add("recipe-card__servings");
  servings.textContent = "Pour " + recipe.servings + " personnes";
  servingsIngredientsContainer.appendChild(servings);

  const ingredients = document.createElement("ul");
  ingredients.classList.add("recipe-card__ingredients");
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement("li");
    li.textContent = ingredient.ingredient + " : " + ingredient.quantity + " " + (ingredient.unit ? ingredient.unit : "");
    ingredients.appendChild(li);
  });
  servingsIngredientsContainer.appendChild(ingredients);

  descriptionIngredientsContainer.appendChild(servingsIngredientsContainer);

  const description = document.createElement("div");
  description.classList.add("recipe-card__description-container");

  const descriptionTitle = document.createElement("h3");
  descriptionTitle.classList.add("recipe-card__description-title");
  descriptionTitle.textContent = "Description";
  description.appendChild(descriptionTitle);

  const descriptionText = document.createElement("p");
  descriptionText.classList.add("recipe-card__description");
  descriptionText.textContent = recipe.description;
  description.appendChild(descriptionText);

  descriptionIngredientsContainer.appendChild(description);
  card.appendChild(descriptionIngredientsContainer);

  return card;
}