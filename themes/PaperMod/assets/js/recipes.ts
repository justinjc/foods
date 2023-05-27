import {
  DisplayOptions,
  DisplayOrientation,
  GanttData,
  GanttItemPos,
} from './gantt';

const gd = new GanttData();

const ganttDiv = document.getElementById('gantt-container')!;

function appendGantt(ganttData: GanttData, displayOpts: DisplayOptions) {
  for (const [rowIdx, ganttRow] of ganttData.rows.entries()) {
    for (const item of ganttRow.items) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('gantt-item');
      itemDiv.innerHTML = `${(item.idx + 1).toString()} ${item.id}`;

      const pos: GanttItemPos = {
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
            `unknown gantt orientation ${displayOpts.orientation}`,
          );
      }

      itemDiv.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      itemDiv.style.height = `${pos.h}px`;
      itemDiv.style.width = `${pos.w}px`;
      itemDiv.style.backgroundColor = `var(--gantt-item-${item.idx % 10}-bg)`;
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

let ganttContainerHeight =
  gd.rows.length * (displayOpts.rowThickness + displayOpts.rowGap) + 10;
if (displayOpts.orientation === DisplayOrientation.Vertical) {
  ganttContainerHeight = gd.duration() * displayOpts.durationScale + 20;
}
ganttDiv.style.height = `${ganttContainerHeight}px`;
