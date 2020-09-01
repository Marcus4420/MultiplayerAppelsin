let score1 = 0;
let score2 = 0;

var canvasInfo = {
    height: 500,
    width: 800,
    color: 0
}
var walls = {
    color: 200,
    width: 10
}
const gravity = 0.1;

Array.prototype.removeItem = function(item) {
    let index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
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
    /*let myCanvas = createCanvas(canvasInfo.width, canvasInfo.height);
    myCanvas.parent("containerCanvas");*/

    createCanvas(canvasInfo.width, canvasInfo.height);
}
function draw() {
    background(0);
    displayInstances([Wall, Ball, Ground, Player]);

    fill(255);
    text("Spiller 1:", 20, 20);
    text("Score: "+score1, 20, 40);

    text("Spiller 2:", canvasInfo.width - 80, 20);
    text("Score: "+score2, canvasInfo.width - 80, 40);
}

setInterval(function() {
    new Ball({
        x: random(canvasInfo.width / 3, (canvasInfo.width / 3) * 2),
        y: -50
    })
}, 5000);

function displayInstances(x) {
    if (Array.isArray(x)) {
        for (var clss of x) {
            clss.instances.forEach(inst => inst.display());
        }
    } else {
        x.instances.forEach(inst => inst.display());
    }
}
