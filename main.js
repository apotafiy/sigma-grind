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
ASSET_MANAGER.queueDownload('./sprites/sparky.png');
ASSET_MANAGER.queueDownload('./sprites/spike1.png');
//DogBosds animations
ASSET_MANAGER.queueDownload('./sprites/dogboss/dogboss_walk_130x96.png');
ASSET_MANAGER.queueDownload(
    './sprites/dogboss/dogboss_front_facing_128x96.png'
);
ASSET_MANAGER.queueDownload('./sprites/dogboss/dogboss_projectile_37x32.png');
//player animations
ASSET_MANAGER.queueDownload('./sprites/player/player-idle-43x48.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-run-51x49.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-jump-47x80.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-wallhang-36x65.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-dash-97x52.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-fall-attack-102x80.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-pogo-65x102.png');
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
    loadLevelOne(gameEngine);
    // gameEngine.addEntity(new GroundHorse(gameEngine));

    gameEngine.init(ctx);

    gameEngine.start();
});
