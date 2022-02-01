const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
//Backgrounds
ASSET_MANAGER.queueDownload('./sprites/backgrounds/water.png');
//Ground tiles
ASSET_MANAGER.queueDownload('./sprites/ground/ground-tile.png');
ASSET_MANAGER.queueDownload('./sprites/ground/ground_tiles.png');
//Mettaur Animations
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-walk.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-walk-right.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-jump.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-jump-right.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-duck.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-duck-right.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-fall.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/death.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/fire.png');
ASSET_MANAGER.queueDownload('./sprites/drill/drill.png');
ASSET_MANAGER.queueDownload('./sprites/drill/drill_ready.png');
ASSET_MANAGER.queueDownload('./sprites/groundhorse.png');
//player animations
ASSET_MANAGER.queueDownload('./sprites/player/player-idle-43x48.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-run-51x49.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-jump-47x80.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-wallhang-36x65.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-dash-97x52.png');
ASSET_MANAGER.queueDownload('./sprites/player/zerox4sheet.png');
//player attack Animations
ASSET_MANAGER.queueDownload(
    './sprites/player/zero_attack_right_one_92_64_2.png'
);
ASSET_MANAGER.queueDownload('./sprites/player/zero_attack_right_two.png');
ASSET_MANAGER.queueDownload(
    './sprites/player/zero_attack_right_three_114x64-Sheet.png'
);
ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById('gameWorld');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    let gravity = 0.2;
    //scene manager for scrolling

    gameEngine.addEntity(new Player(gameEngine, 200, 0, gravity));
    gameEngine.addEntity(new Drill(gameEngine, 11, 2, 120));
    gameEngine.addEntity(new Drill(gameEngine, 14, 2, 120));
    gameEngine.addEntity(new Drill(gameEngine, 17, 2, 120));

    gameEngine.addEntity(new SceneManager(gameEngine));
    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 8, 15, 4, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 5, 8, 45, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 50, 2, 10, 16, 1, 0, 1));

    // gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 8, 1,0,0,1));
    //Changed 4-> 1 xoffset
    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 15, 1, 1, 0, 1));

    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 6, 8, 1, 1, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 3, 5, 2, 1, 1, 0, 0));

    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 0, 1, 8, 1, 0, 1));

    //add platforms for the player to jump on
    gameEngine.addEntity(new Ground(gameEngine, 1, 20, 5, 14, 1, 1, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 24, 3, 5, 2, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 32, 2, 2, 1, 1, 1, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 36, 2, 2, 6, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 40, 1, 2, 7, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 44, 1, 2, 1, 1, 1, 1));
    // gameEngine.addEntity(new Ground(gameEngine, 1, 40, 0, 2, 1,1,1,1));

    //do all the grass checkForGrass
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });
    gameEngine.addEntity(new Mettaur(gameEngine, 800, 0, gravity));
    for (let i = 0; i < 100; i++) {
        gameEngine.addEntity(
            new Mettaur(gameEngine, 200 + i * 100, 0, gravity)
        );
    }
    gameEngine.addEntity(new GroundHorse(gameEngine, 36, 0));
    gameEngine.addEntity(new GroundHorse(gameEngine, 9, 5, true));
    gameEngine.addEntity(new GroundHorse(gameEngine, 10, 5));
    gameEngine.addEntity(new GroundHorse(gameEngine, 11, 5));
    gameEngine.addEntity(new GroundHorse(gameEngine, 12, 5));
    gameEngine.addEntity(new GroundHorse(gameEngine, 13, 5));
    gameEngine.addEntity(new GroundHorse(gameEngine, 14, 5));

    gameEngine.addEntity(new GroundHorse(gameEngine, 36, 0));
    gameEngine.addEntity(new Water(gameEngine));

    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 0, 1, 8, 1, 0, 1));

    gameEngine.addEntity(new Water(gameEngine));
    // gameEngine.addEntity(new GroundHorse(gameEngine));

    gameEngine.init(ctx);

    gameEngine.start();
});
