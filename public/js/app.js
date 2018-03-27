var tree = d3.tree().size([200, 200]);
var hierarchy;

d3.json("/datatree.json").then(data => {
  console.log(data);
  hierarchy = d3.hierarchy(data);
  tree(hierarchy);
})
