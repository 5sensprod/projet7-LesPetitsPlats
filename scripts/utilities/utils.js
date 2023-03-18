// Cette fonction ajoute un élément unique.
// import { displayInSearchCriteria } from "../handlers/searchCriteria.js";
// import { createListItem } from "../factories/dropdownFactory.js";

// Met une majuscule au élements de la liste
function capitalize(str) {
  const words = str.split(' ');
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  words[0] = firstWord;
  return words.join(' ');
}


export function addUniqueListItem(list, item, type) {
  // Vérifier si l'élément existe déjà dans la liste
  const existingItem = list.querySelector(`.dropdown__menu-item--${type}[data-name="${item}"]`);
  
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
    const capitalizedItem = capitalize(item);
    listItem.textContent = capitalizedItem;
    listItem.setAttribute('data-name', item);
    list.appendChild(listItem);
  }
}