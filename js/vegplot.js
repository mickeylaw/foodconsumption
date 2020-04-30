var vegData = [
    {Country: "Austria", Mean: 112}, 
    {Country: "Belgium", Mean: 131}, 
    {Country: "Germany", Mean: 126}, 
    {Country: "Denmark", Mean: 170}, 
    {Country: "France", Mean: 145}, 
    {Country: "United Kingdom", Mean: 132}, 
    {Country: "Italy", Mean: 235}, 
    {Country: "Netherlands", Mean: 136}, 
    {Country: "Sweden", Mean: 79} 
];

var legumeData = [
    {Country: "Austria", Mean: 34}, 
    {Country: "Belgium", Mean: 43}, 
    {Country: "Germany", Mean: 35}, 
    {Country: "Denmark", Mean: 11}, 
    {Country: "France", Mean: 40}, 
    {Country: "United Kingdom", Mean: 46}, 
    {Country: "Italy", Mean: 31}, 
    {Country: "Netherlands", Mean: 32}, 
    {Country: "Sweden", Mean: 25}
];

// set the dimensions and margins of the graph
var v_margin = {top: 20, right: 10, bottom: 70, left: 70},
    v_width = 700 - v_margin.left - v_margin.right,
    v_height = 350 - v_margin.top - v_margin.bottom;

// append the svg object to the body of the page
var veg_svg = d3.select("#veg_chart")
.append("svg")
    .attr("width", v_width + v_margin.left + v_margin.right)
    .attr("height", v_height + v_margin.top + v_margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + v_margin.left + "," + v_margin.top + ")");

// X axis
var veg_x = d3.scaleBand()
.range([ 0, v_width ])
.domain(starchyData.map(function(d) { return d.Country; }))
.padding(0.2);
veg_svg.append("g")
.attr("transform", "translate(0," + v_height + ")")
.call(d3.axisBottom(veg_x))

// Add Y axis
var veg_y = d3.scaleLinear()
.domain([0, 240])
.range([ v_height, 0]);
veg_svg.append("g")
.attr("class", "myYaxis")
.call(d3.axisLeft(veg_y));

// ----------------
// Create a tooltip
// ----------------
//var tooltip = d3.select("#veg_chart")
//    .append("div")
//        .style("position", "absolute")
//        .style("opacity", 0)
//        .attr("class", "tooltip")
//        .style("background-color", "white")
//        .style("border", "solid")
//        .style("border-width", "1px")
//        .style("border-radius", "5px")
//       .style("padding", "10px")


var veg_donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var veg_u = veg_svg.selectAll("rect")
    .data(vegData)

veg_u
    .enter()
    .append("rect")
    .merge(veg_u)
    .attr("x", function(d) { return veg_x(d.Country); })
    .attr("y", function(d) { return veg_y(d.Mean); })
    .attr("width", veg_x.bandwidth())
    .attr("height", function(d) { return v_height - veg_y(d.Mean); })
    .attr("fill", "#67D500")
    .on("mouseover",function(d) {
        var subgroupName = d.Country;
        var subgroupValue = d.Mean;
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85');
        veg_donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        veg_donutTip
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
        veg_donutTip.transition()
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
        veg_donutTip.transition()
            .duration('50')
            .style("opacity", 0);

    });


// A function that create / update_veg the plot for a given variable:
function update_veg(data, vegName, evt) {

    var u = veg_svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .attr("x", function(d) { return veg_x(d.Country); })
        .attr("y", function(d) { return veg_y(d.Mean); })
        .attr("width", veg_x.bandwidth())
        .attr("height", function(d) { return v_height - veg_y(d.Mean); })
        .attr("fill", "#67D500");
        
    var i, x, tablinks;
    x = document.getElementsByClassName("veg");

    tablinks = document.getElementsByClassName("vegtablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(vegName).style.display = "block";
    evt.currentTarget.className += " active";
    }

// Initialize the plot with the first dataset
//update_veg(starchyData, "starchy", event)

d3.select("button#veg")
.on("click", function () {
    update_veg(vegData, "veg", event);
})
d3.select("button#legume")
.on("click", function () {
    update_veg(legumeData, "legume", event);
})



        