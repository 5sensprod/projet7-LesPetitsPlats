import { filterDropdownItems } from '../utils/dropdownListUtils.js';

const dropdownToggles = [
  { selector: '.dropdown__toggle--ingredients', label: 'Ingrédients' },
  { selector: '.dropdown__toggle--appliances', label: 'Appareils' },
  { selector: '.dropdown__toggle--ustensils', label: 'Ustensiles' },
];

export function toggleInputsDisabled(disabled) {
  const dropdowns = document.querySelectorAll('.dropdown');
  const dropdownInputs = document.querySelectorAll('.dropdown__toggle');
  
  dropdownInputs.forEach(input => {
    if (disabled) {
      input.setAttribute('disabled', '');
      input.classList.add('dropdown__toggle--disabled'); // Ajout de la classe
    } else {
      input.removeAttribute('disabled');
      input.classList.remove('dropdown__toggle--disabled'); // Retrait de la classe
    }
  });

  if (disabled) {
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', closeOpenedDropdown);
    });
  } else {
    dropdowns.forEach(dropdown => {
      dropdown.removeEventListener('click', closeOpenedDropdown);
    });
  }
}

export function closeOpenedDropdown(event) {
  const dropdownMenu = event.currentTarget.querySelector('.dropdown__menu');
  const dropdownToggle = event.currentTarget.querySelector('.dropdown__toggle');

  if (dropdownMenu.classList.contains('dropdown__menu--active')) {
    dropdownMenu.classList.remove('dropdown__menu--active');
    dropdownToggle.classList.remove('dropdown__toggle--active');
    
    // Revenir sur type="button"
    const toggleIndex = Array.from(document.querySelectorAll('.dropdown__toggle')).indexOf(dropdownToggle);
    const label = dropdownToggles[toggleIndex].label;
    toggleInput(dropdownToggle, label);
  }
}

// Fonction qui change le type de l'input entre 'text' et 'button' et met à jour son label et placeholder
function toggleInput(input, label) {
  const isButton = input.type === 'button';
  input.type = isButton ? 'text' : 'button';
  input.value = isButton ? '' : label;
  input.placeholder = isButton ? `Rechercher par ${label}` : '';
}
export function addDropdownEvents() {
  // Définit les éléments dropdown à activer, ainsi que leurs labels
  const dropdownToggles = [
    { selector: '.dropdown__toggle--ingredients', label: 'Ingrédients' },
    { selector: '.dropdown__toggle--appliances', label: 'Appareils' },
    { selector: '.dropdown__toggle--ustensils', label: 'Ustensiles' },
  ];

  // Mappe les sélecteurs des éléments dropdown vers les menus correspondants
  const dropdownMenus = dropdownToggles.map(toggle => document.querySelector(toggle.selector.replace('toggle', 'menu')));

  reorderDropdown(dropdownMenus, dropdownToggles); // Réorganise les éléments dropdown

  // Fonction qui ferme les menus dropdown qui ne sont pas en cours d'utilisation
  function closeOtherMenus(currentMenu) {
    dropdownMenus.forEach(menu => {
      if (menu !== currentMenu && menu.classList.contains('dropdown__menu--active')) {
        menu.classList.remove('dropdown__menu--active');
        const toggleIndex = dropdownMenus.indexOf(menu);
        const toggle = document.querySelector(dropdownToggles[toggleIndex].selector);
        if (toggle.type === 'text') {
          toggleInput(toggle, dropdownToggles[toggleIndex].label);
        }
      }
    });
  }

  // Ajoute un événement de clic pour chaque élément dropdown
  dropdownToggles.forEach(({ selector, label }, index) => {
    const toggle = document.querySelector(selector);
    const menu = dropdownMenus[index];

    toggle.addEventListener('click', () => {
      // Ferme les autres menus dropdown
      closeOtherMenus(menu);
      // Bascule la classe 'dropdown__menu--active' pour afficher/masquer le menu dropdown actuel
      menu.classList.toggle('dropdown__menu--active');
      // Change le label et le type de l'input correspondant à l'élément dropdown actuel
      toggleInput(toggle, label);

      // Ajoute le focus à l'input lorsqu'il est de type "text"
      if (toggle.type === 'text') {
        toggle.focus();
      }

      // Désactive la classe 'dropdown__toggle--active' pour tous les éléments dropdown
      const allDropdownToggles = document.querySelectorAll('.dropdown__toggle');
      allDropdownToggles.forEach(toggleElement => {
        if (toggleElement !== toggle) {
          toggleElement.classList.remove('dropdown__toggle--active');
        }
      });
      // Active la classe 'dropdown__toggle--active' pour l'élément dropdown actuel
      toggle.classList.toggle('dropdown__toggle--active');
    });

    toggle.addEventListener('input', () => {
      const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown__menu');
      filterDropdownItems(toggle, dropdownMenu);
    });
  });
}

function reorderDropdown(dropdownMenus, dropdownToggles) {
  // Sélectionne le conteneur et les dropdowns à l'intérieur
  const dropdownContainer = document.querySelector('.dropdown-container');
  const dropdowns = Array.from(dropdownContainer.querySelectorAll('.dropdown'));

  // Crée un tableau pour conserver l'ordre initial des dropdowns
  const initialDropdownOrder = dropdowns.map((dropdown, index) => {
    return {
      dropdown,
      index,
    };
  });

  // Fonction pour déplacer un dropdown à la dernière position
  function moveDropdownToLastPosition(dropdown) {
    dropdownContainer.appendChild(dropdown);
  }

  // Fonction pour rétablir les positions initiales des dropdowns
  function resetDropdownPositions() {
    initialDropdownOrder.forEach(({ dropdown, index }) => {
      if (index !== 2) {
        dropdownContainer.insertBefore(dropdown, dropdowns[2]);
      }
    });
  }

  // Pour chaque dropdown, ajoute un écouteur d'événements "click"
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown__toggle');
    toggle.addEventListener('click', () => {
      // Vérifie si la largeur de la fenêtre est inférieure à 1109px
      if (window.innerWidth < 1109) {
        // Vérifie si le menu du dropdown est actif
        const isActive = dropdown.querySelector('.dropdown__menu--active') !== null;

        // Si le menu est actif, réinitialise les positions des dropdowns
        if (isActive) {
          resetDropdownPositions();
        } else {
          // Sinon, réinitialise les positions et déplace le dropdown actuel en dernier
          resetDropdownPositions();
          moveDropdownToLastPosition(dropdown);
        }
      }
    });
  });

  // Ajoute un écouteur d'événements "resize" pour réinitialiser les positions des dropdowns lorsque la largeur de la fenêtre est supérieure ou égale à 1109px
  window.addEventListener('resize', () => {
    // Ferme les dropdowns ouverts
    const activeDropdown = dropdownContainer.querySelector('.dropdown__menu--active');
    if (activeDropdown) {
      activeDropdown.classList.remove('dropdown__menu--active');

      const toggleIndex = dropdownMenus.indexOf(activeDropdown);
      const toggle = document.querySelector(dropdownToggles[toggleIndex].selector);
      if (toggle.type === 'text') {
        toggleInput(toggle, dropdownToggles[toggleIndex].label);
      }
      toggle.classList.remove('dropdown__toggle--active');
    }

    if (window.innerWidth >= 1109) {
      resetDropdownPositions();
    }
  });
}