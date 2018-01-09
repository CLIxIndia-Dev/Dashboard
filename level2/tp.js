var svg = d3.select(".wpd3-97-0").append("svg").attr("width", 480).attr("height", 400).attr("align","center"),
    margin = {top: 50, right: 60, bottom: 30, left: 80},
    width = +svg.attr("width") - margin.left - margin.right-300,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("rect")
    .attr("width","76%")
    .attr("height","100%")
    .attr("fill","#fcfbfb"),
    g = svg.append("text")
    .attr("x",960/3)
    .attr("y","30")
    .attr("text-anchor","middle")
    .text("CLIx Implementation Status in Rajasthan [Last update: October 10th 2017]"),
     g = svg.append("g").append("text").attr("text-anchor","middle").attr("x",-200).attr("dy", "2em").attr("transform", "rotate(-90)").text("Percent of CLIx School");
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#821C66", "#56489e", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var stack = d3.stack()
    .offset(d3.stackOffsetExpand);

d3.csv("https://clix.tiss.edu/wp-content/uploads/Dashboard/RJ.csv", type, function(error, data) {
  if (error) throw error;

  data.sort(function(a, b) { return b[data.columns[1]] / b.total - a[data.columns[1]] / a.total; });

  x.domain(data.map(function(d) { return d.State; }));
  z.domain(data.columns.slice(1));

/*************************************************************************************/
var legend = g.selectAll(".legend")
    .data(data.columns.slice(1).reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .style("font", "10px sans-serif");

  legend.append("rect")
      .attr("x", width-20)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width + 05)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .text(function(d) { return d; });


/************************************************************************************/
 var serie = g.selectAll(".serie")
    .data(stack.keys(data.columns.slice(1))(data))
    .enter().append("g")
    .attr("class", "serie")
    .attr("fill", function(d) {return z(d.key);});

serie.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d) {return x(d.data.State)+50;})
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    .attr("width", x.bandwidth()-100)
    .on("mouseover", function(d){
				var xPos = parseFloat(d3.select(this).attr("x"));
				var yPos = parseFloat(d3.select(this).attr("y"));
				var height = parseFloat(d3.select(this).attr("height"));
				var color = d3.select(this.parentNode).attr("fill")
				d3.select(this).attr("stroke","yellow").attr("stroke-width",5);
            serie.append("rect")
                .attr("width",230)
                .attr("height",40)
                .attr("fill","#5089c8")
                .attr("opacity","0.8")
                .attr("x",xPos+90)
				.attr("y",y(d[1]))
				.attr("class","tool-tip-rect")
	        serie.append("text")
				.attr("x",xPos+95)
				.attr("y",y(d[1])+20)
				.attr("class","tooltip-dash")
				.attr("fill","white")
				.attr("opacity",1)
				.attr("text-anchor","right")
				.text(function(){
				       if(color == "#821C66"){
				    return "No Of school:- " + d.data.Implemented;
				    }else if (color == "#56489e"){
				        console.log(d);
				    return "Implementation in progess:- " + d.data["Implementation In Progress"];
				    }
				    else if (color == "#7b6888"){
				       return "Data collection in progress:- " + d.data["Data Collection In Progress"]
				    }
				})

		})

		.on("mouseout",function(){
			serie.select(".tooltip-dash").remove();
			serie.select(".tool-tip-rect").remove();
			d3.select(this).attr("stroke","pink").attr("stroke-width",0);

		})
		.on("click",function(d){
		    console.log("doing");
		     if(d[0]===0){
				location.href = "https://clix.tiss.edu/clix-in-action/rajasthan/"+d.data["State"]+"/"
			}else{
			console.log("Take me nowhere")
			}

		});
// serie.selectAll('text')
//     .data(function(d) {return d;})
//     .enter()
//     .append("text")
//     .attr("x", function(d) {return x(d.data.State)+(x.bandwidth()/2);})
//     .attr("y", function(d) {return (y(d[1]));})
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "15px")
//     .attr("fill", "black")
//     .attr("text-anchor","middle")
//     .text(function(d){return(d3.format(".0%")((d[1]-d[0])))});

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height +")")
    .call(d3.axisBottom(x));

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10, "%"));

});
function type(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}
