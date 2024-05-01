// @ts-nocheck
function handleSearch() {
  const userInput = searchInput.value.toLowerCase();
  if (userInput.length >= 3) {
    selectedFilters = [];
    results = recipes.filter((recipe) => {
      const titleMatch = recipe.name.toLowerCase().includes(userInput);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(userInput)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(userInput);
      return titleMatch || ingredientsMatch || descriptionMatch;
    });
    updateSearchResults(results);
    fillCards(results);
  } else {
    resetRecipes();
  }
}

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

function updateSearchResults(results) {
  const uniqueIngredients = getUniqueIngredients(results);
  const uniqueDevices = getUniqueDevices(results);
  const uniqueUstensils = getUniqueUstensils(results);

  updateDropdownOptions("ingredients", allIngredients, "ingredient");
  updateDropdownOptions("devices", allDevices, "appliance");
  updateDropdownOptions("utensils", allUstensils, "ustensil");

  const containers = [
    ingredientsListContainer,
    devicesListContainer,
    ustensilsListContainer,
  ];

  for (const filter of selectedFilters) {
    const isInIngredients = uniqueIngredients.includes(filter);
    const isInDevice = uniqueDevices.includes(filter);
    const isInUstensils = uniqueUstensils.includes(filter);
    if (isInIngredients || isInDevice || isInUstensils) {
      const dropdownElement = findDropdownElementByText(filter, containers);
      if (dropdownElement) {
        updateSelectedItemLayout(dropdownElement);
      }
    }
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

function resetRecipes() {
  fillCards(recipes);
  updateRecipeCount();
}

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
    optionElement.onclick = function () {
      selectItem(this);
    };
    dropdown.appendChild(optionElement);
  }
}

searchInput.addEventListener("input", () => {
  handleSearch();
});
