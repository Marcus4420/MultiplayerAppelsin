class Ground {
    static instances = [];
    constructor(info) {
        Ground.instances.push(this);
        this.height = info.height;
        this.width = canvasInfo.width;
        this.color = info.color;
        this.x = 0;
        this.y = info.y;
    }
    display() {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }
}
class Wall {
    static instances = [];
    constructor(info) {
        Wall.instances.push(this);
        this.height = canvasInfo.height;
        this.width = info.width;
        this.color = info.color;
        this.x = info.x;
        this.y = 0;
        this.goal = info.goal;
        this.smallHeight = info.goal.distance;
    }
    display() {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.width, this.height - this.goal.height - this.smallHeight);
        rect(this.x, canvasInfo.height - this.smallHeight, this.width, this.smallHeight)
    }
}
class Ball {
    static instances = [];
    constructor(info) {
        Ball.instances.push(this);
        this.color = [255, 124, 0];
        this.rad = 10;
        this.dia = this.rad * 2;
        this.x = info.x;
        this.y = info.y;
        this.yspeed = 5;
    }
    display() {
        fill(this.color);

        ellipse(this.x, this.y, this.dia, this.dia)
        this.move();
    }
    move() {
        this.y += this.yspeed;
        if (this.y > canvasInfo.height + this.rad) {
            Ball.instances.removeItem(this);
        }
    }
}
class ThrowBall extends Ball {
    constructor(info) {
        super(info);

    }
    move() {

    }
}

class Player {
    static instances = [];
    constructor(info) {
        Player.instances.push(this);
        this.x = info.x;
        this.y = info.y;
        this.rad = 15;
        this.dia = this.rad * 2;
        this.width = 20;
        this.height = canvasInfo.height - this.y - 10;
        this.name = info.name;
        this.ifJump = false;
        this.controls = info.controls;
        this.caughtBalls = 0;
        this.ballAngle = 180;
        this.ballHeld = false;
    }
    display() {
        fill(255);
        ellipse(this.x, this.y, this.dia, this.dia);
        fill(255);
        rect(this.x - this.width / 2, this.y, this.width, canvasInfo.height - this.y - 10);
        fill(0);
        textSize(15);
        text(this.name, this.x - 4, this.y + 5);

        for (var i = 0; i < this.caughtBalls; i++) {
            this.displayBallIndic(i);
        }
        this.move();
    }
    move() {
        
        if (keyIsDown(this.controls.down)) {
            if (!this.ballHeld) {
                this.ballAngle = 90;
            }
            this.ballHeld = true;
            this.holdBall();
            if (keyIsDown(this.controls.left)) {
                this.ballAngle += 5;
                if (this.ballAngle > 190) {
                    this.ballAngle = 190;
                }
            }
            if (keyIsDown(this.controls.right)) {
                this.ballAngle -= 5;
                if (this.ballAngle < -10) {
                    this.ballAngle = -10;
                }
            }
        } else {
            this.ballHeld = false;
            if (this.ifJump) {
                this.jump();
            }
            else if (keyIsDown(this.controls.up)) {
                this.initiateJump();
            }
            if (keyIsDown(this.controls.left)) {
                this.x -= 8;
            }
            if (keyIsDown(this.controls.right)) {
                this.x += 8;
            }

        }
        if (this.x < 20) {
            this.x = 20;
        }
        if (this.x >= canvasInfo.width - 20) {
            this.x = canvasInfo.width - 20;
        }
        this.ballContact();
    }
    initiateJump() {
        this.ifJump = true;
        this.currentY = this.y;
        this.yspeed = -10;
    }
    jump() {
        this.y += this.yspeed;
        this.yspeed += 0.5;
        if (this.y >= this.currentY) {
            this.y = this.currentY;
            this.ifJump = false;
        }
    }
    ballContact() {
        for (var ball of Ball.instances) {
            if (ball.rad + this.rad >= dist(this.x, this.y, ball.x, ball.y)) {
                
                if (this.caughtBalls < 3) {
                    this.caughtBalls += 1;
                    Ball.instances.removeItem(ball);
                } else {

                }
            }
        }
    }
    displayBallIndic(index) {
        fill(0);
        var y = this.y + ((this.rad + 5) * (index + 1));
        ellipse(this.x, y, 6, 6);
    }
    holdBall() {
        if (this.caughtBalls > 0) {
            fill([255, 124, 0]);
            var x = this.x + (Math.cos(toRadians(this.ballAngle)) * 30);
            var y = this.y - (Math.sin(toRadians(this.ballAngle)) * 30);
            ellipse(x, y, 20, 20);
        }
    }
}