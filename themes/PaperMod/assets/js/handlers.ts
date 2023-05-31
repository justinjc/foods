export function toggleIngredientGroups(
  separate: HTMLCollectionOf<Element>,
  combined: HTMLCollectionOf<Element>,
  isCombined: boolean,
) {
  displayElements(combined, isCombined);
  displayElements(separate, !isCombined);
}

function displayElements(elements: HTMLCollectionOf<Element>, show: boolean) {
  for (let i = 0; i < elements.length; i++) {
    const group = elements.item(i) as HTMLDivElement;
    if (show) {
      group.classList.remove('display-none');
    } else {
      group.classList.add('display-none');
    }
  }
}
