// Cette fonction ajoute un élément unique.

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
    listItem.textContent = item;
    listItem.setAttribute('data-name', item);
    list.appendChild(listItem);
  }
}