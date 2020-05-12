// set the dimensions and margins of the graph
var bp_margin = {top: 30, right: 25, bottom: 30, left: 40},
    bp_width = 700 - bp_margin.left - bp_margin.right,
    bp_height = 400 - bp_margin.top - bp_margin.bottom;

// append the carb_bp_svg object to the body of the page
var carb_bp_svg = d3.select("#carb_boxplot")
  .append("svg")
    .attr("width", bp_width + bp_margin.left + bp_margin.right)
    .attr("height", bp_height + bp_margin.top + bp_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + bp_margin.left + "," + bp_margin.top + ")");

var rowConverter = function(d) { return {
    Country: d.Country, //No conversion
    max: Number(d.max),
    min: Number(d.min),
    q1: Number(d.q1),
    q2: Number(d.q2),
    q3: Number(d.q3)
    };
}

// Read the data and compute summary statistics for each specie
d3.csv("data/carb_full_data.csv", rowConverter, function(data) {

    // var q1 = d.q1
    // var q2 = d.q2
    // var q3 = d.q3
    // // var interQuantileRange = q3 - q1
    // var min = d.min
    // var max = d.max
    // console.log(data)
    // var allCountry = ["Austria", "Belgium", "Germany",  "Denmark", "France", "United Kingdom", "Italy", "Netherlands", "Sweden" ]

//   // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Country;})
    .rollup(function(d) {
      q1 = d.map(function(g) { return g.q1;})
      median = d.map(function(g) { return g.q2;})
      q3 = d.map(function(g) { return g.q3;})
      interQuantileRange = q3 - q1
      min = d.map(function(g) { return g.min;})
      max =  d.map(function(g) { return g.max;})
      return({q1: q1, median: median, q3: q3, min: min,max: max})
    })
    .entries(data);

    // console.log(sumstat)

  // Show the X scale
  var x = d3.scaleBand()
    .range([ 0, bp_width ])
    .domain(data.map(function(d) { return d.Country; }))
    .paddingInner(1)
    .paddingOuter(.5)
  carb_bp_svg.append("g")
    .attr("transform", "translate(0," + bp_height + ")")
    .call(d3.axisBottom(x))

  // Show the Y scale
  var y = d3.scaleLinear()
    .domain([0,800])
    .range([bp_height, 30])
  carb_bp_svg.append("g").call(d3.axisLeft(y))

  // Show the main vertical line
  carb_bp_svg
    .selectAll("vertLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key))})
      .attr("x2", function(d){return(x(d.key))})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)

  // rectangle for the main box
  var boxWidth = 30
  carb_bp_svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)})
        .attr("y", function(d){return(y(d.value.q3))})
        .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "#AF996A")


        .on('mouseover', function (d, i) {
          d3.select(this).transition()
              .duration('50')
              .style("fill", "#BFB294")
          donutTip.transition()
              .duration(50)
              .style("opacity", 1);
          var q1 = d.value.q1;
          var q2 = d.value.median;
          var q3 = d.value.q3;
          var min = d.value.min;
          var max = d.value.max;
          donutTip.html("P95: " + max+ "<br>" + "P75: " + q3 + "<br>" + "Median: " + q2 + "<br>" + "P25: " + q1 + "<br>" + "P5: " + min )
              .style("left",(d3.event.pageX+ 20) + "px")
              .style("top", (d3.event.pageY - 60) + "px");
      })
      .on('mousemove', function (d, i) {
          donutTip.transition()
            .duration(50)
            .style("opacity", 1)
            .style("left",(d3.event.pageX+ 20) + "px")
            .style("top", (d3.event.pageY - 60) + "px");
      })

      .on('mouseout', function (d, i) {
          d3.select(this).transition()
              .duration('50')
              .style("fill", "#AF996A")
          donutTip.transition()
              .duration('50')
              .style("opacity", 0);
      });


  // Show the median
  carb_bp_svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.median))})
      .attr("y2", function(d){return(y(d.value.median))})
      .attr("stroke", "black")
      .style("width", 80)

  // Add title    
  var title = carb_bp_svg
    .selectAll(".bpTitle")
    .data(sumstat)
    .enter()

  title.append("text")
    .attr("class", "bpTitle")
    .style("fill","#AF996A")
    .attr('x', bp_width/2)
    .attr('y', bp_margin.top -10)
    .style("text-anchor", "middle")
        .text("Carbohydrates");
        

})