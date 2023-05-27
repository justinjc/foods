import {
  DisplayOptions,
  DisplayOrientation,
  GanttData,
  appendGantt,
  ganttItemsFromDOM,
} from './gantt';

const ganttItems = ganttItemsFromDOM();
const gd = new GanttData(ganttItems);

const ganttDiv = document.getElementById('gantt-container')!;
const displayOpts: DisplayOptions = {
  rowThickness: 30,
  rowGap: 10,
  // durationScale: ganttDiv.clientWidth / gd.duration(),
  durationScale: 0.3,
  orientation: DisplayOrientation.Horizontal,
};

appendGantt(gd, ganttDiv, displayOpts);

const instructionsList = document.getElementById('instructions-list')!;

ganttItemsFromDOM().forEach((item) => {
  console.log('aa');
  const listItem = document.createElement('li');
  listItem.innerHTML = item.id;
  instructionsList.appendChild(listItem);
});
