// @ts-nocheck
function selectItem(selectedElement) {
  const filterValue = selectedElement.textContent.toLowerCase();
  if (!selectedFilters.some((filter) => filter.toLowerCase() === filterValue)) {
    selectedFilters.push(filterValue);
    searchByFilters(selectedFilters);
  } else {
    const selectedItemClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );
    if (selectedItemClone) {
      removeSelectedItem(selectedElement, selectedItemClone);
      searchByFilters(selectedFilters);
    }
    updateSelectedVisuals();
  }
}

function updateSelectedItemLayout(selectedElement) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();
  const svgDropdown = selectedElement.querySelector("svg");

  if (!selectedElement.classList.contains("selected")) {
    selectedElement.classList.add("selected");
    selectedElement.style.heigth = "37px";
    selectedElement.setAttribute("data-filter", filterValue);
    const existingClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );

    if (!existingClone) {
      selectedItemClone = document.createElement("p");
      selectedItemClone.textContent = filterValue;
      selectedItemClone.classList.add("selected-item");
      selectedItemClone.setAttribute("data-filter", filterValue);
      selectedItemClone.onclick = () => {
        selectItem(this);
      };
      selectedContainer?.appendChild(selectedItemClone);
    }
  }
  if (!svgDropdown) {
    createDropdownSvg();
  }
  if (!selectedItemClone.querySelector("svg")) {
    createCloneSvg();
  }
}

function createDropdownSvg() {
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("width", "17");
  svgElement.setAttribute("height", "17");
  svgElement.setAttribute("viewBox", "0 0 17 17");
  const circleElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circleElement.setAttribute("cx", "8.5");
  circleElement.setAttribute("cy", "8.5");
  circleElement.setAttribute("r", "8.5");
  circleElement.setAttribute("fill", "black");
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute(
    "d",
    "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11"
  );
  pathElement.setAttribute("stroke", "#FFD15B");
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");
  svgElement.appendChild(circleElement);
  svgElement.appendChild(pathElement);
  selectedElement.appendChild(svgElement);
}

function createCloneSvg() {
  if (!selectedItemClone) {
    console.error("selectedItemClone non défini");
  }

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("width", "14");
  svgElement.setAttribute("height", "13");
  svgElement.setAttribute("viewBox", "0 0 14 13");
  svgElement.setAttribute("fill", "none");
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute(
    "d",
    "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5"
  );
  pathElement.setAttribute("stroke", "#1B1B1B");
  pathElement.setAttribute("stroke-width", "2.16667");
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");
  svgElement.appendChild(pathElement);
  selectedItemClone.appendChild(svgElement);
}

function removeSelectedItem(selectedElement, selectedItemClone) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();
  const index = selectedFilters.indexOf(filterValue);
  if (index !== -1) {
    selectedFilters.splice(index, 1);
  }
  if (selectedFilters.length === 0) {
    searchInput.value = "";
    resetPageState();
  }
  selectedElement.classList.remove("selected");
  selectedElement.style.height = "";
  selectedElement.querySelector("svg")?.remove();

  if (document.body.contains(selectedItemClone)) {
    selectedItemClone.querySelector("svg").remove();
    selectedItemClone.remove();
  }
}

function resetPageState() {
  updateDropdownOptions("ingredients", allIngredients, "ingredient");
  updateDropdownOptions("devices", allDevices, "appliance");
  updateDropdownOptions("utensils", allUstensils, "ustensil");
  fillCards(recipes);
  updateRecipeCount();
}

function updateSelectedVisuals() {
  const containers = [
    ingredientsListContainer,
    devicesListContainer,
    ustensilsListContainer,
    selectedContainer,
  ];

  for (const container of containers) {
    const allSelectedItems = container.querySelectorAll("class*='selected'");

    for (const selectedItem of allSelectedItems) {
      const filterValue = selectedItem.getAttribute("data-filter");
      const selectedItemText = selectedItem.textContent.trim().toLowerCase();

      if (
        !selectedFilters.includes(filterValue) &&
        !selectedFilters.includes(selectedItemText)
      ) {
        removeSelectedItem(selectedItem, null, null);
      }
    }
  }
}