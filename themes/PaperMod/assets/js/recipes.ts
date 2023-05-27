import { GanttData } from './gantt';

const gd = new GanttData();
console.log(gd.toString());

const ganttDiv = document.getElementById('gantt-container')!;
const divScale = 10;
const divWidth = 100;

function appendGantt(ganttData: GanttData) {
  for (const [rowIdx, ganttRow] of ganttData.rows.entries()) {
    for (const item of ganttRow.items) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('gantt-item');
      itemDiv.innerHTML = item.id;

      const height = item.duration / divScale;
      const width = divWidth;
      const translateX = rowIdx * divWidth;
      const translateY = item.start / divScale;

      itemDiv.style.transform = `translate(${translateX}px, ${translateY}px)`;
      itemDiv.style.height = `${height}px`;
      itemDiv.style.width = `${width}px`;
      ganttDiv.appendChild(itemDiv);
    }
  }
}

appendGantt(gd);
ganttDiv.style.height = `${gd.duration() / divScale + 20}px`;
