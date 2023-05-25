const durationRegex =
  /^\s*(?:(?<days>\d+)d)?\s*(?:(?<hours>\d+)h)?\s*(?:(?<minutes>\d+)m)?\s*(?:(?<seconds>\d+)s)?\s*$/;

const startEndRegex =
  /^\s*(?:(?<id>[a-zA-Z]+)\.(?<border>start|end))?\s*(?<operator>\+|-)?\s*(?:(?<days>\d+)d)?\s*(?:(?<hours>\d+)h)?\s*(?:(?<minutes>\d+)m)?\s*(?:(?<seconds>\d+)s)?\s*$/;

enum IDBorder {
  Start = 'start',
  End = 'end',
}

enum Operator {
  Plus = '+',
  Minus = '-',
}

enum ParseStatus {
  Unresolved = 'unresolved',
  NoInput = 'noinput',
}

type StartEndRegexGroups = {
  // e.g. bacon.start + 2m30s
  id?: string;
  border?: IDBorder;
  operator?: string;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
};

class GanttItem {
  readonly id: string;
  readonly desc?: string;
  private startInput?: string;
  private endInput?: string;
  private durationInput?: string;
  private dependsOn?: string;

  private resolved = false;
  private resolvedStartSeconds = 0;
  private resolvedDurationSeconds = 0;

  constructor(itemDataset: InputDataset) {
    this.id = itemDataset.id;
    this.desc = itemDataset.desc;
    this.startInput = itemDataset.start;
    this.endInput = itemDataset.end;
    this.dependsOn = itemDataset.dependsOn;
    this.durationInput = itemDataset.duration;
  }

  static validInput(itemDataset: InputDataset): boolean {
    return !!itemDataset.id && (!!itemDataset.duration || !!itemDataset.end);
  }

  // This assumes valid input.
  tryResolve(resolvedItems?: Map<string, GanttItem>): boolean {
    const startParse = parseStartEnd(this.startInput, resolvedItems);
    const endParse = parseStartEnd(this.endInput, resolvedItems);
    const dependsOnParse = parseDependsOn(this.dependsOn, resolvedItems);
    const durationParse = parseDuration(this.durationInput);

    if (
      startParse === ParseStatus.Unresolved ||
      endParse === ParseStatus.Unresolved ||
      dependsOnParse === ParseStatus.Unresolved
    ) {
      // There are IDs mentioned that haven't been resolved; can return immediately.
      return false;
    }

    if (typeof startParse === 'number') {
      this.resolvedStartSeconds = startParse;
    }
    if (typeof dependsOnParse === 'number') {
      // dependsOn overrides start.
      this.resolvedStartSeconds = dependsOnParse;
    }
    if (typeof durationParse === 'number') {
      this.resolvedDurationSeconds = durationParse;
    }
    if (typeof endParse === 'number') {
      if (this.duration > 0) {
        // Duration specified, so start = end - duration
        this.resolvedStartSeconds = endParse - this.duration;
      } else {
        // Otherwise, so duration = end - start
        this.resolvedDurationSeconds = endParse - this.start;
      }
    }
    this.resolved = true;
    return true;
  }

  get isResolved(): boolean {
    return this.resolved;
  }

  get start(): number {
    return this.resolvedStartSeconds;
  }

  get duration(): number {
    return this.resolvedDurationSeconds;
  }

  get end(): number {
    return this.resolvedStartSeconds + this.duration;
  }

  toString(): string {
    return `[${this.id}:${this.start}-${this.end}]`;
  }
}

type InputDataset = {
  id: string;
  desc?: string;
  start?: string;
  end?: string;
  dependsOn?: string;
  duration?: string;
};

class GanttRow {
  items: GanttItem[] = [];

  place(newItem: GanttItem): boolean {
    if (this.items.length === 0) {
      // If empty row, put item in.
      this.items.push(newItem);
      return true;
    }

    if (newItem.end <= this.items[0].start) {
      // Item is before first item; insert as first item.
      this.items.splice(0, 0, newItem);
      return true;
    }

    if (newItem.start >= this.items[this.items.length - 1].end) {
      // Item is after last item; push as last item.
      this.items.push(newItem);
      return true;
    }

    let prevItem = this.items[0];
    for (const [idx, item] of this.items.slice(1).entries()) {
      if (newItem.start >= prevItem.end && newItem.end <= item.start) {
        this.items.splice(idx, 0, item);
        return true;
      }
      prevItem = item;
    }

    return false;
  }

