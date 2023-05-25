import { GanttData } from './gantt';

const gd = new GanttData();
console.log(gd.toString());

function appendGantt(ganttData: GanttData) {
  for (const ganttRow of ganttData.rows) {
    for (const item of ganttRow.items) {
      const ganttDiv = document.createElement('div');
      ganttDiv.classList.add('gantt-item');
      ganttDiv.innerHTML = item.id;
      // HERE set these correctly
      // item.start, etc
      const translateX = 40;
      const translateY = 0;
      ganttDiv.style.transform = `translate(${translateX}px, ${translateY}px)`;
      ganttDiv.appendChild(ganttDiv);
    }
  }
}
