var austriaData = [{FoodexL1: "Fats & oils", Mean: 15, total: 1055},
                {FoodexL1: "Grain", Mean: 337, total: 1055},
                {FoodexL1: "Fruits", Mean: 192, total: 1055},
                {FoodexL1: "Meat", Mean: 208, total: 1055},
                {FoodexL1: "Milk & dairy", Mean: 157, total: 1055},
                {FoodexL1: "Vegetables", Mean: 146, total: 1055}];
                

var belgiumData = [{FoodexL1: "Fats & oils", Mean: 29, total: 1110},
                {FoodexL1: "Grain", Mean: 355, total: 1110},
                {FoodexL1: "Fruits", Mean: 156, total: 1110},
                {FoodexL1: "Meats", Mean: 211, total: 1110},
                {FoodexL1: "Milk & dairy", Mean: 185, total: 1110},
                {FoodexL1: "Vegetables", Mean: 174, total: 1110}];

var denmarkData = [{FoodexL1: "Fats & oils", Mean: 30, total: 1250},
                {FoodexL1: "Grain", Mean: 303, total: 1250},
                {FoodexL1: "Fruits", Mean: 200, total: 1250},
                {FoodexL1: "Meats", Mean: 172, total: 1250},
                {FoodexL1: "Milk & dairy", Mean: 364, total: 1250},
                {FoodexL1: "Vegetables", Mean: 181, total: 1250}]

var franceData = [{FoodexL1: "Fats & oils", Mean: 27, total: 1043},
                    {FoodexL1: "Grain", Mean: 296, total: 1043},
                    {FoodexL1: "Fruits", Mean: 147, total: 1043},
                    {FoodexL1: "Meats", Mean: 187, total: 1043},
                    {FoodexL1: "Milk & dairy", Mean: 201, total: 1043},
                    {FoodexL1: "Vegetables", Mean: 185, total: 1043}]
                
var germanyData = [{FoodexL1: "Fats & oils", Mean: 24, total: 1125},
                {FoodexL1: "Grain", Mean: 324, total: 1125},
                {FoodexL1: "Fruits", Mean: 205, total: 1125},
                {FoodexL1: "Meats", Mean: 213, total: 1125},
                {FoodexL1: "Milk & dairy", Mean: 197, total: 1125},
                {FoodexL1: "Vegetables", Mean: 162, total: 1125}];

var italyData = [{FoodexL1: "Fats & oils", Mean: 40, total: 1233},
                    {FoodexL1: "Grain", Mean: 326, total: 1233},
                    {FoodexL1: "Fruits", Mean: 204, total: 1233},
                    {FoodexL1: "Meats", Mean: 210, total: 1233},
                    {FoodexL1: "Milk & dairy", Mean: 187, total: 1233},
                    {FoodexL1: "Vegetables", Mean: 266, total: 1233}]                

var netherlandsData = [{FoodexL1: "Fats & oils", Mean: 31, total: 1254},
                        {FoodexL1: "Grain", Mean: 370, total: 1254},
                        {FoodexL1: "Fruits", Mean: 134, total: 1254},
                        {FoodexL1: "Meats", Mean: 205, total: 1254},
                        {FoodexL1: "Milk & dairy", Mean: 346, total: 1254},
                        {FoodexL1: "Vegetables", Mean: 168, total: 1254}]                

var swedenData = [{FoodexL1: "Fats & oils", Mean: 16, total: 1073},
                    {FoodexL1: "Grain", Mean: 312, total: 1073},
                    {FoodexL1: "Fruits", Mean: 138, total: 1073},
                    {FoodexL1: "Meats", Mean: 215, total: 1073},
                    {FoodexL1: "Milk & dairy", Mean: 289, total: 1073},
                    {FoodexL1: "Vegetables", Mean: 103, total: 1073}]                

