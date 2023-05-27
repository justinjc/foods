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
  durationScale: ganttDiv.clientWidth / gd.duration(),
  orientation: DisplayOrientation.Horizontal,
};

appendGantt(gd, ganttDiv, displayOpts);

// const instructionsList = document.getElementById('instructions-list');
