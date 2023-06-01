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
const combineBtn = document.getElementById(
  'ingredients-combine-btn',
) as HTMLButtonElement;
if (ingredients.length > 1) {
  combineBtn.classList.remove('display-none');
}
const groupsDiv = document.getElementsByClassName('ingredient-group-div');
const combinedGroupDiv = document.getElementsByClassName(
  'combined-ingredient-group-div',
);
type SvgInHtml = HTMLElement & SVGElement;
const svgSplit = document.getElementById('ingredient-split') as SvgInHtml;
const svgCombine = document.getElementById('ingredient-combine') as SvgInHtml;
combineBtn.addEventListener('click', () => {
  isCombined = !isCombined;

  if (isCombined) {
    svgSplit.classList.remove('display-none');
    svgCombine.classList.add('display-none');
  } else {
    svgSplit.classList.add('display-none');
    svgCombine.classList.remove('display-none');
  }
  toggleIngredientGroups(groupsDiv, combinedGroupDiv, isCombined);
});