var ukData = [{FoodexL1: "Fats & oils", Mean: 14, total: 966},
                {FoodexL1: "Grain", Mean: 292, total: 966},
                {FoodexL1: "Fruits", Mean: 113, total: 966},
                {FoodexL1: "Meats", Mean: 170, total: 966},
                {FoodexL1: "Milk & dairy", Mean: 199, total: 966},
                {FoodexL1: "Vegetables", Mean: 178, total: 966}]                



var d_width = 600;
var d_height = 400;
var d_radius = Math.min(d_width, d_height) / 2;
var donutWidth = 120;
var color = d3.scaleOrdinal()
    .range(["#5A39AC", "#BF9C00", "#279DFF", "#FF5733", "#FFD133", "#67D500"]);

var svg = d3.select('#donut')
    .append('svg')
    .attr('width', d_width)
    .attr('height', d_height)
    .append('g')
    .attr('transform', 'translate(' + (d_width / 2) +
        ',' + (d_height / 2 + 35 ) + ')');

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
        var subgroupName = d.data.FoodexL1;
        donutTip.html(subgroupName  + "<br>" + subgroupValue + "g/day" + "<br>" + num)
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


//var legend = svg.selectAll('.legend')
 //   .data(color.domain())
 //   .enter()
//.append('g')
 //   .attr('class', 'circle-legend')
 //   .attr('transform', function (d, i) {
 //       var d_height = legendRectSize + legendSpacing;
 //       var offset = d_height * color.domain().length / 2;
//var horz = -2* legendRectSize - 65;
 //       var vert = i * d_height - offset;
 //       return 'translate(' + horz + ',' + vert + ')';
 //   });

//legend.append('circle')
 //   .style('fill', color)
 //   .style('stroke', color)
 //   .style("opacity", 1)
 //   .attr('cx', 0)
 //   .attr('cy', 0)
  //  .attr('r', '.5rem');

//legend.append('text')
//.attr('x', legendRectSize + legendSpacing)
//.attr('y', legendRectSize - legendSpacing)
//    .text(function (d) {
//        return d;
//    });

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
    .outerRadius(d_width/3)
    .innerRadius(0);

svg.append("g")
    .attr("class", "labels");

var text = svg.selectAll(".labels")
    .data(pie(austriaData))

text.enter()
    .append("text")
    .text(function(d) {
        return d.data.FoodexL1;
    });

text.transition().duration(1000)
    .attrTween("transform", function(d) {
        this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerarc.centroid(d2);
				pos[0] = d_radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
    };
})
    .styleTween("text-anchor", function(d){
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
            var d2 = interpolate(t);
            return midAngle(d2) < Math.PI ? "start":"end";
        };
    });
text.exit()
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

    var d_width = 600;
    var d_height = 400;
    var radius = Math.min(d_width, d_height) / 2;
    var donutWidth = 120;

    path = d3.select("#donut")
        .selectAll("path")
        .data(pie); // Compute the new angles
    var arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);
    path.transition().duration(1000).attr("d", arc); // redrawing the path with a smooth transition

    var i, x, tablinks;
    x = document.getElementsByClassName("country");

    tablinks = document.getElementsByClassName("country");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(countryName).style.display = "block";
    evt.currentTarget.className += " active";

    

}


d3.select("button#Austria")
.on("click", function () {
    change(austriaData, "Austria", event);    
})
d3.select("button#Belgium")
.on("click", function () {
    change(belgiumData, "Belgium" ,event);
})
d3.select("button#Denmark")
.on("click", function () {
    change(denmarkData, "Denmark", event);
})
d3.select("button#France")
.on("click", function () {
    change(franceData, "France", event);
})
d3.select("button#Germany")
.on("click", function () {
    change(germanyData, "Germany", event);
})
d3.select("button#Italy")
.on("click", function () {
    change(italyData, "Italy", event);
})
d3.select("button#Netherlands")
.on("click", function () {
    change(netherlandsData, "Netherlands", event);
})
d3.select("button#Sweden")
.on("click", function () {
    change(swedenData, "Sweden", event);
})
d3.select("button#UnitedKingdom")
.on("click", function () {
    change(ukData, "UnitedKingdom", event);
})



