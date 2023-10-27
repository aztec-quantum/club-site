// Function that takes div id and shows that page
function switchPage(id){
    var pages = document.getElementsByClassName("page");
    for(let i = 0; i < pages.length; i++){
        pages[i].style.display = 'none'
    }
    document.getElementById(id).style.display = 'flex';
    closeSideNav();
    if(id == 'home'){
        document.getElementById('main').classList.add('home')
    }
    else{
        document.getElementById('main').classList.remove('home')
    }
}

// Change default behavior on anchors
var anchorLinks = document.getElementsByClassName("nav-selector");
    for (let i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener("click", function (e) {
            e.preventDefault();
        });
}

// Show home page on windowLoad
window.onload = function(){
    switchPage('home');
}

// Handle about change slide carousel
document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".about-carousel");
    const slides = document.querySelectorAll(".about-carousel-slide");

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Set up event listeners for next and previous buttons
    document.getElementById("prevBtn").addEventListener("click", prevSlide);
    document.getElementById("nextBtn").addEventListener("click", nextSlide);

    // Optional: Add automatic slide change
    // setInterval(nextSlide, 3000); // Change slide every 3 seconds
});

//Show sidenav menu onClick

function openSideNav(){
    document.getElementById("sidenav").style.display = "block";
    document.getElementById("sidenav").style.width = "50%";
}

function closeSideNav(){
    document.getElementById("sidenav").style.display = "none";
}
