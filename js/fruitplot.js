var fruitData = [
    {Country: "Austria", Mean: 192},
    {Country: "Belgium", Mean: 156},
    {Country: "Germany", Mean: 205},
    {Country: "Denmark", Mean: 200},
    {Country: "France", Mean: 147},
    {Country: "United Kingdom", Mean: 113},
    {Country: "Italy", Mean: 204},
    {Country: "Netherlands", Mean: 134},
    {Country: "Sweden", Mean: 138}
];

// set the dimensions and margins of the graph
var f_margin = {top: 10, right: 10, bottom: 70, left: 70},
    f_width = 700 - f_margin.left - f_margin.right,
    f_height = 350 - f_margin.top - f_margin.bottom;

// append the svg object to the body of the page
var fruit_svg = d3.select("#fruit_chart")
.append("svg")
    .attr("width", f_width + f_margin.left + f_margin.right)
    .attr("height", f_height + f_margin.top + f_margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + f_margin.left + "," + f_margin.top + ")");

// X axis
var fruit_x = d3.scaleBand()
.range([ 0, f_width ])
.domain(starchyData.map(function(d) { return d.Country; }))
.padding(0.2);
fruit_svg.append("g")
.attr("transform", "translate(0," + f_height + ")")
.call(d3.axisBottom(fruit_x))

// Add Y axis
var fruit_y = d3.scaleLinear()
.domain([0, 210])
.range([ f_height, 0]);
fruit_svg.append("g")
.attr("class", "myYaxis")
.call(d3.axisLeft(fruit_y));

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


var fruit_donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var fruit_u = fruit_svg.selectAll("rect")
    .data(fruitData)

fruit_u
    .enter()
    .append("rect")
    .merge(fruit_u)
    .attr("x", function(d) { return fruit_x(d.Country); })
    .attr("y", function(d) { return fruit_y(d.Mean); })
    .attr("width", fruit_x.bandwidth())
    .attr("height", function(d) { return f_height - fruit_y(d.Mean); })
    .attr("fill", "#279DFF")
    .on("mouseover",function(d) {
        var subgroupName = d.Country;
        var subgroupValue = d.Mean;
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85');
        fruit_donutTip.transition()
            .duration('50')
            .style("opacity", 1);
        fruit_donutTip
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
        fruit_donutTip.transition()
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
        fruit_donutTip.transition()
            .duration('50')
            .style("opacity", 0);

    });


// A function that create / update_fruit the plot for a given variable:
function update_fruit(data, carbName, evt) {

    var u = fruit_svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .attr("x", function(d) { return fruit_x(d.Country); })
        .attr("y", function(d) { return fruit_y(d.Mean); })
        .attr("width", fruit_x.bandwidth())
        .attr("height", function(d) { return f_height - fruit_y(d.Mean); })
        .attr("fill", "#279DFF");
        
    var i, x, tablinks;
    x = document.getElementsByClassName("fruit");

    tablinks = document.getElementsByClassName("fruittablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(carbName).style.display = "block";
    evt.currentTarget.className += " active";
    }

// Initialize the plot with the first dataset
//update_fruit(starchyData, "starchy", event)

d3.select("button#fruit")
.on("click", function () {
    update_fruit(fruitData, "fruit", event);
})




        