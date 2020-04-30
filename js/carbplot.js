var starchyData = [
    {Country: "Austria", Mean: 88},
    {Country: "Belgium", Mean: 119},
    {Country: "Germany", Mean: 94},
    {Country: "Denmark", Mean: 94},
    {Country: "France", Mean: 70},
    {Country: "United Kingdom", Mean: 99},
    {Country: "Italy", Mean: 74},
    {Country: "Netherlands", Mean: 146},
    {Country: "Sweden", Mean: 129}
];

var grainData = [
    {Country: "Austria", Mean: 248},
    {Country: "Belgium", Mean: 236},
    {Country: "Germany", Mean: 230},
    {Country: "Denmark", Mean: 209},
    {Country: "France", Mean: 226},
    {Country: "United Kingdom", Mean: 193},
    {Country: "Italy", Mean: 251},
    {Country: "Netherlands", Mean: 224},
    {Country: "Sweden", Mean: 182}
];

// set the dimensions and margins of the graph
var c_margin = {top: 10, right: 10, bottom: 70, left: 70},
    c_width = 700 - c_margin.left - c_margin.right,
    c_height = 350 - c_margin.top - c_margin.bottom;

// append the svg object to the body of the page
var carb_svg = d3.select("#carb_chart")
.append("svg")
    .attr("width", c_width + c_margin.left + c_margin.right)
    .attr("height", c_height + c_margin.top + c_margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + c_margin.left + "," + c_margin.top + ")");

// X axis
var carb_x = d3.scaleBand()
.range([ 0, c_width ])
.domain(starchyData.map(function(d) { return d.Country; }))
.padding(0.2);
carb_svg.append("g")
.attr("transform", "translate(0," + c_height + ")")
.call(d3.axisBottom(carb_x))

// Add Y axis
var carb_y = d3.scaleLinear()
.domain([0, 260])
.range([ c_height, 0]);
carb_svg.append("g")
.attr("class", "myYaxis")
.call(d3.axisLeft(carb_y));

// ----------------
// Create a tooltip
// ----------------
//var tooltip = d3.select("#carb_chart")
//    .append("div")
//        .style("position", "absolute")
//        .style("opacity", 0)
//        .attr("class", "tooltip")
//        .style("background-color", "white")
//        .style("border", "solid")
//        .style("border-width", "1px")
//        .style("border-radius", "5px")
//       .style("padding", "10px")


var carb_donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var carb_u = carb_svg.selectAll("rect")
    .data(grainData)

carb_u
    .enter()
    .append("rect")
    .merge(carb_u)
    .attr("x", function(d) { return carb_x(d.Country); })
    .attr("y", function(d) { return carb_y(d.Mean); })
    .attr("width", carb_x.bandwidth())
    .attr("height", function(d) { return c_height - carb_y(d.Mean); })
    .attr("fill", "#BF9C00")
    .on("mouseover",function(d) {
        var subgroupName = d.Country;
        var subgroupValue = d.Mean;
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85');
        carb_donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        carb_donutTip
        .html(subgroupName + "<br>" + subgroupValue + " grams")
        .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 75) + "px");
        
        //return tooltip
        //    .html("Country: " + subgroupName + "<br>" + "Mean: " + subgroupValue + " grams")
        //    .style("opacity", 1)
    })
    .on("mousemove",function(d){
        //return tooltip
        //    .style("left", (d3.event.pageX-300) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        //    .style("top", (d3.event.pageY-880)  + "px")
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
        carb_donutTip.transition()
            .duration('50')
            .style("opacity", 1)
            .style("left", (d3.event.pageX + 10) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (d3.event.pageY - 75)  + "px");

    })
    .on("mouseout",function(d,i){
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '1');
        //return tooltip
        //    .style("opacity", 0);
        carb_donutTip.transition()
            .duration('50')
            .style("opacity", 0);

    });


// A function that create / update_carb the plot for a given variable:
function update_carb(data, carbName, evt) {

    var u = carb_svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .attr("x", function(d) { return carb_x(d.Country); })
        .attr("y", function(d) { return carb_y(d.Mean); })
        .attr("width", carb_x.bandwidth())
        .attr("height", function(d) { return c_height - carb_y(d.Mean); })
        .attr("fill", "#BF9C00");
        
    var i, x, tablinks;
    x = document.getElementsByClassName("carbs");

    tablinks = document.getElementsByClassName("carbtablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(carbName).style.display = "block";
    evt.currentTarget.className += " active";
    }

// Initialize the plot with the first dataset
//update_carb(starchyData, "starchy", event)

d3.select("button#starchy")
.on("click", function () {
    update_carb(starchyData, "starchy", event);
})
d3.select("button#grains")
.on("click", function () {
    update_carb(grainData, "grains", event);
})



        