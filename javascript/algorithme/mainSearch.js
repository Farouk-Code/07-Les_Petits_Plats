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
    optionElement.onclick = () => selecItem(this);
    dropdown.appendChild(optionElement);
  }
}
