// Function that takes div id and shows that page
function switchPage(id){
    var pages = document.getElementsByClassName("page");
    for(var i = 0; i < pages.length; i++){
        pages[i].style.display = 'none'
    }

    document.getElementById(id).style.display = 'flex';
}

// Change default behavior on anchors
var anchorLinks = document.getElementsByClassName("nav-selector");
    for (var i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener("click", function (e) {
            e.preventDefault();
        });
}

// Show home page on windowLoad
window.onload = function(){
    switchPage('home');
}
