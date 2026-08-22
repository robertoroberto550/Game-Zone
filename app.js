const games = [
 {name:'Counter-Strike 2',cat:'FPS',dev:'Valve',votes:3240,desc:'Tactical shooter competitiv și unul dintre cele mai populare jocuri esports.'},
 {name:'League of Legends',cat:'MOBA',dev:'Riot Games',votes:2985,desc:'MOBA competitiv cu echipe de 5 jucători și o scenă esports uriașă.'},
 {name:'GTA V Online',cat:'Open World',dev:'Rockstar Games',votes:2740,desc:'Open world online cu misiuni, curse, heist-uri și comunități roleplay.'},
 {name:'Dota 2',cat:'MOBA',dev:'Valve',votes:2515,desc:'MOBA strategic cu eroi, skill-uri complexe și meciuri competitive.'},
 {name:'Valorant',cat:'FPS',dev:'Riot Games',votes:2380,desc:'Shooter tactic 5v5 cu agenți și abilități speciale.'},
 {name:'Fortnite',cat:'Battle Royale',dev:'Epic Games',votes:2205,desc:'Battle Royale, moduri creative și evenimente live.'},
 {name:'Minecraft',cat:'Sandbox',dev:'Mojang',votes:2110,desc:'Sandbox online cu survival, creative și mii de servere comunitare.'},
 {name:'Metin2',cat:'MMORPG',dev:'Gameforge',votes:1900,desc:'MMORPG clasic cu PvP, bresle, iteme și servere private sau oficiale.'},
 {name:'Delta Force',cat:'FPS',dev:'Team Jade',votes:1750,desc:'Shooter tactic modern cu lupte pe hărți mari și moduri competitive.'},
 {name:'Counter-Strike 1.6',cat:'FPS',dev:'Valve',votes:1680,desc:'Clasicul FPS care a definit gamingul competitiv pe PC.'},
 {name:'PUBG: Battlegrounds',cat:'Battle Royale',dev:'Krafton',votes:1510,desc:'Battle Royale realist cu strategie, loot și lupte intense.'},
 {name:'Apex Legends',cat:'Battle Royale',dev:'Respawn',votes:1395,desc:'Battle Royale rapid cu legende, abilități și mișcare fluidă.'}
];

const categories = [
 ['FPS','Shootere competitive și tactice'],['MMORPG','Lumi persistente și progres online'],['MOBA','Lupte 5v5 și strategie'],['Battle Royale','Supraviețuire până la ultimul'],['Open World','Explorare și libertate'],['Sandbox','Construiește și creează'],['Racing','Curse și motorsport'],['Survival','Resurse, crafting și supraviețuire']
];

let activeCategory = 'Toate';
const grid = document.getElementById('gameGrid');
const search = document.getElementById('searchInput');

function renderGames(){
 const term = search.value.toLowerCase();
 const filtered = games.filter(g => (activeCategory==='Toate'||g.cat===activeCategory) && g.name.toLowerCase().includes(term));
 grid.innerHTML = filtered.map(g=>{
  const rank = [...games].sort((a,b)=>b.votes-a.votes).findIndex(x=>x.name===g.name)+1;
  return `<article class="game-card">
   <div class="game-top"><span class="rank">#${rank}</span><small>${g.dev}</small></div>
   <h3>${g.name}</h3><p>${g.desc}</p>
   <div class="tags"><span class="tag">${g.cat}</span><span class="tag">ONLINE</span></div>
   <div class="vote-row"><strong>👍 <span id="v-${rank}">${g.votes.toLocaleString('ro-RO')}</span></strong><button class="vote-btn" onclick="vote('${g.name}')">Votează</button></div>
  </article>`
 }).join('') || '<p>Nu am găsit niciun joc.</p>';
}

function renderCategories(){
 const el = document.getElementById('categoryGrid');
 el.innerHTML = categories.map(([name,desc])=>`<div class="category-card" onclick="filterCategory('${name}')"><strong>${name}</strong><span>${desc}</span></div>`).join('');
}

function filterCategory(cat){activeCategory=cat;renderGames();document.getElementById('top').scrollIntoView({behavior:'smooth'})}
function vote(name){const g=games.find(x=>x.name===name);g.votes++;renderGames();showToast('Vot înregistrat pentru '+name)}
function copyIP(ip){navigator.clipboard?.writeText(ip);showToast('Adresă copiată: '+ip)}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
search.addEventListener('input',renderGames);

const modal=document.getElementById('loginModal');
document.getElementById('loginBtn').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')};
document.getElementById('closeModal').onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
document.getElementById('demoLogin').onclick=()=>showToast('Conectarea reală va fi activată cu baza de date.');
modal.addEventListener('click',e=>{if(e.target===modal) modal.classList.remove('open')});

renderCategories();renderGames();
