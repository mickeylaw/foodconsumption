var fatData = [
    {Country: "Austria", Mean: 15}, 
    {Country: "Belgium", Mean: 29}, 
    {Country: "Germany", Mean: 24}, 
    {Country: "Denmark", Mean: 30}, 
    {Country: "France", Mean: 27}, 
    {Country: "United Kingdom", Mean: 14}, 
    {Country: "Italy", Mean: 40}, 
    {Country: "Netherlands", Mean: 31}, 
    {Country: "Sweden", Mean: 16}
];

// set the dimensions and margins of the graph
var fa_margin = {top:10, right: 10, bottom: 70, left: 70},
    fa_width = 700 - fa_margin.left - fa_margin.right,
    fa_height = 350 - fa_margin.top - fa_margin.bottom;

// append the svg object to the body of the page
var fat_svg = d3.select("#fat_chart")
.append("svg")
    .attr("width", fa_width + fa_margin.left + fa_margin.right)
    .attr("height", fa_height + fa_margin.top + fa_margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + fa_margin.left + "," + fa_margin.top + ")");

// X axis
var fat_x = d3.scaleBand()
.range([ 0, fa_width ])
.domain(fatData.map(function(d) { return d.Country; }))
.padding(0.2);
fat_svg.append("g")
.attr("transform", "translate(0," + fa_height + ")")
.call(d3.axisBottom(fat_x))

// Add Y axis
var fat_y = d3.scaleLinear()
.domain([0, 45])
.range([ fa_height, 0]);
fat_svg.append("g")
.attr("class", "myYaxis")
.call(d3.axisLeft(fat_y));

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


var fat_donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var fat_u = fat_svg.selectAll("rect")
    .data(fatData)

fat_u
    .enter()
    .append("rect")
    .merge(fat_u)
    .attr("x", function(d) { return fat_x(d.Country); })
    .attr("y", function(d) { return fat_y(d.Mean); })
    .attr("width", fat_x.bandwidth())
    .attr("height", function(d) { return fa_height - fat_y(d.Mean); })
    .attr("fill", "#5A39AC")
    .on("mouseover",function(d) {
        var subgroupName = d.Country;
        var subgroupValue = d.Mean;
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85');
        fat_donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        fat_donutTip
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
        fat_donutTip.transition()
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
        fat_donutTip.transition()
            .duration('50')
            .style("opacity", 0);

    });


// A function that create / update_fat the plot for a given variable:
function update_fat(data, fatName, evt) {

    var u = fat_svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .attr("x", function(d) { return fat_x(d.Country); })
        .attr("y", function(d) { return fat_y(d.Mean); })
        .attr("width", fat_x.bandwidth())
        .attr("height", function(d) { return fa_height - fat_y(d.Mean); })
        .attr("fill", "#5A39AC");
        
    var i, x, tablinks;
    x = document.getElementsByClassName("fat");

    tablinks = document.getElementsByClassName("fattablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(fatName).style.display = "block";
    evt.currentTarget.className += " active";
    }

// Initialize the plot with the first dataset
//update_fat(starchyData, "starchy", event)

d3.select("button#fat")
.on("click", function () {
    update_fat(fatData, "fat", event);
})




        