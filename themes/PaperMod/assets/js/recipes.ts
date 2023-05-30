import {
  DisplayOptions,
  DisplayOrientation,
  GanttData,
  appendGantt,
  ganttItemsFromDOM,
} from './gantt';
import {
  appendIngredients,
  combineGroups,
  ingredientsFromDOM,
  createIngredientGroupDiv,
} from './ingredients';
import { appendInstructions } from './instructions';

const gd = new GanttData(ganttItemsFromDOM());
const ganttDiv = document.getElementById('gantt-container') as HTMLDivElement;
const displayOpts: DisplayOptions = {
  rowThickness: 30,
  rowGap: 10,
  durationScale: ganttDiv.clientWidth / gd.duration(),
  orientation: DisplayOrientation.Horizontal,
};
appendGantt(gd, ganttDiv, displayOpts);

const instructionsList = document.getElementById(
  'instructions-list'
) as HTMLOListElement;
appendInstructions(ganttItemsFromDOM(), instructionsList);

const ingredientsDiv = document.getElementById(
  'ingredients-container'
) as HTMLDivElement;
const ingredients = ingredientsFromDOM();
appendIngredients(ingredientsDiv, ingredientsFromDOM());

const combinedGroup = combineGroups(ingredients);
console.log(combinedGroup.items);
ingredientsDiv.appendChild(createIngredientGroupDiv(combinedGroup));

let combined = false;
const combine = document.getElementById(
  'ingredints-combine'
) as HTMLButtonElement;
combine.addEventListener('click', () => {
  const groups = document.getElementsByClassName('ingredient-group-div');
  const combinedGroup = document.getElementsByClassName(
    'combined-ingredient-group-div'
  );

  combined = !combined;
  displayElements(combinedGroup, combined);
  displayElements(groups, !combined);
});

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
