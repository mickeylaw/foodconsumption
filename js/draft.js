var dataset1 = d3.csv("/data/grain.csv", function(d) {
    return {
        Country: d.Country,
        Mean: Number(d.Mean)     
    };
}).then(function(data) {
    console.log(data);

    dataset1 = data;
    });

var dataset2 = d3.csv("/data/starchy.csv", function(d) {
    return {
        Country: d.Country,
        Mean: Number(d.Mean)     
    };
}).then(function(data) {
    console.log(data);

    dataset2 = data;
    });