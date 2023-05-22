const gantt = [];

const ganttDomData = document.getElementById('gantt-data');
for (const item of ganttDomData.children) {
  gantt.push({
    id: item.dataset.id,
    desc: item.dataset.desc,
    start: item.dataset.start,
    duration: item.dataset.duration,
    durationSeconds: item.dataset.durationSeconds,
    end: item.dataset.end,
    dependsOn: item.dataset.dependsOn,
  });
}

console.log(gantt);
