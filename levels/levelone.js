function loadLevelOne(gameEngine){
    let gravity = 0.2;
    gameEngine.addEntity(new Player(gameEngine, 200, 0, gravity));
    // gameEngine.addEntity(new Player(gameEngine, 200, 0, gravity));
    //add camera
    gameEngine.addEntity(new SceneManager(gameEngine));
    //back wall
    // gameEngine.addEntity(new Ground(gameEngine, 1, -9,-10, 10, 25, 1, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 8, 15, 4, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 5, 8, 45, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 50, 2, 10, 16, 1, 0, 1));
    //RIGHT WALL!
    gameEngine.addEntity(new Ground(gameEngine, 1, 60, -20, 10, 40, 1, 0, 0));
    //PLATFORMS
    gameEngine.addEntity(new Ground(gameEngine, 1, 50, -15, 5, 8, 1, 0, 0));
    // LVL 1 TUNNEL ADD SPIKES
    //tunnel top
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -35, 5, 20, 1, 0, 0));
    //TUNNEL BOTTOM
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -11, 5, 5, 1, 0, 0));
    //expand into tunnel going left 
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -10, 25, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 15, -30, 25, 13, 1, 0, 0));
    //dash wall jump tutorial
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -40, 9, 36, 1, 0, 0));
        //nubs on wall to force dash
        gameEngine.addEntity(new Ground(gameEngine, 1, 13, -25, 2, 1, 1, 0, 0));
        gameEngine.addEntity(new Ground(gameEngine, 1, 9, -21, 2, 1, 1, 0, 0));
    //top of wall dash tutorial tunnel
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -40, 10, 4, 1, 0, 0));
      //close gap this is just so i can get in lol^
    gameEngine.addEntity(new Ground(gameEngine, 1, 23, -40, 10, 4, 1, 0, 0));

    //well for enemies 
    gameEngine.addEntity(new Ground(gameEngine, 1, 15, -31, 3, 1, 1, 0, 0));
        //enemies for player to Kill
        gameEngine.addEntity(new Mettaur(gameEngine, 17,-31, gravity));
        gameEngine.addEntity(new Mettaur(gameEngine, 19,-31, gravity));
        gameEngine.addEntity(new Mettaur(gameEngine, 21,-31, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 1, 37, -32, 3, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 34, -31, 3, 2, 1, 0, 0));
    
    
  


    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 15, 1, 1, 0, 1));

    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 6, 8, 1, 1, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 3, 5, 2, 1, 1, 0, 0));

    

    //add platforms for the player to jump on
    gameEngine.addEntity(new Ground(gameEngine, 1, 20, 5, 14, 1, 1, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 24, 3, 5, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 32, 2, 2, 1, 1, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 36, 2, 2, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, 1, 2, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 44, 1, 2, 1, 1, 1, 1));

    //do all the grass checkForGrass
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });

    // gameEngine.addEntity(new GroundHorse(gameEngine, 36, 0));
    gameEngine.addEntity(new Water(gameEngine));

    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 0, 1, 8, 1, 0, 1));

    gameEngine.addEntity(new Water(gameEngine));
}