function loadLevelOne(gameEngine) {
    let gravity = 0.2;

    //gameEngine.addEntity(new PurpleMountainFore(gameEngine));
    // gameEngine.addEntity(new Player(gameEngine, 108, -35));
    gameEngine.addEntity(new Clock(gameEngine, 14, 6));
    gameEngine.addEntity(new Player(gameEngine, 3, 0));
    // gameEngine.addEntity(new DogBoss(gameEngine, 112, -36, gravity));
    // gameEngine.addEntity(new SpikeBall(gameEngine, 4, 4));
    // //gameEngine.addEntity(new BeamBarrier(gameEngine, 5, 3, 0, 1));
    // //gameEngine.addEntity(new BeamBarrier(gameEngine, 1, 3, 1, 0.5));

    // //gameEngine.addEntity(new Player(gameEngine, 67, -37));
    // // gameEngine.addEntity(new Drill(gameEngine, 10, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 12, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 14, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 16, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 18, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 20, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 22, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 24, -1, 60));
    // // gameEngine.addEntity(new Drill(gameEngine, 26, -1, 60));

    // gameEngine.addEntity(new Ground(gameEngine, 1, -5, -6, 6, 20, 1, 0, 1));
    // //start ground
    // gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 15, 1, 1, 0, 1));

    // gameEngine.addEntity(new Ground(gameEngine, 1, 1, 6, 8, 1, 1, 0, 1));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 3, 5, 2, 1, 1, 0, 0));

    // //add platforms for the player to jump on
    // gameEngine.addEntity(new Ground(gameEngine, 1, 20, 5, 14, 1, 1, 1, 1));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 24, 3, 5, 2, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 32, 2, 2, 1, 1, 1, 1));
    // //2 pillars
    // gameEngine.addEntity(new Ground(gameEngine, 1, 36, 2, 2, 6, 1, 0, 0));
    // //spikes in between them
    // gameEngine.addEntity(new Spike(gameEngine, 38, 7, 2, 1, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 40, 1, 2, 7, 1, 0, 0));
    // //little platform at end
    // gameEngine.addEntity(new Ground(gameEngine, 1, 44, 1, 2, 1, 1, 1, 1));
    // gameEngine.addEntity(new Spike(gameEngine, 42, 7, 8, 1, 0));

    // //back wall
    // // gameEngine.addEntity(new Ground(gameEngine, 1, -9,-10, 10, 25, 1, 0, 1));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 0, 8, 15, 4, 1));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 5, 8, 45, 8, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 50, 2, 10, 16, 1, 0, 1));
    // //RIGHT WALL!
    // gameEngine.addEntity(new Ground(gameEngine, 1, 60, -20, 5, 40, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 65, -35, 5, 55, 1, 0, 0));

    // //PLATFORMS
    // gameEngine.addEntity(new Ground(gameEngine, 1, 50, -15, 5, 8, 1, 0, 0));
    // // LVL 1 TUNNEL ADD SPIKES
    // //tunnel top
    // gameEngine.addEntity(new Ground(gameEngine, 1, 40, -35, 5, 20, 1, 0, 0));
    // //spikes (for now ground horse lol)
    // gameEngine.addEntity(new Spike(gameEngine, 40, -12, 5, 1, 0));
    // gameEngine.addEntity(new Spike(gameEngine, 38, -17, 2, 1, 2));
    // //TUNNEL BOTTOM
    // gameEngine.addEntity(new Ground(gameEngine, 1, 40, -11, 5, 4, 1, 0, 0));
    // //expand into tunnel going left
    // gameEngine.addEntity(new Ground(gameEngine, 1, 9, -10, 25, 6, 1, 0, 0));
    // //spikes for pogo
    // //spikes in between them
    // gameEngine.addEntity(new Spike(gameEngine, 15, -11, 13, 1, 0));
    // gameEngine.addEntity(new Spike(gameEngine, 15, -17, 13, 1, 2));
    // gameEngine.addEntity(new Spike(gameEngine, 63, -29, 2, 1, 2));
    // //top of tunnel
    // gameEngine.addEntity(new Ground(gameEngine, 1, 18, -30, 22, 13, 1, 0, 0));

    // //dash wall jump tutorial
    // gameEngine.addEntity(new Ground(gameEngine, 1, 0, -45, 9, 41, 1, 0, 0));
    // //nubs on wall to force dash
    // gameEngine.addEntity(new Ground(gameEngine, 1, 13, -25, 2, 1, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 9, -21, 2, 1, 1, 0, 0));
    // //top of wall dash tutorial tunnel
    // gameEngine.addEntity(new Ground(gameEngine, 1, 9, -45, 14, 9, 1, 0, 0));
    // //close gap this is just so i can get in lol^ ( or make this a secret because it is hard to access lol)
    // gameEngine.addEntity(new Ground(gameEngine, 1, 23, -45, 12, 9, 1, 0, 0));

    // //well for enemies
    // gameEngine.addEntity(new Ground(gameEngine, 1, 15, -31, 3, 14, 1, 0, 0));

    // //enemies for player to Kill
    // gameEngine.addEntity(new Mettaur(gameEngine, 20, -32, gravity));
    // gameEngine.addEntity(new Mettaur(gameEngine, 21, -32, gravity));
    // gameEngine.addEntity(new Mettaur(gameEngine, 22, -32, gravity));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 37, -32, 3, 2, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 34, -31, 3, 2, 1, 0, 0));

    // //top of tunnel to start new levels
    // gameEngine.addEntity(new Ground(gameEngine, 1, 35, -50, 42, 9, 1, 0, 0));
    // //botom of that tunnel
    // gameEngine.addEntity(new Ground(gameEngine, 1, 45, -35, 20, 6, 1, 0, 0));

    // //Start of second part (actual level!)
    // gameEngine.addEntity(new Spike(gameEngine, 43, -36, 24, 1, 0));
    // // gameEngine.addEntity(new Spike(gameEngine,43,-41,32,1,2))
    // //slide down spiked walls with dashing NEEDED
    // gameEngine.addEntity(new Ground(gameEngine, 1, 77, -50, 6, 44, 1, 0, 0));
    // //near wall spikes!
    // gameEngine.addEntity(new Spike(gameEngine, 70, -34, 1, 5, 1));
    // gameEngine.addEntity(new Spike(gameEngine, 75, -41, 2, 1, 2));
    // //alternate wall spike force dash
    // gameEngine.addEntity(new Spike(gameEngine, 76, -26, 1, 5, 3));

    // //alternate wall spike force dash
    // gameEngine.addEntity(new Spike(gameEngine, 70, -18, 1, 5, 1));

    // //alternate wall spike force dash
    // gameEngine.addEntity(new Spike(gameEngine, 76, -11, 1, 5, 3));
    // gameEngine.addEntity(new Spike(gameEngine, 76, -3, 1, 4, 3));
    // //bottom tunnel wall
    // gameEngine.addEntity(new Ground(gameEngine, 1, 77, -3, 8, 16, 1, 0, 0));
    // //block off the bottom
    // gameEngine.addEntity(new Ground(gameEngine, 1, 70, 2, 7, 6, 0, 0, 0));
    // gameEngine.addEntity(new Spike(gameEngine, 70, 1, 6, 1, 0));

    // //bottom pit with mettaurs
    // gameEngine.addEntity(new Ground(gameEngine, 1, 85, -2, 18, 6, 1, 0, 0));
    // gameEngine.addEntity(new Mettaur(gameEngine, 89, -4, gravity));
    // gameEngine.addEntity(new Mettaur(gameEngine, 90, -4, gravity));
    // gameEngine.addEntity(new Mettaur(gameEngine, 92, -4, gravity));
    // //wall extending up  a little
    // gameEngine.addEntity(new Ground(gameEngine, 1, 95, -6, 4, 4, 1, 0, 0));
    // //big wall force dash distance
    // gameEngine.addEntity(new Ground(gameEngine, 1, 103, -34, 4, 38, 1, 0, 0));
    // //platform to dash too
    // gameEngine.addEntity(new Ground(gameEngine, 1, 92, -13, 2, 1, 1, 1, 1));
    // // gameEngine.addEntity(new Spike(gameEngine,95,-12,2,1,2)); <--- Maybe?
    // //spikes to stop player from going higher
    // gameEngine.addEntity(new Spike(gameEngine, 102, -31, 1, 15, 3));
    // //set up cavern to jump into from platforms
    // gameEngine.addEntity(new Ground(gameEngine, 1, 83, -50, 3, 30, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 83, -15, 3, 5, 1, 0, 1));
    // //hang spikes on bottom to stop player from getting up
    // gameEngine.addEntity(new Spike(gameEngine, 83, -10, 3, 1, 2));
    // //higher platform  to dash too
    // gameEngine.addEntity(new Ground(gameEngine, 1, 92, -20, 2, 1, 1, 1, 1));
    // //even higher! platform  to dash too
    // gameEngine.addEntity(new Ground(gameEngine, 1, 92, -30, 2, 1, 1, 1, 1));
    // //spikes to force pogo
    // gameEngine.addEntity(new Spike(gameEngine, 92, -31, 2, 1, 0));
    // //do all the grass checkForGrass

    // //boss arena
    // gameEngine.addEntity(new Ground(gameEngine, 1, 107, -31, 30, 5, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 107, -32, 3, 1, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 107, -50, 30, 3, 1, 0, 0));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 137, -50, 5, 40, 1, 0, 0));
    // //platforms for the  player to hide under
    // gameEngine.addEntity(new Ground(gameEngine, 1, 115, -38, 3, 1, 1, 1, 1));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 125, -38, 3, 1, 1, 1, 1));
    // // gameEngine.addEntity(new DogBoss(gameEngine, 112, -36, gravity));
    // gameEngine.addEntity(new GroundProjectile(gameEngine,7360,-2560,2,-2, gravity))
    // gameEngine.addEntity(new Ground(gameEngine, 1, 135, -32, 2, 1, 1, 0, 0));
    // gameEngine.addEntity(new AirProjectile(gameEngine, 106, -40, 0,0,1,0.2));
    //Grass Check
    gameEngine.addEntity(new Ground(gameEngine, 1, 3, 7, 400, 6, 1, 0, 0));
    gameEngine.addEntity(new Turret(gameEngine, 7, 4, 0));
    gameEngine.addEntity(new Turret(gameEngine, 8, 4, 1));
    gameEngine.addEntity(new Turret(gameEngine, 9, 4, 2));
    gameEngine.addEntity(new Turret(gameEngine, 10, 4, 3));

    for (let i = 0; i < 10; i++) {
        gameEngine.addEntity(
            new Ground(gameEngine, 1, 3 + i * 2, 4 - i, 2, 1, 1, 0, 0)
        );
    }
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });
    gameEngine.addEntity(new PurpleMountain(gameEngine));
}
