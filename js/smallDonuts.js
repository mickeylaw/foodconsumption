var sD_radius = 45,
    sD_padding = 5;

var color = d3.scaleOrdinal()
    .range(["#5A39AC", "#AF996A", "#279DFF", "#FF5733", "#f2bd0c", "#67D500"]);

var sD_arc = d3.arc()
    .outerRadius(sD_radius)
    .innerRadius(sD_radius - 25);

var sD_pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.mean; });

d3.csv("data/smallDonut.csv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Country"; }));

  data.forEach(function(d) {
    d.foodgroup = color.domain().map(function(name) {
      return {name: name, mean: +d[name]};
    });
  });

//   var legend = d3.select("#smallDonut").append("svg")
//       .attr("class", "sDonut-legend")
//       .attr("width", sD_radius * 2)
//       .attr("height", sD_radius * 2)
//     .selectAll("g")
//       .data(color.domain().slice().reverse())
//     .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//   legend.append("rect")
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color);

//   legend.append("text")
//       .attr("x", 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .text(function(d) { return d; });


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
        svg.append("rect")
        .attr("class", "sD_box")
        .attr("id", function(d, i){ var result = 'country' + i ; return result; })
        .attr("dx", "-60px")
        .attr("dy", "-60px")
        .attr("width",sD_radius * 2+10)
        .attr("height",sD_radius * 2+28)
        .attr("fill", "#fff")
        .attr("rx", "2px")
        .attr("ry", "2px")
        .attr("transform", "translate(" + (-sD_radius-5) + "," + (-sD_radius-6) + ")")
        // .style("opacity",0);


    svg.selectAll(".sD_arc")
        .data(function(d) { return sD_pie(d.foodgroup); })
        .enter().append("path")
        .attr("class", "sD_arc")
        .attr("d", sD_arc)
        .style("fill", function(d) { return color(d.data.name); });

    svg.append("text")
        .attr("class", "sD_text")
        .attr("dy", "5em")
        .style("text-anchor", "middle")
        .style("fill","#53575f")
        .text(function(d) { return d.Country; });

    svg.append("rect")
        .attr("class", "sD_box_top")
        .attr("id", function(d, i){ var result = 'countryt' + i ; return result; })
        .attr("dx", "-60px")
        .attr("dy", "-60px")
        .attr("width",sD_radius * 2+10)
        .attr("height",sD_radius * 2+28)
        .attr("fill", "#fff")
        .attr("rx", "2px")
        .attr("ry", "2px")
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


    function active_sD(countryID) {
        var i, x, tablinks;
        x = document.getElementsByClassName("sD_box");

        tablinks = document.getElementsByClassName("sD_box");
        for (i = 0; i < x.length; i++) {
            tablinks[i].style.opacity = 0;
            // tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(countryID).style.opacity = 1;
        // evt.currentTarget.className += " active";

    }

    function hover_sD(countrypieID) {
        // var i, x, tablinks;
        // x = document.getElementsByClassName("sD_box");

        // tablinks = document.getElementsByClassName("sD_box");
        // for (i = 0; i < x.length; i++) {
        //     tablinks[i].style.opacity = 0;
        // }
        // if (condition) {
        //     //  block of code to be executed if the condition is true
        //   } else {
        //     //  block of code to be executed if the condition is false
        //   }
        document.getElementById(countrypieID).style.opacity = 0.5;
    }

    function hoverout_sD(countrypieID) {
        // var i, x, tablinks;
        // x = document.getElementsByClassName("sD_box");

        // tablinks = document.getElementsByClassName("sD_box");
        // for (i = 0; i < x.length; i++) {
        //     tablinks[i].style.opacity = 0;
        // }
        document.getElementById(countrypieID).style.opacity = 0;
    }

    active_sD("country0")

    d3.select("#countryt0")
    .on("click", function () {
        change(austriaData, "Austria", event);
        active_sD("country0");
    })
    // d3.select("#countryt0")
    // .on("mouseover", function (){
    //     hover_sD("country0");
    // })
    // .on("mouseout", function (){
    //     hoverout_sD("country0");
    // })

    d3.select("#countryt1")
    .on("click", function () {
        change(belgiumData, "Belgium" ,event);
        active_sD("country1");
    })
    // d3.select("#country1")
    // .on("mouseover", function (){
    //     hover_sD("country1");
    // })
    // .on("mouseout", function (){
    //     hoverout_sD("country1");
    // })


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




