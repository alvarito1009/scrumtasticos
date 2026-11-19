import { playAdventure } from './walk.js';
export function start(container, callbacks) {
  playAdventure(container, callbacks, {
    hero: '👦', icon: '🎈', title: 'La fiesta sorpresa de Nico',
    sprite: 'nico',
    intro: 'Leo le pasó el tesoro a Nico. Para la Feria hay muchas ideas y poco tiempo. Nico sabe que no se puede hacer todo a la vez: hay que planear un Sprint.',
    stops: [
      { x: 6, y: 0, icon: '📋', name: 'La pizarra de pendientes', teach: 'Aquí está la lista de todo lo que queremos hacer. Se llama Product Backlog.', q: '¿Cómo se llama la lista de todo lo que queremos hacer?', opts: ['Product Backlog', 'Lista de dulces', 'Diploma'], ok: 0, hint: 'Empieza con Product.' },
      { x: 3, y: 4, icon: '⏱️', name: 'El reloj del Sprint', teach: 'Un Sprint es un tiempo corto, de un mes o menos, para terminar una parte del trabajo.', q: '¿Qué es un Sprint?', opts: ['Una carrera', 'Un tiempo corto para terminar una parte del trabajo', 'Un juego de pelota'], ok: 1, hint: 'Es un periodo de tiempo.' },
      { x: 6, y: 2, icon: '🎯', name: 'La meta del Sprint', teach: 'En la planeación (Sprint Planning) elegimos qué cabe en el Sprint, como Nico con su presupuesto: no se puede gastar más de lo que se tiene.', q: 'Hay 10 pendientes pero solo caben 3. ¿Qué hacemos?', opts: ['Elegimos 3 importantes que sí caben', 'Intentamos los 10 a la vez', 'No hacemos nada'], ok: 0, hint: 'Hay que elegir lo que sí cabe.' },
    ],
    learned: 'En el Sprint Planning el equipo elige del Product Backlog lo que cabe en el Sprint y fija una meta.',
    puente: 'El plan está listo. Emma anotó que cada día habrá que hablar con el equipo. Sigue con la Aventura 3.',
  });
}
