// Motor común: el personaje camina con animación por un mundo; en cada parada se aprende un tema de Scrum.
// Controles: botones grandes (se pueden mantener pulsados), flechas/WASD, o tocar un lugar del mapa.
// cfg = { hero, icon, title, intro, stops:[{x,y,icon,name,teach,q,opts,ok,hint}], learned, puente }
export function playAdventure(box, cb, c) {
  if (!document.getElementById('juego-css')) {
    const l = document.createElement('link'); l.id = 'juego-css'; l.rel = 'stylesheet'; l.href = 'juego.css'; document.head.appendChild(l);
  }
  const W = 7, H = 5; let x = 0, y = 2, i = 0, talk = false, last = 0, walker = 0, hold = 0;
  const DECOR = [[1, 0, '🌳'], [4, 0, '🌳'], [2, 4, '🌷'], [5, 4, '🌳'], [4, 2, '🪨'], [1, 3, '🌼'], [5, 1, '🌷'], [0, 4, '🌳']];
  const DIRS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
  const pos = (a, b) => `left:${(a + .5) / W * 100}%;top:${(b + .5) / H * 100}%`;
  const clamp = (v, m) => Math.min(m - 1, Math.max(0, v));
  const key = e => { if (!box.isConnected) return stop(); const d = DIRS[e.key]; if (d) { e.preventDefault(); move(d[0], d[1]); } };
  const stop = () => { document.removeEventListener('keydown', key); clearInterval(walker); clearInterval(hold); };
  const exit = () => { stop(); cb.onExit(); };
  const $ = s => box.querySelector(s);

  function intro() {
    box.innerHTML = `<section class="panel"><h1>${c.icon} ${c.title}</h1><p>${c.intro}</p>
      <button class="btn" id="go">¡Empezar!</button> <button class="btn suave" id="out">Volver al menú</button></section>`;
    $('#go').onclick = scene; $('#out').onclick = exit;
  }
  function scene() {
    const s = c.stops[i]; talk = false; clearInterval(walker);
    box.innerHTML = `<section class="panel"><h1>${c.title}</h1>
      <p>Reto ${i + 1} de ${c.stops.length}: camina hasta ${s.icon} <strong>${s.name}</strong></p>
      <div class="mundo" role="img" aria-label="Mapa del juego. Toca un lugar para caminar hasta allí.">
        ${DECOR.map(([a, b, e]) => `<i class="deco" style="${pos(a, b)}">${e}</i>`).join('')}
        <div class="npc" style="${pos(s.x, s.y)}"><span class="rebota">${s.icon}</span><span class="burbuja">¡Ven!</span></div>
        <div class="heroe" style="${pos(x, y)}"><i><b>${c.hero}</b></i></div>
      </div>
      <div class="pad"><button class="u" data-d="0,-1" aria-label="Arriba">⬆️</button><button class="l" data-d="-1,0" aria-label="Izquierda">⬅️</button>
      <button class="dn" data-d="0,1" aria-label="Abajo">⬇️</button><button class="r" data-d="1,0" aria-label="Derecha">➡️</button></div>
      <p class="aviso">Mantén pulsado un botón, usa las flechas del teclado o toca el mapa.</p><div id="dlg" aria-live="polite"></div>
      <button class="btn suave" id="out">Volver al menú</button></section>`;
    box.querySelectorAll('.pad button').forEach(b => {
      const d = b.dataset.d.split(',').map(Number);
      b.onpointerdown = e => { e.preventDefault(); move(...d); clearInterval(hold); hold = setInterval(() => move(...d), 200); };
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => b.addEventListener(ev, () => clearInterval(hold)));
      b.onclick = e => { if (e.detail === 0) move(...d); };
    });
    $('.mundo').onclick = e => {
      const r = e.currentTarget.getBoundingClientRect();
      const tx = clamp(Math.floor((e.clientX - r.left) / r.width * W), W), ty = clamp(Math.floor((e.clientY - r.top) / r.height * H), H);
      clearInterval(walker);
      walker = setInterval(() => {
        if (talk || (x === tx && y === ty)) return clearInterval(walker);
        x !== tx ? move(x < tx ? 1 : -1, 0) : move(0, y < ty ? 1 : -1);
      }, 200);
    };
    $('#out').onclick = exit;
  }
  function move(dx, dy) {
    const now = Date.now(); if (talk || now - last < 150) return;
    const nx = clamp(x + dx, W), ny = clamp(y + dy, H); if (nx === x && ny === y) return;
    last = now; x = nx; y = ny;
    const h = $('.heroe'); h.style.left = pos(x, y).split(';')[0].slice(5); h.style.top = pos(x, y).split(';')[1].slice(4);
    if (dx) h.querySelector('i').style.transform = dx < 0 ? 'scaleX(-1)' : '';
    h.classList.add('camina'); setTimeout(() => h.classList.remove('camina'), 240);
    if (x === c.stops[i].x && y === c.stops[i].y) { talk = true; clearInterval(walker); clearInterval(hold); setTimeout(ask, 260); }
  }
  function party() {
    const m = $('.mundo'); $('.heroe').classList.add('salta');
    for (let k = 0; k < 14; k++) m.insertAdjacentHTML('beforeend', `<i class="conf" style="left:${Math.random() * 95}%;animation-delay:${Math.random() * .4}s">${['⭐', '🎉', '✨'][k % 3]}</i>`);
    setTimeout(() => m.querySelectorAll('.conf').forEach(n => n.remove()), 1800);
  }
  function ask() {
    const s = c.stops[i];
    $('#dlg').innerHTML = `<div class="dialogo"><p><strong>${s.icon} ${s.name}:</strong> ${s.teach}</p><p><strong>${s.q}</strong></p>
      ${s.opts.map((o, k) => `<button class="btn suave" data-k="${k}">${o}</button>`).join('')}<p id="fb" role="status"></p></div>`;
    $('#dlg').querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (+b.dataset.k !== s.ok) { $('#fb').textContent = '🤔 Casi. Pista: ' + s.hint; return; }
      party(); $('#fb').innerHTML = '✅ ¡Correcto! <button class="btn" id="next">Seguir</button>';
      $('#next').onclick = () => { i++; i < c.stops.length ? scene() : finish(); };
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
