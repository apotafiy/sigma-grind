function SceneManagerDatGUI(game, sceneManager) {
    // Dat GUI stuff
    game.gui
        .add(params, 'fps')
        .min(1)
        .max(144)
        .step(1)
        .onChange((val) => (params.fps = val));
    sceneManager.cameraFolder = game.gui.addFolder('Camera values');
    sceneManager.testValues = {
        interpolation: sceneManager.interpolation,
    };
    sceneManager.cameraFolder
        .add(sceneManager.testValues, 'interpolation')
        .min(0)
        .max(1)
        .step(0.001)
        .onChange((val) => {
            sceneManager.interpolation = val;
        })
        .name('Interpolation');
}
function PlayerDatGUI(game, player) {
    // Dat GUI stuff
    player.playerFolder = game.gui.addFolder('Player values');
    player.playerFolder
        .add(player, 'attackSpeed')
        .min(0.005)
        .max(0.5)
        .step(0.005)
        .onChange((val) => {
            player.attackSpeed = val;
            player.loadAnimations();
        });
    player.playerFolder
        .add(player.constants, 'MIN_RUN')
        .min(0)
        .max(50)
        .step(1)
        .onChange((val) => {
            MIN_RUN = val;
        });
    player.playerFolder
        .add(player.constants, 'MAX_RUN')
        .min(0)
        .max(300)
        .step(1)
        .onChange((val) => {
            MAX_RUN = val;
        });
    player.playerFolder
        .add(player.constants, 'MAX_DASH')
        .min(0)
        .max(1000)
        .step(1)
        .onChange((val) => {
            MAX_DASH = val;
        });
    player.playerFolder
        .add(player.constants, 'ACC_RUN')
        .min(0)
        .max(1000)
        .step(1)
        .onChange((val) => {
            ACC_RUN = val;
        });
    player.playerFolder
        .add(player.constants, 'DEC_REL')
        .min(0)
        .max(1000)
        .step(1)
        .onChange((val) => {
            DEC_REL = val;
        });
    player.playerFolder
        .add(player.constants, 'DEC_SKID')
        .min(0)
        .max(1000)
        .step(1)
        .onChange((val) => {
            DEC_SKID = val;
        });
    player.playerFolder
        .add(player.constants, 'STOP_FALL')
        .min(0)
        .max(3000)
        .step(1)
        .onChange((val) => {
            STOP_FALL = val;
        });
    player.playerFolder
        .add(player.constants, 'STOP_FALL_A')
        .min(0)
        .max(1000)
        .step(1)
        .onChange((val) => {
            STOP_FALL_A = val;
        });
    player.playerFolder
        .add(player.constants, 'RUN_FALL')
        .min(0)
        .max(4000)
        .step(1)
        .onChange((val) => {
            RUN_FALL = val;
        });
    player.playerFolder
        .add(player.constants, 'RUN_FALL_A')
        .min(0)
        .max(1000)
        .step(1)
        .onChange((val) => {
            RUN_FALL_A = val;
        });
    player.playerFolder
        .add(player.constants, 'MAX_FALL')
        .min(0)
        .max(1000)
        .step(1)
        .onChange((val) => {
            MAX_FALL = val;
        });
    player.playerFolder
        .add(player.constants, 'STOP_JUMP')
        .min(-1000)
        .max(0)
        .step(1)
        .onChange((val) => {
            STOP_JUMP = val;
        });
    player.playerFolder
        .add(player.constants, 'RUN_JUMP')
        .min(-1000)
        .max(0)
        .step(1)
        .onChange((val) => {
            RUN_JUMP = val;
        });
    player.playerFolder
        .add(player.constants, 'WALL_JUMP')
        .min(0)
        .max(600)
        .step(1)
        .onChange((val) => {
            WALL_JUMP = val;
        });
    player.playerFolder
        .add(player.constants, 'POGO_JUMP')
        .min(-1000)
        .max(0)
        .step(1)
        .onChange((val) => {
            POGO_JUMP = val;
        });
}
