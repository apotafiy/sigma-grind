const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
const SOUND_MANAGER = new SoundManager();
//Title Screen
ASSET_MANAGER.queueDownload('./sprites/title_screen/background.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/press_enter.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/title_card.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/normal.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/hardcore.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/game_over.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/mission_complete.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/level_select.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/level_1.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/level_2.png');
ASSET_MANAGER.queueDownload('./sprites/title_screen/level_3.png');
// Beams
ASSET_MANAGER.queueDownload('./sprites/verticalBeam.png');
ASSET_MANAGER.queueDownload('./sprites/horizontalBeam.png');

// SpikeBall
ASSET_MANAGER.queueDownload('./sprites/spikeball.png');
// Turret
ASSET_MANAGER.queueDownload('./sprites/turret/turret.png');
ASSET_MANAGER.queueDownload('./sprites/turret/turretbullet.png');

//Backgrounds
ASSET_MANAGER.queueDownload('./sprites/backgrounds/water.png');
ASSET_MANAGER.queueDownload('./sprites/backgrounds/mountains.png');
ASSET_MANAGER.queueDownload('./sprites/backgrounds/sky.png');
ASSET_MANAGER.queueDownload(
    './sprites/backgrounds/purplemountain/parallax-mountain-bg.png'
);
ASSET_MANAGER.queueDownload(
    './sprites/backgrounds/purplemountain/parallax-mountain-foreground-trees.png'
);

ASSET_MANAGER.queueDownload(
    './sprites/backgrounds/purplemountain/parallax-mountain-montain-far.png'
);
ASSET_MANAGER.queueDownload(
    './sprites/backgrounds/purplemountain/parallax-mountain-mountains.png'
);
ASSET_MANAGER.queueDownload(
    './sprites/backgrounds/purplemountain/parallax-mountain-trees.png'
);

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
//Erigion
ASSET_MANAGER.queueDownload('./sprites/eregion/eregion_main_64x109.png');
ASSET_MANAGER.queueDownload('./sprites/eregion/eregion_wings_118x142.png');
ASSET_MANAGER.queueDownload('./sprites/dogboss/spike_96x96.png');
ASSET_MANAGER.queueDownload('./sprites/eregion/yellow_ball_66x70.png');
//Sigma Animations
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-beam-1202x177.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/beam-aim-30x110.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-attack1-81x100.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-attack2-117x124.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-attack3-70x101.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-balls-32x32.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-dash-97x100.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-death-119x113.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-head-158x168.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-headAttack-158x168.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-headSpawn-156x170.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-spawnIn-180x117.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-teleport-55x100.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-wave-70x146.png');
ASSET_MANAGER.queueDownload('./sprites/sigma/sigma-wingsOff-106x102.png');
//player animations
ASSET_MANAGER.queueDownload('./sprites/player/player-idle-43x48.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-run-51x49.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-jump-47x80.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-wallhang-36x65.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-dash-97x52.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-fall-attack-102x80.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-pogo-65x102.png');
ASSET_MANAGER.queueDownload('./sprites/player/player-death-60x62.png');
ASSET_MANAGER.queueDownload('./sprites/player/taken_damage_48x56.png');
ASSET_MANAGER.queueDownload('./sprites/player/zerox4sheet.png');
//rush support dog sprite animations
ASSET_MANAGER.queueDownload('./sprites/rush/rush_stand_sit_38x35.png');
ASSET_MANAGER.queueDownload('./sprites/rush/rush_spawn_37x48.png');

//Sign
ASSET_MANAGER.queueDownload('./sprites/misc/sign_64x64.png');
//Explosion
ASSET_MANAGER.queueDownload('./sprites/misc/explosion.png');

//Lava
ASSET_MANAGER.queueDownload('./sprites/misc/lava-1400x26.png');
ASSET_MANAGER.queueDownload('./sprites/misc/lavaBottom.png');
ASSET_MANAGER.queueDownload('./sprites/misc/lavaRising.png');
//Boss Door
ASSET_MANAGER.queueDownload('./sprites/misc/bossDoor-30x64.png');

//player attack Animations
ASSET_MANAGER.queueDownload(
    './sprites/player/zero_attack_right_one_92_64_2.png'
);
ASSET_MANAGER.queueDownload('./sprites/player/zero_attack_right_two.png');
ASSET_MANAGER.queueDownload(
    './sprites/player/zero_attack_right_three_114x64-Sheet.png'
);

