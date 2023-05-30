import { convert } from 'convert';

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

const amountRegex =
  /^\s*(?<quantity>[1-9][0-9]*(?:\.[0-9]+)?)\s*(?<unit>[a-zA-Z].*)\s*$/;
type AmountRegexGroups = {
  quantity: string;
  unit: string;
};
type AmountParsed = {
  quantity: number;
  unit: string;
};

export function combineGroups(groups: IngredientGroup[]): IngredientGroup {
  if (groups.length === 0 || !groups[0]) {
    return new IngredientGroup('', []);
  }
  if (groups.length === 1) {
    return groups[0] as IngredientGroup;
  }

  const itemsMap = new Map<string, AmountParsed>();
  for (const group of groups) {
    for (const item of group.items) {
      const newParsed = parseAmount(item.amount);

      if (!itemsMap.has(item.name)) {
        itemsMap.set(item.name, {
          quantity: newParsed.quantity,
          unit: newParsed.unit,
        });
        continue;
      }

      const existingParsed = itemsMap.get(item.name);
      if (!existingParsed) {
        continue;
      }

      let newQuantity: number;
      try {
        // @ts-ignore
        // There are convert overloads for each unit "family", but we don't
        // know which family the unit is for.
        newQuantity = convert(newParsed.quantity, newParsed.unit).to(
          // @ts-ignore
          existingParsed.unit,
        );
      } catch (error: unknown) {
        let errMsg: string;
        if (error instanceof RangeError) {
          errMsg = `unknown unit: ${newParsed.unit}`;
        } else if (error instanceof TypeError) {
          errMsg = `unknown unit: ${existingParsed.unit}`;
        } else {
          errMsg = `error converting ${newParsed} to ${existingParsed.unit}`;
        }
        throw new Error(errMsg);
      }

      itemsMap.set(item.name, {
        quantity: existingParsed.quantity + newQuantity,
        unit: existingParsed.unit,
      });
    }
  }

  const items: Item[] = [];
  itemsMap.forEach((v, k) => {
    // @ts-ignore
    const bestUnit = convert(v.quantity, v.unit).to('best', 'imperial');
    items.push({
      name: k,
      amount: `${bestUnit.quantity} ${bestUnit.unit}`,
      instruction: '',
    });
  });

  return new IngredientGroup('combined', items);
}

function parseAmount(input: string): AmountParsed {
  const matches = input.match(amountRegex)?.groups as AmountRegexGroups;

  let quantity: number;
  let unit: string;
  if (matches) {
    quantity = parseFloat(matches.quantity);
    unit = matches.unit;
  } else {
    quantity = 0;
    unit = '';
  }

  return {
    quantity: quantity,
    unit: unit,
  };
}
