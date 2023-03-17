const dropdownToggles = document.querySelectorAll('.dropdown__toggle');

dropdownToggles.forEach((toggle) => {
    const initialText = toggle.value; // Conserver le texte initial
  
    // Supprime le texte lors de la mise au point de l'input
    toggle.addEventListener('focus', () => {
      toggle.value = '';
    });
  
    // Rétablit le texte initial si l'utilisateur n'a rien saisi
    toggle.addEventListener('blur', () => {
      if (toggle.value === '') {
        toggle.value = initialText;
      }
    });

    // Ajouter la classe 'dropdown__toggle--active' au bouton cliqué et la supprimer des autres boutons
    toggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche la propagation de l'événement

        // Réinitialiser le type et le placeholder des autres boutons dropdown
        dropdownToggles.forEach((otherToggle) => {
            if (otherToggle !== toggle) {
                otherToggle.type = 'button';
                otherToggle.placeholder = ''; // Supprime le placeholder
                otherToggle.classList.remove('dropdown__toggle--active'); // Supprimer la classe
            }
        });

        // Définit le type du bouton cliqué sur 'text' et ajoute le placeholder et la classe
        toggle.type = 'text';
        toggle.placeholder = `Rechercher par ${toggle.value}`; // Ajoute le placeholder
        toggle.classList.add('dropdown__toggle--active'); // Ajouter la classe
    });
});

// Ajoute un gestionnaire d'événements de clic au document pour réinitialiser tous les boutons dropdown
document.addEventListener('click', () => {
  dropdownToggles.forEach((toggle) => {
    toggle.type = 'button';
    toggle.placeholder = ''; // Supprime le placeholder
    toggle.classList.remove('dropdown__toggle--active'); // Supprimer la classe
  });
});