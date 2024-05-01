// @ts-nocheck
function searchByFilters(selectedFilters) {
  results = recipes.filter((recipe) => {
    return selectedFilters.every((filter) => {
      if (
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(filter.toLowerCase())
        )
      ) {
        return true;
      } else if (
        recipe.appliance.toLowerCase().includes(filter.toLowerCase())
      ) {
        return true;
      } else if (
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(filter.toLowerCase())
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
  });
  updateSearchResults(results);
  fillCards(results);
}

function updateSearchResults(results) {}

function updateDropdownOptions(dropdownOption, options, property) {
  const dropdownId = `${dropdownOption}-dd-list`;
  const dropdown = document.getElementById(dropdownId);

  if (!dropdown) {
    console.error(`Dropdown avec l'ID ${dropdownId} non trouvé`);
    return;
  }

  dropdown.innerHTML = "";

  for (const option of options) {
    const optionElement = document.createElement("p");

    if (typeof option === "string") {
      optionElement.textContent = option.toLowerCase();
    } else if (typeof option === "object" && property in option) {
      optionElement.textContent = option[property].toLowerCase();
    } else {
      console.error(`Format d'option non valide : ${option}`);
      return;
    }
    optionElement.onclick = () => selectItem(this);
    dropdown.appendChild(optionElement);
  }
}

function findDropdownElementByText(text, containers) {
  for (const container of containers) {
    const allDropdownElements = container.querySelectorAll("p");

    for (const element of allDropdownElements) {
      if (
        element.textContent.trim().toLowerCase() === text.trim().toLowerCase()
      ) {
        return element;
      }
    }
  }
  return null;
}
