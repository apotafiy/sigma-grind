function loadLevelOne(gameEngine){
    let gravity = 0.2;
    // gameEngine.addEntity(new Player(gameEngine, 68, -40, gravity));
    gameEngine.addEntity(new Player(gameEngine, 3
        , 0, gravity));
    //add camera
    gameEngine.addEntity(new SceneManager(gameEngine));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -4 , 1, 12, 1, 0, 1));
    //start ground
    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 15, 1, 1, 0, 1));

    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 6, 8, 1, 1, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 3, 5, 2, 1, 1, 0, 0));

    //add platforms for the player to jump on
    gameEngine.addEntity(new Ground(gameEngine, 1, 20, 5, 14, 1, 1, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 24, 3, 5, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 32, 2, 2, 1, 1, 1, 1));
    //2 pillars
    gameEngine.addEntity(new Ground(gameEngine, 1, 36, 2, 2, 6, 1, 0, 0));
        //spikes in between them
        gameEngine.addEntity(new Spike(gameEngine, 38,7,2,1,0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, 1, 2, 7, 1, 0, 0));
    //little platform at end
    gameEngine.addEntity(new Ground(gameEngine, 1, 44, 1, 2, 1, 1, 1, 1));
        gameEngine.addEntity(new Spike(gameEngine, 42,7,8,1,0));

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
        gameEngine.addEntity(new Spike(gameEngine, 40,-12,5,1,0));
    //TUNNEL BOTTOM
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -11, 5, 4, 1, 0, 0));
    //expand into tunnel going left 
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -10, 25, 6, 1, 0, 0));
        //spikes for pogo 
         //spikes in between them
         gameEngine.addEntity(new Spike(gameEngine, 15,-11,13,1,0));
         gameEngine.addEntity(new Spike(gameEngine, 15,-17,13,1,2));
    //top of tunnel
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
    gameEngine.addEntity(new Ground(gameEngine, 1, 35, -50,42, 9, 1, 0, 0));
     //botom of that tunnel
     gameEngine.addEntity(new Ground(gameEngine, 1, 45, -35, 25, 6, 1, 0, 0));
    
    

    //Start of second part (actual level!)
    //slide down spiked walls with dashing NEEDED
    gameEngine.addEntity(new Ground(gameEngine, 1, 77, -50,8, 44, 1, 0, 0));
        //near wall spikes!
        gameEngine.addEntity(new Spike(gameEngine, 70,-34,1,5,1));

        //alternate wall spike force dash
        gameEngine.addEntity(new Spike(gameEngine, 76,-26,1,5,3));

         //alternate wall spike force dash
         gameEngine.addEntity(new Spike(gameEngine, 70,-18,1,5,1));

        //alternate wall spike force dash
        gameEngine.addEntity(new Spike(gameEngine, 76,-11,1,5,3));
        gameEngine.addEntity(new Spike(gameEngine, 76,-3,1,4,3));
    gameEngine.addEntity(new Ground(gameEngine, 1, 77, -3,8, 15, 1, 0, 0));
    //block off the bottom
    gameEngine.addEntity(new Ground(gameEngine, 1, 70, 2,7, 6, 0, 0, 0));
        gameEngine.addEntity(new Spike(gameEngine, 70,1,6,1,0));



    //do all the grass checkForGrass
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });




    // gameEngine.addEntity(new GroundHorse(gameEngine, 36, 0));
    gameEngine.addEntity(new Water(gameEngine));

    // gameEngine.addEntity(new Water(gameEngine));
}