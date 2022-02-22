function loadLevelOne(gameEngine) {
    let gravity = 0.2;
    gameEngine.addEntity(new Player(gameEngine, 0, -29));

    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -32, 32, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -29, 3, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -6, 2, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -2, 32, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 4, -3, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 8, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 10, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 12, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 14, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 15, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 16, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 17, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 19, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 21, -4, false, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 23, -4, false, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 24, -3, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 29, -29, 3, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 30, -6, 2, 1, 1, 0, 0));
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });
    gameEngine.addEntity(new Water(gameEngine));
}
