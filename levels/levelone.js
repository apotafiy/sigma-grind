function loadLevelOne(gameEngine) {
    let gravity = 0.2;
    gameEngine.addEntity(new Player(gameEngine, 108, -35, gravity));
    // gameEngine.addEntity(new Player(gameEngine, 3, 0, gravity));

    gameEngine.addEntity(new Ground(gameEngine, 1, -5, -6, 6, 20, 1, 0, 1));
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
    gameEngine.addEntity(new Spike(gameEngine, 38, 7, 2, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, 1, 2, 7, 1, 0, 0));
    //little platform at end
    gameEngine.addEntity(new Ground(gameEngine, 1, 44, 1, 2, 1, 1, 1, 1));
    gameEngine.addEntity(new Spike(gameEngine, 42, 7, 8, 1, 0));

    //back wall
    // gameEngine.addEntity(new Ground(gameEngine, 1, -9,-10, 10, 25, 1, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 8, 15, 4, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 5, 8, 45, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 50, 2, 10, 16, 1, 0, 1));
    //RIGHT WALL!
    gameEngine.addEntity(new Ground(gameEngine, 1, 60, -20, 5, 40, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 65, -35, 5, 55, 1, 0, 0));

    //PLATFORMS
    gameEngine.addEntity(new Ground(gameEngine, 1, 50, -15, 5, 8, 1, 0, 0));
    // LVL 1 TUNNEL ADD SPIKES
    //tunnel top
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -35, 5, 20, 1, 0, 0));
    //spikes (for now ground horse lol)
    gameEngine.addEntity(new Spike(gameEngine, 40, -12, 5, 1, 0));
    //TUNNEL BOTTOM
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -11, 5, 4, 1, 0, 0));
    //expand into tunnel going left
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -10, 25, 6, 1, 0, 0));
    //spikes for pogo
    //spikes in between them
    gameEngine.addEntity(new Spike(gameEngine, 15, -11, 13, 1, 0));
    gameEngine.addEntity(new Spike(gameEngine, 15, -17, 13, 1, 2));
    //top of tunnel
    gameEngine.addEntity(new Ground(gameEngine, 1, 18, -30, 22, 13, 1, 0, 0));

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
    gameEngine.addEntity(new Ground(gameEngine, 1, 15, -31, 3, 14, 1, 0, 0));

    //enemies for player to Kill
    gameEngine.addEntity(new Mettaur(gameEngine, 20, -32, gravity));
    gameEngine.addEntity(new Mettaur(gameEngine, 21, -32, gravity));
    gameEngine.addEntity(new Mettaur(gameEngine, 22, -32, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 1, 37, -32, 3, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 34, -31, 3, 2, 1, 0, 0));

    //top of tunnel to start new levels
    gameEngine.addEntity(new Ground(gameEngine, 1, 35, -50, 42, 9, 1, 0, 0));
    //botom of that tunnel
    gameEngine.addEntity(new Ground(gameEngine, 1, 45, -35, 20, 6, 1, 0, 0));

    //Start of second part (actual level!)
    //slide down spiked walls with dashing NEEDED
    gameEngine.addEntity(new Ground(gameEngine, 1, 77, -50, 6, 44, 1, 0, 0));
    //near wall spikes!
    gameEngine.addEntity(new Spike(gameEngine, 70, -34, 1, 5, 1));

    //alternate wall spike force dash
    gameEngine.addEntity(new Spike(gameEngine, 76, -26, 1, 5, 3));

    //alternate wall spike force dash
    gameEngine.addEntity(new Spike(gameEngine, 70, -18, 1, 5, 1));

    //alternate wall spike force dash
    gameEngine.addEntity(new Spike(gameEngine, 76, -11, 1, 5, 3));
    gameEngine.addEntity(new Spike(gameEngine, 76, -3, 1, 4, 3));
    //bottom tunnel wall
    gameEngine.addEntity(new Ground(gameEngine, 1, 77, -3, 8, 16, 1, 0, 0));
    //block off the bottom
    gameEngine.addEntity(new Ground(gameEngine, 1, 70, 2, 7, 6, 0, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 70, 1, 6, 1, 0));

    //bottom pit with mettaurs
    gameEngine.addEntity(new Ground(gameEngine, 1, 85, -2, 18, 6, 1, 0, 0));
    gameEngine.addEntity(new Mettaur(gameEngine, 89, -4, gravity));
    gameEngine.addEntity(new Mettaur(gameEngine, 90, -4, gravity));
    gameEngine.addEntity(new Mettaur(gameEngine, 92, -4, gravity));
    //wall extending up  a little
    gameEngine.addEntity(new Ground(gameEngine, 1, 95, -6, 4, 4, 1, 0, 0));
    //big wall force dash distance
    gameEngine.addEntity(new Ground(gameEngine, 1, 103, -34, 4, 38, 1, 0, 0));
    //platform to dash too
    gameEngine.addEntity(new Ground(gameEngine, 1, 92, -13, 2, 1, 1, 1, 1));
    // gameEngine.addEntity(new Spike(gameEngine,95,-12,2,1,2)); <--- Maybe?
    //spikes to stop player from going higher
    gameEngine.addEntity(new Spike(gameEngine, 102, -31, 1, 15, 3));
    //set up cavern to jump into from platforms
    gameEngine.addEntity(new Ground(gameEngine, 1, 83, -50, 3, 30, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 83, -15, 3, 5, 1, 0, 1));
    //hang spikes on bottom to stop player from getting up
    gameEngine.addEntity(new Spike(gameEngine, 83, -10, 3, 1, 2));
    //higher platform  to dash too
    gameEngine.addEntity(new Ground(gameEngine, 1, 92, -20, 2, 1, 1, 1, 1));
    //even higher! platform  to dash too
    gameEngine.addEntity(new Ground(gameEngine, 1, 92, -30, 2, 1, 1, 1, 1));
    //do all the grass checkForGrass

    //boss arena
    gameEngine.addEntity(new Ground(gameEngine, 1, 107, -31, 30, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 107, -32, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new DogBoss(gameEngine, 115, -40, gravity));
    // gameEngine.addEntity(new GroundProjectile(gameEngine,7360,-2560,2,-2, gravity))
    gameEngine.addEntity(new Ground(gameEngine, 1, 135, -32, 2, 1, 1, 0, 0));

    //Grass Check
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });

    //Rush tutorials
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            10,
            6,
            5,
            "You're Finally Awake. Sigma Must Have Done A Number On You. Do You Remember Me? I'm Rush. Don't Worry. I'll Help You Remember Everything."
        )
    );

        gameEngine.addEntity(new Sign(gameEngine,15,6,0));
        gameEngine.addEntity(new Sign(gameEngine,40,0,0));

    gameEngine.addEntity(
        new Rush(gameEngine, 25, 2, 5, "Use 'K' To Dash Accross The Gaps!")
    );
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            54,
            1,
            5,
            'Run At The Wall And Press Space To Climb It!'
        )
    );
        gameEngine.addEntity(new Sign(gameEngine,59,-2,3));
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            60,
            -21,
            5,
            'Move Towards The Wall While Falling To Slide Down!'
        )
    );
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            50,
            -16,
            5,
            'Try Dashing Through That Gap! Be Careful The Spikes Are Sharp!'
        )
    );

    gameEngine.addEntity(
        new Rush(
            gameEngine,
            29,
            -11,
            5,
            "Hold 'S' And Press 'J' To Do A Downward Stab! This Will Let You Bounce On Spikes!"
        )
    );

    gameEngine.addEntity(
        new Rush(
            gameEngine,
            11,
            -11,
            5,
            "Hold The Direction Away From The Wall And Press 'K' To Do A Wall Dash!"
        )
    );
        gameEngine.addEntity(new Sign(gameEngine,9,-14,4));
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            15,
            -32,
            5,
            "Oh No! Mettaurs! Quick! Press 'J' To Use Your Sword!"
        )
    );
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            68,
            -36,
            5,
            'Now You Remember Everything You need! Go Find Sigma And Take Back Your Title! Good Luck Zero! I Hope To See You Soon.'
        )
    );
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            104,
            -35,
            5,
            "Looks Like Sigma Didnt Take Any Chances. He Left One Of His Goons To Make Sure You Stayed. He Does Look A Little Like Me... Doesn't He..."
        )
    );
    // gameEngine.addEntity(new GroundHorse(gameEngine, 36, 0));
    gameEngine.addEntity(new Water(gameEngine));
    gameEngine.addEntity(new SceneManager(gameEngine));
    // gameEngine.addEntity(new Water(gameEngine));
}
