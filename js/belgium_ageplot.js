// set the dimensions and margins of the graph
var bel_margin = {top: 10, right: 10, bottom: 30, left: 50},
    bel_width = 650 - bel_margin.left - bel_margin.right,
    bel_height = 400 - bel_margin.top - bel_margin.bottom;

// append the svg object to the body of the page
var bel_svg = d3.select("#belgium_ageplot")
  .append("svg")
    .attr("width", bel_width + bel_margin.left + bel_margin.right)
    .attr("height", bel_height + bel_margin.top + bel_margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + bel_margin.left + "," + bel_margin.top + ")");

//Read the data
d3.csv("data/belgium3.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["Fats", "Carbohydrates", "Fruit","Meats","Milk","Vegetables"]
    var ageGroup = ["Children", "Adolescents", "Adults", "Elderly", "Very elderly"]
    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        // popclass: data.map(function(d) {
        //   return {PopClass: d.PopClass};
        // }),
        values: data.map(function(d) {
          return {Row: +d.Row, Mean: +d[grpName]};
        })
      };
    });
    console.log(dataReady);
    // I strongly advise to have a look to dataReady with
    // console.log(dataReady)

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(["#5A39AC", "#BF9C00", "#279DFF", "#FF5733", "#f2bd0c", "#67D500"]);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0,6])
      .range([ 0, bel_width ])

    bel_svg.append("g")
      .attr("transform", "translate(0," + bel_height + ")")
      .call(d3.axisBottom(x).ticks(5).tickFormat(function(d,i) { 
          return ageGroup[i-1]}));
      

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,450])
      .range([ bel_height, 0]);
    bel_svg.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.Row) })
      .y(function(d) { return y(+d.Mean) })
    bel_svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    bel_svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
        .attr("class", function(d){ return d.name })
      // Second we need to enter in the 'values' part of this group
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
          //var subgroupName = d.data.FoodexL1;
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
  


    // Add a label at the end of each line
    bel_svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr("class", function(d){ return d.name })
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(d.value.Row) + "," + y(d.value.Mean) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)

    // // Add a legend (interactive)
    // bel_svg
    //   .selectAll("myLegend")
    //   .data(dataReady)
    //   .enter()
    //     .append('g')
    //     .attr("class", "ageLegend")
    //     .append("text")
    //       .attr('x', function(d,i){ return 40 + i*100})
    //       .attr('y', 10)
    //       .text(function(d) { return d.name; })
    //       .style("fill", function(d){ return myColor(d.name) })
    //       .style("font-size", 15)
    //       .style("text-anchor", "middle")
    //     .on("click", function(d){
    //       // is the element currently visible ?
    //       currentOpacity = d3.selectAll("." + d.name).style("opacity")
    //       // Change the opacity: from 0 to 1 or from 1 to 0
    //       d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
    //     })
    function updatePlot(dataName, evt) {
      currentOpacity = d3.selectAll("." + dataName).style("opacity")
      // Change the opacity: from 0 to 1 or from 1 to 0
      d3.selectAll("." + dataName).transition().style("opacity", currentOpacity == 1 ? 0:1);

      // d3.selectAll(".checkbox").each(function(d){
      //   cb = d3.select(this);
      //   pr = d3.select(this.parentNode);
      //   // If the box is check, I show the group
      //   if(cb.property("checked")){
      //     evt.currentTarget.className += " active";
      //   // Otherwise I hide it
      //   }else{
      //     evt.currentTarget.className = evt.currentTarget.className.replace(" active", "");
      //   }
      // })
       
    }
    
    d3.select(".checkbox#fat3")
    .on("change", function () {
      updatePlot("Fats", event);      
    })

    d3.select(".checkbox#carb3")
    .on("change", function () {
      updatePlot("Carbohydrates", event);      
    })

    d3.select(".checkbox#fruit3")
    .on("change", function () {
      updatePlot("Fruit", event);      
    })

    d3.select(".checkbox#milk3")
    .on("change", function () {
      updatePlot("Milk", event);      
    })

    d3.select(".checkbox#meat3")
    .on("change", function () {
      updatePlot("Meats", event);      
    })

    d3.select(".checkbox#veg3")
    .on("change", function () {
      updatePlot("Vegetables", event);      
    })

    d3.select("button#fat2")
      .on("click", function () {
        updatePlot("Fats", event);      
      })

})
