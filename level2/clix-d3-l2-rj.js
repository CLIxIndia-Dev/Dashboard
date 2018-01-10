var district =["Dhamtari","Bilaspur","Aizawl","Baran","Jaipur","Jhalawar","Sirohi","Peddapally","Jagityal","Jangaon","Jayashankar","Karimnagar(new)","Mahabubabad","Medchal","Ranga Reddy(new)","Siddipet","Siricilla-Rajanna","Vikarabad","Warangal(R)","Warangal(U)"];
var states = ["Chhattisgarh","Mizoram","Rajasthan","Telangana"];
var statesTotalSchools = [30,30,101,300];
var rajasthan_schools_quality = [];
var columns1 = ["District","noOfImplementedSchools","noOfNotImplementedSchools","noDataAvailabeSchools"];
var Rajasthan_districts = ["Sirohi","Jaipur"];
var Rajasthan_total_Schools = [50,51];

//var sirohi_schools_quality = [];

var svg = d3.select("body").append("svg").attr("width", 960).attr("height", 400).attr("align","center"),
    margin = {top: 50, right: 60, bottom: 30, left: 80},
    width = +svg.attr("width") - margin.left - margin.right-300,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("rect")
    .attr("width","50%")
    .attr("height","100%")
    .attr("fill","#fcfbfb"),

     g = svg.append("g").append("text").attr("text-anchor","middle").attr("x",-200).attr("dy", "1em").attr("transform", "rotate(-90)").text("Percent of CLIx School");
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

var newArray = [];

var district_name = [];
var number_of_quality_school_observations = 0;
var number_of_below_average_schools = 0;
var number_of_average_schools = 0;
var number_of_good_schools = 0;
var number_of_excellent_schools = 0;
   var final_state_level_data = [];
var Stdata = [];

