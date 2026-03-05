function searchSchools(){

let marks=document.getElementById("marks").value;
let pathway=document.getElementById("pathway").value;
let type=document.getElementById("type").value;
let county=document.getElementById("county").value.toLowerCase();

let results=document.getElementById("results");

results.innerHTML="";

schools.forEach(function(s){

if(marks < s.marks) return;

if(pathway!="any" && pathway!=s.pathway) return;

if(type!="any" && type!=s.type) return;

if(county && county!=s.county.toLowerCase()) return;

results.innerHTML+=`

<div class="schoolCard">

<h3>${s.name}</h3>

<p>County: ${s.county}</p>

<p>Type: ${s.type}</p>

<p>Pathway: ${s.pathway}</p>

<p>Minimum Marks: ${s.marks}</p>

</div>

`;

});

}
