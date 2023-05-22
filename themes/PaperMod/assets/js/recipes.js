let gantt = [];

gantt.push({
  id: '{{ $item.id }}',
  desc: '{{ $item.desc }}',
  start: '{{ $item.start }}',
  duration: '{{ (time.ParseDuration $item.duration).Seconds }}',
  dependsOn: '{{ $item.dependsOn }}',
});

console.log(gantt);

// HERE
// In: themes/PaperMod/layouts/partials/head.html
// This may not be the best idea:
// | resources.ExecuteAsTemplate "assets/js/recipes.js" .
// Since this doesn't get auto rebuilt during dev `hugo server`
// Might be better to just populate dummy (invisible) HTML elements
// and then have JS get the info from there.
//
// The JS IDE parsing would also be less confused.
