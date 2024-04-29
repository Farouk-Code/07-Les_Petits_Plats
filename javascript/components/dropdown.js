// @ts-nocheck
const ingredientsDropdown = document.querySelector(".ingredients-dropdawn");
const devicesDropdown = document.querySelector(".devices-dropdawn");
const utensilsDropdown = document.querySelector(".utensils-dropdawn");
const ingredientsDropdawnVisiblePart = document.querySelector(
  ".ingredients-dd-visible-part"
);
const devicesDropdownVisiblePart = document.querySelector(
  ".devices-dd-visible-part"
);
const utensilsDropdownVisiblePart = document.querySelector(
  ".utensils-dd-visible-part"
);
const dropdownArrow1 = document.querySelector("#dropdownArrow1");
const dropdownArrow2 = document.querySelector("#dropdownArrow2");
const dropdownArrow3 = document.querySelector("#dropdownArrow3");

ingredientsDropdawnVisiblePart?.addEventListener("click", () => {
  dropdownArrow1?.classList.toggle("rotate180");
  ingredientsDropdown?.classList.toggle("open");
});

devicesDropdownVisiblePart?.addEventListener("click", () => {
  dropdownArrow2?.classList.toggle("rotate180");
  devicesDropdown?.classList.toggle("open");
});

utensilsDropdownVisiblePart?.addEventListener("click", () => {
  dropdownArrow3?.classList.toggle("rotate180");
  utensilsDropdown?.classList.toggle("open");
});

/**
 * Met à jour l'affichage d'une liste en fonction de la saisie dans un champ de recherche.
 * @param {HTMLInputElement} dropdownInput - L'élément input de la liste déroulante.
 * @param {string} listContainer - Sélecteur CSS du conteneur de la liste à mettre à jour.
 * @returns {void}
 */
function updateListDisplay(dropdownInput, listContainer) {
  const inputValue = dropdownInput.value.toLowerCase();
  const specificListContainer = document.querySelector(listContainer);
  const options = specificListContainer.querySelectorAll("p");
  for (const option of options) {
    const optionText = option.textContent.toLowerCase();
    const isMatch = optionText.includes(inputValue);
    option.style.display = isMatch ? "flex" : "none";
  }
}

const ingredientsDropdownInput = document.querySelector(
  "#ingredients-dd-input"
);
const devicesDropdownInput = document.querySelector("#devices-dd-input");
const utensilsDropdownInput = document.querySelector("#utensils-dd-input");

ingredientsDropdownInput?.addEventListener(
  "input",
  updateListDisplay(ingredientsDropdownInput, "#ingredients-dd-list")
);

devicesDropdownInput?.addEventListener(
  "input",
  updateListDisplay(devicesDropdownInput, "#devices-dd-list")
);
utensilsDropdownInput?.addEventListener(
  "input",
  updateListDisplay(utensilsDropdownInput, "#utensils-dd-list")
);
