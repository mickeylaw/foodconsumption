var meatData = [
    {Country: "Austria", Mean: 102},    
    {Country: "Belgium", Mean: 123},
    {Country: "Germany", Mean: 117},
    {Country: "Denmark", Mean: 133},
    {Country: "France", Mean: 134},
    {Country: "United Kingdom", Mean: 97},
    {Country: "Italy", Mean: 114},
    {Country: "Netherlands", Mean: 125},
    {Country: "Sweden", Mean: 135}
];

var fishData = [
    {Country: "Austria", Mean: 75},    
    {Country: "Belgium", Mean: 61},
    {Country: "Germany", Mean: 67},
    {Country: "Denmark", Mean: 23},
    {Country: "France", Mean: 36},
    {Country: "United Kingdom", Mean: 47},
    {Country: "Italy", Mean: 67},
    {Country: "Netherlands", Mean: 55},
    {Country: "Sweden", Mean: 57}
];

var eggData = [
    {Country: "Austria", Mean: 32}, 
    {Country: "Belgium", Mean: 27}, 
    {Country: "Germany", Mean: 30}, 
    {Country: "Denmark", Mean: 17}, 
    {Country: "France", Mean: 17}, 
    {Country: "United Kingdom", Mean: 25}, 
    {Country: "Italy", Mean: 29}, 
    {Country: "Netherlands", Mean: 25}, 
    {Country: "Sweden", Mean: 24}] 

// set the dimensions and margins of the graph
var m_margin = {top: 10, right: 10, bottom: 70, left: 70},
    m_width = 700 - m_margin.left - m_margin.right,
    m_height = 350 - m_margin.top - m_margin.bottom;

// append the svg object to the body of the page
var meat_svg = d3.select("#meat_chart")
.append("svg")
    .attr("width", m_width + m_margin.left + m_margin.right)
    .attr("height", m_height + m_margin.top + m_margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + m_margin.left + "," + m_margin.top + ")");

// X axis
var x1 = d3.scaleBand()
.range([ 0, m_width ])
.domain(meatData.map(function(d) { return d.Country; }))
.padding(0.2);
meat_svg.append("g")
.attr("transform", "translate(0," + m_height + ")")
.call(d3.axisBottom(x1))

// Add Y axis
var y1 = d3.scaleLinear()
.domain([0, 140])
.range([ m_height, 0]);
meat_svg.append("g")
.attr("class", "myYaxis")
.call(d3.axisLeft(y1));

// ----------------
// Create a tooltip
// ----------------
//var tooltip = d3.select("#meat_chart")
//    .append("div")
//        .style("position", "absolute")
//        .style("opacity", 0)
//        .attr("class", "tooltip")
//        .style("background-color", "white")
//        .style("border", "solid")
//        .style("border-width", "1px")
//        .style("border-radius", "5px")
//        .style("padding", "10px")

var meat_donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var meat_u = meat_svg.selectAll("rect")
    .data(meatData)

meat_u
    .enter()
    .append("rect")
    .merge(meat_u)
    .attr("x", function(d) { return x1(d.Country); })
    .attr("y", function(d) { return y1(d.Mean); })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) { return m_height - y1(d.Mean); })
    .attr("fill", "#FF5733")
    .on("mouseover",function(d) {
        var subgroupName = d.Country;
        var subgroupValue = d.Mean;
        d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85');
        
        //return tooltip
        //    .html("Country: " + subgroupName + "<br>" + "Mean: " + subgroupValue + " grams")
        //    .style("opacity", 1)

        meat_donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        meat_donutTip
        .html(subgroupName + "<br>" + subgroupValue + " grams")
        .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 75) + "px");

    })
    .on("mousemove",function(d){
        //return tooltip
        //    .style("left", (d3.event.pageX+10) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        //    .style("top", (d3.event.pageY-80)  + "px")
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
        meat_donutTip.transition()
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
        meat_donutTip.transition()
            .duration('50')
            .style("opacity", 0);

    });


// A function that create / update the plot for a given variable:
function update_meat(data, meatName, evt) {

    var u1 = meat_svg.selectAll("rect")
        .data(data)

    u1
        .enter()
        .append("rect")
        .merge(u1)
        .attr("x", function(d) { return x1(d.Country); })
        .attr("y", function(d) { return y1(d.Mean); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return m_height - y1(d.Mean); })
        .attr("fill", "#FF5733");

    var i, x, tablinks;
    x = document.getElementsByClassName("meats");

    tablinks = document.getElementsByClassName("meattablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(meatName).style.display = "block";
    evt.currentTarget.className += " active";
           
    }

// Initialize the plot with the first dataset
//update_meat(meatData)

d3.select("button#meat")
.on("click", function () {
    update_meat(meatData, "meat", event);
})
d3.select("button#fish")
.on("click", function () {
    update_meat(fishData, "fish", event);
})
d3.select("button#egg")
.on("click", function () {
    update_meat(eggData, "egg", event);
})



        