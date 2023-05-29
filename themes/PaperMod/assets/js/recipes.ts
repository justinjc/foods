import convert from 'convert';
import {
  DisplayOptions,
  DisplayOrientation,
  GanttData,
  appendGantt,
  ganttItemsFromDOM,
} from './gantt';
import { appendIngredients, ingredientsFromDOM } from './ingredients';
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

console.log(convert(1, 'tsp').to('best', 'imperial'));

const ingredientsDiv = document.getElementById(
  'ingredients-container',
) as HTMLDivElement;
appendIngredients(ingredientsDiv, ingredientsFromDOM());