d3.csv("../IMT/DATA/English.csv",function(error,d){
   if (error) throw error;
   d3.csv("../IMT/DATA/Hindi.csv",function(error,d2){
      if (error) throw error;
      d.forEach(function(d1)
       {
        newArray.push(d1);
     //  return newArray;

       });
      d2.forEach(function(d4)
        {
          newArray.push(d4);
    //      return newArray;

        });

 //trying to nest data according to state level
 var nestedData = d3.nest()
                // .key(function(newArray){return newArray.state_entry;})
                 .key(function(newArray){return newArray.district_entry;})
                 .key(function(newArray){return newArray.CLIx_code;})
                 .key(function(newArray){return newArray.survey_time;})
                 .entries(newArray);
 //console.log(nestedData);

 //  District Level Nesting happens here
 nestedData.forEach(function(state_level)
 {

     var data = {};

     var district_level_implemented_school=0;
     var district_level_not_implemented_school=0;
     var district_level_no_data_available_school=0;
     var k =0;
     var i = 0;

     console.log(state_level.values);

    state_level.values.forEach(function(district_level){

         //district_level_no_data_available_school = district_level_no_data_available_school + district_level.values.length
       console.log(district_level.values[district_level.values.length-1].values[0]);
        //checking for Jaipur
        if(district_level.values[district_level.values.length-1].values[0].district_entry == 7)
        {
          k =1;
          if(district_level.values[district_level.values.length-1].values[0].CLIxModule_Impl == 1)
          {
            district_level_implemented_school++;
          }
          else if (district_level.values[district_level.values.length-1].values[0].CLIxModule_Impl== 2)
          {
            district_level_not_implemented_school++;
          }
        }
        //checking for Sirohi
        if(district_level.values[district_level.values.length-1].values[0].district_entry == 5)
        {
          k = 2;
          if(district_level.values[district_level.values.length-1].values[0].CLIxModule_Impl == 1)
          {

            district_level_implemented_school++;
          }
          else if (district_level.values[district_level.values.length-1].values[0].CLIxModule_Impl== 2)
          {
            district_level_not_implemented_school++;
          }
        }

         district_level.values.forEach(function(implemented_school_count)
         {
                     //starting all conditions for quality check
                     //console.log(implemented_school_count.values[implemented_school_count.values.length - 1]);
                    if(implemented_school_count.values[implemented_school_count.values.length-1].district_entry == "5" || implemented_school_count.values[implemented_school_count.values.length-1].district_entry == "7")
                    {
                    if(implemented_school_count.values[implemented_school_count.values.length-1]["Observe_session:Session_observe"]=="1")
                    {
                       rajasthan_schools_quality[i] = 0;
                     number_of_quality_school_observations++;
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:groupsinteracting"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:groupshelping"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:Students_handbook"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:Students_reflections"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:teacherpresent"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:encourage_platform"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:encourage_classdisc"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:mothertongue_teacher"] == 1)
                     {
                      rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:teacher_handbook"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }
                     if(implemented_school_count.values[implemented_school_count.values.length - 1]["Observe_session:Teacher_prepared"] == 1)
                     {
                       rajasthan_schools_quality[i]++;
                     }

                   }
                       i = i+1;
                 }
//                    implemented_school_count.values.forEach(function(implemented_school_count_final){1
//
////                        console.log(implemented_school_count_final.values)
             });
           });
            if(k==1)
            {
            Stdata = {districts : Rajasthan_districts[0], noOfImplementedSchools: district_level_implemented_school, noOfNotImplementedSchools : district_level_not_implemented_school, noDataAvailabeSchools : 50 - (district_level_implemented_school + district_level_not_implemented_school)};
            final_state_level_data.push(Stdata);
            }
            else if(k==2)
            {
              Stdata = {districts : Rajasthan_districts[1], noOfImplementedSchools: district_level_implemented_school, noOfNotImplementedSchools : district_level_not_implemented_school, noDataAvailabeSchools : 51 - (district_level_implemented_school + district_level_not_implemented_school)};
              final_state_level_data.push(Stdata);
            }
         });


        for(var j=0;j<number_of_quality_school_observations;j++)
         {
           if(rajasthan_schools_quality[j]<=4)
           {
             number_of_below_average_schools++;
           }
           else if(rajasthan_schools_quality[j]>4 && rajasthan_schools_quality[j]<=6)
           {
             number_of_average_schools++;
           }
           else if(rajasthan_schools_quality[j]>6 && rajasthan_schools_quality[j]<=8)
           {
             number_of_good_schools++;
           }
           else
           {
             number_of_excellent_schools++;
           }
         }
         console.log(number_of_quality_school_observations);
         console.log(number_of_below_average_schools);
         console.log(number_of_average_schools);
         console.log(number_of_good_schools);
         console.log(number_of_excellent_schools);
         //district_level_no_data_available_school[0] = 51 - (district_level_implemented_school[0] + district_level_not_implemented_school[0]);
         //district_level_no_data_available_school[1] = 50 - (district_level_implemented_school[1] + district_level_not_implemented_school[1]);

         //Stdata[1] =  {districts: Rajasthan_districts,noOfImplementedSchools: district_level_implemented_school[1] ,noOfNotImplementedSchools:district_level_not_implemented_school[1],noDataAvailabeSchools : district_level_no_data_available_school[1]};

           final_state_level_data.push({columns : columns1});
          // final_state_level_data.sort(function(a, b) { return b[final_state_level_data[final_state_level_data.length-1].columns[1]] / b.total - a[final_state_level_data[final_state_level_data.length-1].columns[1]] / a.total; });

           x.domain(final_state_level_data.map(function(newArray) { return newArray.districts; }));
           z.domain(final_state_level_data[final_state_level_data.length-1].columns.slice(1));
           console.log(final_state_level_data);
           var legend = g.selectAll(".legend")
               .enter().append("g")
                 .attr("class", "legend")
                 .data(final_state_level_data[final_state_level_data.length-1].columns.slice(1).reverse())
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
               .data(stack.keys(final_state_level_data[final_state_level_data.length-1].columns.slice(1))(final_state_level_data))
               .enter().append("g")
               .attr("class", "serie")
               .attr("fill", function(d) {return z(d.key);});
           console.log(stack.keys(final_state_level_data[final_state_level_data.length-1].columns.slice(1))(final_state_level_data))
           serie.selectAll("rect")
               .data(function(d) { console.log(d);
                 return d;})
               .enter().append("rect")
               .attr("x", function(d) {//console.log(x(d.data.districts));
                 return x(d.data.districts) + 60;})
               .attr("y", function(d){console.log(y(d[1]));
                 return y(d[1]) ;})
               .attr("height", function(d) { return y(d[0]) - y(d[1]); })
               .attr("width", x.bandwidth()-120)
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
           				    return "No Of Implemented schools: " + d.data.noOfImplementedSchools;
           				    }
                      else if (color == "#56489e"){
           				        console.log(d);
           				    return "No of Not Implemented schools: " + d.data["noOfNotImplementedSchools"];
           				    }
           				    else if (color == "#7b6888"){
           				       return "Data collection in progress: " + d.data["noDataAvailabeSchools"];
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
           		   //  if(d[0]===0){
           			//	location.href = "https://clix.tiss.edu/clix-in-action/rajasthan/"+d.data["State"]+"/"
           			//}else{
           			//console.log("Take me nowhere")
           			}

           		);
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

               g = svg.append("text")
               .attr("x",960/3)
               .attr("y","30")
               .attr("text-anchor","middle")
               .text("CLIx Implementation Status in Rajasthan [Last update: " );
//adding pie chart as well


var w = 300;
h = 300;
r = 100;

data = [{"label" : "Below Average", "value" : number_of_below_average_schools},{"label" : "Average", "value" : number_of_average_schools},{"label" : "Good", "value" : number_of_good_schools},{"label" : "Excellent", "value" : number_of_excellent_schools}];
console.log(data);
var svg1 = d3.select("body").append("svg:svg").data([data])
              .attr("width",w)
              .attr("height",h)
              .append("svg:g")
              .attr("transform","translate(" + r + "," + r + ")");

var color = d3.scaleOrdinal(["#821C66", "#56489e", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.arc().outerRadius(r).innerRadius(0);
var pie = d3.pie().value(function(d,i) { return data[i].value ; });
var arcs = svg1.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class","slice");
arcs.append("svg:path").attr("fill", function(d,i) { return color(i); })
                       .attr("d",arc);
                       console.log('hi');
arcs.append("svg:text").attr("transform", function(d) {
  console.log('hi1');
                        d.innerRadius = 0;
                        d.outerRadius = r;
                        return "translate(" + arc.centroid(d) + ")";

                      }).attr("text-anchor","middle").text(function(d,i){console.log('yo'); return data[i].label ; });

                    });
                    });

  //final object that is to be sent to d3 visulisation code






 //console.log(final_state_level_data);
  // });
  // final_state_level_data.sort(function(a, b) { return b[final_state_level_data[final_state_level_data.length-1].columns[1]] / b.total - a[final_state_level_data[final_state_level_data.length-1].columns[1]] / a.total; });

  /*newArray.sort(function(a, b) { return b[newArray.columns[1]] / b.total - a[newArray.columns[1]] / a.total; });

  x.domain(data.map(function(d) { return d.State; }));
  z.domain(data.columns.slice(1));

/*************************************************************************************/


/*function type(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}*/
