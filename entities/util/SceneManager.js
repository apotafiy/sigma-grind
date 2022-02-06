class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = game.player.x - 1024 / 2;
        this.y = game.player.y - 768 / 2;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.acceleration = 2000;
        this.friction = 2;
        this.FRICTON_MULT = 10;
        this.FRICTON_Y = 2;
        this.FRICTON_X = 2;
        this.DISTANCE_MULT = 0.5;
        this.maxdist = 0;
        this.mindist = 999999;
        this.player_width = 45 / 2;
        this.shakeX = 0;
        this.shakeY = 0;

        // Dat GUI stuff
        this.gui = new dat.GUI();
        this.cameraFolder = this.gui.addFolder("Camera values");
        this.testValues = {
            accel: this.acceleration,
            frixn: this.friction,
            frixnMult: this.FRICTON_MULT,
            frictionx: this.FRICTON_X,
            frictiony: this.FRICTON_Y,
        };
        this.cameraFolder
            .add(this.testValues, "accel")
            .min(0)
            .max(2000)
            .step(1)
            .onChange(val => {
                this.acceleration = val;
            })
            .name("Acceleration");
        this.cameraFolder
            .add(this.testValues, "frixn")
            .min(0.0000001)
            .max(2)
            .step(0.00000001)
            .onChange(val => {
                this.friction = val;
            })
            .name("Friction");
        this.cameraFolder
            .add(this.testValues, "frixnMult")
            .min(0)
            .max(10)
            .step(1)
            .onChange(val => {
                this.FRICTON_MULT = val;
            })
            .name("FrictionMultiplier");
        this.cameraFolder
            .add(this.testValues, "frictionx")
            .min(0.000000001)
            .max(2)
            .step(0.000000001)
            .onChange(val => {
                this.FRICTON_X = val;
            })
            .name("Friction X");
        this.cameraFolder
            .add(this.testValues, "frictiony")
            .min(0.000000001)
            .max(2)
            .step(0.000000001)
            .onChange(val => {
                this.FRICTON_y = val;
            })
            .name("Friction Y");

    }
    shake(x,y) {
        this.shakeX += x;
        this.shakeY += y;
    }
    update() {
        params.debug = document.getElementById("debug").checked;
        //set up midpoints for calculatoin
        let midpoint = 1024 / 2 - 44;
        let vertmidpoint = 768 / 2 - 44;
        let dist = getDistance(this, this.game.player);

        //make the camera move faster if it is too far from the player
        if (dist > 850 || dist < 450) {
            if (this.FRICTON_MULT > 1) {
                this.FRICTON_MULT -= 0.1;
            }
        } else {
            if (this.FRICTON_MULT < 5) {
                this.FRICTON_MULT += 0.1;
            }
        }
        //find the unit vector components of the distance
        let xdif =(this.game.player.x - this.x - midpoint + this.player_width) / dist;
        let ydif = (this.game.player.y - this.y - vertmidpoint) / dist;
        
        //increase the velocity of the camera based on the ditance
        this.xVelocity += (this.shakeX  + xdif * this.acceleration ) / (dist * this.DISTANCE_MULT);
        this.yVelocity += (this.shakeY + ydif * this.acceleration * 2) / (dist * this.DISTANCE_MULT);
        
        //removed a percentage of the velocity for friction
        this.xVelocity -=
            (this.FRICTON_MULT - this.FRICTON_X) *
            this.game.clockTick *
            (this.xVelocity * 1);
        this.yVelocity -=
            (this.FRICTON_MULT - this.FRICTON_Y) *
            this.game.clockTick *
            this.yVelocity *
            1.75;
        //remove some of the shake for friction
        this.shakeX -=
         (this.FRICTON_MULT - this.FRICTON_X) *
        this.game.clockTick *
        (this.shakeX * 1);

        this.shakeY -=
        (this.FRICTON_MULT - this.FRICTON_Y) *
        this.game.clockTick *
        this.shakeY *
        1.75;
        //move the camera over by the veoloity
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        //doodoo camera system
        // this.x = this.game.player.x - midpoint;
        // this.y = this.game.player.y - vertmidpoint;

    }

    draw(ctx) {
        if(params.debug) {
            //draw the grid of text 
            // for(let i = -100; i < 0; i++){
            //     for(let j = 0;j < 100; j++){
            //         ctx.font = "5px Arial";
            //         ctx.strokeText("X: " + i + "\nY: " + j, i * 64, j * 64); 
            //     }
            // }
          let that = this;
        ctx.strokeStyle = "Blue";
        ctx.strokelin;
        ctx.strokeRect(1024 / 2 - that.player_width - 5, 768 / 2 - 5, 10, 10);

        //draw line Between ctx.beginPath();
        // ctx.moveTo(1024/2 - that.player_width, 768/2);
        // ctx.lineTo(that.game.player.x - that.x, that.game.player.y - that.y);
        ctx.strokeRect(
            1024 / 2 - that.player_width,
            768 / 2,
            that.game.player.x - that.x - 1024 / 2 + 25 + 44,
            that.game.player.y - that.y - 768 / 2 + 44
        );
        ctx.stroke();
    }
        }

    //find distance between two points
    /**
     *
     * @param {Camera x} x1
     * @param {Camera y} y1
     * @param {Player x} x2
     * @param {Player y} y2
     * @returns distance between the two
     */
    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        // return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
}
