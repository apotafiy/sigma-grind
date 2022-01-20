const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Queue assets for downloading here:

// Mettaur Animations
// ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-walk.png");
// ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-jump.png");
// ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-duck.png");
// ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-fall.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    // gameEngine.addEntity(new Mettaur(gameEngine));

    gameEngine.init(ctx);

    gameEngine.start();
});
