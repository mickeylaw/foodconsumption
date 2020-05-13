// // set the dimensions and margins of the graph
// var age_margin = {top: 10, right: 15, bottom: 30, left: 40},
//     age_width = 650 - age_margin.left - age_margin.right,
//     age_height = 650 - age_margin.top - age_margin.bottom;

// append the svg object to the body of the page
var den_svg = d3.select("#denmark_ageplot")
  .append("svg")
    .attr("width", age_width + age_margin.left + age_margin.right)
    .attr("height", age_height + age_margin.top + age_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + age_margin.left + "," + age_margin.top + ")");

//Read the data
d3.csv("data/denmark3.csv", function(data) {

    // List of groups
    var allGroup = ["Fats", "Carbohydrates", "Fruit","Meats","Milk","Vegetables"]
    var ageGroup = ["Children", "Adolescents", "Adults", "Elderly", "Very elderly"]
    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {Row: +d.Row, Mean: +d[grpName]};
        })
      };
    });

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(["#5A39AC", "#BF9C00", "#279DFF", "#FF5733", "#f2bd0c", "#67D500"]);

    // Add X axis
    var x = d3.scaleLinear()
      .domain([0,7])
      .range([ 0, age_width])

    den_svg.append("g")
      .attr("class","axis")
      .attr("transform", "translate(0," + age_height + ")")
      .call(d3.axisBottom(x).ticks(5).tickFormat(function(d,i) { 
          return ageGroup[i-1]}));
      

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,520])
      .range([ age_height, 0]);
    den_svg.append("g")
      .attr("class","axis")
      .call(d3.axisLeft(y));

    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.Row) })
      .y(function(d) { return y(+d.Mean) })
    den_svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    den_svg
      // First enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
        .attr("class", function(d){ return d.name })
      // Second enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.Row) } )
        .attr("cy", function(d) { return y(d.Mean) } )
        .attr("r", 5)
        .attr("stroke", "white")
        .on('mouseover', function (d, i) {
          d3.select(this).transition()
              .duration('50')
              .attr('opacity', '.85');
          donutTip.transition()
              .duration(50)
              .style("opacity", 1);
          var subgroupValue = d.Mean;
          donutTip.html(subgroupValue + " grams")
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 50) + "px");
      })
      .on('mouseout', function (d, i) {
          d3.select(this).transition()
              .duration('50')
              .attr('opacity', '1');
          donutTip.transition()
              .duration('50')
              .style("opacity", 0);
      });

    // Add legend
    var colors = ["#5A39AC", "#BF9C00", "#279DFF", "#FF5733", "#f2bd0c", "#67D500"]
    var legendRectSize = 20;
    var legendSpacing = 55;
    var size = 5
    var legend = den_svg.selectAll('.legend')
        .data(colors)
        .enter()
        .append('g')
        .attr('class', 'rect-legend')
        .attr('transform', function (d, i) {
            var d_height = legendRectSize;
            var offset = d_height * color.domain().length / 2;
            var horz = -2* legendRectSize ;
            var vert = i * d_height - offset;
                return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .style('fill', myColor)
        .style('stroke', myColor)
        .style("opacity", 1)
        .attr("x", age_width - legendSpacing)
        .attr("y", function(d,i){ return 140 + i*(size+5)}) 
        .attr('width', '20px')
        .attr('height', '20px');

    legend.append('text')
        .attr('class', 'rect-legend')
        .style("fill","#66605c")
        .attr("x", age_width - legendSpacing + size*5)
        .attr("y", function(d,i){ return 140 + i*(size+5)+ (size*2.8)}) 
        .style("text-anchor", "left")
        .text(function (d, i) {
            switch (i) {
                case 0: return "Fats & oils";
                case 1: return "Carbohydrates";
                case 2: return "Fruit";
                case 3: return "Meats";
                case 4: return "Milk and dairy";
                case 5: return "Vegetables";

            }
          });
})
