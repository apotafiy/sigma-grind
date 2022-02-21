function loadTestLevel(gameEngine) {
  let gravity = 0.2;
  gameEngine.addEntity(new Player(gameEngine, 0, -29));
  gameEngine.addEntity(new Ground(gameEngine, 1, 0, -32, 32, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 0, -27, 2, 27, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 2, -27, 1, 25, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 2, -2, 30, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 3, -3, 27, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 6, -30, 1, 15, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -30, 1, 14, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -16, 1, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 9, -12, 1, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 11, -14, 1, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 12, -26, 1, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 16, -26, 1, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 23, -22, 1, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 25, -5, 1, 1, 0));
  gameEngine.addEntity(new Drill(gameEngine, 27, -5, 8));
  gameEngine.addEntity(new Drill(gameEngine, 27, -4, 8));
  gameEngine.addEntity(new Drill(gameEngine, 28, -5, 8));
  gameEngine.addEntity(new Drill(gameEngine, 28, -4, 8));
  gameEngine.addEntity(new Spike(gameEngine, 29, -7, 1, 4, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 30, -27, 2, 25, 1, 0, 0));
  gameEngine.entities.forEach(function (entity) {
      if (entity instanceof Ground) entity.checkForGrass();
  });
  gameEngine.addEntity(new Water(gameEngine));
}