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
    constructor() {

    }
    display() {
        fill([255, 124, 0]);
    }
}