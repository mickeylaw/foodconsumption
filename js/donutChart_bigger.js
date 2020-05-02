var austriaData = [{Country: "Austria", FoodexL1: "Fats & oils", Mean: 15, total: 1055},
                {Country: "Austria", FoodexL1: "Carbohydrates", Mean: 337, total: 1055},
                {Country: "Austria", FoodexL1: "Fruits", Mean: 192, total: 1055},
                {Country: "Austria", FoodexL1: "Meat", Mean: 208, total: 1055},
                {Country: "Austria", FoodexL1: "Milk & dairy", Mean: 157, total: 1055},
                {Country: "Austria", FoodexL1: "Vegetables", Mean: 146, total: 1055}];
                

var belgiumData = [{Country: "Belgium", FoodexL1: "Fats & oils", Mean: 29, total: 1110},
                {Country: "Belgium", FoodexL1: "Carbohydrates", Mean: 355, total: 1110},
                {Country: "Belgium", FoodexL1: "Fruits", Mean: 156, total: 1110},
                {Country: "Belgium", FoodexL1: "Meats", Mean: 211, total: 1110},
                {Country: "Belgium", FoodexL1: "Milk & dairy", Mean: 185, total: 1110},
                {Country: "Belgium", FoodexL1: "Vegetables", Mean: 174, total: 1110}];

var denmarkData = [{Country: "Denmark", FoodexL1: "Fats & oils", Mean: 30, total: 1250},
                {Country: "Denmark", FoodexL1: "Carbohydrates", Mean: 303, total: 1250},
                {Country: "Denmark", FoodexL1: "Fruits", Mean: 200, total: 1250},
                {Country: "Denmark", FoodexL1: "Meats", Mean: 172, total: 1250},
                {Country: "Denmark", FoodexL1: "Milk & dairy", Mean: 364, total: 1250},
                {Country: "Denmark", FoodexL1: "Vegetables", Mean: 181, total: 1250}]

var franceData = [{Country: "France", FoodexL1: "Fats & oils", Mean: 27, total: 1043},
                    {Country: "France", FoodexL1: "Carbohydrates", Mean: 296, total: 1043},
                    {Country: "France", FoodexL1: "Fruits", Mean: 147, total: 1043},
                    {Country: "France", FoodexL1: "Meats", Mean: 187, total: 1043},
                    {Country: "France", FoodexL1: "Milk & dairy", Mean: 201, total: 1043},
                    {Country: "France", FoodexL1: "Vegetables", Mean: 185, total: 1043}]
                
var germanyData = [{Country: "Germany", FoodexL1: "Fats & oils", Mean: 24, total: 1125},
                {Country: "Germany", FoodexL1: "Carbohydrates", Mean: 324, total: 1125},
                {Country: "Germany", FoodexL1: "Fruits", Mean: 205, total: 1125},
                {Country: "Germany", FoodexL1: "Meats", Mean: 213, total: 1125},
                {Country: "Germany", FoodexL1: "Milk & dairy", Mean: 197, total: 1125},
                {Country: "Germany", FoodexL1: "Vegetables", Mean: 162, total: 1125}];

var italyData = [{Country: "Italy", FoodexL1: "Fats & oils", Mean: 40, total: 1233},
                    {Country: "Italy", FoodexL1: "Carbohydrates", Mean: 326, total: 1233},
                    {Country: "Italy", FoodexL1: "Fruits", Mean: 204, total: 1233},
                    {Country: "Italy", FoodexL1: "Meats", Mean: 210, total: 1233},
                    {Country: "Italy", FoodexL1: "Milk & dairy", Mean: 187, total: 1233},
                    {Country: "Italy", FoodexL1: "Vegetables", Mean: 266, total: 1233}]                

