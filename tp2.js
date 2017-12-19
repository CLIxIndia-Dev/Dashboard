var svg = d3.select(".wpd3-4847-0").append("svg").attr("width", 960).attr("height", 500),
    margin = {top: 40, right:20, bottom: 60, left: 40},
    width = +svg.attr("width") - margin.left - margin.right-300,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
    .append("rect")
    .attr("width","100%")
    .attr("height","100%")
    .attr("fill","#fcfcfc")
    g = svg.append("g").append("text").attr("text-anchor","middle").attr("x", width/2).attr("y",480).text("CLIx School Codes");
    g = svg.append("g").append("text").attr("text-anchor","middle").attr("x",-200).attr("dy", "2em").attr("transform", "rotate(-90)").text("Modules being implemented");
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0])

var z = d3.scaleOrdinal(d3.schemeCategory10)
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

d3.csv("https://clix.tiss.edu/wp-content/uploads/Dashboard/RJ-school.csv", function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;

  var keys = data.columns.slice(1);

  data.sort(function(a, b) { return b.total - a.total; });
  x.domain(data.map(function(d) { return d.State; }));
  y.domain([0, d3.max(data, function(d) {return d.total; })]).nice();
  z.domain(keys);
  g.append("g")
    .append("text")
    .attr("x", 960/2)
    .attr("y", -15)
    .attr("text-anchor","middle")
    .text("CLIx Implementation Status in Jaipur [Last update: October 10th 2017]")
g.append("g")
    .append("text")
    .attr("x", 760)
    .attr("y", width/3.3)
    .attr('font-size', '9')
    .attr("text-anchor","middle")
    .text("(note:- This graph shows the modules that have started in the schools)")
  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().
    append("g")
    .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.State); })
      .attr("y", function(d) { console.log(y(d));return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())

//     .on("mouseover",function(d){
//         var xPos = parseFloat(d3.select(this).attr("x"));
// 				var yPos = parseFloat(d3.select(this).attr("y"));
// 				var height = parseFloat(d3.select(this).attr("height"));

// 				d3.select(this).attr("stroke","yellow").attr("stroke-width",5);
//         g.append("rect")
//                 .attr("width",250)
//                 .attr("height",40)
//                 .attr("fill","#5089c8")
//                 .attr("opacity","0.8")
//                 .attr("x",xPos+90)
// 				.attr("y",y(d[1]))
// 				.attr("class","tool-tip-rect")
// 	        g.append("text")
// 	           // .data(keys.slice().reverse())
//             //     .enter()
// 				.attr("x",xPos+95)
// 				.attr("y",y(d[1])+20)
// 				.attr("class","tooltip-dash")
// 				.attr("fill","white")
// 				.attr("opacity",1)
// 				.attr("text-anchor","right")
// 				.text(function(d){
// 				  console.log(d)
// 				})
//     })
//         .on("mouseout",function(){
// 			g.select(".tooltip-dash").remove();
// 			g.select(".tool-tip-rect").remove();
// 			d3.select(this).attr("stroke","pink").attr("stroke-width",0);

// 		});

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));



//   g.append("g")
//       .attr("class", "axis")
//       .call(d3.axisLeft(y).ticks(null, "s"))

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width +290)
      .attr("y",30)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width+280)
      .attr("y", 39.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});
