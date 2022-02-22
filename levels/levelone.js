function loadLevelOne(gameEngine) {
  let gravity = 0.2;
  gameEngine.addEntity(new Player(gameEngine, 11, -12));
  gameEngine.addEntity(new Ground(gameEngine, 2, 0, -262, 41, 8, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 0, -254, 7, 254, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -254, 27, 1, 2));
  gameEngine.addEntity(new Spike(gameEngine, 7, -252, 1, 7, 1));
  gameEngine.addEntity(new Ground(gameEngine, 2, 7, -231, 2, 13, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -218, 1, 21, 1));
  gameEngine.addEntity(new Ground(gameEngine, 2, 7, -167, 2, 26, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -134, 1, 31, 1));
  gameEngine.addEntity(new Ground(gameEngine, 2, 7, -103, 6, 4, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -99, 4, 1, 2));
  gameEngine.addEntity(new Ground(gameEngine, 2, 7, -95, 1, 13, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -76, 1, 23, 1));
  gameEngine.addEntity(new Spike(gameEngine, 7, -38, 23, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 7, -37, 23, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -35, 23, 1, 2));
  gameEngine.addEntity(new Ground(gameEngine, 2, 7, -17, 3, 4, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -13, 1, 5, 1));
  gameEngine.addEntity(new Ground(gameEngine, 2, 7, -8, 34, 8, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 8, -93, 1, 11, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 8, -69, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 9, -230, 2, 11, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 9, -166, 2, 25, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 9, -89, 1, 7, 1, 0, 0));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -135, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -132, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -129, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -126, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -123, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -120, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -117, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -114, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -111, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 10, -108, gravity));
  gameEngine.addEntity(new Ground(gameEngine, 2, 10, -88, 1, 6, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 10, -16, 2, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -239, 6, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -229, 1, 9, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -165, 1, 24, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -87, 1, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -46, 30, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 11, -44, 23, 1, 2));
  gameEngine.addEntity(new Spike(gameEngine, 11, -29, 23, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -28, 30, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -25, 21, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 11, -24, 4, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 12, -227, 1, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 12, -163, 1, 22, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 12, -86, 6, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 12, -74, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 12, -64, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 12, -63, 4, 1, 2));
  gameEngine.addEntity(new Ground(gameEngine, 2, 12, -15, 15, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 13, -150, 2, 9, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 13, -132, 1, 25, 3));
  gameEngine.addEntity(new Mettaur(gameEngine, 13, -17, gravity));
  gameEngine.addEntity(new Ground(gameEngine, 2, 14, -210, 13, 5, 1, 0, 0));
  gameEngine.addEntity(new SpikeBall(gameEngine, 14, -189, gravity));
  gameEngine.addEntity(new Ground(gameEngine, 2, 14, -133, 13, 27, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 14, -55, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 15, -212, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 15, -205, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 15, -148, 1, 7, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 15, -135, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Drill(gameEngine, 15, -70, 8));
  gameEngine.addEntity(new Spike(gameEngine, 15, -24, 17, 1, 2));
  gameEngine.addEntity(new Ground(gameEngine, 2, 16, -213, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 16, -203, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 16, -144, 1, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 16, -136, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 16, -17, gravity));
  gameEngine.addEntity(new Ground(gameEngine, 2, 17, -220, 2, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 18, -214, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 18, -202, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 18, -174, 5, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 18, -137, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 18, -106, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 18, -96, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 18, -95, 5, 1, 2));
  gameEngine.addEntity(new Mettaur(gameEngine, 18, -17, gravity));
  gameEngine.addEntity(new Drill(gameEngine, 19, -142, 8));
  gameEngine.addEntity(new FullHealthPack(gameEngine, 19, -138));
  gameEngine.addEntity(new Ground(gameEngine, 2, 19, -79, 4, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 19, -77, 4, 1, 2));
  gameEngine.addEntity(new Drill(gameEngine, 20, -248, 8));
  gameEngine.addEntity(new SpikeBall(gameEngine, 20, -189, gravity));
  gameEngine.addEntity(new Drill(gameEngine, 20, -170, 8));
  gameEngine.addEntity(new Drill(gameEngine, 20, -142, 8));
  gameEngine.addEntity(new Drill(gameEngine, 20, -100, 8));
  gameEngine.addEntity(new Ground(gameEngine, 2, 20, -60, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 20, -17, gravity));
  gameEngine.addEntity(new Drill(gameEngine, 21, -170, 8));
  gameEngine.addEntity(new Ground(gameEngine, 2, 22, -220, 2, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 23, -144, 18, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 23, -86, 18, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 23, -53, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 24, -239, 6, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 24, -16, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 25, -148, 16, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 25, -74, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Drill(gameEngine, 25, -70, 8));
  gameEngine.addEntity(new Ground(gameEngine, 2, 25, -64, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 25, -63, 4, 1, 2));
  gameEngine.addEntity(new Ground(gameEngine, 2, 25, -17, 1, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 26, -150, 15, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 26, -9, 15, 1, 1, 0, 0));
  gameEngine.addEntity(new SpikeBall(gameEngine, 27, -189, gravity));
  gameEngine.addEntity(new Ground(gameEngine, 2, 28, -227, 13, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 28, -163, 13, 13, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 28, -103, 13, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 29, -229, 12, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 29, -222, 12, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 29, -165, 12, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 29, -87, 12, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 29, -69, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 29, -47, gravity));
  gameEngine.addEntity(new Ground(gameEngine, 2, 30, -230, 11, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 30, -220, 11, 1, 1, 0, 0));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -135, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -132, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -129, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -126, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -123, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -120, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -117, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -114, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -111, gravity));
  gameEngine.addEntity(new SpikeBall(gameEngine, 30, -108, gravity));
  gameEngine.addEntity(new Spike(gameEngine, 30, -99, 4, 1, 2));
  gameEngine.addEntity(new Ground(gameEngine, 2, 30, -88, 11, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 30, -50, 2, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 31, -166, 10, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 31, -89, 10, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 31, -21, 1, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 31, -20, 10, 11, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 32, -231, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 32, -219, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 32, -93, 9, 4, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 32, -22, 1, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 32, -21, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 33, -252, 1, 7, 3));
  gameEngine.addEntity(new Spike(gameEngine, 33, -190, 1, 24, 3));
  gameEngine.addEntity(new Spike(gameEngine, 33, -133, 1, 30, 3));
  gameEngine.addEntity(new Ground(gameEngine, 2, 33, -95, 8, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 33, -76, 1, 30, 3));
  gameEngine.addEntity(new Spike(gameEngine, 33, -25, 1, 1, 2));
  gameEngine.addEntity(new Spike(gameEngine, 33, -23, 1, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 33, -22, 8, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 34, -254, 7, 23, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 34, -218, 7, 52, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 34, -141, 7, 38, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 34, -99, 7, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 34, -82, 7, 36, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 34, -44, 7, 16, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 2, 34, -25, 7, 3, 1, 0, 0));
  gameEngine.entities.forEach(function (entity) {
    if (entity instanceof Ground) entity.checkForGrass();
  });
  gameEngine.addEntity(new Water(gameEngine));
}
