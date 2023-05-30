import { convert } from 'convert';
import { roundDP } from './common';

export class IngredientGroup {
  name: string;
  items: Item[];

  constructor(name: string, items: Item[]) {
    this.name = name;
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
  ingredientGroups: IngredientGroup[]
) {
  for (const group of ingredientGroups) {
    const ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('ingredient-group-div');

    if (ingredientGroups.length > 1) {
      // Only list group name if there is more than one group.
      const groupHeading = document.createElement('h2');
      groupHeading.innerHTML = group.name;
      ingredientDiv.appendChild(groupHeading);
    }

    const ingredientList = createIngredientList(group);
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

      itemsMap.set(item.name, sum(existingParsed, newParsed));
    }
  }

  const items: Item[] = [];
  itemsMap.forEach((v, k) => {
    items.push({
      name: k,
      amount: `${roundDP(v.quantity, 3)} ${v.unit}`,
      instruction: '',
    });
  });

  return new IngredientGroup('combined', items);
}

function sum(amount1: AmountParsed, amount2: AmountParsed): AmountParsed {
  const amount1QuantityConverted = uconvert(amount1, amount2.unit);
  const amount2QuantityConverted = uconvert(amount2, amount1.unit);

  if (amount1QuantityConverted <= amount2QuantityConverted) {
    return {
      quantity: amount1QuantityConverted + amount2.quantity,
      unit: amount2.unit,
    };
  } else {
    return {
      quantity: amount2QuantityConverted + amount1.quantity,
      unit: amount1.unit,
    };
  }
}

function uconvert(amount: AmountParsed, to: string): number {
  let quantity: number;

  try {
    // @ts-ignore
    // There are convert overloads for each unit "family", but we don't
    // know which family the unit is for.
    quantity = convert(amount.quantity, amount.unit).to(to);
  } catch (error: unknown) {
    let errMsg: string;
    if (error instanceof RangeError) {
      errMsg = `unknown unit: ${amount.unit}`;
    } else if (error instanceof TypeError) {
      errMsg = `unknown unit: ${to}`;
    } else {
      errMsg = `error converting ${amount} to ${to}`;
    }
    throw new Error(errMsg);
  }

  return quantity;
}

export function createIngredientGroupDiv(
  group: IngredientGroup
): HTMLDivElement {
  const container = document.createElement('div');
  container.classList.add('combined-ingredient-group-div');
  container.classList.add('display-none');

  const ingredientList = createIngredientList(group);
  container.appendChild(ingredientList);

  return container;
}

function createIngredientList(group: IngredientGroup): HTMLUListElement {
  const ingredientList = document.createElement('ul');

  for (const item of group.items) {
    const ingredientListItem = document.createElement('li');

    const ingredientAmountSpan = document.createElement('span');
    ingredientAmountSpan.innerHTML = item.amount;
    ingredientAmountSpan.classList.add('ingredient-amount');
    ingredientListItem.appendChild(ingredientAmountSpan);

    const ingredientNameSpan = document.createElement('span');
    ingredientNameSpan.innerHTML = item.name;
    ingredientNameSpan.classList.add('ingredient-name');
    ingredientListItem.appendChild(document.createTextNode(' '));
    ingredientListItem.appendChild(ingredientNameSpan);

    if (item.instruction) {
      const ingredientInstructionSpan = document.createElement('span');
      ingredientInstructionSpan.innerHTML = item.instruction;
      ingredientInstructionSpan.classList.add('ingredient-instruction');

      ingredientListItem.appendChild(document.createTextNode(', '));
      ingredientListItem.appendChild(ingredientInstructionSpan);
    }

    ingredientList.appendChild(ingredientListItem);
  }

  return ingredientList;
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
