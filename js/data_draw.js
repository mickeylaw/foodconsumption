

var rowConverter = function(d) { 
    return {
        PopClass: d.PopClass,
        Mean: Number(d.Mean)
    };
}
d3.csv("/data/austria3.csv", function(data) { 
    var allGroup = ["Fats and oils", "Carbohydrates", "Fruit","Meats","Milk and dairy","Vegetables"]

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {PopClass: d.PopClass, Mean: +Number(d[grpName])};
        })
        
      }});
      console.log(data);
    })
