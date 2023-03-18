export function displayInSearchCriteria(text, listType) {
  const searchCriteriaDiv = document.querySelector('.search-criteria');
  let searchCriteriaList = searchCriteriaDiv.querySelector(`.search-criteria__list--${listType}`);

  // Vérifie si la liste existante est trouvée
  if (!searchCriteriaList) {
    // Si la liste n'existe pas, créer une nouvelle liste avec la classe appropriée et l'ajouter à la div search-criteria
    searchCriteriaList = document.createElement('ul');
    searchCriteriaList.classList.add('search-criteria__list');
    searchCriteriaList.classList.add(`search-criteria__list--${listType}`);
    searchCriteriaDiv.appendChild(searchCriteriaList);
  }

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
  });
  searchCriteriaItem.appendChild(closeButton);
}