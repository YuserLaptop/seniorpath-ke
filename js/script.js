let schools = [];
let currentPathway = "All";

fetch("data/schools.json")
.then(res => res.json())
.then(data => {
    schools = data;
    sortSchools();
    displaySchools(schools);
    updateCount();
});

function sortSchools(){
    schools.sort((a,b) => b.minScore - a.minScore);
}

function displaySchools(list){
    const container = document.getElementById("schoolList");
    if(!container) return;

    container.innerHTML = "";

    list.forEach(s => {

        let tier = getTier(s.minScore);

        container.innerHTML += `
        <div class="school-card ${tier}">

            <img src="${s.image}">

            <div class="card-content">

                <h3>${s.name}</h3>
                <p>${s.county} • ${s.type}</p>

                <span class="tier-label">${tier}</span>

                <button onclick="toggle(this)">More Info</button>

                <div class="details">

                    <p>${s.description}</p>
                    <p><b>Pathway:</b> ${s.pathway}</p>
                    <p><b>Minimum Score:</b> ${s.minScore}</p>

                    <a href="${s.maps}" target="_blank">📍 Maps</a><br>
                    <a href="${s.website}" target="_blank">🌐 Website</a>

                </div>

            </div>
        </div>
        `;
    });
}

function getTier(score){
    if(score >= 380) return "high";
    if(score >= 330) return "upper";
    if(score >= 280) return "mid";
    return "accessible";
}

function toggle(btn){
    btn.nextElementSibling.classList.toggle("show");
}

function filterByPathway(pathway){
    currentPathway = pathway;

    if(pathway === "All"){
        displaySchools(schools);
        return;
    }

    let filtered = schools.filter(s => s.pathway === pathway);
    displaySchools(filtered);
}

function updateCount(){
    const count = document.getElementById("schoolCount");
    if(count){
        count.innerText = `Total Schools: ${schools.length}`;
    }
}
