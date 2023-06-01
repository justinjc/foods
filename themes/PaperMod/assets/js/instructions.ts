import { GanttItem } from './gantt';

export function appendInstructions(
  ganttItems: GanttItem[],
  instructionsList: HTMLOListElement,
) {
  let idx = 1;
  ganttItems.forEach((item) => {
    if (!item.desc) {
      return;
    }

    const listItem = document.createElement('li');
    const listDiv = document.createElement('div');

    const stepHeading = document.createElement('h2');
    stepHeading.innerHTML = `Step ${idx}`;
    const stepInstruction = document.createElement('p');
    stepInstruction.innerHTML = item.desc;

    listDiv.appendChild(stepHeading);
    listDiv.appendChild(stepInstruction);

    listItem.appendChild(listDiv);

    instructionsList.appendChild(listItem);
    idx++;
  });
}
