import {
  DisplayOptions,
  GanttData,
  DisplayOrientation,
  GanttItemPos,
} from './gantt';

const gd = new GanttData();
console.log(gd.toString());

const ganttDiv = document.getElementById('gantt-container')!;

const displayOpts: DisplayOptions = {
  rowThickness: 100,
  durationScale: 0.1,
  orientation: DisplayOrientation.Horizontal,
};

function appendGantt(ganttData: GanttData, displayOpts: DisplayOptions) {
  for (const [rowIdx, ganttRow] of ganttData.rows.entries()) {
    for (const item of ganttRow.items) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('gantt-item');
      itemDiv.innerHTML = item.id;

      let pos: GanttItemPos;
      switch (displayOpts.orientation) {
        case DisplayOrientation.Horizontal:
          pos = {
            h: item.duration * displayOpts.durationScale,
            w: displayOpts.rowThickness,
            x: rowIdx * displayOpts.rowThickness,
            y: item.start * displayOpts.durationScale,
          };
          break;
        case DisplayOrientation.Vertical:
          pos = {
            h: item.duration * displayOpts.durationScale,
            w: displayOpts.rowThickness,
            x: rowIdx * displayOpts.rowThickness,
            y: item.start * displayOpts.durationScale,
          };
          break;
        default:
          throw new Error(
            `unknown gantt orientation ${displayOpts.orientation}`
          );
      }

      itemDiv.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      itemDiv.style.height = `${pos.h}px`;
      itemDiv.style.width = `${pos.w}px`;
      ganttDiv.appendChild(itemDiv);
    }
  }
}

appendGantt(gd, displayOpts);
ganttDiv.style.height = `${gd.duration() * displayOpts.durationScale + 20}px`;
