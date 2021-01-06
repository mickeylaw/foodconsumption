// Function to change the bar plot
function changeDashboard(dashboard, evt) {
    var i, x, tablinks;
    x = document.getElementsByClassName("dashboard");

    tablinks = document.getElementsByClassName("dashboard");
    for (i = 0; i < x.length; i++) {
        tablinks[i].style.display = "none";
    }
    document.getElementById(dashboard).style.display = "block";

    var j, y, tablinks2;
    y = document.getElementsByClassName("nav-button");

    tablinks2 = document.getElementsByClassName("navtablink");
    for (j = 0; j < y.length; j++) {
        tablinks2[j].className = tablinks2[j].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
    }