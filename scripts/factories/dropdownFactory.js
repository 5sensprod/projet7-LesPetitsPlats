
import {displayInSearchCriteria} from '../handlers/searchCriteria.js';
// Factory pour créer un élément li de dropdown avec du texte donné en paramètre

export function createListItem(textContent) {
  const listItem = document.createElement("li");
  listItem.classList.add("dropdown__item");
  listItem.textContent = textContent;

  listItem.addEventListener('click', () => {
    displayInSearchCriteria(listItem.textContent);
  });

  return listItem;
}