import { filterDropdownItems } from '../utils/dropdownListUtils.js';

// Définit les éléments dropdown à activer, ainsi que leurs labels
const dropdownToggles = [
  { selector: '.dropdown__toggle--ingredients', label: 'Ingrédients' },
  { selector: '.dropdown__toggle--appliances', label: 'Appareils' },
  { selector: '.dropdown__toggle--ustensils', label: 'Ustensiles' },
];

const dropdownMenus = dropdownToggles.map(toggle => document.querySelector(toggle.selector.replace('toggle', 'menu')));
const dropdownContainer = document.querySelector('.dropdown-container');
const dropdowns = Array.from(dropdownContainer.querySelectorAll('.dropdown'));
const initialDropdownOrder = dropdowns.map((dropdown, index) => {
  return {
    dropdown,
    index,
  };
});

export function closeActiveDropdown() {
  const activeDropdown = dropdownContainer.querySelector('.dropdown__menu--active');
  if (activeDropdown) {
    activeDropdown.classList.remove('dropdown__menu--active');
    resetDropdownPositions();
    const toggleIndex = dropdownMenus.indexOf(activeDropdown);
    const toggle = document.querySelector(dropdownToggles[toggleIndex].selector);
    if (toggle.type === 'text') {
      toggleInput(toggle, dropdownToggles[toggleIndex].label);
    }
    toggle.classList.remove('dropdown__toggle--active');
    toggleChevron(toggle, false);
  }
}

export function toggleInputsDisabled(disabled) {
  const dropdownInputs = document.querySelectorAll('.dropdown__toggle');

  dropdownInputs.forEach(input => {
    if (disabled) {
      input.setAttribute('disabled', '');
      input.classList.add('dropdown__toggle--disabled');
    } else {
      input.removeAttribute('disabled');
      input.classList.remove('dropdown__toggle--disabled');
    }
  });

  if (disabled) {
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', closeActiveDropdown);
    });
  } else {
    dropdowns.forEach(dropdown => {
      dropdown.removeEventListener('click', closeActiveDropdown);
    });
  }
}

function toggleChevron(toggle, isOpen) {
  const chevron = toggle.parentElement.querySelector(".dropdown__icon");
  if (isOpen) {
    chevron.classList.add("rotated");
  } else {
    chevron.classList.remove("rotated");
  }
}

function toggleInput(input, label) {
  const isButton = input.type === 'button';
  if (isButton) {
    input.type = 'text';
    input.value = input.getAttribute('data-stored-value') || '';
    input.placeholder = `Rechercher par ${label}`;
  } else {
    input.setAttribute('data-stored-value', input.value);
    input.type = 'button';
    input.value = label;
  }
}

function closeOtherMenus(currentMenu) {
  dropdownMenus.forEach(menu => {
    if (menu !== currentMenu && menu.classList.contains('dropdown__menu--active')) {
      menu.classList.remove('dropdown__menu--active');
      const toggleIndex = dropdownMenus.indexOf(menu);
      const toggle = document.querySelector(dropdownToggles[toggleIndex].selector);
      if (toggle.type === 'text') {
        toggleInput(toggle, dropdownToggles[toggleIndex].label);
      }
      toggleChevron(toggle, false);
    }
  });
}

export function addDropdownEvents() {
  reorderDropdown();
  
  const allDropdownToggles = document.querySelectorAll('.dropdown__toggle');

  dropdownToggles.forEach(({ selector, label }, index) => {
    const toggle = document.querySelector(selector);
    const menu = dropdownMenus[index];

    toggle.addEventListener('click', () => {
      const isActive = menu.classList.toggle('dropdown__menu--active');
      closeOtherMenus(menu);

      toggleInput(toggle, label);
      if (toggle.type === 'text') toggle.focus();

      // Désactive la classe 'dropdown__toggle--active' pour tous les éléments dropdown

      allDropdownToggles.forEach(toggleElement => {
        if (toggleElement !== toggle) {
          toggleElement.classList.remove('dropdown__toggle--active');
        }
      });

      // Active la classe 'dropdown__toggle--active' pour l'élément dropdown actuel
      toggle.classList.toggle('dropdown__toggle--active', isActive);

      toggleChevron(toggle, isActive);
    });

    toggle.addEventListener('input', () => {
      const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown__menu');
      filterDropdownItems(toggle, dropdownMenu);
    });
  });
}

function reorderDropdown() {
  if (window.innerWidth <= 711) return;

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown__toggle');

    toggle.addEventListener('click', () => {
      if (window.innerWidth >= 1109) return;

      const isActive = dropdown.querySelector('.dropdown__menu--active') !== null;
      resetDropdownPositions();

      if (!isActive) moveDropdownToLastPosition(dropdown);
    });
  });

  // Ajoute un écouteur d'événements "resize" pour réinitialiser les positions des dropdowns lorsque la largeur de la fenêtre est supérieure ou égale à 1109px
  window.addEventListener('resize', () => {
    closeActiveDropdown();

    if (window.innerWidth >= 1109) {
      resetDropdownPositions();
    }
  });
}

function resetDropdownPositions() {
  initialDropdownOrder.forEach((item, index) => {
    if (index !== 2) {
      dropdownContainer.insertBefore(item.dropdown, initialDropdownOrder[2].dropdown);
    }
  });
}

function moveDropdownToLastPosition(dropdown) {
  dropdownContainer.appendChild(dropdown);
}