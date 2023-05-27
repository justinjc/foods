import {
  DisplayOptions,
  GanttData,
  DisplayOrientation,
  GanttItemPos,
} from './gantt';

const gd = new GanttData();

const ganttDiv = document.getElementById('gantt-container')!;

function appendGantt(ganttData: GanttData, displayOpts: DisplayOptions) {
  for (const [rowIdx, ganttRow] of ganttData.rows.entries()) {
    for (const item of ganttRow.items) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('gantt-item');
      itemDiv.innerHTML = item.id;

      let pos: GanttItemPos = {
        h: displayOpts.rowThickness,
        w: item.duration * displayOpts.durationScale,
        x: item.start * displayOpts.durationScale,
        y: rowIdx * (displayOpts.rowThickness + displayOpts.rowGap),
      };
      switch (displayOpts.orientation) {
        case DisplayOrientation.Horizontal:
          // Already initialized assuming horizontal, so noop.
          break;
        case DisplayOrientation.Vertical:
          [pos.h, pos.w] = [pos.w, pos.h];
          [pos.x, pos.y] = [pos.y, pos.x];
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

const displayOpts: DisplayOptions = {
  rowThickness: 30,
  rowGap: 10,
  durationScale: ganttDiv.clientWidth / gd.duration(),
  orientation: DisplayOrientation.Horizontal,
};

appendGantt(gd, displayOpts);
ganttDiv.style.height = `${gd.duration() * displayOpts.durationScale + 20}px`;
