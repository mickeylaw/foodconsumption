function update_age(foodSeg, countryName, evt) {
    var i, x, tablinks;
    x = document.getElementsByClassName("ageplot");

    tablinks = document.getElementsByClassName("ageplot");
    for (i = 0; i < x.length; i++) {
        tablinks[i].style.display = "none";
    }
    document.getElementById(foodSeg).style.display = "block";
    // evt.currentTarget.className += " active";

    var j, y, tablinks2;
    y = document.getElementsByClassName("country2");

    tablinks2 = document.getElementsByClassName("agetablink");
    for (j = 0; j < y.length; j++) {
        tablinks2[j].className = tablinks2[j].className.replace(" active", "");
    }
    document.getElementById(countryName).style.display = "block";
    evt.currentTarget.className += " active";


    }
    


d3.select("button#Austria2")
    .on("click", function () {
    update_age("austria_ageplot", "Austria2", event);      
    })

d3.select("button#Belgium2")
    .on("click", function () {
    update_age("belgium_ageplot", "Belgium2", event);      
    })


d3.select("button#Germany2")
    .on("click", function () {
    update_age("germany_ageplot", "Germany2", event);      
    })

d3.select("button#Denmark2")
    .on("click", function () {
    update_age("denmark_ageplot", "Denmark2", event);      
    })

d3.select("button#France2")
    .on("click", function () {
    update_age("france_ageplot", "France2", event);      
    })

d3.select("button#UnitedKingdom2")
    .on("click", function () {
    update_age("uk_ageplot", "UnitedKingdom2", event);      
    })


d3.select("button#Italy2")
    .on("click", function () {
    update_age("italy_ageplot", "Italy2", event);      
    })

d3.select("button#Netherlands2")
    .on("click", function () {
    update_age("netherlands_ageplot", "Netherlands2", event);      
    })

d3.select("button#Sweden2")
    .on("click", function () {
    update_age("sweden_ageplot", "Sweden2", event);      
    })

    
