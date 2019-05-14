function drawLine(x0, y0, x1, y1){
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.stroke();
}

function Maze(n, m, scaling){
    var SAMPLE_RATIO = 3/4;
    var lattice = [];

    for(var i = 0; i < n; i++){
        for(var j = 0; j < m; j++){
            lattice.push([i * scaling, j * scaling, i * scaling, (j + 1) * scaling]);
            lattice.push([i * scaling, j * scaling, (i + 1) * scaling, j * scaling]);
        }
    }

    for(var i = lattice.length; i > 0; i--){
        var ind = Math.floor(Math.random() * i);
        var t = lattice[ind];
        lattice[ind] = lattice[i - 1];
        lattice[i - 1] = t;
    }

    lattice = lattice.slice(0, Math.floor(n * m * SAMPLE_RATIO));

    this.lattice = lattice;
    this.n = n;
    this.m = m;
}

Maze.prototype.update = function(){};

Maze.prototype.render = function(c, scaling){
    c.fillStyle = 'grey';
    c.fillRect(0, 0, this.n * scaling, this.m * scaling);

    c.strokeStyle = 'black';
    c.lineWidth = 1;
    for(var i = 0; i < this.lattice.length; i++){
        drawLine(this.lattice[i][0], this.lattice[i][1], this.lattice[i][2], this.lattice[i][3]);
    }

    c.beginPath();
    c.rect(0, 0, this.n * scaling, this.m * scaling);
    c.stroke();
};