var netherlandsData = [{Country: "Netherlands", FoodexL1: "Fats & oils", Mean: 31, total: 1254},
                        {Country: "Netherlands", FoodexL1: "Carbohydrates", Mean: 370, total: 1254},
                        {Country: "Netherlands", FoodexL1: "Fruits", Mean: 134, total: 1254},
                        {Country: "Netherlands", FoodexL1: "Meats", Mean: 205, total: 1254},
                        {Country: "Netherlands", FoodexL1: "Milk & dairy", Mean: 346, total: 1254},
                        {Country: "Netherlands", FoodexL1: "Vegetables", Mean: 168, total: 1254}]                

var swedenData = [{Country: "Sweden", FoodexL1: "Fats & oils", Mean: 16, total: 1073},
                    {Country: "Sweden", FoodexL1: "Carbohydrates", Mean: 312, total: 1073},
                    {Country: "Sweden", FoodexL1: "Fruits", Mean: 138, total: 1073},
                    {Country: "Sweden", FoodexL1: "Meats", Mean: 215, total: 1073},
                    {Country: "Sweden", FoodexL1: "Milk & dairy", Mean: 289, total: 1073},
                    {Country: "Sweden", FoodexL1: "Vegetables", Mean: 103, total: 1073}]                

var ukData = [{Country: "United Kingdom", FoodexL1: "Fats & oils", Mean: 14, total: 966},
                {Country: "United Kingdom", FoodexL1: "Carbohydrates", Mean: 292, total: 966},
                {Country: "United Kingdom", FoodexL1: "Fruits", Mean: 113, total: 966},
                {Country: "United Kingdom", FoodexL1: "Meats", Mean: 170, total: 966},
                {Country: "United Kingdom", FoodexL1: "Milk & dairy", Mean: 199, total: 966},
                {Country: "United Kingdom", FoodexL1: "Vegetables", Mean: 178, total: 966}]                



var d_width = 520;
var d_height = 400;
var d_radius = Math.min(d_width, d_height) / 2;
var donutWidth = 100;
var color = d3.scaleOrdinal()
    .range(["#5A39AC", "#B0A05D", "#279DFF", "#FF5733", "#f2bd0c", "#67D500"]);

var svg = d3.select('#donut')
    .append('svg')
    .attr('width', d_width)
    .attr('height', d_height)
    .append('g')
    .attr('transform', 'translate(' + (d_width / 2 + 65) +
        ',' + (d_height / 2 + 45 ) + ')');

var arc = d3.arc()
    .innerRadius(d_radius - donutWidth)
    .outerRadius(d_radius);

var outerarc = d3.arc()
    .innerRadius(d_radius * 1.1)
    .outerRadius(d_radius * 1.1);

var pie = d3.pie()
    .value(function (d) {
        return d.Mean;
    })
    .sort(null);

var legendRectSize = 13;
var legendSpacing = 7;

var donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);

var path = svg.selectAll('path')
    .data(pie(austriaData))
    .enter()
    .append('path')
    .attr("id", function(d, i){ var result = 'seg' + i ; return result; })
    .attr('d', arc)
    .attr('fill', function (d, i) {
        return color(d.data.FoodexL1);
    })
    .attr('transform', 'translate(0, 0)')
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
        donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        let num = (Math.round((d.data.Mean / d.data.total) * 100)).toString() + '%';
        var subgroupValue = d.data.Mean;
        //var subgroupName = d.data.FoodexL1;
        donutTip.html(subgroupValue + " grams" + "<br>" + num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");

    })
    .on('mousemove', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
        donutTip.transition()
            .duration('50')
            .style("opacity", 1)
            .style("left", (d3.event.pageX+10) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (d3.event.pageY-80)  + "px");
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
        donutTip.transition()
            .duration('50')
            .style("opacity", 0);
    });


var legend = svg.selectAll('.legend')
   .data(pie(austriaData))
   .enter()
// .append('g')
//    .attr('class', 'circle-legend')
//    .attr('transform', function (d, i) {
//        var d_height = legendRectSize;
//        var offset = d_height * color.domain().length / 2;
// var horz = -2* legendRectSize ;
//        var vert = i * d_height - offset;
//        return 'translate(' + horz + ',' + vert + ')';
//    });

