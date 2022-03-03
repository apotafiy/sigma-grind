// function loadTestLevel(gameEngine) {
//     let gravity = 0.2;
//     gameEngine.addEntity(new Player(gameEngine, 21, -19));
//     gameEngine.addEntity(new Ground(gameEngine, 1, 0, -30, 30, 2, 1, 0, 0));
//     gameEngine.addEntity(new Ground(gameEngine, 1, 0, -28, 3, 1, 1, 0, 0));
//     gameEngine.addEntity(new Ground(gameEngine, 1, 0, -27, 2, 27, 1, 0, 0));
//     gameEngine.addEntity(new Ground(gameEngine, 1, 2, -9, 28, 9, 1, 0, 0));
//     gameEngine.addEntity(new SpikeBall(gameEngine, 6, -18, gravity));
//     gameEngine.addEntity(new SpikeBall(gameEngine, 9, -18, gravity));
//     gameEngine.addEntity(new SpikeBall(gameEngine, 12, -18, gravity));
//     gameEngine.addEntity(new Ground(gameEngine, 1, 18, -16, 12, 7, 1, 0, 0));
//     gameEngine.addEntity(new Ground(gameEngine, 1, 28, -28, 2, 12, 1, 0, 0));
//     gameEngine.entities.forEach(function (entity) {
//       if (entity instanceof Ground) entity.checkForGrass();
//     });
//     gameEngine.addEntity(new Water(gameEngine));
//   }
  