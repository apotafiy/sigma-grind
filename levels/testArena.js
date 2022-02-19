function testArena(gameEngine) {
    let gravity = 0.2;
    gameEngine.addEntity(new Player(gameEngine, 1, 3));

    // High up
    gameEngine.addEntity(new Sigma(gameEngine, 10, -3));

    // Side walls
    gameEngine.addEntity(new Ground(gameEngine, 1, -5, -16, 6, 30, 1, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 16, -16, 6, 30, 1, 0, 1));

    //start ground
    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 15, 10, 1, 0, 1));

    // ceiling
    gameEngine.addEntity(new Ground(gameEngine, 1, 1, -16, 15, 10, 1, 0, 1));

    //Grass Check
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });

    gameEngine.addEntity(new Water(gameEngine));
}
