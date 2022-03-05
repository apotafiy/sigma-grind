function loadLevelOne(gameEngine) {
    let gravity = 0.2;

    // gameEngine.addEntity(new Player(gameEngine, 108, -35));
    gameEngine.addEntity(new Clock(gameEngine, 14, 6, 5000));
    gameEngine.addEntity(new Clock(gameEngine, 20, 6, 10000));
    gameEngine.addEntity(new Player(gameEngine, 3, 0));
    // gameEngine.addEntity(new Player(gameEngine, 44, -1));
    gameEngine.addEntity(new DogBoss(gameEngine, 112, -36, gravity));
    //gameEngine.addEntity(new BeamBarrier(gameEngine, 5, 3, 0, 1));
    //gameEngine.addEntity(new BeamBarrier(gameEngine, 1, 3, 1, 0.5));

    //gameEngine.addEntity(new Player(gameEngine, 67, -37));
    // gameEngine.addEntity(new Drill(gameEngine, 10, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 12, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 14, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 16, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 18, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 20, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 22, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 24, -1, 60));
    // gameEngine.addEntity(new Drill(gameEngine, 26, -1, 60));

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
    gameEngine.addEntity(new Spike(gameEngine, 38, -17, 2, 1, 2));
    //TUNNEL BOTTOM
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, -11, 5, 4, 1, 0, 0));
    //expand into tunnel going left
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -10, 25, 6, 1, 0, 0));
    //spikes for pogo
    //spikes in between them
    gameEngine.addEntity(new Spike(gameEngine, 15, -11, 13, 1, 0));
    gameEngine.addEntity(new Spike(gameEngine, 15, -17, 13, 1, 2));
    gameEngine.addEntity(new Spike(gameEngine, 63, -29, 2, 1, 2));
    //top of tunnel
    gameEngine.addEntity(new Ground(gameEngine, 1, 18, -30, 22, 13, 1, 0, 0));

    //dash wall jump tutorial
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, -45, 9, 41, 1, 0, 0));
    //nubs on wall to force dash
    gameEngine.addEntity(new Ground(gameEngine, 1, 13, -25, 2, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -21, 2, 1, 1, 0, 0));
    //top of wall dash tutorial tunnel
    gameEngine.addEntity(new Ground(gameEngine, 1, 9, -45, 14, 9, 1, 0, 0));
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
    gameEngine.addEntity(new Spike(gameEngine, 43, -36, 24, 1, 0));
    // gameEngine.addEntity(new Spike(gameEngine,43,-41,32,1,2))
    //slide down spiked walls with dashing NEEDED
    gameEngine.addEntity(new Ground(gameEngine, 1, 77, -50, 6, 44, 1, 0, 0));
    //near wall spikes!
    gameEngine.addEntity(new Spike(gameEngine, 70, -34, 1, 5, 1));
    gameEngine.addEntity(new Spike(gameEngine, 75, -41, 2, 1, 2));
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
    //spikes to force pogo
    gameEngine.addEntity(new Spike(gameEngine, 92, -31, 2, 1, 0));
    //do all the grass checkForGrass

    //boss arena
    gameEngine.addEntity(new Ground(gameEngine, 1, 107, -31, 30, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 107, -32, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 107, -50, 30, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 137, -50, 5, 40, 1, 0, 0));
    //platforms for the  player to hide under
    gameEngine.addEntity(new Ground(gameEngine, 1, 115, -38, 3, 1, 1, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 125, -38, 3, 1, 1, 1, 1));
    // gameEngine.addEntity(new DogBoss(gameEngine, 112, -36, gravity));
    // gameEngine.addEntity(new GroundProjectile(gameEngine,7360,-2560,2,-2, gravity))
    // gameEngine.addEntity(new Ground(gameEngine, 1, 135, -32, 2, 1, 1, 0, 0));
    // gameEngine.addEntity(new AirProjectile(gameEngine, 106, -40, 0,0,1,0.2));
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

    gameEngine.addEntity(new Sign(gameEngine, 15, 6, 0));
    gameEngine.addEntity(new Sign(gameEngine, 40, 0, 0));

    gameEngine.addEntity(
        new Rush(gameEngine, 25, 2, 5, "Use 'K' To Dash Across The Gaps!")
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
    gameEngine.addEntity(new Sign(gameEngine, 59, -2, 3));
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
    gameEngine.addEntity(new Sign(gameEngine, 9, -14, 4));
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
            'Looks Like Sigma Didnt Take Any Chances. He Left One Of His Goons To Make Sure You Stayed. Grab The Energy Pod Before You Go!'
        )
    );
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            82,
            -51,
            5,
            'You Really Should Not Be Here. Get Back Down There You Little Rascal!'
        )
    );
    //drills to dodge
    gameEngine.addEntity(new Drill(gameEngine, 85, -18, 8));
    gameEngine.addEntity(new Drill(gameEngine, 95, -18, 8));

    gameEngine.addEntity(new FullHealthPack(gameEngine, 105, -35));
    // gameEngine.addEntity(new SmallHealthPack(gameEngine, 103,-35))
    // gameEngine.addEntity(new GroundHorse(gameEngine, 36, 0));
    gameEngine.addEntity(new Water(gameEngine));
    // console.log(gameEngine.entities);
    //remove old game engine and add new one
    // gameEngine.entities.shift();
    // gameEngine.addEntity(new SceneManager(gameEngine,2));
    // gameEngine.addEntity(new Water(gameEngine));
}