  toString(): string {
    return this.items.join('');
  }
}

class GanttData {
  rows: GanttRow[] = [];

  place(item: GanttItem) {
    for (const row of this.rows) {
      if (row.place(item)) {
        return;
      }
    }
    // Item doesn't fit in any row, add a new one.
    const newRow = new GanttRow();
    newRow.place(item);
    this.rows.push(newRow);
  }

  toString(): string {
    return this.rows.join('\n');
  }
}

function getGanttData(): GanttItem[] {
  const ganttData: GanttItem[] = [];

  const ganttDomData = document.getElementById('gantt-data');
  if (ganttDomData === null) {
    throw new Error('gantt-data element not found');
  }

  for (const element of ganttDomData.children) {
    const item = element as HTMLElement;
    const itemDataset = item.dataset as InputDataset;

    if (!GanttItem.validInput(itemDataset)) {
      throw new Error(`invalid gantt item input id: ${itemDataset.id}`);
    }

    ganttData.push(new GanttItem(itemDataset));
  }

  return ganttData;
}

function formatGantt() {
  const ganttDiv = document.getElementById('gantt-container');
  if (ganttDiv === null) {
    return;
  }

  const ganttInputItems: GanttItem[] = getGanttData();
  if (ganttInputItems.length === 0) {
    return;
  }

  const gantt = new GanttData();
  const placedItems = new Map<string, GanttItem>();
  while (ganttInputItems.length > 0) {
    const placedIndexes: number[] = [];
    // Iterate in order because people would tend to add the instructions in
    // the correct order.
    for (const [idx, item] of ganttInputItems.entries()) {
      const placed = item.tryResolve(placedItems);
      if (placed) {
        placedIndexes.push(idx);
        placedItems.set(item.id, item);

        gantt.place(item);
      }
    }

    if (placedIndexes.length === 0) {
      // After going through all gantt data, we must have made some progress,
      // otherwise we're stuck.
      throw new Error('unable to resolve items');
    }

    // Reverse sorted order so splicing is simpler.
    placedIndexes.sort().reverse();

    // Remove placed items.
    for (const placedIndex of placedIndexes) {
      ganttInputItems.splice(placedIndex, 1);
    }
  }

  console.log(gantt.toString());
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

function parseStartEnd(
  input?: string,
  resolvedItems?: Map<string, GanttItem>,
): number | ParseStatus {
  if (!input) {
    return ParseStatus.NoInput;
  }

  const groups = input?.match(startEndRegex)?.groups as StartEndRegexGroups;
  if (!groups) {
    return ParseStatus.NoInput;
  }
  let ret = 0;
  if (groups.id) {
    if (!resolvedItems?.get(groups.id)) {
      return ParseStatus.Unresolved;
    }

    if (groups.border == IDBorder.Start) {
      ret = resolvedItems.get(groups.id)?.start ?? 0;
    }
    if (groups.border == IDBorder.End) {
      ret = resolvedItems.get(groups.id)?.end ?? 0;
    }
  }
  const durationGroups = groups as DurationGroups;
  const durationSeconds = parseDurationGroups(durationGroups);
  if (groups.operator == Operator.Minus) {
    ret -= durationSeconds;
  } else {
    ret += durationSeconds;
  }

  return ret;
}

function parseDependsOn(
  input?: string,
  resolvedItems?: Map<string, GanttItem>,
): number | ParseStatus {
  if (!input) {
    return ParseStatus.NoInput;
  }

  let latest = 0;
  const ids = input.split(/\s+/);
  for (const id of ids) {
    const item = resolvedItems?.get(id);
    if (!item) {
      return ParseStatus.Unresolved;
    }
    latest = Math.max(latest, item.end);
  }

  return latest;
}

function parseDuration(str?: string): number | ParseStatus {
  let groups = str?.match(durationRegex)?.groups;
  if (!groups) {
    return ParseStatus.NoInput;
  }

  groups = groups as DurationGroups;

  return parseDurationGroups(groups);
}

type DurationGroups = {
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
};

function parseDurationGroups(groups: DurationGroups): number {
  let seconds = 0;
  if (groups.days) seconds += parseInt(groups.days, 10) * 24 * 60 * 60;
  if (groups.hours) seconds += parseInt(groups.hours, 10) * 60 * 60;
  if (groups.minutes) seconds += parseInt(groups.minutes, 10) * 60;
  if (groups.seconds) seconds += parseInt(groups.seconds, 10);
  return seconds;
}
