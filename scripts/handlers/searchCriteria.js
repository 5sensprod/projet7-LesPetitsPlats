
export function displayInSearchCriteria(text) {
    const searchCriteriaDiv = document.querySelector('.search-criteria');
    const searchCriteriaItem = document.createElement('span');
    searchCriteriaItem.classList.add('search-criteria__item');
    searchCriteriaItem.textContent = text;
  
    // Créez l'icône de fermeture et ajoutez la classe Font Awesome
    const closeButton = document.createElement('i');
    closeButton.classList.add('fas', 'fa-times-circle-o', 'search-criteria__close-icon');
  
    // Ajoutez un gestionnaire d'événements de clic pour supprimer le critère
    closeButton.addEventListener('click', () => {
      searchCriteriaItem.remove();
    });
  
    // Ajoutez l'icône de fermeture au critère
    searchCriteriaItem.appendChild(closeButton);
  
    searchCriteriaDiv.appendChild(searchCriteriaItem);
  }