/**LEVEL 2 */
function loadLevelTwo(gameEngine) {
    let gravity = 0.2;
    gameEngine.addEntity(new Player(gameEngine,-4, -245));
    gameEngine.addEntity(new Eregion(gameEngine, 19, -245));
    // gameEngine.addEntity(new Lava(gameEngine, -1, -1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 0, -262, 41, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 0, -254, 7, 254, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 7, -254, 27, 1, 2));
    gameEngine.addEntity(new Turret(gameEngine, 7, -247, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -231, 2, 13, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 7, -218, 1, 21, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -167, 2, 26, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 7, -134, 1, 31, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -103, 6, 4, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 7, -99, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -95, 1, 13, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 7, -76, 1, 23, 1));
    gameEngine.addEntity(new Spike(gameEngine, 7, -38, 23, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -37, 23, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 7, -35, 23, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -17, 3, 4, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 7, -13, 1, 5, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -8, 34, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 8, -93, 1, 11, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 8, -80, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 8, -69, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -230, 2, 11, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -166, 2, 25, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -89, 1, 7, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -135, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -132, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -129, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -126, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -123, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -120, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -117, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -114, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -111, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -108, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 10, -105, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 10, -88, 1, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 10, -16, 2, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -239, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -229, 1, 9, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -165, 1, 24, 1, 0, 0));
    gameEngine.addEntity(new Turret(gameEngine, 11, -141, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -87, 1, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -46, 30, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 11, -44, 23, 1, 2));
    gameEngine.addEntity(new Spike(gameEngine, 11, -29, 23, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -28, 30, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -25, 21, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -24, 4, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -227, 1, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -163, 1, 22, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -86, 6, 4, 1, 0, 0));
    gameEngine.addEntity(new Turret(gameEngine, 12, -82, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -74, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -64, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 12, -63, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -15, 15, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -150, 2, 9, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 13, -132, 1, 25, 3));
    gameEngine.addEntity(new Turret(gameEngine, 13, -102, 1));
    gameEngine.addEntity(new Mettaur(gameEngine, 13, -17, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -210, 13, 5, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 14, -189, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -133, 13, 27, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -55, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 15, -212, 11, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 15, -205, 11, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 15, -148, 1, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 15, -135, 11, 2, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 15, -70, 8));
    gameEngine.addEntity(new Spike(gameEngine, 15, -24, 17, 1, 2));
    gameEngine.addEntity(new Turret(gameEngine, 15, -22, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -213, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -203, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -144, 1, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -136, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Mettaur(gameEngine, 16, -17, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -220, 2, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -214, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -202, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -174, 5, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -137, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -106, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -96, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 18, -95, 5, 1, 2));
    gameEngine.addEntity(new Mettaur(gameEngine, 18, -17, gravity));
    gameEngine.addEntity(new Clock(gameEngine, 19, -215, 5000));
    gameEngine.addEntity(new Drill(gameEngine, 19, -142, 8));
    gameEngine.addEntity(new FullHealthPack(gameEngine, 19, -138));
    gameEngine.addEntity(new Ground(gameEngine, 2, 19, -79, 4, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 19, -77, 4, 1, 2));
    gameEngine.addEntity(new Turret(gameEngine, 20, -201, 2));
    gameEngine.addEntity(new SpikeBall(gameEngine, 20, -189, gravity));
    gameEngine.addEntity(new Clock(gameEngine, 20, -186, 5000));
    gameEngine.addEntity(new Drill(gameEngine, 20, -170, 8));
    gameEngine.addEntity(new Drill(gameEngine, 20, -142, 8));
    gameEngine.addEntity(new Drill(gameEngine, 20, -100, 8));
    gameEngine.addEntity(new Clock(gameEngine, 20, -71, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 20, -60, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Mettaur(gameEngine, 20, -17, gravity));
    gameEngine.addEntity(new Clock(gameEngine, 21, -175, 5000));
    gameEngine.addEntity(new Drill(gameEngine, 21, -170, 8));
    gameEngine.addEntity(new Turret(gameEngine, 21, -59, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 22, -220, 2, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 23, -144, 18, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 23, -86, 18, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 23, -53, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 24, -239, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 24, -16, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 25, -148, 16, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 25, -74, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 25, -70, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 25, -64, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 25, -63, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 25, -17, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -150, 15, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -9, 15, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 27, -189, gravity));
    gameEngine.addEntity(new Turret(gameEngine, 27, -141, 2));
    gameEngine.addEntity(new Turret(gameEngine, 27, -102, 3));
    gameEngine.addEntity(new Turret(gameEngine, 27, -82, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -227, 13, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -163, 13, 13, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -103, 13, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -229, 12, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -222, 12, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -165, 12, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -87, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -69, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Mettaur(gameEngine, 29, -47, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 30, -230, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 30, -220, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -135, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -132, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -129, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -126, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -123, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -120, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -117, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -114, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -111, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -108, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 30, -105, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 30, -99, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 30, -88, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 30, -50, 2, 4, 1, 0, 0));
    gameEngine.addEntity(new Turret(gameEngine, 30, -37, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 31, -166, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 31, -89, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 31, -21, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 31, -20, 10, 11, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 32, -231, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 32, -219, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 32, -93, 9, 4, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 32, -80, 5000));
    gameEngine.addEntity(new Spike(gameEngine, 32, -22, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 32, -21, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Turret(gameEngine, 33, -247, 3));
    gameEngine.addEntity(new Spike(gameEngine, 33, -190, 1, 24, 3));
    gameEngine.addEntity(new Spike(gameEngine, 33, -133, 1, 30, 3));
    gameEngine.addEntity(new Ground(gameEngine, 2, 33, -95, 8, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 33, -76, 1, 30, 3));
    gameEngine.addEntity(new Spike(gameEngine, 33, -25, 1, 1, 2));
    gameEngine.addEntity(new Spike(gameEngine, 33, -23, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 33, -22, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -254, 7, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -218, 7, 52, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -141, 7, 38, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -99, 7, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -82, 7, 36, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -44, 7, 16, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -25, 7, 3, 1, 0, 0));
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });
    gameEngine.addEntity(new Water(gameEngine));
}
function loadTestLevel(gameEngine) {
    let gravity = 0.2;
    gameEngine.addEntity(new Player(gameEngine, 3, -5));
    // gameEngine.addEntity(new Player(gameEngine, 150, -160));
    gameEngine.addEntity(new Sigma(gameEngine, 200, -160));
    gameEngine.addEntity(new BossDoor(gameEngine, 187, -159));
    gameEngine.addEntity(new Ground(gameEngine, 2, 0, -32, 108, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 0, -30, 2, 30, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 2, -30, 28, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 2, -2, 158, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 6, -3, 20, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -155, 24, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 7, -153, 2, 121, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 9, -153, 22, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -125, 24, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -121, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -120, 2, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -119, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 9, -118, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -114, 1, 25, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -63, 11, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 9, -33, 30, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 10, -141, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 10, -119));
    gameEngine.addEntity(new Ground(gameEngine, 2, 10, -113, 1, 24, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 11, -120));
    gameEngine.addEntity(new Ground(gameEngine, 2, 11, -112, 1, 23, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 12, -121, 8));
    gameEngine.addEntity(new Clock(gameEngine, 12, -119, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -111, 5, 22, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 12, -53, 11, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -126, 20, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -78, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -72, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -56, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -55, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -50, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -45, 14, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 13, -4, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -146, 25, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 14, -145, 23, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -136, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 14, -135, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -80, 7, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -71, 7, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -57, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 14, -55));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -54, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -49, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 14, -46, 13, 1, 1, 0, 0));
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            14,
            -5,
            5,
            'We are in the last stretch! Rumor has it Sigma is hiding somewhere in this base. Your time has come Zero! Go take him out and restore order to our world!'
        )
    );
    gameEngine.addEntity(new Ground(gameEngine, 2, 15, -81, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 15, -69, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new FullHealthPack(gameEngine, 15, -55));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -121, 14, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -82, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -68, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -55, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 16, -47, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 16, -5));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -120, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -110, 1, 21, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -83, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -67, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -48, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -42, 13, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -41, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 17, -37, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -148, 21, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -119, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -102, 2, 13, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -84, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -66, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 18, -38, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 18, -34, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 19, -118, 8, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 19, -40, 8, 2, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 19, -34, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 20, -127, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 20, -113, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 20, -85, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 20, -65, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 20, -34, 5000));
    gameEngine.addEntity(new Clock(gameEngine, 21, -34, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 22, -132, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 23, -75));
    gameEngine.addEntity(new Ground(gameEngine, 2, 24, -38, 5, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 25, -35, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -101, 1, 12, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -85, 1, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -72, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -71, 7, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -69, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -68, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -67, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -66, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -65, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -63, 13, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -55, 6, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 26, -34, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 27, -96, 1, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 27, -84, 2, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 27, -49, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 27, -44, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 27, -43, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 27, -39, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -165, 11, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -162, 3, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -110, 11, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -95, 1, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -56, 2, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -48, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 28, -45, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -111, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -104, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -94, 1, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -83, 1, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -47, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -46, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 29, -37, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 30, -93, 12, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 30, -82, 1, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 30, -30, 4, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 31, -81, 1, 4, 1, 0, 0));
    gameEngine.addEntity(new FullHealthPack(gameEngine, 31, -34));
    gameEngine.addEntity(new Ground(gameEngine, 2, 32, -80, 1, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 32, -53, 1, 4, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 33, -142, 8));
    gameEngine.addEntity(new Clock(gameEngine, 33, -96, 5000));
    gameEngine.addEntity(new Drill(gameEngine, 33, -94, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 33, -78, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 33, -51, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -112, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -103, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 34, -95));
    gameEngine.addEntity(new Ground(gameEngine, 2, 34, -94, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 34, -30, 2, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 35, -113, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 35, -102, 38, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 35, -96));
    gameEngine.addEntity(new Ground(gameEngine, 2, 35, -95, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 36, -114, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 36, -101, 37, 1, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 36, -97, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 36, -96, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 36, -18, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -187, 36, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -185, 2, 20, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -157, 175, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -155, 2, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -145, 2, 31, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -100, 36, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -99, 5, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -89, 5, 12, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -72, 71, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -70, 2, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 37, -61, 2, 28, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 39, -185, 2, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 39, -4, 11, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 40, -173, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 40, -23, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 40, -13, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 40, -12, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 43, -73, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 44, -178, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 44, -168, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 44, -167, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 46, -159, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 46, -26, 4, 22, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 47, -174, 8));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 47, -74, true, 0));
    gameEngine.addEntity(new Clock(gameEngine, 47, -27, 5000));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 49, -74, true, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 51, -183, 4, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 51, -181, 4, 1, 2));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 51, -74, true, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 52, -184));
    gameEngine.addEntity(new Ground(gameEngine, 2, 52, -164, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 52, -4, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 53, -184, 5000));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 53, -74, true, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 53, -23, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 53, -13, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 53, -12, 4, 1, 2));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 54, -74, true, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 55, -74, true, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 56, -74, true, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 57, -178, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 57, -174, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 57, -168, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 57, -167, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 57, -18, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 58, -74, true, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 60, -74, true, 0));
    gameEngine.addEntity(new Spike(gameEngine, 60, -30, 2, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 61, -173, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new PopUpEnemy(gameEngine, 62, -74, true, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 62, -30, 4, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 63, -73, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 64, -134, 128, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 64, -132, 2, 30, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 65, -185, 2, 1, 2));
    gameEngine.addEntity(new Spike(gameEngine, 66, -123, 1, 15, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 66, -108, 1, 6, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 66, -30, 28, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 67, -185, 67, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 67, -184, 6, 22, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 67, -108, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 67, -107, 1, 5, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 67, -27, 8));
    gameEngine.addEntity(new SpikeBall(gameEngine, 67, -11, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 68, -107, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 68, -106, 1, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 68, -99, 5, 22, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 68, -11, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 69, -125, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 69, -106, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 69, -105, 1, 3, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 69, -11, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 70, -105, 3, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 70, -104, 3, 2, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 72, -119, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 72, -14, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 73, -187, 55, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 73, -186, 139, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 73, -184, 55, 1, 2));
    gameEngine.addEntity(new Spike(gameEngine, 73, -165, 20, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 73, -164, 20, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 73, -95, 19, 3, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 73, -92, 23, 1, 2));
    gameEngine.addEntity(new SpikeBall(gameEngine, 73, -14, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 74, -14, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 75, -14, gravity));
    gameEngine.addEntity(new Drill(gameEngine, 76, -89, 8));
    gameEngine.addEntity(new Spike(gameEngine, 77, -177, 1, 4, 3));
    gameEngine.addEntity(new Ground(gameEngine, 2, 77, -73, 20, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 78, -178, 45, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 78, -177, 45, 4, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 78, -173, 19, 1, 2));
    gameEngine.addEntity(new SpikeBall(gameEngine, 78, -17, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 79, -105, 11, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 79, -104, 115, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 79, -102, 24, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 79, -100, 22, 1, 2));
    gameEngine.addEntity(new SpikeBall(gameEngine, 79, -17, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 80, -119, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 80, -17, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 81, -17, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 84, -107, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 84, -74, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 84, -14, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 85, -79, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 85, -14, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 86, -122, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 86, -108, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 86, -14, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 87, -14, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 88, -109, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 90, -106, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 90, -105, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 90, -11, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 91, -122, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 91, -107, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 91, -106, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 91, -11, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 92, -158, 17, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 92, -108, 1, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 92, -107, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 92, -93, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 92, -83, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 92, -82, 4, 1, 2));
    gameEngine.addEntity(new Drill(gameEngine, 92, -27, 8));
    gameEngine.addEntity(new SpikeBall(gameEngine, 92, -11, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 93, -111, 1, 3, 3));
    gameEngine.addEntity(new Ground(gameEngine, 2, 93, -108, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 94, -129, 4, 21, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 94, -30, 4, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 96, -88, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 96, -70, 12, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 96, -62, 2, 30, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 97, -173, 7, 15, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 98, -109, 1, 4, 1));
    gameEngine.addEntity(new Spike(gameEngine, 98, -105, 28, 1, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 98, -58, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 98, -50, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 98, -46, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 98, -38, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 98, -34, 12, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 98, -30, 10, 1, 2));
    gameEngine.addEntity(new Drill(gameEngine, 99, -107, 8));
    gameEngine.addEntity(new Drill(gameEngine, 99, -106, 8));
    gameEngine.addEntity(new Drill(gameEngine, 100, -107, 8));
    gameEngine.addEntity(new Drill(gameEngine, 100, -106, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 101, -100, 2, 28, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 101, -59, 4, 22, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 102, -181));
    gameEngine.addEntity(new SpikeBall(gameEngine, 102, -107, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 103, -96, 91, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 103, -94, 17, 21, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 103, -73, 13, 1, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 103, -62, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 103, -37, 0, 1));
    gameEngine.addEntity(new Spike(gameEngine, 104, -173, 19, 1, 2));
    gameEngine.addEntity(new SpikeBall(gameEngine, 104, -124, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 104, -24, 4, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 104, -23, 16, 21, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 105, -58, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 105, -50, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 105, -46, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 105, -38, 1, 1));
    gameEngine.addEntity(new Spike(gameEngine, 108, -165, 20, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 108, -164, 26, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 108, -64, 2, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 108, -59, 2, 22, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 108, -24, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 110, -59, 1, 22, 1));
    gameEngine.addEntity(new SpikeBall(gameEngine, 111, -128, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 111, -30, 2, 4, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 113, -59, 1, 22, 3));
    gameEngine.addEntity(new Ground(gameEngine, 2, 114, -64, 14, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 114, -59, 2, 22, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 114, -34, 14, 2, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 115, -128, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 116, -116, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 116, -73, 4, 1, 2));
    gameEngine.addEntity(new Spike(gameEngine, 116, -67, 10, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 116, -66, 80, 2, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 116, -58, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 116, -50, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 116, -46, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 116, -38, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 116, -32, 53, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 116, -30, 10, 1, 2));
    gameEngine.addEntity(new Spike(gameEngine, 116, -24, 4, 1, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 118, -114, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 119, -132, 1, 14, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 119, -118, 2, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 119, -59, 4, 22, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 120, -132, 1, 14, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 120, -62, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 120, -37, 0, 1));
    gameEngine.addEntity(new SpikeBall(gameEngine, 122, -113, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 123, -177, 1, 4, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 123, -58, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 123, -50, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 123, -46, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 123, -38, 1, 1));
    gameEngine.addEntity(new Spike(gameEngine, 125, -128, 1, 23, 3));
    gameEngine.addEntity(new Ground(gameEngine, 2, 126, -128, 20, 24, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 126, -89, 4, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 126, -62, 2, 28, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 126, -30, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 126, -29, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 126, -28, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 126, -27, 4, 20, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 128, -187, 84, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 128, -184, 6, 20, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 130, -83, 4, 17, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 130, -27, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 130, -23, 1, 14, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 131, -28));
    gameEngine.addEntity(new Ground(gameEngine, 2, 131, -22, 1, 12, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 132, -29));
    gameEngine.addEntity(new Ground(gameEngine, 2, 132, -21, 1, 10, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 133, -30, 8));
    gameEngine.addEntity(new Clock(gameEngine, 133, -27, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 133, -20, 5, 8, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 134, -185, 28, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 134, -82, 3, 16, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 137, -78, 4, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 137, -77, 10, 11, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 137, -30, 14, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 137, -3, 14, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 138, -158, 20, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 138, -29, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 138, -19, 1, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 138, -4, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 139, -28, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 139, -5, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 140, -27, 8, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 140, -10, 8, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 141, -22, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 141, -11, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 145, -159, 6, 1, 1, 0, 0));
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            146,
            -160,
            5,
            "Zero! You made it! Sigma is through that door. Finish him and reclaim your title! I'm counting on you!"
        )
    );
    gameEngine.addEntity(new Ground(gameEngine, 2, 147, -73, 4, 7, 1, 0, 0));
    gameEngine.addEntity(new FullHealthPack(gameEngine, 148, -160));
    gameEngine.addEntity(new Ground(gameEngine, 2, 148, -106, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 148, -94, 25, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 148, -93, 22, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 148, -92, 21, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 148, -91, 19, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 148, -90, 18, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 149, -125, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 149, -115, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 149, -114, 4, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 149, -89, 17, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 149, -88, 16, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 149, -87, 15, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 149, -19, 13, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 150, -86, 14, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 150, -20, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 150, -13, 28, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 151, -85, 13, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 151, -69, 4, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 152, -84, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 153, -120, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 153, -83, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 154, -6, 5000));
    gameEngine.addEntity(new Drill(gameEngine, 154, -3, 8));
    gameEngine.addEntity(new Spike(gameEngine, 155, -67, 3, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 155, -12, 23, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 155, -4));
    gameEngine.addEntity(new Ground(gameEngine, 2, 155, -3, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 156, -132, 2, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 156, -82, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 156, -11, 36, 1, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 156, -5));
    gameEngine.addEntity(new Ground(gameEngine, 2, 156, -4, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 157, -21, 5, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 157, -10, 35, 1, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 157, -6, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 157, -5, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -132, 4, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -81, 5, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -67, 2, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -27, 14, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -25, 10, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -23, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -22, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 158, -9, 2, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 160, -38, 32, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 160, -34, 9, 2, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 161, -30, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 162, -185, 50, 12, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 162, -173, 26, 11, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 162, -132, 28, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 162, -74, 4, 5, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 162, -14, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 163, -78, 1, 4, 1, 0, 0));
    gameEngine.addEntity(new Clock(gameEngine, 163, -15, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 164, -162, 24, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 164, -155, 48, 16, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 164, -75, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new FullHealthPack(gameEngine, 164, -15));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 165, -80));
    gameEngine.addEntity(new Ground(gameEngine, 2, 166, -105, 20, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 166, -72, 1, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 167, -71, 2, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 167, -15, 4, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 168, -85, 16, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 168, -83, 4, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 169, -86, 14, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 169, -79, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 169, -70, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 169, -17, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 170, -87, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 170, -78, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 171, -88, 10, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 171, -77, 10, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 171, -75, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 171, -14, 7, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 172, -89, 8, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 172, -82, 12, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 172, -80, 3, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 173, -106, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 173, -90, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 173, -75, 1, 3, 1, 0, 0));
    gameEngine.addEntity(
        new Rush(
            gameEngine,
            174,
            -107,
            5,
            'You look pretty beat up! Here! Take this! You will need it!'
        )
    );
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 175, -93));
    gameEngine.addEntity(new Ground(gameEngine, 2, 175, -83, 2, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 175, -75, 2, 4, 1, 0, 0));
    gameEngine.addEntity(new Drill(gameEngine, 175, -71, 8));
    gameEngine.addEntity(new Drill(gameEngine, 175, -70, 8));
    gameEngine.addEntity(new FullHealthPack(gameEngine, 176, -107));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 176, -93));
    gameEngine.addEntity(new Clock(gameEngine, 176, -91, 5000));
    gameEngine.addEntity(new Drill(gameEngine, 176, -71, 8));
    gameEngine.addEntity(new Drill(gameEngine, 176, -70, 8));
    gameEngine.addEntity(new SpikeBall(gameEngine, 176, -27, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 177, -80, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 177, -79, 6, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 177, -17, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 178, -75, 1, 3, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 178, -12, 12, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 179, -94, 15, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 180, -83, 4, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 180, -75, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 181, -34, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 182, -93, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 182, -70, 55, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 182, -27, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 183, -92, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 183, -71, 54, 1, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 184, -17, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 185, -91, 9, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 185, -72, 52, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 186, -90, 8, 2, 1, 0, 0));
    gameEngine.addEntity(new SmallHealthPack(gameEngine, 186, -80));
    gameEngine.addEntity(new Ground(gameEngine, 2, 186, -74, 51, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 187, -88, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 187, -75, 50, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 188, -87, 6, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 188, -78, 49, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 189, -84, 5, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 190, -132, 2, 23, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 190, -33, 2, 22, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 192, -112, 64, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 192, -102, 2, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 192, -64, 4, 24, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 194, -82, 28, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 194, -81, 42, 3, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 195, -87, gravity));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 196, -66, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 196, -61, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 196, -56, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 196, -52, 1, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 196, -49, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 196, -44, 21, 4, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 199, -69, 38, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 199, -67, 9, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 199, -65, 8, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 199, -57, 2, 10, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 199, -47, 0, 1));
    gameEngine.addEntity(new SpikeBall(gameEngine, 200, -87, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 201, -49, 5, 2, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 202, -47, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 203, -47, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 204, -173, 8, 16, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 204, -54, 13, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 205, -109, 1, 9, 3));
    gameEngine.addEntity(new SpikeBall(gameEngine, 205, -87, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 206, -109, 5, 9, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 206, -100, 5, 1, 2));
    gameEngine.addEntity(new Ground(gameEngine, 2, 206, -48, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 206, -47, 0, 1));
    gameEngine.addEntity(new Spike(gameEngine, 207, -65, 1, 8, 1));
    gameEngine.addEntity(new SpikeBall(gameEngine, 209, -87, gravity));
    gameEngine.addEntity(new Drill(gameEngine, 209, -52, 8));
    gameEngine.addEntity(new Ground(gameEngine, 2, 210, -55, 7, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 210, -52, 7, 8, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 211, -109, 1, 9, 1));
    gameEngine.addEntity(new Spike(gameEngine, 211, -63, 7, 1, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 211, -62, 6, 7, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 214, -87, gravity));
    gameEngine.addEntity(new Spike(gameEngine, 217, -62, 1, 20, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 217, -42, 39, 2, 1, 0, 0));
    gameEngine.addEntity(new Spike(gameEngine, 218, -43, 3, 1, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 219, -87, gravity));
    gameEngine.addEntity(new Drill(gameEngine, 221, -66, 8));
    gameEngine.addEntity(new Spike(gameEngine, 221, -63, 1, 17, 3));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -104, 15, 13, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -91, 12, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -88, 11, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -67, 15, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -64, 14, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -63, 13, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -62, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 222, -61, 11, 15, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 224, -46, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 224, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 225, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 226, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 227, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 228, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 229, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 230, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 231, -45, 0, 1));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 232, -45, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 233, -83, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 233, -51, 1, 5, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 233, -45, 0, 1));
    gameEngine.addEntity(new Clock(gameEngine, 234, -87, 5000));
    gameEngine.addEntity(new Ground(gameEngine, 2, 234, -82, 1, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 234, -50, 1, 4, 1, 0, 0));
    gameEngine.addEntity(new BeamBarrier(gameEngine, 234, -45, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 2, 235, -49, 1, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 236, -80, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 236, -48, 1, 2, 1, 0, 0));
    gameEngine.addEntity(new SpikeBall(gameEngine, 239, -89, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 239, -63, gravity));
    gameEngine.addEntity(new SpikeBall(gameEngine, 239, -60, gravity));
    gameEngine.addEntity(new Ground(gameEngine, 2, 242, -109, 14, 13, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 242, -80, 14, 21, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 242, -48, 14, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 243, -96, 13, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 243, -81, 13, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 243, -49, 13, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 244, -95, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 244, -82, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 244, -50, 12, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 245, -94, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 245, -83, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 245, -59, 11, 3, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 245, -51, 11, 1, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 246, -93, 10, 10, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 2, 246, -56, 10, 5, 1, 0, 0));
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });
    gameEngine.addEntity(new Water(gameEngine));
}
