export function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.classList.add("recipe-card");

  // Création d'une div parente pour tous les éléments sauf la div de l'image
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("recipe-card__content-container");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("recipe-card__img-container");

  const image = document.createElement("img");
  image.classList.add("recipe-card__image");
  image.setAttribute("src", "img/recipes/" + recipe.id + ".jpg");
  image.setAttribute("alt", recipe.name);
  imgContainer.appendChild(image);
  contentContainer.appendChild(imgContainer); // Ajout de l'image au conteneur principal

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

  contentContainer.appendChild(titleTimeContainer);

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
  recipe.originalData.ingredients.forEach(ingredient => {
    const li = document.createElement("li");
    // Vérifie si la quantité et l'unité sont définies, sinon n'affiche rien
    const quantityText = ingredient.quantity ? ` : ${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ""}` : "";
    li.textContent = `${ingredient.ingredient}${quantityText}`;
    ingredients.appendChild(li);
  });
  servingsIngredientsContainer.appendChild(ingredients);

  descriptionIngredientsContainer.appendChild(servingsIngredientsContainer);

  const description = document.createElement("div");
  description.classList.add("recipe-card__description-container");

  const descriptionTitle = document.createElement("h3");
  descriptionTitle.classList.add("recipe-card__description-title");
  description.appendChild(descriptionTitle);

  const descriptionText = document.createElement("p");
  descriptionText.classList.add("recipe-card__description");
  descriptionText.textContent = recipe.description;
  description.appendChild(descriptionText);

  descriptionIngredientsContainer.appendChild(description);
  contentContainer.appendChild(descriptionIngredientsContainer);
  card.appendChild(contentContainer);

  return card;
}