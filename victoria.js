import { playAdventure } from './walk.js';
export function start(container, callbacks) {
  playAdventure(container, callbacks, {
    hero: '👩‍🎨', icon: '🧵', title: 'El taller de moda de Victoria',
    sprite: 'victoria',
    scene: 'victoria',
    intro: 'El Sprint termina y Victoria tiene lista la ropa de los personajes de la feria. Ahora toca mostrar lo que se logró y escuchar opiniones.',
    stops: [
      { x: 6, y: 0, icon: '🧵', name: 'La pieza terminada', teach: 'Un Incremento es una parte del trabajo ya terminada y que se puede usar.', q: '¿Cuál es un Incremento?', opts: ['Un disfraz que ya está completo y se puede usar', 'Una idea que nadie ha hecho', 'Un disfraz a medio coser'], ok: 0, hint: 'Debe estar terminado y servir.' },
      { x: 3, y: 4, icon: '👗', name: 'La pasarela', teach: 'Al final del Sprint hacemos la Sprint Review: mostramos lo terminado.', q: '¿Qué hacemos en la Sprint Review?', opts: ['Dormir', 'Mostrar lo que terminamos', 'Esconder el trabajo'], ok: 1, hint: 'Review viene de revisar lo logrado.' },
      { x: 6, y: 2, icon: '👀', name: 'Las visitas', teach: 'Las personas interesadas dan su opinión y eso nos ayuda a mejorar.', q: 'Alguien da una idea para mejorar el disfraz. ¿Qué hacemos?', opts: ['Nos enojamos', 'La escuchamos y vemos si ayuda', 'Rompemos el disfraz'], ok: 1, hint: 'Las opiniones sirven para mejorar.' },
    ],
    learned: 'En la Sprint Review el equipo muestra el Incremento terminado y recibe opiniones.',
    puente: 'Victoria guardó las ideas. Bruno ayudará al equipo a mejorar. Sigue con la Aventura 5.',
  });
}
