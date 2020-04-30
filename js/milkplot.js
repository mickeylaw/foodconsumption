var milkData = [
    {Country: "Austria", Mean: 157}, 
    {Country: "Belgium", Mean: 185}, 
    {Country: "Germany", Mean: 197}, 
    {Country: "Denmark", Mean: 364}, 
    {Country: "France", Mean: 201}, 
    {Country: "United Kingdom", Mean: 199}, 
    {Country: "Italy", Mean: 187}, 
    {Country: "Netherlands", Mean: 346}, 
    {Country: "Sweden", Mean: 289}
];

// set the dimensions and margins of the graph
var m_margin = {top: 10, right: 10, bottom: 70, left: 70},
    m_width = 700 - m_margin.left - m_margin.right,
    m_height = 350 - m_margin.top - m_margin.bottom;

// append the svg object to the body of the page
var milk_svg = d3.select("#milk_chart")
.append("svg")
    .attr("width", m_width + m_margin.left + m_margin.right)
    .attr("height", m_height + m_margin.top + m_margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + m_margin.left + "," + m_margin.top + ")");

// X axis
var milk_x = d3.scaleBand()
.range([ 0, m_width ])
.domain(milkData.map(function(d) { return d.Country; }))
.padding(0.2);
milk_svg.append("g")
.attr("transform", "translate(0," + m_height + ")")
.call(d3.axisBottom(milk_x))

// Add Y axis
var milk_y = d3.scaleLinear()
.domain([0, 370])
.range([ m_height, 0]);
milk_svg.append("g")
.attr("class", "myYaxis")
.call(d3.axisLeft(milk_y));

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


var milk_donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var milk_u = milk_svg.selectAll("rect")
    .data(milkData)

milk_u
    .enter()
    .append("rect")
    .merge(milk_u)
    .attr("x", function(d) { return milk_x(d.Country); })
    .attr("y", function(d) { return milk_y(d.Mean); })
    .attr("width", milk_x.bandwidth())
    .attr("height", function(d) { return m_height - milk_y(d.Mean); })
    .attr("fill", "#f2bd0c")
    .on("mouseover",function(d) {
        var subgroupName = d.Country;
        var subgroupValue = d.Mean;
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85');
        milk_donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        milk_donutTip
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
        milk_donutTip.transition()
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
        milk_donutTip.transition()
            .duration('50')
            .style("opacity", 0);

    });


// A function that create / update_milk the plot for a given variable:
function update_milk(data, milkName, evt) {

    var u = milk_svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect")
        .merge(u)
        .attr("x", function(d) { return milk_x(d.Country); })
        .attr("y", function(d) { return milk_y(d.Mean); })
        .attr("width", milk_x.bandwidth())
        .attr("height", function(d) { return m_height - milk_y(d.Mean); })
        .attr("fill", "#f2bd0c");
        
    var i, x, tablinks;
    x = document.getElementsByClassName("milk");

    tablinks = document.getElementsByClassName("milktablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(milkName).style.display = "block";
    evt.currentTarget.className += " active";
    }

// Initialize the plot with the first dataset
//update_milk(starchyData, "starchy", event)

d3.select("button#milk")
.on("click", function () {
    update_milk(milkData, "milk", event);
})




        