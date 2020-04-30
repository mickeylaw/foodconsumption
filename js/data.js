var dataset;

d3.csv("/data/foodconsumption.csv", function(d) {
    return {
        Country: d.Country,
        Survey: d.Survey,
        PopClass: d.PopClass,
        FoodexL1: d.FoodexL1,
        Metrics: d.Metrics,
        NrConsumers: Number(d.NrConsumers),
        PercConsumers: Number(d.PercConsumers),
        Mean: Number(d.Mean),
        STD: Number(d.STD),
        P5: Number(d.P5),
        P10: Number(d.P10),
        Median: Number(d.Median),
        P95: Number(d.P95),
        P97: Number(d.P97),
        P99: Number(d.P99)
    };
}).then(function(data) {
    console.log(data);

    dataset = data;
    });
