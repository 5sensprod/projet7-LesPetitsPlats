import { createRecipeCard } from "../factories/recipeCardFactory.js";

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