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
        gameEngine.addEntity(new Ground(gameEngine, 1, 65, -29, 5, 9, 1, 0, 0));
    //PLATFORMS
    gameEngine.addEntity(new Ground(gameEngine, 1, 50, -15, 5, 8, 1, 0, 0));
    // LVL 1 TUNNEL ADD SPIKES
    //tunnel top
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -35, 5, 20, 1, 0, 0));
        //spikes (for now ground horse lol)
        for(let i = 0; i <5; i++ ){
            gameEngine.addEntity(new GroundHorse(gameEngine,40+i, -13,true));
        }
    //TUNNEL BOTTOM
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -11, 5, 4, 1, 0, 0));
    //expand into tunnel going left 
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -10, 25, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 15, -30, 25, 13, 1, 0, 0));
    //dash wall jump tutorial
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -45, 9, 41, 1, 0, 0));
        //nubs on wall to force dash
        gameEngine.addEntity(new Ground(gameEngine, 1, 13, -25, 2, 1, 1, 0, 0));
        gameEngine.addEntity(new Ground(gameEngine, 1, 9, -21, 2, 1, 1, 0, 0));
    //top of wall dash tutorial tunnel
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -45, 10, 9, 1, 0, 0));
      //close gap this is just so i can get in lol^ ( or make this a secret because it is hard to access lol)
    gameEngine.addEntity(new Ground(gameEngine, 1, 23, -45, 12, 9, 1, 0, 0));

    //well for enemies 
    gameEngine.addEntity(new Ground(gameEngine, 1, 15, -31, 3, 1, 1, 0, 0));
        //enemies for player to Kill
        gameEngine.addEntity(new Mettaur(gameEngine, 20,-32, gravity));
        gameEngine.addEntity(new Mettaur(gameEngine, 21,-32, gravity));
        gameEngine.addEntity(new Mettaur(gameEngine, 22,-32, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 1, 37, -32, 3, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 34, -31, 3, 2, 1, 0, 0));

    //top of tunnel to start new levels
    gameEngine.addEntity(new Ground(gameEngine, 1, 35, -50,35, 9, 1, 0, 0));
     //botom of that tunnel
     gameEngine.addEntity(new Ground(gameEngine, 1, 45, -35, 25, 6, 1, 0, 0));
    
  


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