// Player health bar, lives, and boss health bar
ASSET_MANAGER.queueDownload('./sprites/player/health-bars.png');

// Items
ASSET_MANAGER.queueDownload('./sprites/items/health_pack_full_22x31.png');
ASSET_MANAGER.queueDownload('./sprites/items/health_pack_small_25x16.png');
ASSET_MANAGER.queueDownload('./sprites/items/clock-16x20.png');

// Checkpoint
ASSET_MANAGER.queueDownload('./sprites/misc/checkpoint.png');

// Player sound effects
SOUND_MANAGER.queueDownload('player_jump', './sounds/player/jump_voice.wav');
SOUND_MANAGER.queueDownload('player_walk', './sounds/player/player_walk.wav');
SOUND_MANAGER.queueDownload('player_dash', './sounds/player/player_dash.wav');
SOUND_MANAGER.queueDownload('player_grunt_1', './sounds/player/grunt_1.wav');
SOUND_MANAGER.queueDownload('player_grunt_2', './sounds/player/grunt_2.wav');
SOUND_MANAGER.queueDownload('player_grunt_3', './sounds/player/grunt_3.wav');
SOUND_MANAGER.queueDownload('player_grunt_4', './sounds/player/grunt_4.wav');
SOUND_MANAGER.queueDownload('player_land', './sounds/player/land.wav');
SOUND_MANAGER.queueDownload(
    'player_attack',
    './sounds/player/sword_attack_short.wav'
);

//Load in Dob Boss sounds
SOUND_MANAGER.queueDownload('dogboss_roar', './sounds/dogboss/roar.wav');
SOUND_MANAGER.queueDownload('dogboss_walk', './sounds/dogboss/walk.wav');
SOUND_MANAGER.queueDownload(
    'dogboss_launch_projectile',
    './sounds/dogboss/launch_attack.wav'
);
// sigma SFX
SOUND_MANAGER.queueDownload('teleport', './sounds/sigma/teleport.wav');
SOUND_MANAGER.queueDownload('dash', './sounds/sigma/dash.wav');
SOUND_MANAGER.queueDownload('laser', './sounds/sigma/laser.wav');
SOUND_MANAGER.queueDownload('wave', './sounds/sigma/wave.wav');
SOUND_MANAGER.queueDownload('balls', './sounds/sigma/balls.wav');

//Eregion sound effects
SOUND_MANAGER.queueDownload('eregion_roar', './sounds/eregion/roar.mp3');
SOUND_MANAGER.queueDownload(
    'eregion_teleport',
    './sounds/eregion/teleport.ogg'
);
SOUND_MANAGER.queueDownload('eregion_death', './sounds/eregion/death.ogg');
SOUND_MANAGER.queueDownload(
    'eregion_ball_attack',
    './sounds/eregion/ball_attack.WAV'
);
SOUND_MANAGER.queueDownload(
    'eregion_up_attack',
    './sounds/eregion/up_attack.ogg'
);
//turret sound effects
SOUND_MANAGER.queueDownload('turret_fire', './sounds/turret/fire.ogg');
//rush soundEffects
SOUND_MANAGER.queueDownload('rush_teleport', './sounds/rush/teleport.mp3');
//background Music
SOUND_MANAGER.queueDownload('background_1', ' ./sounds/background_song_1.wav');
// menu sound soundEffects
SOUND_MANAGER.queueDownload('menu_select', ' ./sounds/menu/enter.wav');
SOUND_MANAGER.queueDownload('menu_cycle', ' ./sounds/menu/option_switch.wav');
SOUND_MANAGER.queueDownload('menu_music', ' ./sounds/menu/menu_music.wav');

//item soundEffects
SOUND_MANAGER.queueDownload('heal_1', ' ./sounds/items/heal.wav');
//load in all sounds
SOUND_MANAGER.downloadAll();

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById('gameWorld');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    let gravity = 0.2;
    //scene manager for scrolling
    gameEngine.init(ctx);

    gameEngine.addEntity(new SceneManager(gameEngine, 0));
    // loadLevelOne(gameEngine);

    // gameEngine.addEntity(new GroundHorse(gameEngine));

    // start game with 60 fps cap
    gameEngine.start();
});
