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
    if(id == 'roadmap'){
        if(document.getElementById('roadmap').children.length == 0)fetchRoadmapJSON();
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

// Handle roadmap
function fetchRoadmapJSON() {
    fetch('../assets/json/roadmap.json')
        .then(response => response.json())
        .then(data => {
            renderRoadmap(data);
        })
        .catch(error => console.error('Error fetching roadmap JSON:', error));
}
function renderRoadmap(roadmapData) {
    const roadmap = document.createElement('ul');
    roadmap.classList.add('roadmap');
    for (const node of roadmapData.roadmap['roadmap-nodes']) {
        roadmap.appendChild(createRoadmapItem(node.date, node.title, node.description));
    }
    
    const roadmapContainer = document.getElementById('roadmap');
    roadmapContainer.appendChild(roadmap);
}

function createRoadmapItem(date, title, desc){
    item = document.createElement('li');
    item.classList.add('roadmap-node');
    item.appendChild(createRoadmapTitle(title));
    item.appendChild(createRoadmapDate(date));
    item.appendChild(createRoadmapDesc(desc));
    return item;
}

function createRoadmapDate(date){
    dateElem = document.createElement('h3');
    dateElem.classList.add('node-date');
    dateElem.innerText = date;
    return dateElem;
}

function createRoadmapTitle(title){
    titleElem = document.createElement('h3');
    titleElem.classList.add('node-text');
    titleElem.innerText = title;
    return titleElem;
}

function createRoadmapDesc(desc){
    descElem = document.createElement('p');
    descElem.classList.add('node-desc');
    descElem.innerText = desc;
    return descElem;
}

function createRoadmapPurpose(purpose){
    purposeElem = document.createElement('p');
    purposeElem.classList.add('node-purp');
    purposeElem.innerText = purpose;
    return purposeElem;
}

function createTagContainer(){
    tagsContainer = document.createElement('ul');
    tagsContainer.classList.add('tags-container');
    tagsContainer.appendChild(createTags());
    return tagsContainer;
}
function createTags(){
    tags = document.createElement('li');
    tags.classList.add('node-tag');
    tags.innerText = "test";
    return tags;
}
function createResourcesContainer(){
    resourcesContainer = document.createElement('ul');
    resourcesContainer.classList.add('resources-container');
    resourcesContainer.appendChild(createResources());
    return resourcesContainer;
}
function createResources(){

}
/**<ul class="roadmap">
                <li class="roadmap-node">
                    <h3>Hello Quantum</h3>
                    <h4> Lab 1 - 1/31</h4>
                    <p class="node-desc"></p>
                    <p class="node-purp"></p>
                    <p class="node-purp"></p>
                    <ul class="tags-container">
                        <li class="node-tag"></li>
                    </ul>
                    <ul class="resources-container">
                        <li class="node-resource"></li>
                    </ul>
                </li>
            </ul> */