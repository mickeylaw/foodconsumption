// Set the dimensions
var sD_radius = 45,
    sD_padding = 5;

// Set the color palette
var color = d3.scaleOrdinal()
    .range(["#5A39AC", "#AF996A", "#279DFF", "#FF5733", "#f2bd0c", "#67D500"]);

// Set the arc
var sD_arc = d3.arc()
    .outerRadius(sD_radius)
    .innerRadius(sD_radius - 25);

var sD_pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.mean; });

// Parse the data
d3.csv("data/smallDonut.csv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Country"; }));

  data.forEach(function(d) {
    d.foodgroup = color.domain().map(function(name) {
      return {name: name, mean: +d[name]};
    });
  });
    // Append the svg object
    var svg = d3.select("#smallDonut").selectAll(".sD_pie")
        .data(data)
        .enter()
        .append("svg")
        .attr("class", "sD_pie")
        .attr("id", function(d, i){ var result = 'countrypie' + i ; return result; })
        .attr("width", sD_radius * 2)
        .attr("height", sD_radius * 2)
        .append("g")
        .attr("transform", "translate(" + (sD_radius+10) + "," + (sD_radius*1.5) + ")");
    // Add wrapper
    svg.append("rect")
        .attr("class", "sD_box")
        .attr("id", function(d, i){ var result = 'country' + i ; return result; })
        .attr("dx", "-60px")
        .attr("dy", "-60px")
        .attr("width",sD_radius * 2+10)
        .attr("height",sD_radius * 2+28)
        .attr("fill", "#E6E6E7")
        .attr("rx", "10px")
        .attr("ry", "10px")
        .attr("transform", "translate(" + (-sD_radius-5) + "," + (-sD_radius-6) + ")")
    // Add path
    svg.selectAll(".sD_arc")
        .data(function(d) { return sD_pie(d.foodgroup); })
        .enter().append("path")
        .attr("class", "sD_arc")
        .attr("d", sD_arc)
        .style("fill", function(d) { return color(d.data.name); });
    // Add title
    svg.append("text")
        .attr("class", "sD_text")
        .attr("dy", "5em")
        .style("text-anchor", "middle")
        .style("fill","#53575f")
        .text(function(d) { return d.Country; });
    // Add top wrapper
    svg.append("rect")
        .attr("class", "sD_box_top")
        .attr("id", function(d, i){ var result = 'countryt' + i ; return result; })
        .attr("dx", "-60px")
        .attr("dy", "-60px")
        .attr("width",sD_radius * 2+10)
        .attr("height",sD_radius * 2+28)
        .attr("fill", "#fff")
        .attr("rx", "10px")
        .attr("ry", "10px")
        .style("stroke", "#CACACA")
        .attr("transform", "translate(" + (-sD_radius-5) + "," + (-sD_radius-6) + ")")
        .attr("opacity",0)
        .on("mouseover",function(d) {
            d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.30');
        })
        .on("mouseout",function(d,i){
            d3.select(this).transition()
            .duration('50')
            .attr('opacity', '0');
        });

    // Function to change opacity of wrapper box
    function active_sD(countryID) {
        var i, x, tablinks;
        x = document.getElementsByClassName("sD_box");

        tablinks = document.getElementsByClassName("sD_box");
        for (i = 0; i < x.length; i++) {
            tablinks[i].style.opacity = 0;
        }
        document.getElementById(countryID).style.opacity = 1;
    }

    active_sD("country0")

    d3.select("#countryt0")
    .on("click", function () {
        change(austriaData, "Austria", event);
        active_sD("country0");
    })

    d3.select("#countryt1")
    .on("click", function () {
        change(belgiumData, "Belgium" ,event);
        active_sD("country1");
    })

    d3.select("#countryt2")
    .on("click", function () {
        change(denmarkData, "Denmark", event);
        active_sD("country2");
    })
    d3.select("#countryt3")
    .on("click", function () {
        change(franceData, "France", event);
        active_sD("country3");
    })
    d3.select("#countryt4")
    .on("click", function () {
        change(germanyData, "Germany", event);
        active_sD("country4");
    })
    
    d3.select("#countryt5")
    .on("click", function () {
        change(italyData, "Italy", event);
        active_sD("country5");
    })

    d3.select("#countryt6")
    .on("click", function () {
        change(netherlandsData, "Netherlands", event);
        active_sD("country6");
    })

    d3.select("#countryt7")
    .on("click", function () {
        change(swedenData, "Sweden", event);
        active_sD("country7");
    })

    d3.select("#countryt8")
    .on("click", function () {
        change(ukData, "UnitedKingdom", event);
        active_sD("country8");
    })
      
});




