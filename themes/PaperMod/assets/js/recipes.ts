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
  'instructions-list',
) as HTMLOListElement;
appendInstructions(ganttItemsFromDOM(), instructionsList);

const ingredientsDiv = document.getElementById(
  'ingredients-container',
) as HTMLDivElement;
const ingredients = ingredientsFromDOM();
appendIngredients(ingredientsDiv, ingredientsFromDOM());

const combinedGroup = combineGroups(ingredients);
console.log(combinedGroup.items);
let combined = false;
const combine = document.getElementById(
  'ingredints-combine',
) as HTMLButtonElement;
combine.addEventListener('click', () => {
  const groups = document.getElementsByClassName('ingredient-group-div');

  if (combined) {
    for (let i = 0; i < groups.length; i++) {
      const group = groups.item(i) as HTMLDivElement;
      group.classList.remove('display-none');
    }
    combined = false;
  } else {
    for (let i = 0; i < groups.length; i++) {
      const group = groups.item(i) as HTMLDivElement;
      group.classList.add('display-none');
    }
    combined = true;
  }

  // HERE use combinedGroup to append combined group
});
