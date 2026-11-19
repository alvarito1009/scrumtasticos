import { playAdventure } from './walk.js';
export function start(container, callbacks) {
  playAdventure(container, callbacks, {
    hero: '🤺', icon: '🛡️', title: 'Las aventuras del caballero Bruno',
    sprite: 'bruno',
    intro: 'El caballero Bruno cuenta que el Sprint terminó, pero el equipo aún no se va a casa. Falta una última reunión para ser un mejor equipo: la Retrospectiva.',
    stops: [
      { x: 6, y: 0, icon: '🌟', name: 'Lo que salió bien', teach: 'En la Retrospectiva primero celebramos lo que salió bien.', q: '¿Qué comentamos primero en la Retrospectiva?', opts: ['Solo errores', 'Lo que salió bien', 'Nada'], ok: 1, hint: 'Se empieza con lo positivo.' },
      { x: 3, y: 4, icon: '🔧', name: 'Lo que mejorar', teach: 'Después buscamos qué podemos hacer mejor, sin culpar a nadie.', q: 'Algo salió mal. ¿Qué hacemos?', opts: ['Buscamos cómo mejorar juntos', 'Culpamos a alguien', 'Lo escondemos'], ok: 0, hint: 'El equipo mejora trabajando junto.' },
      { x: 6, y: 2, icon: '📜', name: 'El acuerdo', teach: 'Elegimos una mejora para probar en el siguiente Sprint.', q: '¿Para qué sirve la Retrospectiva?', opts: ['Para castigar', 'Para olvidar el Sprint', 'Para que el equipo mejore en el siguiente Sprint'], ok: 2, hint: 'Retro mira atrás para mejorar adelante.' },
    ],
    learned: 'En la Sprint Retrospective el equipo revisa cómo trabajó y elige mejoras para el siguiente Sprint.',
    puente: 'La Feria de la Lectura fue un éxito y el Equipo Aventurero ya sabe Scrum. ¡Reclama tu diploma!',
  });
}
