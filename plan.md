# Plan: mundos caminables para Aventuras entre páginas

## Objetivo
Reemplazar la sensación de tablero cuadriculado por escenas 2D caminables donde el personaje se desplace de forma continua, el usuario pueda señalar un destino con el ratón o tocarlo, y las paradas pedagógicas sigan activando sus preguntas al llegar.

## Enfoque de implementación
- Mantener la arquitectura estática HTML/CSS/ES Modules y la API pública `playAdventure` usada por las cinco aventuras.
- Cambiar el motor de movimiento de coordenadas enteras a coordenadas normalizadas continuas (`0..100`), con interpolación suave hacia el destino.
- Dibujar un escenario sin celdas visibles: sendero curvo, zonas de agua, árboles, arbustos, señales y puntos de interés posicionados libremente.
- Mostrar un indicador de destino y una sombra/profundidad del personaje; alternar una animación de pasos mientras el personaje está en movimiento.
- Conservar accesibilidad y controles: teclado (flechas/WASD), pad táctil, clic/toque en el mapa, botón para salir y reducción de movimiento.
- Mantener el contenido educativo, progreso y navegación existentes sin backend ni dependencias.

## Estructura
- `walk.js`: motor de escena, interacción, movimiento continuo y llegada a paradas.
- `juego.css`: composición visual del mundo, personaje, landmarks, camino y animaciones.
- `plan.md`: decisiones de diseño e implementación.
- `TODO.md`: resultados y criterios verificables.
- `public/manus-routes.json`: manifest de rutas hash principales para el entorno web.

## Diseño

### Opciones consideradas
- **Aventura de cuento ilustrado** (0.06): colores suaves, camino de papel y señales grandes.
- **Parque de exploración** (0.04): pradera luminosa, agua, bosque y pequeños hitos.
- **Mapa de pergamino** (0.08): textura cálida, brújula y estética de misión.

### Dirección elegida: Parque de exploración
- **Movimiento**: escena abierta, con el recorrido leído como una pequeña expedición, no como tablero.
- **Principios**: orientación inmediata, descubrimiento, legibilidad infantil y respuesta táctil clara.
- **Color**: verdes y azules para dar sensación de exterior; amarillo para objetivos y llamadas de atención.
- **Composición**: el mundo ocupa el centro, con controles debajo y el reto arriba; los elementos decorativos se colocan en capas y profundidad.
- **Firma visual**: camino serpenteante, marcador de destino pulsante y rótulos tipo señal de parque.
- **Interacción**: señalar un sitio equivale a decir “vamos allí”; al llegar, aparece el diálogo y la escena celebra con confeti.
- **Animación**: pasos alternos, rebote suave de los NPC, agua ondulante y transiciones de llegada cortas.
- **Tipografía**: se conservan Baloo 2 para títulos y Nunito para instrucciones, para respetar la identidad existente.
- **Voz**: instrucciones cortas y activas: “Señala un lugar para caminar” y “¡Llegaste!”.
- **Esencia**: una aventura educativa que se siente como explorar un lugar, no resolver una cuadrícula.
