const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
//Backgrounds
ASSET_MANAGER.queueDownload("./sprites/backgrounds/water.png")
//Ground tiles
ASSET_MANAGER.queueDownload("./sprites/ground/ground-tile.png");
//Mettaur Animations
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-walk.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-walk-right.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-jump.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-jump-right.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-duck.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-duck-right.png');
ASSET_MANAGER.queueDownload('./sprites/mettaur/mettaur-fall.png');
ASSET_MANAGER.queueDownload("./sprites/mettaur/death.png");
ASSET_MANAGER.queueDownload("./sprites/mettaur/fire.png");
ASSET_MANAGER.queueDownload('./sprites/groundhorse.png');
ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById('gameWorld');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  let gravity = 0.2;
  gameEngine.addEntity(new Ground(gameEngine,1,0, 450, 16,4));
  gameEngine.addEntity(new Ground(gameEngine,0,640, 386,5 ,1));

  gameEngine.addEntity(new Ground(gameEngine,0,0, 0, 1,8));
  gameEngine.addEntity(new Ground(gameEngine,0,950, 0, 1,8));
  gameEngine.addEntity(new Mettaur(gameEngine, 800,0, gravity));
  for(let i = 0; i < 0; i++){
    gameEngine.addEntity(new Mettaur(gameEngine, 200 + (i * 50),0, gravity));
  }
  gameEngine.addEntity(new Water(gameEngine));
  // gameEngine.addEntity(new GroundHorse(gameEngine));
 
  gameEngine.init(ctx);

  gameEngine.start();
});
