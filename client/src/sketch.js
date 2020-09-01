var canvasInfo = {
    height: 500,
    width: 800,
    color: 0
}
var walls = {
    color: 200,
    width: 10
}
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
    y: canvasInfo.height
});
function setup() {
    let myCanvas = createCanvas(canvasInfo.width, canvasInfo.height);
    myCanvas.parent("containerCanvas");
}
function draw() {
    background(0);
    Wall.instances.forEach(inst => inst.display());
    Ground.instances.forEach(inst => inst.display());
}