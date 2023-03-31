import { createSearchCriteriaList } from '../factories/criteriaListFactory.js';
import { updateRecipeDisplay } from './criteriaSearch.js';
import { filterRecipes } from './generalSearch.js';

export function displayInSearchCriteria(text, listType) {
    const searchCriteriaList = createSearchCriteriaList(listType);

    // Vérifie si le critère existe déjà dans la liste
    const existingCriteria = searchCriteriaList.querySelectorAll('.search-criteria__item');
    const existingItem = Array.from(existingCriteria).find(item => item.textContent === text);
    if (existingItem) {
        // Si le critère existe déjà, ne fait rien
        return;
    }

    // Sinon, ajouter simplement le critère à l'intérieur de la liste
    const searchCriteriaItem = document.createElement('li');
    searchCriteriaItem.classList.add('search-criteria__item');
    searchCriteriaItem.classList.add(`search-criteria__item--${listType}`);
    searchCriteriaItem.textContent = text;
    searchCriteriaList.appendChild(searchCriteriaItem);

    const closeButton = document.createElement('img');
    closeButton.src = 'img/icon-close.svg';
    closeButton.alt = 'close icon';
    closeButton.classList.add('search-criteria__close-icon');
    closeButton.addEventListener('click', () => {
        searchCriteriaItem.remove();
        if (searchCriteriaList.querySelectorAll('.search-criteria__item').length === 0) {
            searchCriteriaList.remove();
        }
        // Mettre à jour l'affichage des recettes après avoir supprimé un critère
        updateRecipeDisplay();
    });
    searchCriteriaItem.appendChild(closeButton);

    // Mettre à jour l'affichage des recettes après avoir ajouté un critère
    filterRecipes();
}

export function attachClickListenerToDropdownItem(listItem, listType) {
    listItem.addEventListener("click", () => {
        displayInSearchCriteria(listItem.textContent, listType);
    });
}