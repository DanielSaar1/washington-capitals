
// Muokkaa nimiä, numeroita ja kenttiä tästä.
const forwards=[
[{n:8,name:'Alex Ovechkin',role:'Vasen laitahyökkääjä'},{n:17,name:'Dylan Strome',role:'Keskushyökkääjä'},{n:43,name:'Tom Wilson',role:'Oikea laitahyökkääjä'}],
[{n:24,name:'Connor McMichael',role:'Vasen laitahyökkääjä'},{n:80,name:'Pierre-Luc Dubois',role:'Keskushyökkääjä'},{n:88,name:'Andrew Mangiapane',role:'Oikea laitahyökkääjä'}],
[{n:21,name:'Aliaksei Protas',role:'Vasen laitahyökkääjä'},{n:26,name:'Nic Dowd',role:'Keskushyökkääjä'},{n:29,name:'Hendrix Lapierre',role:'Oikea laitahyökkääjä'}],
[{n:15,name:'Jakub Vrána',role:'Vasen laitahyökkääjä'},{n:20,name:'Lars Eller',role:'Keskushyökkääjä'},{n:47,name:'Brandon Duhaime',role:'Oikea laitahyökkääjä'}]
];
const defense=[
[{n:42,name:'Martin Fehérváry'},{n:74,name:'John Carlson'}],
[{n:6,name:'Jakob Chychrun'},{n:57,name:'Trevor van Riemsdyk'}],
[{n:38,name:'Rasmus Sandin'},{n:3,name:'Matt Roy'}]
];
const goalies=[[{n:79,name:'Charlie Lindgren'},{n:48,name:'Logan Thompson'}]];
function render(id,groups,label){document.getElementById(id).innerHTML=groups.map((group,i)=>`<article class="line"><h3>${label(i)}</h3><div class="players ${group.length===2?'two':''}">${group.map(p=>`<div class="player"><span class="number">${p.n}</span><span class="name">${p.name}</span>${p.role?`<span class="role">${p.role}</span>`:''}</div>`).join('')}</div></article>`).join('')}
render('forwards',forwards,i=>`${i+1}. kenttä`);render('defense',defense,i=>`${i+1}. puolustajapari`);render('goalies',goalies,i=>'Maalivahdit');


// Haetaan oikeat tilastot NHL:n API:sta.
const seasonSelect = document.getElementById('season');
const statusText = document.getElementById('api-status');
const skaterTable = document.getElementById('skater-stats');
const goalieTable = document.getElementById('goalie-stats');

function playerName(player) {
  return [player.firstName?.default || '', player.lastName?.default || ''].join(' ').trim();
}
function cell(row, value) {
  const td = document.createElement('td');
  td.textContent = value ?? '–';
  row.appendChild(td);
}
function fillTable(target, players, keys) {
  target.replaceChildren();
  players.forEach(player => {
    const row = document.createElement('tr');
    cell(row, playerName(player));
    keys.forEach(key => cell(row, player[key]));
    target.appendChild(row);
  });
}
async function loadStats() {
  const season = seasonSelect.value;
  statusText.textContent = 'Haetaan NHL-tilastoja…';
  skaterTable.replaceChildren();
  goalieTable.replaceChildren();
  try {
    const url = `https://api-web.nhle.com/v1/club-stats/WSH/${season}/2`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    const skaters = data.skaters || [];
    const goalies = data.goalies || [];
    fillTable(skaterTable, skaters, ['gamesPlayed','goals','assists','points','penaltyMinutes','plusMinus']);
    fillTable(goalieTable, goalies, ['gamesPlayed','wins','goalsAgainstAverage','savePercentage','shutouts']);
    statusText.textContent = `Kausi ${season.slice(0,4)}–${season.slice(4)}: ${skaters.length} kenttäpelaajaa ja ${goalies.length} maalivahtia.`;
  } catch (error) {
    statusText.textContent = 'Tilastoja ei saatu ladattua. Tarkista internetyhteys tai kokeile myöhemmin.';
    console.error('NHL API:', error);
  }
}
seasonSelect.addEventListener('change', loadStats);
loadStats();
