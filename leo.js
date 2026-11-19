import { playAdventure } from './walk.js';
export function start(container, callbacks) {
  playAdventure(container, callbacks, {
    hero: '🧒', icon: '🗝️', title: 'Leo y el tesoro perdido',
    sprite: 'leo',
    scene: 'leo',
    intro: 'Leo y sus amigos formaron el Equipo Aventurero para organizar la Feria de la Lectura. Pero un mapa dice que el tesoro del equipo está con tres ayudantes. ¡Búscalos! Así conocerás los tres roles de Scrum.',
    stops: [
      { x: 6, y: 0, icon: '🧑‍🎨', name: 'La Product Owner', teach: 'Yo decido qué cosas de la feria son más importantes. Mi lista se llama Product Backlog.', q: '¿Quién decide qué es lo más importante hacer?', opts: ['El que grita más fuerte', 'La Product Owner', 'Nadie'], ok: 1, hint: 'Es quien cuida la lista de lo más valioso.' },
      { x: 3, y: 4, icon: '🧙', name: 'El Scrum Master', teach: 'Yo ayudo al equipo a trabajar bien con Scrum y quito los obstáculos del camino.', q: 'Si el equipo se atora, ¿quién ayuda a quitar el obstáculo?', opts: ['El Scrum Master', 'Un extraño', 'Nadie, que se esperen'], ok: 0, hint: 'Su trabajo es ayudar al equipo.' },
      { x: 6, y: 2, icon: '🛠️', name: 'Los Developers', teach: 'Somos quienes construimos la feria: carteles, juegos y mucho más.', q: '¿Quiénes construyen lo que el equipo va a entregar?', opts: ['Los visitantes', 'Los Developers', 'El Product Owner solito'], ok: 1, hint: 'Son quienes hacen el trabajo.' },
    ],
    learned: 'Scrum tiene tres roles: la Product Owner (qué hacer), el Scrum Master (ayudar al equipo) y los Developers (construir).',
    puente: 'Con el tesoro, Leo se lo da a Nico: ¡ahora hay que planear el trabajo! Sigue con la Aventura 2.',
  });
}
