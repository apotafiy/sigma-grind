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
ASSET_MANAGER.queueDownload('./sprites/groundhorse.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-idle-43x48.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-run-51x49.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-jump-47x80.png');
ASSET_MANAGER.queueDownload('./sprites/player/zerox4sheet.png');
ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById('gameWorld');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    let gravity = 0.2;
    //scene manager for scrolling
    gameEngine.addEntity(new SceneManager(gameEngine));
    gameEngine.addEntity(new GroundHorse(gameEngine, 256 * 3, 355));

    gameEngine.addEntity(new Player(gameEngine, 120, 0, gravity));

    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 8, 15, 4, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 5, 8, 45, 8, 1, 0, 0));
    gameEngine.addEntity(new Ground(gameEngine, 1, 50, 2, 10, 16, 1, 0, 1));

    // gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 8, 1,0,0,1));
    //Changed 4-> 1 xoffset
    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 7, 15, 1, 1, 0, 1));

    gameEngine.addEntity(new Ground(gameEngine, 1, 1, 6, 8, 1, 1, 0, 1));
    gameEngine.addEntity(new Ground(gameEngine, 1, 3, 5, 2, 1, 1, 0, 0));

    gameEngine.addEntity(new Ground(gameEngine, 1, -6, 0, 6, 12, 1, 0, 0));

    gameEngine.addEntity(new Ground(gameEngine, 1, 0, 0, 1, 8, 1, 0, 1));

    //do all the grass checkForGrass
    gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Ground) entity.checkForGrass();
    });
    gameEngine.addEntity(new Mettaur(gameEngine, 800, 0, gravity));
    for (let i = 0; i < 8; i++) {
        gameEngine.addEntity(
            new Mettaur(gameEngine, 200 + i * 400, 0, gravity)
        );
    }
    gameEngine.addEntity(new Water(gameEngine));
    // gameEngine.addEntity(new GroundHorse(gameEngine));

    gameEngine.init(ctx);

    gameEngine.start();
});
