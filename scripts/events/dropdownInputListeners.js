import { generateDropdownLists, generateCriteriaList } from '../utils/recipe-ui.js';
// Ajouter l'importation de getRecipeData
import { getRecipeData } from '../data-source/dataShared.js';
import { normalizeString } from '../utils/stringUtils.js';
// import { removeListItemAndCheckParent } from '../utils/dropdown-events.js';

function onDropdownInputChange(event, type, menu) {
  const input = event.target.value;
  const normalizedInput = normalizeString(input); // Ajoutez cette ligne

  if (input.length >= 3) {
    const filteredItems = Array.from(menu.children).filter((item) => {
      // Utilisez 'normalizedInput' et 'normalizeString(item.textContent)' pour la comparaison
      return normalizeString(item.textContent).includes(normalizedInput);
    });

    menu.innerHTML = ''; // Vider le menu déroulant

    // Remplir le menu déroulant avec les éléments filtrés
    filteredItems.forEach((item) => {
      menu.appendChild(item);
    });
  } else {
    // Récupérer les données des recettes
    const recipeData = getRecipeData();

    // Si la longueur de la saisie est inférieure à 3, rétablir les listes déroulantes initiales
    generateDropdownLists(recipeData); // Passez les données des recettes en argument ici
    // Ajoutez cette ligne pour ajouter des écouteurs d'événements aux éléments filtrés
    addClickEventToDropdownItems(menu, type);
  }

}

export function addDropdownEventListeners() {
  const ingredientToggle = document.querySelector('.dropdown__toggle--ingredients');
  const applianceToggle = document.querySelector('.dropdown__toggle--appliances');
  const ustensilToggle = document.querySelector('.dropdown__toggle--ustensils');

  const ingredientMenu = document.querySelector('.dropdown__menu--ingredients');
  const applianceMenu = document.querySelector('.dropdown__menu--appliances');
  const ustensilMenu = document.querySelector('.dropdown__menu--ustensils');

  ingredientToggle.addEventListener('input', (event) => {
    onDropdownInputChange(event, 'ingredient', ingredientMenu);
  });

  applianceToggle.addEventListener('input', (event) => {
    onDropdownInputChange(event, 'appliance', applianceMenu);
  });

  ustensilToggle.addEventListener('input', (event) => {
    onDropdownInputChange(event, 'ustensil', ustensilMenu);
  });
}


function addClickEventToDropdownItems(menu, criteriaType) {
  const items = menu.querySelectorAll('.dropdown__menu-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const listItem = generateCriteriaList(criteriaType, item.textContent);
      if (listItem !== null) {
        const closeIcon = listItem.querySelector('.search-criteria__close-icon');
        closeIcon.addEventListener('click', () => {
          removeListItemAndCheckParent(listItem);
        });
      }
    });
  });
}

export function addClickEventToDropdownItem() {
  const ingredientMenu = document.querySelector('.dropdown__menu--ingredients');
  const applianceMenu = document.querySelector('.dropdown__menu--appliances');
  const ustensilMenu = document.querySelector('.dropdown__menu--ustensils');

  addClickEventToDropdownItems(ingredientMenu, 'ingredient');
  addClickEventToDropdownItems(applianceMenu, 'appliance');
  addClickEventToDropdownItems(ustensilMenu, 'ustensil');
}

function removeListItemAndCheckParent(listItem) {
  const parentList = listItem.parentElement;
  listItem.remove();

  // Vérifie si le parent 'ul' est vide après la suppression du 'listItem'
  if (parentList.childElementCount === 0) {
    parentList.remove();
  }
}
