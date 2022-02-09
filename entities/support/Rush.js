class Rush {
    /**
     * time per frame
     */
    /**
     * 0 = walk left
     * 1 = walk right
     * 2 = jump
     * 3 = ?
     * 4 = get up
     * 5 = dead
     */
    constructor(game, x, y, lines, text ) {
        this.fontSize = 15;
        this.lines = 5 // figure out how to make it work for other amts toolines;
        this.scale = 2;
        this.game = game;
        this.currentState = -1;
        this.animations = [[], []];
        this.x = x * 64;
        this.y = y * 64;
        this.direction = 1;
        this.dirIndex = 1;
        this.xOffset = 0;
        this.yOffSet = 0;
        this.loadAnimation();
        //bounding box
        this.BB = new BoundingBox(this.x, this.y, 38 * this.scale, 35 * this.scale);
        this.lastBB = this.BB;
        this.warpOutTimer = -1;
        this.warpInTimer = -1;
        this.text = text;
        this.showText = false;

    }
    /**
     * 0 is spawn in
     * 1 is warp out
     * 2 is sitting
     */
    setOffset(state){
        switch(state){
            case 0:
                this.xOffset = 0;
                this.yOffSet = -25;
                return;
            case 1:
                this.xOffset = 0;
                this.yOffSet = -25;
                return;
            case 2:
                this.xOffset = 0;
                this.yOffSet = -0;
                return;
            default:
                this.xOffset = 0;
                this.yOffSet = 0;
        }
    }
    loadAnimation() {
        this.animations[1][0] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/rush/rush_spawn_37x48.png'),
            0,
            0,
            37,
            48,
            8,
            0.1,
            0,
            0,
            0
        );
        //warp out
        this.animations[1][1] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/rush/rush_spawn_37x48.png'),
            0,
            0,
            37,
            48,
            8,
            0.1,
            0,
            1,
            0
        );
        //sitting
        this.animations[1][2] = new Animator(
            ASSET_MANAGER.getAsset('./sprites/rush/rush_stand_sit_38x35.png'),
            75,
            0,
            38,
            35,
            4,
            0.1,
            0,
            0,
            1
        );


    }
    updateBB() {
        this.lastBB = this.BB;
        const yOffSet = 6; // Make sprite goes below the ground slightly not the bounding box itself
        this.BB = new BoundingBox(this.x, this.y, 38 * this.scale, (35 - yOffSet) * this.scale);
    }
    update() {

        //need to handle the spawn in logic
        //get distance to player 
        if(this.getXDistance(this.x,this.game.player.x) >= 400 && this.currentState == 2){
            //start timer to spawn out timer then set to -1
            this.currentState = 1;

        }
        if(this.currentState == 1){
            if(this.warpOutTimer < 0){
                this.warpOutTimer = 48;
            } else {
                this.warpOutTimer  -=1;
                if(this.warpOutTimer == 0){
                    this.warpOutTimer = -1;
                    //reset animation 
                    this.animations[1][this.currentState].elapsedTime = 0;
                    this.currentState = -1;
                }

            }
        }

        if(this.getXDistance(this.x,this.game.player.x) <300 && this.currentState == -1){
            //start timer to spawn out timer then set to -1
            this.currentState = 0;

        }
        if(this.currentState == 0){
            if(this.warpInTimer < 0){
                this.warpInTimer = 48;
            } else {
                this.warpInTimer -=1;
                if(this.warpInTimer == 0){
                    this.warpInTimer = -1;
                    //reset animation 
                    this.animations[1][this.currentState].elapsedTime = 0;
                    //sync it up with stage 2
                    this.animations[1][this.currentState].elapsedTime = 0;
                    this.currentState = 2;
                }

            }
        }
        if(getDistance(this,this.game.player) < 200){
            this.showText = true;
        } else {
            this.showText = false;
        }
        //update placement based on state
        this.setOffset(this.currentState);
    }

    draw(ctx) {
        let that = this;
      if(this.currentState != -1){
        that.animations[1][that.currentState].drawFrame(
            that.game.clockTick,
            ctx,
            that.x - that.game.camera.x + that.xOffset,
            that.y - that.game.camera.y + that.yOffSet,
            2
        );
      }

      if(this.showText){
          //lets do max 5 lines of text
          let lines = [];
          let temp = "";
          let totalLen = this.text.length;
          let maxlen = 0;
          //we want at least len/5 char on each line its ok if it is over
          let splitText = this.text.split(" ");
          for(let i = 0; i < splitText.length; i++){
              if(temp.length >= totalLen/this.lines){
                  if(temp.length > maxlen) maxlen = temp.length;
                  lines.push(temp);
                  temp = splitText[i];
              } else {
                  temp = temp + " " + splitText[i];
              }
          }
          if(temp.length  > 0) lines.push(temp);
          if(temp.length > maxlen) maxlen = temp.length;
          console.log(lines);
          //rownum is the number of rows after we split the string
          //figure out the size of the box needed for the text
          let boxlen = (this.fontSize * maxlen) /1.5;
          let boxwidth =  this.fontSize + this.fontSize * lines.length; 
          //set properties of rect
          ctx.fillStyle = "white";
          ctx.strokeStyle = "black";
          ctx.fillRect(
            that.BB.x - that.game.camera.x + that.xOffset ,
            that.BB.y - that.game.camera.y - boxwidth ,
            boxlen,
            boxwidth)
            ctx.strokeRect(
                that.BB.x - that.game.camera.x + that.xOffset ,
                that.BB.y - that.game.camera.y - boxwidth ,
                boxlen,
                boxwidth)

          ctx.font = this.fontSize+"px Courier New ";
          ctx.fillStyle = "Black";
          ctx.textAlign = "center";
          //draw all lines of text
            for(let i = 0; i < lines.length; i++){
                ctx.fillText(lines[i],
                    that.BB.x - that.game.camera.x + boxlen/2,
                        that.BB.y - (boxwidth/2) -that.game.camera.y - boxwidth + (this.fontSize * lines.length) + (this.fontSize * i) - this.fontSize/2 );
            }
         }
        if (params.debug) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(
                that.BB.x - that.game.camera.x + that.xOffset,
                that.BB.y - that.game.camera.y + that.yOffset,
                that.BB.width,
                that.BB.height
            );
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    getXDistance(x1,x2){
        return Math.abs(x1 -x2);
    }
}
