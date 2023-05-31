import {
  DisplayOptions,
  DisplayOrientation,
  GanttData,
  appendGantt,
  ganttItemsFromDOM,
} from './gantt';
import { toggleIngredientGroups } from './handlers';
import {
  appendIngredients,
  combineGroups,
  createIngredientGroupDiv,
  ingredientsFromDOM,
} from './ingredients';
import { appendInstructions } from './instructions';

///////////////////////////////////////
// Add gantt to DOM
///////////////////////////////////////
const gd = new GanttData(ganttItemsFromDOM());
const ganttDiv = document.getElementById('gantt-container') as HTMLDivElement;
const displayOpts: DisplayOptions = {
  rowThickness: 30,
  rowGap: 10,
  durationScale: ganttDiv.clientWidth / gd.duration(),
  orientation: DisplayOrientation.Horizontal,
};
appendGantt(gd, ganttDiv, displayOpts);

///////////////////////////////////////
// Add ingredients to DOM
///////////////////////////////////////
const ingredientsDiv = document.getElementById(
  'ingredient-groups-container',
) as HTMLDivElement;
const ingredients = ingredientsFromDOM();
appendIngredients(ingredientsDiv, ingredients);

///////////////////////////////////////
// Combining ingredients event listener
///////////////////////////////////////
const combinedGroup = combineGroups(ingredients);
ingredientsDiv.appendChild(createIngredientGroupDiv(combinedGroup));
let isCombined = false;
const combine = document.getElementById(
  'ingredints-combine',
) as HTMLButtonElement;
combine.addEventListener('click', () => {
  const groups = document.getElementsByClassName('ingredient-group-div');
  const combinedGroup = document.getElementsByClassName(
    'combined-ingredient-group-div',
  );
  isCombined = !isCombined;
  toggleIngredientGroups(groups, combinedGroup, isCombined);
});

///////////////////////////////////////
// Add instructions to DOM
///////////////////////////////////////
const instructionsList = document.getElementById(
  'instructions-list',
) as HTMLOListElement;
appendInstructions(ganttItemsFromDOM(), instructionsList);
