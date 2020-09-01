var canvasInfo = {
    height: 500,
    width: 800,
    color: 0
}
var walls = {
    color: 200,
    width: 10
}
const gravity = 0.5;
new Wall({
    color: walls.color,
    width: walls.width,
    x: 0,
    goal: {
        height: 100,
        distance: 100
    }
});
new Wall({
    color: walls.color,
    width: walls.width,
    x: canvasInfo.width - walls.width,
    goal: {
        height: 100,
        distance: 100
    }
});
new Ground({
    color: [0,255,0],
    height: 10,
    y: canvasInfo.height-10
});
new Player({
    x: 100,
    y: canvasInfo.height - 100,
    name: '1',
    controls: {
        up: 87,
        left: 65,
        right: 68,
        down: 83
    }
});
new Player({
    x: canvasInfo.width - 100,
    y: canvasInfo.height - 100,
    name: '2',
    controls: {
        up: 38,
        left: 37,
        right: 39,
        down: 40
    }
});
function setup() {
    let myCanvas = createCanvas(canvasInfo.width, canvasInfo.height);
    myCanvas.parent("containerCanvas");
}