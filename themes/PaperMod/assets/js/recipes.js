const durationRegex =
  /^\s*(?:(?<days>\d+)d)?\s*(?:(?<hours>\d+)h)?\s*(?:(?<minutes>\d+)m)?\s*(?:(?<seconds>\d+)s)?\s*$/;

function getGanttData() {
  const ganttData = [];

  const ganttDomData = document.getElementById('gantt-data');
  if (ganttDomData === null) {
    return ganttData;
  }

  for (const item of ganttDomData.children) {
    ganttData.push({
      id: item.dataset.id,
      desc: item.dataset.desc,
      start: item.dataset.start,
      duration: item.dataset.duration,
      end: item.dataset.end,
      dependsOn: item.dataset.dependsOn,
    });
  }

  return ganttData;
}

function formatGantt() {
  const ganttDiv = document.getElementById('gantt-container');
  if (ganttDiv === null) {
    return;
  }

  const ganttData = getGanttData();
  if (ganttData.length === 0) {
    return;
  }

  const gantt = [];

  console.log(ganttData);
}

function appendGannt() {
  for (const step of ganttData) {
    const ganttItem = document.createElement('div');
    ganttItem.classList.add('gantt-item');
    ganttItem.innerHTML = step.id;
    // TODO set these correctly
    let translateX = 40;
    let translateY = 0;
    ganttItem.style.transform = `translate(${translateX}px, ${translateY}px)`;
    ganttDiv.appendChild(ganttItem);
  }
}

formatGantt();

function durationToSeconds(str) {
  const match = str.match(durationRegex);
  if (match === null) {
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
