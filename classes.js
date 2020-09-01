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
    }
    display() {
        fill(255);
        ellipse(this.x, this.y, this.dia, this.dia);
        fill(255);
        rect(this.x - this.width / 2, this.y, this.width, this.height);
        fill(0);
        textSize(15);
        text(this.name, this.x - 4, this.y + 5);
        this.move();
    }
    move() {
        if (this.ifJump) {
            this.jump();
        }
        else if (keyIsDown(this.controls.up)) {
            this.initiateJump();
        }
        if (keyIsDown(this.controls.down)) {
            
        }
        if (keyIsDown(this.controls.left)) {
            this.x -= 5;
        }
        if (keyIsDown(this.controls.right)) {
            this.x += 5;
        }
        if (this.x < 20) {
            this.x = 20;
        }
        if (this.x >= canvasInfo.width - 20) {
            this.x = canvasInfo.width - 20;
        }
    }
    initiateJump() {
        this.ifJump = true;
        this.currentY = this.y;
        this.yspeed = -10;
    }
    jump() {
        this.y += this.yspeed;
        this.yspeed += gravity;
        if (this.y >= this.currentY) {
            this.y = this.currentY;
            this.ifJump = false;
        }
    }
}