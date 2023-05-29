import { GanttItem } from './gantt';

export function appendInstructions(
  ganttItems: GanttItem[],
  instructionsList: HTMLOListElement,
) {
  ganttItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = item.desc ?? '';
    instructionsList.appendChild(listItem);
  });
}
