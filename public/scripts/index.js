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
    if(id == 'research'){
        if(document.getElementById('research').children.length == 2)fetchResearchJSON();

        if(document.getElementById('research').children.length == 0)fetchResearchJSON();

        if(document.getElementById('research').children.length == 2)fetchResearchJSON();

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
    const slides = document.querySelectorAll(".about-carousel-slide");
    
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {

            slide.style.transform = `translateX(-${index * 100}%)`;
            slide.style.transitionDuration = "0.5s";
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




// Handle research
function fetchResearchJSON() {
    fetch('../assets/json/research.json')
        .then(response => response.json())
        .then(data => {
            renderResearch(data);
        })
        .catch(error => console.error('Error fetching research JSON:', error));
}
function renderResearch(researchData) {
    const research = document.createElement('ul');
    research.classList.add('research');
    for (const node of researchData.research['research-nodes']) {
        research.appendChild(createResearchItem(node));
    }
    
    const researchContainer = document.getElementById('research');
    researchContainer.appendChild(research);
}

function createResearchItem(node){
    let item = document.createElement('li');
    item.classList.add('research-node');
    item.onclick = function(){
        if(item.children.length == 3){

            //let desc = createResearchPurpose(node.description);
            //item.appendChild(desc);
            //let links = createLinksContainer(node.linkscontainer['links'])
            //if(links.children.length > 0)item.appendChild(links); 
            //Uncomment when research data is ready

            let tags = createTagContainer(node.tagscontainer['tags'])
            item.appendChild(tags)
            let purp = createResearchPurpose(node.purpose);
            item.appendChild(purp);

        }
        else{
            while(item.children.length > 3){item.removeChild(item.lastChild);}
        }
    }
    item.appendChild(createResearchTitle(node.title));

    item.appendChild(createResearchAuthors(node.authors));
    item.appendChild(createResearchDesc(node.publication));
    return item;
}
function createResearchAuthors(date){
    let dateElem = document.createElement('h4');
    item.appendChild(createResearchDate(node.date));
    item.appendChild(createResearchDesc(node.description));
    return item;
}
function createResearchDate(date){
    let dateElem = document.createElement('h3');
    dateElem.classList.add('node-date');
    dateElem.innerText = date;
    return dateElem;
}

function createResearchTitle(title){
    let titleElem = document.createElement('h3');
    titleElem.classList.add('node-text');
    titleElem.innerText = title;
    return titleElem;
}

function createResearchDesc(desc){
    let descElem = document.createElement('p');
    descElem.classList.add('node-desc');
    descElem.innerText = desc;
    return descElem;
}

function createResearchPurpose(purpose){
    let purposeElem = document.createElement('p');
    purposeElem.classList.add('node-purp');
    purposeElem.innerText = purpose;
    return purposeElem;
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
        roadmap.appendChild(createRoadmapItem(node));
    }
    
    const roadmapContainer = document.getElementById('roadmap');
    roadmapContainer.appendChild(roadmap);
}

function createRoadmapItem(node){
    let item = document.createElement('li');
    item.classList.add('roadmap-node');
    item.onclick = function(){
        if(item.children.length == 2){
            let tags = createTagContainer(node.tagscontainer['tags'])
            item.appendChild(tags)
            let purp = createRoadmapPurpose(node.purpose);
            item.appendChild(purp);
            let resources = createResourcesContainer(node.resourcescontainer['resources']);
            item.appendChild(resources);
        }
        else{
            while(item.children.length > 2){item.removeChild(item.lastChild);}
        }
    }
    item.appendChild(createRoadmapTitle(node.title, node.date));
    item.appendChild(createRoadmapDesc(node.description));
    return item;
}
function createRoadmapDate(date){
    let dateElem = document.createElement('h3');
    dateElem.classList.add('node-date');
    dateElem.innerText = date;
    return dateElem;
}

function createRoadmapTitle(title, date){
    let titleElem = document.createElement('h3');
    titleElem.classList.add('node-text');
    titleElem.innerText = title + " - " + date;
    return titleElem;
}

function createRoadmapDesc(desc){
    let descElem = document.createElement('p');
    descElem.classList.add('node-desc');
    descElem.innerText = desc;
    return descElem;
}

function createRoadmapPurpose(purpose){
    let purposeElem = document.createElement('p');
    purposeElem.classList.add('node-purp');
    purposeElem.innerText = purpose;
    return purposeElem;
}

function createTagContainer(tags){
    let tagsContainer = document.createElement('ul');
    tagsContainer.classList.add('tags-container');
    for(const tag in tags){
        let tagElem = document.createElement('li');
        tagElem.innerText = tags[tag];
        tagElem.classList.add('tag')
        tagsContainer.appendChild(tagElem)
    }
    return tagsContainer;
}

function createResourcesContainer(resources){
    let resourcesContainer = document.createElement('ul');
    resourcesContainer.classList.add('resources-container');
    let resourcesHeader = document.createElement('h3');
    resourcesHeader.innerText = 'Resources';
    resourcesContainer.appendChild(resourcesHeader);
    for(const resource in resources){
        let resourceElem = document.createElement('li');
        resourceElem.classList.add('resource-node')
        if(resources[resource].includes("https://www.youtube.com")){
            let resourceNode = document.createElement('iframe');
            resourceNode.src = resources[resource];
            resourceNode.allow = "fullscreen"
            resourceNode.classList.add('resource-node')
            resourceElem.appendChild(resourceNode)
        }
        else{
            let resourceNode = document.createElement('a');
            resourceNode.href = resources[resource];
            resourceNode.target = "_blank"
            resourceNode.rel = "noopener noreferrer"
            resourceNode.innerText = resources[resource];
            resourceElem.appendChild(resourceNode)
        }
        
        
        
        resourcesContainer.appendChild(resourceElem)
    }
    return resourcesContainer;
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