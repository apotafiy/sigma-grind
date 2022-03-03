function sigmaArena(gameEngine) {
    let gravity = 0.2;
    gameEngine.addEntity(new Player(gameEngine, 1, -20));

    // Make sure to spawn sigma on or near the ground for this coords
    gameEngine.addEntity(new Sigma(gameEngine, 36, -21));

    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -48, 48, 14, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -34, 24, 14, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -18, 48, 18, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -34, 8, 16, 1, 0, 0));
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });
    gameEngine.addEntity(new Water(gameEngine));
}
