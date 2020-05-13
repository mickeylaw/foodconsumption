// set the dimensions and margins of the graph
var v_margin = {top: 10, right: 400, bottom: 70, left: 30},
    v_width = 900 - v_margin.left - v_margin.right,
    v_height = 350 - v_margin.top - v_margin.bottom;

// append the svg object to the body of the page
var veg_svg = d3.select("#veg_chart")
.append("svg")
    .attr("width", v_width + v_margin.left + v_margin.right)
    .attr("height", v_height + v_margin.top + v_margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + v_margin.left + "," + v_margin.top + ")");

// Parse the Data
d3.csv("data/allveg.csv", function(data) {

    // List of subgroups
    var subgroups = data.columns.slice(1)

    // List of groups = value of the first column called Country -> show them on the X axis
    var groups = d3.map(data, function(d){return(d.Country)}).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, v_width])
        .padding([0.2])
    veg_svg.append("g")
        .attr("transform", "translate(0," + v_height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 280])
        .range([ v_height, 0 ]);
    veg_svg.append("g")
        .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .range(["#4DA000","#67D500"]);

    var colors = ["#4DA000","#67D500"]

    //stack the data --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (data)

    var carb_donutTip = d3.select("body").append("div")
        .attr("class", "donut-tip")
        .style("opacity", 0);

    // ----------------
  // Highlight a specific subgroup when hovered
  // ----------------

    // What happens when user hover a bar
    var mouseover = function(d) {
        // what subgroup are we hovering?
        var subgroupName = d3.select(this.parentNode).datum().key; 
        var countryName = d.data.Country;
        var subgroupValue = d.data[subgroupName];
        // Reduce opacity of all rect to 0.2
        d3.selectAll(".myRect").style("opacity", 0.2)
        // Highlight all rects of this subgroup with opacity 0.8. 
        d3.selectAll("."+subgroupName)
        .style("opacity", 1)
        carb_donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        carb_donutTip
        .html(countryName + "<br>" +subgroupName + "<br>" + subgroupValue + " grams")
        .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 90) + "px");
    }

    var mousemove = function(d){
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
        carb_donutTip.transition()
            .duration('50')
            .style("opacity", 1)
            .style("left", (d3.event.pageX + 10) + "px") 
            .style("top", (d3.event.pageY - 90)  + "px");
    }

    // When user do not hover anymore
    var mouseleave = function(d) {
        // Back to normal opacity: 0.8
        d3.selectAll(".myRect")
            .style("opacity",1)
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
            //return tooltip
            //    .style("opacity", 0);
            carb_donutTip.transition()
                .duration('50')
                .style("opacity", 0);
    }

  // Show the bars
    veg_svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = Country per Country
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .attr("class", function(d){ return "myRect " + d.key }) // Add a class to each subgroup: their name
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
            .attr("x", function(d) { return x(d.data.Country); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width",x.bandwidth())
            .attr("stroke", "grey")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    var legendRectSize = 20;
    var legendSpacing = 100;
    var size = 20
    var legend = veg_svg.selectAll('.legend')
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
        .style('fill', function(d, i) {return colors.slice().reverse()[i];})
        .style('stroke', "grey")
        .style("opacity", 1)
        .attr("x", v_width + legendSpacing)
        .attr("y", function(d,i){ return 100 + i*(size+5)}) 
        .attr('width', '20px')
        .attr('height', '20px');

    legend.append('text')
        .attr('class', 'rect-legend')
        .style("fill","#66605c")
        .attr("x", v_width + legendSpacing + size*1.5)
        .attr("y", function(d,i){ return 100 + i*(size+5)+ (size/1.2)}) 
        .style("text-anchor", "left")
        .text(function (d, i) {
            switch (i) {
                case 0: return "Legumes, nuts and oilseeds";
                case 1: return "Vegetables and vegetable products ";
            }
        });
})