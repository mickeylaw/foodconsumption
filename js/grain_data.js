var dataset;

d3.csv("/data/grain.csv", function(d) {
    return {
        Country: d.Country,
        Mean: Number(d.Mean),
        
    };
}).then(function(data) {
    console.log(data);

    dataset = data;
    });
