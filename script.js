const servers=[
{name:"Game-Zone | Dust2 Arena",game:"CS2",ip:"185.12.44.21:27015",players:"28/32",ping:"32 ms"},
{name:"Game-Zone | Classic Romania",game:"CS 1.6",ip:"185.12.44.22:27015",players:"21/32",ping:"28 ms"},
{name:"Game-Zone | Romania RP",game:"GTA V",ip:"185.12.44.30:30120",players:"96/128",ping:"41 ms"},
{name:"Game-Zone | Ranked",game:"DOTA 2",ip:"185.12.44.40:27015",players:"10/10",ping:"36 ms"},
{name:"Game-Zone | Black Hawk",game:"Delta Force",ip:"185.12.44.50:27015",players:"42/64",ping:"45 ms"},
{name:"Game-Zone | Orion",game:"Metin2",ip:"185.12.44.60:13000",players:"318/500",ping:"39 ms"}];

function renderServers(){
 const q=document.getElementById('search').value.toLowerCase();
 const f=document.getElementById('gameFilter').value;
 const list=servers.filter(s=>(f==='all'||s.game===f)&&(`${s.name} ${s.game} ${s.ip}`).toLowerCase().includes(q));
 document.getElementById('serverCount').textContent=`● ${list.length} servere`;
 document.getElementById('serverList').innerHTML=list.map(s=>`<div class="server">
 <div><div class="server-name">${s.name}</div><div class="server-game">${s.game} • ONLINE</div></div>
 <div class="server-ip">${s.ip}</div><div class="players">👥 ${s.players}</div><div class="ping">📶 ${s.ping}</div>
 <button class="connect" onclick="connectServer('${s.ip}')">CONECTEAZĂ</button></div>`).join('')||'<div class="server">Nu am găsit servere.</div>';
}
function filterGame(game){document.getElementById('gameFilter').value=game;document.getElementById('servers').scrollIntoView();renderServers()}
function connectServer(ip){navigator.clipboard?.writeText(ip);alert(`IP copiat: ${ip}`)}
renderServers();