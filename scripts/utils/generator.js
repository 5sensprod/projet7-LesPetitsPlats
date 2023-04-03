import { createRecipeCard } from "../factories/recipeCardFactory.js";
import { createNoFoundMessageFactory, createOnlyNoDropdownItemsFoundMessageFactory } from "../factories/messageFactory.js";
import { createRecipeModalContent } from "../factories/recipeModalFactory.js";
import { getRandomItem, translateItemType } from "./randomItems.js";
import { getRecipeDataById } from '../data-source/sharedData.js';
import { addUniqueListItem } from "./dropdownListUtils.js";
import { updateRecipeDisplay } from "../search/criteriaSearch.js";
import { closeActiveDropdown } from "../handlers/dropdownInteractions.js";

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
  
    const message = createMessage(hasCriteria, criteriaCount, randomRecipeTitle, randomIngredient);
  
    if (!noFoundMessage) {
      const noRecipesFoundMessage = createNoFoundMessageFactory(message);
      recipesContainer.appendChild(noRecipesFoundMessage);
    } else {
      noFoundMessage.textContent = message;
      noFoundMessage.style.display = 'block';
    }
  }
  
  function createMessage(hasCriteria, criteriaCount, randomRecipeTitle, randomIngredient) {
    const criteriaText = criteriaCount > 1 ? "vos critères" : "votre critère";
    const baseMessage = `Aucune recette trouvée${hasCriteria ? " avec " + criteriaText : ""}, veuillez essayer "${randomRecipeTitle}" ou "${randomIngredient}"`;
    return hasCriteria ? baseMessage + " ou retirez " + (criteriaCount > 1 ? "quelques critères" : "le critère") + " !" : baseMessage + " !";
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

// Modale

function closeModal(modal, overlay) {
    modal.classList.add("modal-closing");

    // Attendre la fin de l'animation avant de supprimer les éléments
    modal.addEventListener("animationend", () => {
        modal.remove();
        overlay.remove();
        document.body.classList.remove("body-modal-active");
    });
}

function closeAllOpenDropdowns() {
    const openDropdowns = document.querySelectorAll('.dropdown');
    openDropdowns.forEach(dropdown => {
        const event = { currentTarget: dropdown }; // Créer un faux événement pour appeler closeActiveDropdown
        closeActiveDropdown(event);
    });
}

function createAndShowModal(recipeId) {

    // Fermer toutes les dropdowns ouvertes
    closeAllOpenDropdowns();

    // Trouver la recette correspondante en utilisant l'ID
    const recipe = getRecipeDataById(parseInt(recipeId));

    // Si la recette n'est pas trouvée, ne faites rien
    if (!recipe) return;

    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.classList.add("body-modal-active");

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
        closeModal(modal, overlay);

        // Fermer toutes les dropdowns ouvertes
        closeAllOpenDropdowns();
    });
}