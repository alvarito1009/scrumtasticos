// Motor común: el personaje explora una escena abierta y aprende en cada parada.
// Las posiciones de las paradas siguen usando x/y de 0..6 y 0..4 para que
// los módulos de las aventuras no tengan que cambiar; aquí se convierten a %.
export function playAdventure(box, cb, c) {
  if (!document.getElementById('juego-css')) {
    const l = document.createElement('link');
    l.id = 'juego-css'; l.rel = 'stylesheet'; l.href = 'juego.css';
    document.head.appendChild(l);
  }

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const gridToWorld = (gx, gy) => ({ x: 11 + (gx / 6) * 78, y: 14 + (gy / 4) * 72 });
  const pos = p => `left:${p.x}%;top:${p.y}%`;
  const DECOR = [
    ['🌲', 8, 18, 'árbol grande'], ['🌳', 25, 78, 'árbol'], ['🌲', 45, 14, 'árbol'],
    ['🌳', 84, 24, 'árbol'], ['🌴', 91, 78, 'palmera'], ['🌷', 17, 65, 'flores'],
    ['🌼', 72, 83, 'flores'], ['🪨', 52, 75, 'piedra'], ['🪵', 78, 56, 'tronco'],
  ];
  const DIRS = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
  let hero = { x: 10, y: 50 }, destination = null, i = 0, talk = false;
  let raf = 0, hold = 0, lastStep = 0;

  const $ = selector => box.querySelector(selector);
  const stop = () => {
    document.removeEventListener('keydown', key);
    cancelAnimationFrame(raf);
    clearInterval(hold);
  };
  const exit = () => { stop(); cb.onExit(); };

  function intro() {
    box.innerHTML = `<section class="panel"><h1>${c.icon} ${c.title}</h1><p>${c.intro}</p>
      <button class="btn" id="go">¡Explorar!</button> <button class="btn suave" id="out">Volver al menú</button></section>`;
    $('#go').onclick = scene; $('#out').onclick = exit;
  }

  function scene() {
    const s = c.stops[i];
    talk = false; destination = null;
    const target = gridToWorld(s.x, s.y);
    box.innerHTML = `<section class="panel aventura-panel"><h1>${c.title}</h1>
      <p class="reto"><span class="chip">Reto ${i + 1} de ${c.stops.length}</span> Señala el mapa: llega hasta <strong>${s.icon} ${s.name}</strong>.</p>
      <div class="mundo" style="--scene:url('./assets/scene-${c.scene}.png')" role="application" aria-label="Escena explorable. Toca o haz clic en un lugar para caminar hasta allí.">
        <div class="brillo"></div><div class="agua"><span>≈</span><span>≈</span><span>≈</span></div><div class="sendero"></div>
        ${DECOR.map(([emoji, x, y, label]) => `<i class="deco" style="left:${x}%;top:${y}%" aria-label="${label}">${emoji}</i>`).join('')}
        <div class="cartel" style="left:${target.x}%;top:${target.y - 10}%">${s.icon}<span>${s.name}</span></div>
        <div class="npc" style="${pos(target)}"><span class="rebota">${s.icon}</span><span class="burbuja">¡Ven!</span></div>
        <div class="destino oculto" aria-hidden="true"><span></span></div>
        <div class="heroe" style="${pos(hero)};--sprite:url('./assets/${c.sprite}-walk.png')" aria-label="${c.title}"><i aria-hidden="true"></i></div>
      </div>
      <div class="pad" aria-label="Controles de movimiento"><button class="u" data-d="0,-1" aria-label="Arriba">⬆️</button><button class="l" data-d="-1,0" aria-label="Izquierda">⬅️</button>
      <button class="dn" data-d="0,1" aria-label="Abajo">⬇️</button><button class="r" data-d="1,0" aria-label="Derecha">➡️</button></div>
      <p class="aviso">Haz clic o toca para caminar. También puedes usar las flechas o WASD.</p><div id="dlg" aria-live="polite"></div>
      <button class="btn suave" id="out">Volver al menú</button></section>`;

    box.querySelectorAll('.pad button').forEach(button => {
      const [dx, dy] = button.dataset.d.split(',').map(Number);
      const start = event => { event.preventDefault(); walkBy(dx, dy); clearInterval(hold); hold = setInterval(() => walkBy(dx, dy), 110); };
      button.addEventListener('pointerdown', start);
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(type => button.addEventListener(type, () => clearInterval(hold)));
      button.addEventListener('click', event => { if (event.detail === 0) walkBy(dx, dy); });
    });
    $('.mundo').addEventListener('pointerdown', event => {
      if (event.target.closest('.pad') || talk) return;
      const rect = event.currentTarget.getBoundingClientRect();
      setDestination(
        clamp((event.clientX - rect.left) / rect.width * 100, 5, 95),
        clamp((event.clientY - rect.top) / rect.height * 100, 8, 92),
      );
    });
    $('#out').onclick = exit;
    document.addEventListener('keydown', key);
    raf = requestAnimationFrame(tick);
  }

  function key(event) {
    if (!box.isConnected || talk) return stop();
    const direction = DIRS[event.key];
    if (direction) { event.preventDefault(); walkBy(...direction); }
  }

  function walkBy(dx, dy) {
    if (talk) return;
    const distance = Math.hypot(dx, dy) || 1;
    setDestination(
      clamp(hero.x + (dx / distance) * 10, 5, 95),
      clamp(hero.y + (dy / distance) * 10, 8, 92),
    );
  }

  function setDestination(x, y) {
    destination = { x, y };
    const marker = $('.destino');
    if (!marker) return;
    marker.style.left = `${x}%`; marker.style.top = `${y}%`;
    marker.classList.remove('oculto');
  }

  function tick(time) {
    if (!box.isConnected || talk) return;
    if (destination) {
      const dx = destination.x - hero.x, dy = destination.y - hero.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 1.1) {
        hero = { ...destination }; destination = null;
        $('.destino')?.classList.add('oculto');
        checkArrival();
      } else {
        const step = Math.min(distance, (time - lastStep || 16) * 0.045);
        hero.x += dx / distance * step; hero.y += dy / distance * step;
        updateHero(Math.atan2(dy, dx));
        lastStep = time;
      }
    }
    raf = requestAnimationFrame(tick);
  }

  function updateHero(angle = 0) {
    const element = $('.heroe');
    if (!element) return;
    element.style.left = `${hero.x}%`; element.style.top = `${hero.y}%`;
    element.classList.add('camina');
    element.querySelector('i').style.transform = angle < -1.57 || angle > 1.57 ? 'scaleX(-1)' : '';
    clearTimeout(updateHero.timer);
    updateHero.timer = setTimeout(() => element.classList.remove('camina'), 180);
  }

  function checkArrival() {
    const target = gridToWorld(c.stops[i].x, c.stops[i].y);
    if (Math.hypot(hero.x - target.x, hero.y - target.y) < 5) {
      talk = true;
      setTimeout(ask, 260);
    }
  }

  function party() {
    const world = $('.mundo'); $('.heroe')?.classList.add('salta');
    for (let k = 0; k < 14; k++) world.insertAdjacentHTML('beforeend', `<i class="conf" style="left:${8 + Math.random() * 84}%;animation-delay:${Math.random() * .4}s">${['⭐', '🎉', '✨'][k % 3]}</i>`);
    setTimeout(() => world.querySelectorAll('.conf').forEach(node => node.remove()), 1800);
  }

  function ask() {
    const s = c.stops[i];
    $('#dlg').innerHTML = `<div class="dialogo"><p><strong>${s.icon} ${s.name}:</strong> ${s.teach}</p><p><strong>${s.q}</strong></p>
      ${s.opts.map((o, k) => `<button class="btn suave" data-k="${k}">${o}</button>`).join('')}<p id="fb" role="status"></p></div>`;
    $('#dlg').querySelectorAll('[data-k]').forEach(button => button.onclick = () => {
      if (+button.dataset.k !== s.ok) { $('#fb').textContent = '🤔 Casi. Pista: ' + s.hint; return; }
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

  document.addEventListener('keydown', key);
  intro();
}
