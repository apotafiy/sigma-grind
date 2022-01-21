const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
//Backgrounds
ASSET_MANAGER.queueDownload("./sprites/backgrounds/water.png")
//Ground tiles
ASSET_MANAGER.queueDownload("./sprites/ground/ground-tile.png");
//Mettaur Animations
ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-walk.png");
ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-jump.png");
ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-duck.png");
ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-fall.png");
ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById('gameWorld');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  let gravity = 0.2;
  gameEngine.addEntity(new Ground(gameEngine,0,0, 450, 18,4));
  gameEngine.addEntity(new Mettaur(gameEngine, 800,0, gravity));
  gameEngine.addEntity(new Water(gameEngine));
 
  gameEngine.init(ctx);

  gameEngine.start();
});