// legend.append('circle')
//    .style('fill', color)
//    .style('stroke', color)
//    .style("opacity", 1)
//    .attr('cx', 0)
//    .attr('cy', 0)
//    .attr('r', '.5rem');

legend.append('text')
.attr('class', 'c-legend')
.style("fill","#66605c")
.attr('x', legendRectSize - 1.8*legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.style("text-anchor", "middle")
   .text(function (d) {
       return d.data.Country;
   });

// Now add the annotation. Use the centroid method to get the best coordinates

//var annotation = svg.selectAll('.annotation')
//.data(pie(austriaData))
//  .enter()
//  .append('g')
//  .attr('class', 'circle-legend')
//  .attr('transform', function(d) { return "translate(" + outerarc.centroid(d) + ")";  });
  
//annotation.append('text')
//.text(function (d) {return d.data.FoodexL1})
//    .style("text-anchor", "middle")
//    .style("font-size", 12);

function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

var newarc = d3
    .arc()
    .outerRadius(d_height/2-4)
    .innerRadius(0);

var annotation = svg.selectAll('.annotation')
    .data(pie(austriaData))
    .enter()
    
annotation
    .append('text')
      //.style('text-anchor','middle')
      .attr("dy", "0em")
      .style("fill","#66605c")
      .style("font-weight","bold")
      .attr("transform", function(d, i) {
        var one = newarc.centroid(d)[0]*2.4;
        var two = newarc.centroid(d)[1]*2.3;
        return `translate(${one},${two})`;
      })
      .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
      .text(function(d) {
        return d.data.FoodexL1;
    })
    annotation.append('text')
        .attr("dy", "1.2em")
        .style("fill","#66605c")
        .style("font-weight","bold")
        .attr("transform", function(d, i) {
          var one = newarc.centroid(d)[0]*2.4;
          var two = newarc.centroid(d)[1]*2.3;
          return `translate(${one},${two})`;
        })
        .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
       .text(function(d) {
            let num = (Math.round((d.data.Mean / d.data.total) * 100)).toString() + '%';
            return num ;
    })
    ;
    annotation.exit()
    .remove();

    //    .attr("dy", ".35em")
    //    .text(function (d) {return d.data.FoodexL1})
        //.style("text-anchor", "middle")
    //    .style("font-size", 12)
    //    .attr('transform', function(d) {
    //        var pos = outerarc.centroid(d);
    //        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    //        pos[0] = d_radius * 0.99 * (midangle < Math.PI ? 1 : -1);
    //        return 'translate(' + pos + ')';
    //    })
    //    .style('text-anchor', function(d) {
    //        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    //        return (midangle < Math.PI ? 'start' : 'end')
    //    })

//annotation.transition().duration(1000)
//    .attrTween("transform", function(d) {
//    this._current = this._current || d;
//    var interpolate = d3.interpolate(this._current, d);
//    this._current = interpolate(0);
//    return function(t) {
//        var d2 = interpolate(t);
//        var pos = outerarc.centroid(d2);
//        pos[0] = d_radius * (midAngle(d2) < Math.PI ? 1 : -1);
//        return "translate("+ pos +")";
//    };
//})
//    .attrTween("text-anchor", function(d){
 //       this._current = this._current || d;
//        var interpolate = d3.interpolate(this._current, d);
//        this._current = interpolate(0);
//        return function(t) {
//            var d2 = interpolate(t);
 //           return midAngle(d2) < Math.PI ? "start":"end";
 //       };			
//    });




function change(data, countryName, evt) {
    var pie = d3.pie()
        .value(function (d) {
            return d.Mean;
        }).sort(null)(data);

    var d_width = 560;
    var d_height = 400;
    var radius = Math.min(d_width, d_height) / 2;
    var donutWidth = 100;

    path = d3.select("#donut")
        .selectAll("path")
        .data(pie); // Compute the new angles
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    path.transition().duration(1000).attr("d", arc); // redrawing the path with a smooth transition

    // var i, x, tablinks;
    // x = document.getElementsByClassName("country");

    // tablinks = document.getElementsByClassName("country");
    // for (i = 0; i < x.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }
    // document.getElementById(countryName).style.display = "block";
    // evt.currentTarget.className += " active";

    svg.selectAll("text").remove();

    var legend = svg.selectAll('.legend')
        .data(pie)
        .enter()

    var textWidth = legend.data.client

   legend.append('text')
        .attr('class', 'c-legend')
        .style("fill","#66605c")
        .attr('x', legendRectSize - 1.8*legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Country;
        });

    var annotation = svg.selectAll('.annotation')
        .data(pie)
        .enter()


    annotation
        
        .append('text')
        .attr("dy", "0em")
        //.style('text-anchor','middle')
        .style("fill","#66605c")
        .style("font-weight","bold")
        .attr("transform", function(d, i) {
            var one = newarc.centroid(d)[0]*2.4;
            var two = newarc.centroid(d)[1]*2.3;
            return `translate(${one},${two})`;
        })
        .style('text-anchor', function(d) {
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
        .text(function(d) {
            return d.data.FoodexL1;
            });

    annotation.append('text')
        .attr("dy", "1.2em")
        .style("fill","#66605c")
        .style("font-weight","bold")
        .attr("transform", function(d, i) {
          var one = newarc.centroid(d)[0]*2.4;
          var two = newarc.centroid(d)[1]*2.3;
          return `translate(${one},${two})`;
        })
        .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
       .text(function(d) {
            let num = (Math.round((d.data.Mean / d.data.total) * 100)).toString() + '%';
            return num ;
    })
    ;


    annotation
        .exit()
        .remove();

}


function changeBarplot(foodSeg) {
    var i, x, tablinks;
    x = document.getElementsByClassName("group-item");

    tablinks = document.getElementsByClassName("group-item");
    for (i = 0; i < x.length; i++) {
      tablinks[i].style.display = "none";
    }
    document.getElementById(foodSeg).style.display = "block";
    // evt.currentTarget.className += " active";

}


d3.select("path#seg0")
.on("click", function () {
    changeBarplot("fat-seg")
    });

d3.select("path#seg1")
.on("click", function () {
    changeBarplot("carb-seg")
    });

d3.select("path#seg2")
.on("click", function () {
    changeBarplot("fruit-seg")
    });

d3.select("path#seg3")
.on("click", function () {
    changeBarplot("meat-seg")
    });

d3.select("path#seg4")
.on("click", function () {
    changeBarplot("milk-seg")
    });

d3.select("path#seg5")
.on("click", function () {
    changeBarplot("veg-seg")
    });

// d3.select("button#Austria")
// .on("click", function () {
//     change(austriaData, "Austria", event);    
// })
// d3.select("button#Belgium")
// .on("click", function () {
//     change(belgiumData, "Belgium" ,event);
// })
// d3.select("button#Denmark")
// .on("click", function () {
//     change(denmarkData, "Denmark", event);
// })
// d3.select("button#France")
// .on("click", function () {
//     change(franceData, "France", event);
// })
// d3.select("button#Germany")
// .on("click", function () {
//     change(germanyData, "Germany", event);
// })
// d3.select("button#Italy")
// .on("click", function () {
//     change(italyData, "Italy", event);
// })
// d3.select("button#Netherlands")
// .on("click", function () {
//     change(netherlandsData, "Netherlands", event);
// })
// d3.select("button#Sweden")
// .on("click", function () {
//     change(swedenData, "Sweden", event);
// })
// d3.select("button#UnitedKingdom")
// .on("click", function () {
//     change(ukData, "UnitedKingdom", event);
// })





