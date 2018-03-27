var m = [20, 120, 20, 120],
  width = 800 - m[1] - m[3],
  height = 800 - m[0] - m[2],
  root;

var vis = d3.select("#tree").append("svg:svg")
  .attr("width", width + m[1] + m[3])
  .attr("height", height + m[0] + m[2])
  .append("svg:g")
  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var tree = d3.tree().size([height, width]);
var linkHorizontal = d3.linkHorizontal()
  .x(function(d) { return d.y; })
  .y(function(d) { return d.x; });

d3.json("/datatree.json").then(function(data) {
  root = d3.hierarchy(data);
  root.x0 = height / 2;
  root.y0 = 0;

  root.children.forEach(toggleAllChildren);

  update();
});

function update() {
  tree(root);

  var node = vis.selectAll("g.node")
    .data(root.descendants(), function(d) { return d.data.id; });

  // TODO: filter descendants by content present
  var nodeContent = vis.selectAll("g.node-content-group")
    .data(root.descendants(), function(d) { return d.data.id; });

  // ENTER
  var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeEnter
    .append("svg:circle")
    .attr("r", 5)
    .style("fill", function(d) { return d.hiddenChildren && d.hiddenChildren.length > 0 ? "lightsteelblue" : "#fff"; })
    .on("click", function(d) { toggleChildren(d); update(); })

  nodeEnter
    .append("svg:text")
    .attr("x", function(d) { return d.children || d.hiddenChildren ? -10 : 10; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return d.children || d.hiddenChildren ? "end" : "start"; })
    .style("text-decoration", function(d) { return d.data.content ? "underline" : "none"; })
    .style("cursor", function(d) { return d.data.content ? "pointer" : "normal"; })
    .text(function(d) { return d.data.name; })
    .call(wrap, 100)
    .on("click", function(d) { toggleContent(d); update(); });

  var nodeContentEnter = nodeContent.enter().append("svg:g")
    .attr("class", "node-content-group")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeContentEnter.append("foreignObject")
    .attr("width", 150)
    .attr("height", 150)
    .attr("x", "-50")
    .attr("y", "1em")
    .style("display", "none")
    .append("xhtml:body")
    .attr("class", "node-content")
    .style("font", "14px 'Helvetica Neue'")
    .html(function(d){ return d.data.content ? d.data.content : ""; });

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
    .style("fill", function(d) { return d.hiddenChildren && d.hiddenChildren.length > 0 ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  var nodeContentUpdate = nodeContent.transition()
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeContentUpdate.select("foreignObject")
    .style("display", function(d) { return d.contentVisible ? "block" : "none"; });

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

function toggleContent(d) {
  if (d.contentVisible) {
    d.contentVisible = false;
  } else if (d.data.content){
    d.contentVisible = true;
  }
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text.text(null).append("tspan")
        .attr("x", function(d) { return d.children || d.hiddenChildren ? -10 : 10; })
        .attr("y", y)
        .attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan")
          .attr("x", function(d) { return d.children || d.hiddenChildren ? -10 : 10; })
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
