const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/mettaur/mettaur-walk.png")
ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById('gameWorld');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  gameEngine.addEntity(new Mettaur(gameEngine));
  gameEngine.init(ctx);

  gameEngine.start();
});
