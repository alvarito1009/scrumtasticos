import { playAdventure } from './walk.js';
export function start(container, callbacks) {
  playAdventure(container, callbacks, {
    hero: '👧', icon: '📔', title: 'El diario secreto de Emma',
    sprite: 'emma',
    scene: 'emma',
    intro: 'El Sprint empezó. Emma escribe en su diario cómo se junta el equipo cada día, con respeto y escuchando a todos. A esa junta se le llama Daily Scrum.',
    stops: [
      { x: 6, y: 0, icon: '🌅', name: 'La mañana', teach: 'Cada día el equipo se junta unos 15 minutos para organizarse. Es la Daily Scrum.', q: '¿Cuánto dura la Daily Scrum?', opts: ['Una semana', 'Toda la tarde', '15 minutos'], ok: 2, hint: 'Es una junta cortita.' },
      { x: 3, y: 4, icon: '🗣️', name: 'Una compañera', teach: 'Me dijo: ayer terminé los carteles, hoy haré los juegos y me atora que no tengo pegamento.', q: 'Un compañero dice que está atorado. ¿Qué hacemos?', opts: ['Nos reímos', 'Lo ignoramos', 'Lo escuchamos y buscamos cómo ayudar'], ok: 2, hint: 'En el equipo nos cuidamos.' },
      { x: 6, y: 2, icon: '🧩', name: 'El obstáculo', teach: 'Los problemas se dicen pronto para resolverlos a tiempo.', q: '¿Por qué conviene decir pronto lo que nos atora?', opts: ['Para que el equipo ayude a tiempo', 'Para presumir', 'Para que nos regañen'], ok: 0, hint: 'Entre todos se resuelve más rápido.' },
    ],
    learned: 'En la Daily Scrum el equipo se junta cada día unos 15 minutos para organizar el día y avisar de los obstáculos.',
    puente: 'Pasaron los días y ya hay cosas listas. Victoria las mostrará. Sigue con la Aventura 4.',
  });
}
