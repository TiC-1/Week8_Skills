var m = [20, 120, 20, 120],
    w = 800 - m[1] - m[3],
    h = 800 - m[0] - m[2],
    i = 0,
    root,
    links;

var vis = d3.select("#tree").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var tree = d3.tree().size([h, w]);
var linkHorizontal = d3.linkHorizontal()
  .x(function(d) { return d.y; })
  .y(function(d) { return d.x; });

d3.json("/datatree.json").then(data => {
  root = d3.hierarchy(data);
  root.x0 = h / 2;
  root.y0 = 0;

  root.children.forEach(toggleAllChildren);

  update();
});

function update() {
  tree(root);

  var node = vis.selectAll("g.node")
      .data(root.descendants());

  // ENTER
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeEnter
      .append("svg:circle")
      .attr("r", 5)
      .style("fill", "lightsteelblue")
      .on("click", function(d) { toggleChildren(d); update(); });

  nodeEnter
      .append("svg:text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.data.name; });

  var link = vis.selectAll("path.link")
      .data(root.links());

  var linkEnter = link.enter().insert("path", "g")
	  .attr("class", "link")
    .attr("d", function(d) {
        var o = {x: root.x0, y: root.y0};
        return linkHorizontal({source: o, target: o});
      })
    .transition()
	  .attr("d", function(d) {
      return linkHorizontal(d);
	  });

  // UPDATE
  var nodeUpdate = node.transition()
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
    .attr("r", 4.5)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  var linkUpdate = link
    .transition()
	  .attr("d", function(d) {
      return linkHorizontal(d);
	  });

  // EXIT
  var nodeExit = node.exit().transition()
      .attr("transform", function(d) { return "translate(" + root.y + "," + root.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  link.exit().transition()
      .attr("d", function(d) {
        var o = {x: root.x, y: root.y};
        return linkHorizontal({source: o, target: o});
      })
      .remove();
}

function toggleAllChildren(d) {
  if (d.children) {
    d.children.forEach(toggleAllChildren);
    toggleChildren(d);
  }
}

function toggleChildren(d) {
  if (d.children) {
    d.hiddenChildren = d.children;
    d.children = null;
  } else {
    d.children = d.hiddenChildren;
    d.hiddenChildren = null;
  }
}
