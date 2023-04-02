import { createRecipeCard } from "../factories/recipeCardFactory.js";
import { createNoFoundMessageFactory, createOnlyNoDropdownItemsFoundMessageFactory } from "../factories/messageFactory.js";
import { createRecipeModalContent } from "../factories/recipeModalFactory.js";
import { getRandomItem, translateItemType } from "./randomItems.js";
import { getRecipeDataById } from '../data-source/sharedData.js';
import { addUniqueListItem } from "./dropdownListUtils.js";
import { updateRecipeDisplay } from "../search/criteriaSearch.js";



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

export function generateNoRecipesFoundMessage(hasCriteria = false, criteriaCount = 0) {
    const recipesContainer = document.querySelector('.recipes-container');
    const noFoundMessage = document.getElementById('no-found-message');

    const randomRecipeTitle = getRandomItem('title');
    const randomIngredient = getRandomItem('ingredient');

    let message;

    if (hasCriteria && criteriaCount > 1) {
        message = `Aucune recette trouvée avec vos critères, veuillez essayer "${randomRecipeTitle}" ou "${randomIngredient}" ou retirez quelques critères !`;
    } else if (hasCriteria && criteriaCount === 1) {
        message = `Aucune recette trouvée avec votre critère, veuillez essayer "${randomRecipeTitle}" ou "${randomIngredient}" ou retirez le critère !`;
    } else {
        message = `Aucune recette trouvée, veuillez essayer "${randomRecipeTitle}" ou "${randomIngredient}" !`;
    }

    if (!noFoundMessage) {
        const noRecipesFoundMessage = createNoFoundMessageFactory(message);
        recipesContainer.appendChild(noRecipesFoundMessage);
    } else {
        noFoundMessage.textContent = message;
        noFoundMessage.style.display = 'block';
    }
}

export function generateOnlyNoDropdownItemsFoundMessage(itemType, dropdownSelector) {
    const dropdown = document.querySelector(dropdownSelector);
    const noFoundMessage = dropdown.querySelector('.only-no-dropdown-items-found-message');

    const randomItem = getRandomItem(itemType); // Appeler getRandomItem ici
    const translatedItemType = translateItemType(itemType);

    if (!noFoundMessage) {
        const newNoItemsFoundMessage = createOnlyNoDropdownItemsFoundMessageFactory(translatedItemType, randomItem);
        dropdown.appendChild(newNoItemsFoundMessage);
        newNoItemsFoundMessage.style.display = 'block';
    } else {
        noFoundMessage.textContent = `Aucun ${translatedItemType} ne correspond à votre recherche ! Essayez ${randomItem}`;
        noFoundMessage.style.display = 'block';
    }
}

function createAndShowModal(recipeId) {
    // Trouver la recette correspondante en utilisant l'ID
    const recipe = getRecipeDataById(parseInt(recipeId));

    const modal = document.createElement("div");
    modal.classList.add("modal");
    // Si la recette n'est pas trouvée, ne faites rien
    if (!recipe) return;

    // Ajoutez le contenu de la modale en utilisant la fonction createRecipeModalContent
    const recipeModalContent = createRecipeModalContent(recipe);
    modal.appendChild(recipeModalContent);

    document.body.appendChild(modal);

    // Assombrir le reste de la page
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    // Fermer la modale lorsqu'on clique sur l'arrière-plan assombri
    overlay.addEventListener("click", () => {
        modal.remove();
        overlay.remove();
    });
}


export function generateRecipeCards(data) {
    const recipesContainer = document.querySelector(".recipes-container");
    data.forEach((recipe) => {
        // Création des cartes de recettes
        const recipeCard = createRecipeCard(recipe);

        // Ajout de l'ID de la recette à l'élément "recipe-card"
        recipeCard.setAttribute("data-recipe-id", recipe.id);

        // Ajout d'un écouteur d'événements pour afficher la modale lorsqu'on clique sur la carte de recette
        recipeCard.addEventListener("click", () => {
            createAndShowModal(recipe.id);
        });

        recipesContainer.appendChild(recipeCard);
    });
}
