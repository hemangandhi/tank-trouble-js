var SCALING = 6;
var game = [];
var key_set = {};

var canvas = document.getElementById('c');
var c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
c.filter = "none";

window.addEventListener("keydown", function(event) {
    key_set[event.keyCode] = true;
    event.preventDefault();
});

window.addEventListener("keyup", function(event) {
    delete key_set[event.keyCode];
    event.preventDefault();
});

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

document.getElementById('start').onclick = function (e) {
    game = [
        new Maze(50, 25, SCALING),
        new Tank('red', [Math.random() * 50 * SCALING, Math.random() * 25 * SCALING, 0], {'up': 38, 'down': 40, 'left': 37, 'right': 39, 'shoot': 77}, 0.5)];
};

function step(){
    for(var i = 0; i < game.length; i++){
        game[i].update();
        game[i].render(c, SCALING);
    }
    animate(step);
}

animate(step);
