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
      durationSeconds: item.dataset.durationSeconds,
      end: item.dataset.end,
      dependsOn: item.dataset.dependsOn,
    });
  }

  return ganttData;
}

function appendGantt() {
  const ganttDiv = document.getElementById('gantt-container');
  if (ganttDiv === null) {
    return;
  }

  const ganttData = getGanttData();
  if (ganttData.length === 0) {
    return;
  }

  for (const step of ganttData) {
    const ganttItem = document.createElement('div');
    ganttItem.classList.add('gantt-item');
    ganttItem.innerHTML = step.id;
    // HERE set these correctly
    let translateX = 40;
    let translateY = 0;
    ganttItem.style.transform = `translate(${translateX}px, ${translateY}px)`;
    ganttDiv.appendChild(ganttItem);
  }
}

appendGantt();
