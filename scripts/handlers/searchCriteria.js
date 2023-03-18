export function displayInSearchCriteria(text, listType) {
  const searchCriteriaDiv = document.querySelector('.search-criteria');

  // Vérifie si le critère existe déjà dans les critères de recherche
  const existingCriteria = searchCriteriaDiv.querySelectorAll('.search-criteria__item');
  const existingContainer = Array.from(existingCriteria).find(
    (criteriaItem) => criteriaItem.textContent === text && criteriaItem.parentElement.classList.contains(`search-criteria__container--${listType}`)
  );
  
  if (existingContainer) {
    // Si le critère existe déjà, ne fait rien
    return;
  }

  // Créer une nouvelle div avec la classe appropriée au critère
  const searchCriteriaContainer = document.createElement('div');
  searchCriteriaContainer.classList.add('search-criteria__container');
  searchCriteriaContainer.classList.add(`search-criteria__container--${listType}`);
  searchCriteriaDiv.appendChild(searchCriteriaContainer);

  const searchCriteriaItem = document.createElement('span');
  searchCriteriaItem.classList.add('search-criteria__item');
  searchCriteriaItem.textContent = text;
  searchCriteriaContainer.appendChild(searchCriteriaItem);

  const closeButton = document.createElement('img');
  closeButton.src = 'img/icon-close.svg';
  closeButton.alt = 'close icon';
  closeButton.classList.add('search-criteria__close-icon');
  closeButton.addEventListener('click', () => {
    searchCriteriaContainer.remove();
  });
  searchCriteriaContainer.appendChild(closeButton);
}
