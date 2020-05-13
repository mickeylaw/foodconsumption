function update_box(foodSeg, countryName, evt) {
    var i, x, tablinks;
    x = document.getElementsByClassName("boxplot");

    tablinks = document.getElementsByClassName("boxplot");
    for (i = 0; i < x.length; i++) {
        tablinks[i].style.display = "none";
    }
    document.getElementById(foodSeg).style.display = "block";

    var j, y, tablinks2;
    y = document.getElementsByClassName("foodgp");

    tablinks2 = document.getElementsByClassName("fdgtablink");
    for (j = 0; j < y.length; j++) {
        tablinks2[j].className = tablinks2[j].className.replace(" active", "");
    }
    document.getElementById(countryName).style.display = "block";
    evt.currentTarget.className += " active";
    }
    


d3.select("button#bp-carb-btn")
    .on("click", function () {
    update_box("carb_boxplot", "bp-carb-btn", event);      
    })

d3.select("button#bp-fruit-btn")
    .on("click", function () {
    update_box("fruit_boxplot", "bp-fruit-btn", event);      
    })


d3.select("button#bp-meat-btn")
    .on("click", function () {
    update_box("meat_boxplot", "bp-meat-btn", event);      
    })

d3.select("button#bp-milk-btn")
    .on("click", function () {
    update_box("milk_boxplot", "bp-milk-btn", event);      
    })

d3.select("button#bp-veg-btn")
    .on("click", function () {
    update_box("veg_boxplot", "bp-veg-btn", event);      
    })

d3.select("button#bp-fat-btn")
    .on("click", function () {
    update_box("fat_boxplot", "bp-fat-btn", event);      
    })

