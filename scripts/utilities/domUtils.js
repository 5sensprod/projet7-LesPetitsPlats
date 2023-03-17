const dropdownToggles = document.querySelectorAll('.dropdown__toggle');

dropdownToggles.forEach((toggle) => {
  const initialText = toggle.value; // Conserver le texte initial

  // Supprime le texte lors de la mise au point de l'input
  toggle.addEventListener('focus', () => {
    toggle.value = '';
    toggle.classList.add('dropdown__toggle--active'); // Ajoute la classe dropdown__toggle--active
  });

  // Rétablit le texte initial si l'utilisateur n'a rien saisi
  toggle.addEventListener('blur', () => {
    if (toggle.value === '') {
      toggle.value = initialText;
    }
    toggle.classList.remove('dropdown__toggle--active'); // Supprime la classe dropdown__toggle--active
  });

  // Ajoute un gestionnaire d'événements de clic au bouton dropdown
  toggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement

    // Réinitialiser le type et le placeholder des autres boutons dropdown
    dropdownToggles.forEach((otherToggle) => {
      if (otherToggle !== toggle) {
        otherToggle.type = 'button';
        otherToggle.placeholder = ''; // Supprime le placeholder

        // Trouve l'élément ul parent et enlève la classe dropdown__menu--active
        const otherDropdownMenu = otherToggle.closest('.dropdown').querySelector('.dropdown__menu');
        if (otherDropdownMenu) {
          otherDropdownMenu.classList.remove('dropdown__menu--active');
        }

        otherToggle.classList.remove('dropdown__toggle--active'); // Supprime la classe dropdown__toggle--active
      }
    });

    // Définit le type du bouton cliqué sur 'text' et ajoute le placeholder
    toggle.type = 'text';
    toggle.placeholder = `Rechercher par ${initialText}`; // Ajoute le placeholder

    // Trouve l'élément ul parent et ajoute la classe dropdown__menu--active
    const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown__menu');
    if (dropdownMenu) {
      dropdownMenu.classList.add('dropdown__menu--active');
    }

    toggle.classList.add('dropdown__toggle--active'); // Ajoute la classe dropdown__toggle--active
  });
});

// Ajoute un gestionnaire d'événements de clic au document pour réinitialiser tous les boutons dropdown
document.addEventListener('click', () => {
  dropdownToggles.forEach((toggle) => {
    toggle.type = 'button';
    toggle.placeholder = ''; // Supprime le placeholder

    // Trouve l'élément ul parent et enlève la classe dropdown__menu--active
    const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown__menu');
    if (dropdownMenu) {
      dropdownMenu.classList.remove('dropdown__menu--active');
    }

    toggle.classList.remove('dropdown__toggle--active'); // Supprime la classe dropdown__toggle--active
  });
});