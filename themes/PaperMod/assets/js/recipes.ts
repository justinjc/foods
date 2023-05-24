type GanttInputItem = {
  id: string;
  desc: string;
  start: string;
  duration: string;
  end: string;
  dependsOn: string;
};

type GanttItem = {
  start: number;
  durationSeconds: number;
  item: GanttInputItem;
};

type GanttRow = GanttItem[];

type GanttData = GanttRow[];

const durationRegex =
  /^\s*(?:(?<days>\d+)d)?\s*(?:(?<hours>\d+)h)?\s*(?:(?<minutes>\d+)m)?\s*(?:(?<seconds>\d+)s)?\s*$/;

const startEndRegex =
  /^\s*(?:(?<id>[a-zA-Z]+)\.(?<border>start|end))?\s*(?<operator>\+|-)?\s*(?:(?<days>\d+)d)?\s*(?:(?<hours>\d+)h)?\s*(?:(?<minutes>\d+)m)?\s*(?:(?<seconds>\d+)s)?\s*$/;

function getGanttData(): GanttInputItem[] {
  const ganttData: GanttInputItem[] = [];

  const ganttDomData = document.getElementById('gantt-data');
  if (ganttDomData === null) {
    return ganttData;
  }

  for (const element of ganttDomData.children) {
    const item = element as HTMLElement;
    ganttData.push({
      id: item.dataset.id ?? '',
      desc: item.dataset.desc ?? '',
      start: item.dataset.start ?? '',
      duration: item.dataset.duration ?? '',
      end: item.dataset.end ?? '',
      dependsOn: item.dataset.dependsOn ?? '',
    });
  }

  return ganttData;
}

function formatGantt() {
  const ganttDiv = document.getElementById('gantt-container');
  if (ganttDiv === null) {
    return;
  }

  const ganttData: GanttInputItem[] = getGanttData();
  if (ganttData.length === 0) {
    return;
  }

  const gantt: GanttData = [];

  let iters = 0;
  while (ganttData.length > 0) {
    if (iters > 1000) {
      console.log('too many iters');
      return;
    }
    iters++;

    const placedIndexes: number[] = [];
    const placedItems = new Map<string, GanttInputItem>();
    // Iterate in order because people would tend to add the instructions in
    // the correct order.
    for (const [idx, item] of ganttData.entries()) {
      // HERE pick items off to be placed. If placed, add to placedIndexes

      const startMatch = item.start.match(startEndRegex);
      if (!startMatch || !startMatch.groups) {
      }
      const endMatch = item.end.match(startEndRegex);
      if (!endMatch || !endMatch.groups) {
      }

      const placed = false;
      if (placed) {
        placedIndexes.push(idx);
        placedItems.set(item.id, item);
      }
    }

    // Reverse sorted order so splicing is simpler.
    placedIndexes.sort().reverse();

    // Remove placed items.
    for (const placedIndex of placedIndexes) {
      ganttData.splice(placedIndex, 1);
    }
  }

  console.log(ganttData);
}

// function appendGannt() {
//   for (const step of ganttData) {
//     const ganttItem = document.createElement('div');
//     ganttItem.classList.add('gantt-item');
//     ganttItem.innerHTML = step.id;
//     // TODO set these correctly
//     let translateX = 40;
//     let translateY = 0;
//     ganttItem.style.transform = `translate(${translateX}px, ${translateY}px)`;
//     ganttDiv.appendChild(ganttItem);
//   }
// }

formatGantt();

function durationToSeconds(str: string) {
  const match = str.match(durationRegex);
  if (!match || !match.groups) {
    return 0;
  }

  let seconds = 0;
  if (match.groups.days)
    seconds += parseInt(match.groups.days, 10) * 24 * 60 * 60;
  if (match.groups.hours) seconds += parseInt(match.groups.hours, 10) * 60 * 60;
  if (match.groups.minutes) seconds += parseInt(match.groups.minutes, 10) * 60;
  if (match.groups.seconds) seconds += parseInt(match.groups.seconds, 10);
  return seconds;
}
