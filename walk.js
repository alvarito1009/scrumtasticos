// Motor común: camina con flechas/WASD o botones grandes hasta 3 paradas; en cada una aprendes un tema de Scrum.
// cfg = { hero, icon, title, intro, stops:[{x,y,icon,name,teach,q,opts,ok,hint}], learned, puente }
export function playAdventure(box, cb, c) {
  if (!document.getElementById('juego-css')) {
    const l = document.createElement('link'); l.id = 'juego-css'; l.rel = 'stylesheet'; l.href = 'juego.css'; document.head.appendChild(l);
  }
  const W = 7, H = 5; let x = 0, y = 2, i = 0, talk = false;
  const DIRS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
  const key = e => { if (!box.isConnected) return stop(); const d = DIRS[e.key]; if (d) { e.preventDefault(); move(d[0], d[1]); } };
  const stop = () => document.removeEventListener('keydown', key);
  const exit = () => { stop(); cb.onExit(); };
  const $ = s => box.querySelector(s);

  function intro() {
    box.innerHTML = `<section class="panel"><h1>${c.icon} ${c.title}</h1><p>${c.intro}</p>
      <button class="btn" id="go">¡Empezar!</button> <button class="btn suave" id="out">Volver al menú</button></section>`;
    $('#go').onclick = scene; $('#out').onclick = exit;
  }
  function scene() {
    const s = c.stops[i];
    box.innerHTML = `<section class="panel"><h1>${c.title}</h1>
      <p>Reto ${i + 1} de ${c.stops.length}: camina hasta ${s.icon} <strong>${s.name}</strong></p>
      <div class="mapa" role="img" aria-label="Mapa del juego"></div>
      <div class="pad"><button class="u" data-d="0,-1" aria-label="Arriba">⬆️</button><button class="l" data-d="-1,0" aria-label="Izquierda">⬅️</button>
      <button class="dn" data-d="0,1" aria-label="Abajo">⬇️</button><button class="r" data-d="1,0" aria-label="Derecha">➡️</button></div>
      <p class="aviso">También puedes usar las flechas del teclado.</p><div id="dlg" aria-live="polite"></div>
      <button class="btn suave" id="out">Volver al menú</button></section>`;
    box.querySelectorAll('.pad button').forEach(b => b.onclick = () => move(...b.dataset.d.split(',').map(Number)));
    $('#out').onclick = exit; draw();
  }
  function draw() {
    const s = c.stops[i]; let h = '';
    for (let r = 0; r < H; r++) for (let q = 0; q < W; q++) h += `<span>${q === x && r === y ? c.hero : q === s.x && r === s.y ? s.icon : ''}</span>`;
    $('.mapa').innerHTML = h;
  }
  function move(dx, dy) {
    if (talk) return;
    x = Math.min(W - 1, Math.max(0, x + dx)); y = Math.min(H - 1, Math.max(0, y + dy)); draw();
    if (x === c.stops[i].x && y === c.stops[i].y) ask();
  }
  function ask() {
    const s = c.stops[i]; talk = true;
    $('#dlg').innerHTML = `<div class="dialogo"><p><strong>${s.icon} ${s.name}:</strong> ${s.teach}</p><p><strong>${s.q}</strong></p>
      ${s.opts.map((o, k) => `<button class="btn suave" data-k="${k}">${o}</button>`).join('')}<p id="fb" role="status"></p></div>`;
    $('#dlg').querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (+b.dataset.k !== s.ok) { $('#fb').textContent = '🤔 Casi. Pista: ' + s.hint; return; }
      $('#fb').innerHTML = '✅ ¡Correcto! <button class="btn" id="next">Seguir</button>';
      $('#next').onclick = () => { talk = false; i++; i < c.stops.length ? scene() : finish(); };
    });
  }
  function finish() {
    stop();
    box.innerHTML = `<section class="panel"><h1>¡Lo lograste!</h1><p>⭐ <strong>Aprendiste:</strong> ${c.learned}</p><p>📖 ${c.puente}</p>
      <button class="btn" id="fin">Ganar mi estrella</button></section>`;
    $('#fin').onclick = cb.onComplete;
  }
  document.addEventListener('keydown', key); intro();
}
