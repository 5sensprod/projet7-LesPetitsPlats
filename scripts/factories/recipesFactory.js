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
  
    const title = document.createElement("h2");
    title.classList.add("recipe-card__title");
    title.textContent = recipe.name;
    card.appendChild(title);
  
    const image = document.createElement("img");
    image.classList.add("recipe-card__image");
    image.setAttribute("src", "img/recipes/" + recipe.id + ".jpg");
    image.setAttribute("alt", recipe.name);
    card.appendChild(image);
  
    const time = document.createElement("p");
    time.classList.add("recipe-card__time");
    time.innerHTML = '<i class="far fa-clock"></i> ' + recipe.time + ' min';
    card.appendChild(time);
  
    const servings = document.createElement("p");
    servings.classList.add("recipe-card__servings");
    servings.textContent = "Pour " + recipe.servings + " personnes";
    card.appendChild(servings);
  
    const ingredients = document.createElement("ul");
    ingredients.classList.add("recipe-card__ingredients");
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement("li");
      li.textContent = ingredient.ingredient + " : " + ingredient.quantity + " " + (ingredient.unit ? ingredient.unit : "");
      ingredients.appendChild(li);
    });
    card.appendChild(ingredients);
  
    const description = document.createElement("p");
    description.classList.add("recipe-card__description");
    description.textContent = recipe.description;
    card.appendChild(description);
  
    return card;
  }