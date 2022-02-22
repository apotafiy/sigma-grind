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
// Beams
ASSET_MANAGER.queueDownload('./sprites/verticalBeam.png');
ASSET_MANAGER.queueDownload('./sprites/horizontalBeam.png');

// SpikeBall
ASSET_MANAGER.queueDownload('./sprites/spikeball.png');

//Backgrounds
ASSET_MANAGER.queueDownload('./sprites/backgrounds/water.png');
ASSET_MANAGER.queueDownload('./sprites/backgrounds/mountains.png');
ASSET_MANAGER.queueDownload('./sprites/backgrounds/sky.png');
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
ASSET_MANAGER.queueDownload('./sprites/dogboss/spike_96x96.png');
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
//player attack Animations
ASSET_MANAGER.queueDownload(
    './sprites/player/zero_attack_right_one_92_64_2.png'
);
ASSET_MANAGER.queueDownload('./sprites/player/zero_attack_right_two.png');
ASSET_MANAGER.queueDownload(
    './sprites/player/zero_attack_right_three_114x64-Sheet.png'
);
//items
ASSET_MANAGER.queueDownload('./sprites/items/health_pack_full_22x31.png');
ASSET_MANAGER.queueDownload('./sprites/items/health_pack_small_25x16.png');
//load in player sounds
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
//rush soundEffects
SOUND_MANAGER.queueDownload('rush_teleport', './sounds/rush/teleport.mp3');
//background Music
SOUND_MANAGER.queueDownload('background_1', ' ./sounds/background_song_1.mp3');
// menu sound soundEffects
SOUND_MANAGER.queueDownload('menu_select', ' ./sounds/menu/enter.wav');
SOUND_MANAGER.queueDownload('menu_cycle', ' ./sounds/menu/option_switch.wav');
SOUND_MANAGER.queueDownload('menu_music', ' ./sounds/menu/menu_music.mp3');

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
    gameEngine.addEntity(new SceneManager(gameEngine, 0));
    // loadLevelOne(gameEngine);

    // gameEngine.addEntity(new GroundHorse(gameEngine));

    gameEngine.init(ctx);

    // start game with 60 fps cap
    gameEngine.start(60);
});
