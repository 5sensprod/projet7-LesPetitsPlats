import { normalizeString, singularize, compareStrings, capitalizeFirstWord } from './stringUtils.js';
import { attachClickListenerToDropdownItem } from "../search/criteriaSearchUI.js";
import { generateOnlyNoDropdownItemsFoundMessage } from "./generator.js";

export function addUniqueListItem(list, item, type) {
  // Normaliser l'élément et le mettre au singulier
  const normalizedItem = singularize(normalizeString(item));

  // Vérifier si l'élément existe déjà dans la liste
  const existingItem = list.querySelector(`.dropdown__menu-item--${type}[data-name="${normalizedItem}"]`);

  // Vérifier si l'élément existe déjà dans les critères de recherche
  const searchCriteria = document.querySelector('.search-criteria');
  const existingCriteria = searchCriteria.querySelectorAll('.search-criteria__item');
  const existingContainer = Array.from(existingCriteria).find(
    (criteriaItem) => criteriaItem.textContent === item && criteriaItem.parentElement.classList.contains(`search-criteria__container--${type}`)
  );

  if (!existingItem && !existingContainer) {
    // Si l'élément n'existe pas encore, créez un nouvel élément de liste et ajoutez-le à la liste
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown__menu-item');
    listItem.classList.add(`dropdown__menu-item--${type}`);
    listItem.textContent = capitalizeFirstWord(item);// Utiliser l'élément original pour l'affichage du texte
    listItem.setAttribute('data-name', normalizedItem); // Ajouter l'élément normalisé au singulier à l'attribut 'data-name'
    listItem.setAttribute('data-original-name', item); // Ajouter l'élément non normalisé à l'attribut 'data-original-name'
    list.appendChild(listItem);
    // Attacher un gestionnaire d'événements de clic à l'élément nouvellement ajouté
    attachClickListenerToDropdownItem(listItem, type);
  }
}

export function filterDropdownItems(inputElement, listElement) {
  inputElement.addEventListener('input', () => {
    const filter = inputElement.value.trim().toLowerCase();
    const items = listElement.querySelectorAll('.dropdown__menu-item');
    let noItemsFound = true;

    items.forEach(item => {
      const itemName = item.getAttribute('data-name').toLowerCase();
      const originalItemName = item.getAttribute('data-original-name').toLowerCase();

      if (compareStrings(itemName, filter) || compareStrings(originalItemName, filter)) {
        item.style.display = '';
        noItemsFound = false;
      } else {
        item.style.display = 'none';
      }
    });

    // Gérer l'affichage du message "Aucun élément trouvé"
    const noItemsFoundMessage = listElement.querySelector('.only-no-dropdown-items-found-message');
    if (noItemsFound) {
      if (!noItemsFoundMessage) {
        const itemType = listElement.getAttribute('data-item-type');
        generateOnlyNoDropdownItemsFoundMessage(itemType, `#${listElement.id}`);
      } else {
        noItemsFoundMessage.style.display = 'block';
      }
    } else {
      if (noItemsFoundMessage) {
        noItemsFoundMessage.style.display = 'none';
      }
    }
  });
}