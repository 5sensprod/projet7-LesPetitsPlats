import { createRecipeCard } from "../factories/recipeCardFactory.js";
import { createNoFoundMessageFactory, createNoDropdownItemsFoundMessageFactory, createOnlyNoDropdownItemsFoundMessageFactory } from "../factories/messageFactory.js";
import { getRandomItem } from "./randomItems.js";

import { addUniqueListItem } from "./dropdownListUtils.js";
import { updateRecipeDisplay } from "../search/criteriaSearch.js";

export function generateRecipeCards(data) {
    const recipesContainer = document.querySelector('.recipes-container');
    data.forEach(recipe => {
        // Création des cartes de recettes
        const recipeCard = createRecipeCard(recipe);

        // Ajout de l'ID de la recette à l'élément "recipe-card"
        recipeCard.setAttribute('data-recipe-id', recipe.id);

        recipesContainer.appendChild(recipeCard);
    });
}

export function generateListDropdowns(data) {
    const ingredientsList = document.getElementById("sort-by-ingredients");
    const appliancesList = document.getElementById("sort-by-appliances");
    const ustensilsList = document.getElementById("sort-by-ustensils");

    data.forEach(recipe => {
        // Ajout des éléments uniques à chaque liste
        recipe.originalData.ingredients.forEach(ingredient => {
            addUniqueListItem(ingredientsList, ingredient.ingredient, 'ingredient');
        });

        recipe.originalData.ustensils.forEach(ustensil => {
            addUniqueListItem(ustensilsList, ustensil, 'ustensil');
        });

        addUniqueListItem(appliancesList, recipe.originalData.appliance, 'appliance');
    });

    // Appeler updateRecipeDisplay une fois que les listes sont remplies
    updateRecipeDisplay(false);
}

export function generateNoRecipesFoundMessage() {
    const recipesContainer = document.querySelector('.recipes-container');
    const noFoundMessage = document.getElementById('no-found-message');

    const randomRecipeTitle = getRandomItem('title');
    const randomIngredient = getRandomItem('ingredient');
    const message = `Aucune recette trouvée, veuillez essayer "${randomRecipeTitle}" ou "${randomIngredient}" !`;

    if (!noFoundMessage) {
        const noRecipesFoundMessage = createNoFoundMessageFactory(message);
        recipesContainer.appendChild(noRecipesFoundMessage);
    } else {
        noFoundMessage.textContent = message;
        noFoundMessage.style.display = 'block';
    }
}

export function generateNoDropdownItemsFoundMessage(itemType, dropdownSelector) {
    const dropdown = document.querySelector(dropdownSelector);
    const noItemsFoundMessage = createNoDropdownItemsFoundMessageFactory(itemType);
    dropdown.appendChild(noItemsFoundMessage);
    noItemsFoundMessage.style.display = 'block';
}

export function generateOnlyNoDropdownItemsFoundMessage(itemType, dropdownSelector) {
    const randomItem = getRandomItem(itemType);
    const dropdown = document.querySelector(dropdownSelector);
    const noItemsFoundMessage = createOnlyNoDropdownItemsFoundMessageFactory(itemType, randomItem);
    dropdown.appendChild(noItemsFoundMessage);
    noItemsFoundMessage.style.display = 'block';
  }