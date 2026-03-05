
let schools=[];

fetch("data/schools.json")
.then(res=>res.json())
.then(data=>{

schools=data;

populateCountyFilter();

displaySchools(schools);

});

function populateCountyFilter(){

const counties=[...new Set(schools.map(s=>s.county))];

const select=document.getElementById("countyFilter");

if(!select) return;

counties.forEach(c=>{

const option=document.createElement("option");

option.text=c;

select.add(option);

});

}

function displaySchools(list){

const container=document.getElementById("schoolList") || document.getElementById("results");

if(!container) return;

container.innerHTML="";

list.forEach(school=>{

container.innerHTML+=`

<div class="school-card">

<img src="${school.image}">

<div class="card-content">

<h3>${school.name}</h3>

<p>${school.county} • ${school.type}</p>

<button onclick="toggleDetails(this)">Details</button>

<div class="details">

<p>${school.description}</p>

<p>Recommended Marks: ${school.marks}</p>

<a href="${school.maps}" target="_blank">Google Maps</a><br>

<a href="${school.website}" target="_blank">School Website</a>

</div>

</div>

</div>

`;

});

}

function toggleDetails(btn){

const d=btn.nextElementSibling;

d.classList.toggle("show");

}

function recommendSchools(){

const marks=document.getElementById("marks").value;

const filtered=schools.filter(s=>marks>=s.marks);

displaySchools(filtered);

}

document.addEventListener("input",function(){

const search=document.getElementById("search");

const county=document.getElementById("countyFilter");

const type=document.getElementById("typeFilter");

if(!search) return;

let filtered=schools;

if(search.value)
filtered=filtered.filter(s=>s.name.toLowerCase().includes(search.value.toLowerCase()));

if(county && county.value)
filtered=filtered.filter(s=>s.county===county.value);

if(type && type.value)
filtered=filtered.filter(s=>s.type===type.value);

displaySchools(filtered);

});
