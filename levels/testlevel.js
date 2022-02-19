function loadTestLevel(gameEngine) {
  let gravity = 0.2;
  gameEngine.addEntity(new Player(gameEngine, 11, -12));
  gameEngine.addEntity(new Ground(gameEngine, 1, 0, -262, 41, 8, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 0, -254, 7, 254, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -254, 27, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -252, 1, 7, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -231, 2, 13, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -218, 1, 21, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -167, 2, 26, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -133, 1, 6, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -103, 6, 4, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -99, 4, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -95, 1, 13, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -76, 1, 23, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -38, 23, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -37, 23, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -35, 23, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -17, 3, 4, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 7, -13, 1, 5, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 7, -8, 34, 8, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 8, -93, 1, 11, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 8, -69, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 9, -230, 2, 11, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 9, -166, 2, 25, 1, 0, 0));
  gameEngine.addEntity(
    new Rush(gameEngine, 9, -104, 5, "Bark! Bark! Whimper! Bark! Bark!")
  );
  gameEngine.addEntity(new Ground(gameEngine, 1, 9, -89, 1, 7, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 10, -88, 1, 6, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 10, -16, 2, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 10, -14, 17, 1, 1, 0, 0));
  gameEngine.addEntity(
    new Rush(gameEngine, 10, -9, 5, "Bark! Bark! Whimper! Bark! Bark!")
  );
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -239, 6, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -229, 1, 9, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -165, 1, 24, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -87, 1, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -46, 30, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 11, -44, 23, 1, 0));
  gameEngine.addEntity(new Spike(gameEngine, 11, -29, 23, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -28, 30, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -25, 21, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 11, -24, 4, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 12, -227, 1, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 12, -163, 1, 22, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 12, -86, 6, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 12, -74, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 12, -64, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 12, -63, 4, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 12, -15, 15, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 13, -150, 2, 9, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 13, -110, 1, 3, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 13, -17, gravity));
  gameEngine.addEntity(new Ground(gameEngine, 1, 14, -210, 13, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 14, -189, 13, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 14, -133, 13, 27, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 14, -55, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 14, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 14, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 14, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 14, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 14, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 15, -212, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 15, -205, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 15, -191, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 15, -184, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 15, -148, 1, 7, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 15, -135, 11, 2, 1, 0, 0));
  gameEngine.addEntity(new Drill(gameEngine, 15, -70, 8));
  gameEngine.addEntity(new Spike(gameEngine, 15, -24, 16, 1, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 15, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 15, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 15, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 15, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 15, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 16, -213, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 16, -203, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 16, -192, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 16, -182, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 16, -144, 1, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 16, -136, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 16, -17, gravity));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 16, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 16, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 16, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 16, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 16, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 17, -220, 2, 2, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 17, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 17, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 17, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 17, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 17, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -214, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -202, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -193, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -181, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -174, 5, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -137, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -106, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 18, -96, 5, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 18, -95, 5, 1, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 18, -17, gravity));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 18, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 18, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 18, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 18, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 18, -9));
  gameEngine.addEntity(new Drill(gameEngine, 19, -142, 8));
  gameEngine.addEntity(new FullHealthPack(gameEngine, 19, -138));
  gameEngine.addEntity(new Ground(gameEngine, 1, 19, -79, 4, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 19, -77, 4, 1, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 19, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 19, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 19, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 19, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 19, -9));
  gameEngine.addEntity(new Drill(gameEngine, 20, -248, 8));
  gameEngine.addEntity(
    new Rush(gameEngine, 20, -215, 5, "Bark! Bark! Whimper! Bark! Bark!")
  );
  gameEngine.addEntity(
    new Rush(gameEngine, 20, -175, 5, "Bark! Bark! Whimper! Bark! Bark!")
  );
  gameEngine.addEntity(new Drill(gameEngine, 20, -170, 8));
  gameEngine.addEntity(new Drill(gameEngine, 20, -142, 8));
  gameEngine.addEntity(new Drill(gameEngine, 20, -100, 8));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 20, -80));
  gameEngine.addEntity(new Ground(gameEngine, 1, 20, -60, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 20, -17, gravity));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 20, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 20, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 20, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 20, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 20, -9));
  gameEngine.addEntity(new Drill(gameEngine, 21, -170, 8));
  gameEngine.addEntity(
    new Rush(gameEngine, 21, -61, 5, "Bark! Bark! Whimper! Bark! Bark!")
  );
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 21, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 21, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 21, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 21, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 21, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 22, -220, 2, 2, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 22, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 22, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 22, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 22, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 22, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 23, -144, 18, 3, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 23, -86, 18, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 23, -53, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 23, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 23, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 23, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 23, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 23, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 24, -239, 6, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 24, -16, 3, 1, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 24, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 24, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 24, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 24, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 24, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 25, -148, 16, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 25, -74, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Drill(gameEngine, 25, -70, 8));
  gameEngine.addEntity(new Ground(gameEngine, 1, 25, -64, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 25, -63, 4, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 25, -17, 1, 1, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 25, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 25, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 25, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 25, -10));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 25, -9));
  gameEngine.addEntity(new Ground(gameEngine, 1, 26, -150, 15, 2, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 26, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 26, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 26, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 26, -10));
  gameEngine.addEntity(new Ground(gameEngine, 1, 26, -9, 15, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 27, -110, 1, 3, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 27, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 27, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 27, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 27, -10));
  gameEngine.addEntity(new Ground(gameEngine, 1, 28, -227, 13, 5, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 28, -163, 13, 13, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 28, -103, 13, 4, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 28, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 28, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 28, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 28, -10));
  gameEngine.addEntity(new Ground(gameEngine, 1, 29, -229, 12, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 29, -222, 12, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 29, -165, 12, 2, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 29, -87, 12, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 29, -69, 4, 1, 1, 0, 0));
  gameEngine.addEntity(new Mettaur(gameEngine, 29, -47, gravity));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 29, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 29, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 29, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 29, -10));
  gameEngine.addEntity(new Ground(gameEngine, 1, 30, -230, 11, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 30, -220, 11, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 30, -99, 4, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 30, -88, 11, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 30, -50, 2, 4, 1, 0, 0));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 30, -13));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 30, -12));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 30, -11));
  gameEngine.addEntity(new SmallHealthPack(gameEngine, 30, -10));
  gameEngine.addEntity(new Ground(gameEngine, 1, 31, -166, 10, 1, 1, 0, 0));
  gameEngine.addEntity(
    new Rush(gameEngine, 31, -104, 5, "Bark! Bark! Whimper! Bark! Bark!")
  );
  gameEngine.addEntity(new Ground(gameEngine, 1, 31, -89, 10, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 31, -21, 1, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 31, -20, 10, 11, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 32, -231, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 32, -219, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 32, -93, 9, 4, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 32, -22, 1, 1, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 32, -21, 9, 1, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 33, -252, 1, 7, 0));
  gameEngine.addEntity(new Spike(gameEngine, 33, -190, 1, 24, 0));
  gameEngine.addEntity(new Spike(gameEngine, 33, -133, 1, 6, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 33, -95, 8, 2, 1, 0, 0));
  gameEngine.addEntity(new Spike(gameEngine, 33, -76, 1, 30, 0));
  gameEngine.addEntity(new Spike(gameEngine, 33, -25, 1, 3, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 33, -22, 8, 1, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 34, -254, 7, 23, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 34, -218, 7, 52, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 34, -141, 7, 38, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 34, -99, 7, 4, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 34, -82, 7, 36, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 34, -44, 7, 16, 1, 0, 0));
  gameEngine.addEntity(new Ground(gameEngine, 1, 34, -25, 7, 3, 1, 0, 0));
  gameEngine.entities.forEach(function (entity) {
    if (entity instanceof Ground) entity.checkForGrass();
  });
  gameEngine.addEntity(new Water(gameEngine));
}
  