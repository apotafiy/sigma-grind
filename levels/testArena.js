function testArena(gameEngine) {
    gameEngine.addEntity(new Player(gameEngine, 1, 5));

    // High up
    // Make sure to spawn sigma on or near the ground for this coords
    gameEngine.addEntity(new Sigma(gameEngine, 10, 4));

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
