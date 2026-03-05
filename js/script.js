let schools=[];

fetch("data/schools.json")
.then(res=>res.json())
.then(data=>{
schools=data;
displaySchools(schools);
});

function displaySchools(list){

const container=document.getElementById("schoolList") || document.getElementById("results");

if(!container) return;

container.innerHTML="";

list.forEach(s=>{

container.innerHTML+=`

<div class="school-card">

<img src="${s.image}">

<div class="card-content">

<h3>${s.name}</h3>
<p>${s.county} • ${s.type}</p>

<button onclick="toggle(this)">More Info</button>

<div class="details">

<p>${s.description}</p>
<p>Pathway: ${s.pathway}</p>
<p>Minimum Score: ${s.minScore}</p>

<a href="${s.maps}" target="_blank">📍 Google Maps</a><br>
<a href="${s.website}" target="_blank">🌐 Official Website</a>

</div>

</div>

</div>

`;

});

}

function toggle(btn){
btn.nextElementSibling.classList.toggle("show");
}

function recommend(){

let score=document.getElementById("score").value;

let filtered=schools.filter(s=>score>=s.minScore);

displaySchools(filtered);
}
