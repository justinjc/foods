export class IngredientGroup {
  group: string;
  items: Item[];

  constructor(group: string, items: Item[]) {
    this.group = group;
    this.items = items;
  }
}

type Item = {
  name: string;
  amount: string;
  instruction: string;
};

export function ingredientsFromDOM(): IngredientGroup[] {
  const ingredients: IngredientGroup[] = [];

  const ingredientsDom = document.getElementById('ingredients-data');
  if (ingredientsDom === null) {
    throw new Error('ingredients-data element not found');
  }

  for (let i = 0; i < ingredientsDom.children.length; i++) {
    const groupDom = ingredientsDom.children[i] as HTMLElement;
    const group = groupDom.dataset as IngredientDataset;

    if (groupDom.children.length < 1 || !groupDom.children[0]) {
      return [];
    }

    const items: Item[] = [];
    const itemDoms = groupDom.children[0].children;
    for (let j = 0; j < itemDoms.length; j++) {
      const itemDom = itemDoms[j] as HTMLElement;
      const item = itemDom.dataset as Item;
      items.push(item);
    }

    ingredients.push(new IngredientGroup(group.group, items));
  }

  return ingredients;
}

const ingredients = ingredientsFromDOM();
console.log(ingredients);

export function appendIngredients(
  ingredientsDiv: HTMLDivElement,
  ingredients: IngredientGroup[],
) {
  for (const ingredient of ingredients) {
    const ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('ingredient-group-div');

    if (ingredients.length > 1) {
      // Only list group name if there is more than one group.
      const groupHeading = document.createElement('h2');
      groupHeading.innerHTML = ingredient.group;
      ingredientDiv.appendChild(groupHeading);
    }

    const ingredientList = document.createElement('ul');
    for (const item of ingredient.items) {
      const ingredientListItem = document.createElement('li');

      const ingredientAmountSpan = document.createElement('span');
      ingredientAmountSpan.innerHTML = item.amount;
      ingredientAmountSpan.classList.add('ingredient-amount');

      const ingredientNameSpan = document.createElement('span');
      ingredientNameSpan.innerHTML = item.name;
      ingredientAmountSpan.classList.add('ingredient-name');

      ingredientListItem.appendChild(ingredientAmountSpan);
      ingredientListItem.appendChild(document.createTextNode(' '));
      ingredientListItem.appendChild(ingredientNameSpan);
      if (item.instruction) {
        const ingredientInstructionSpan = document.createElement('span');
        ingredientInstructionSpan.innerHTML = item.instruction;
        ingredientAmountSpan.classList.add('ingredient-instruction');

        ingredientListItem.appendChild(document.createTextNode(', '));
        ingredientListItem.appendChild(ingredientInstructionSpan);
      }

      ingredientList.appendChild(ingredientListItem);
    }
    ingredientDiv.appendChild(ingredientList);

    ingredientsDiv.appendChild(ingredientDiv);
  }
}

type IngredientDataset = {
  group: string;
};
