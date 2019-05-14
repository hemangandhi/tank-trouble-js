function linesIntersect(pl1, pl2, pm1, pm2){
    var a1 = -(pl1[1] - pl2[1]);
    var b1 = (pl1[0] - pl2[0]);
    var c1 = (pl1[1] - pl2[1]) * pl1[0] - (pl1[0] - pl2[0]) * pl1[1];

    var a2 = -(pm1[1] - pm2[1]);
    var b2 = (pm1[0] - pm2[0]);
    var c2 = (pm1[1] - pm2[1]) * pm1[0] - (pm1[0] - pm2[0]) * pm1[1];

    if(a1 * b2 - b1 * a2 === 0){
        return [];
    }else{
        var denom = a1 * b2 - b1 * a2;
        point = [(c1 * b2 - b1 * c2) / denom, (a1 * c2 - c1 * a2) / denom];
        if(pl1[0] <= point[0] && point[0] <= pl2[0] && pl1[1] <= point[1] && pl2[1] <= point[1]
            && pm1[0] <= point[0] && point[0] <= pm2[0] && pm1[1] <= point[1] && pm2[1] <= point[1]){
            return point;
        }
        return [];
    }
}

function CollisionOracle(maze, scale){
    this.maze = maze;
    this.scale = scale;
}

CollisionOracle.prototype.pointInXBounds = function(p){
    return p[0] >= 0 && p[0] <= this.maze.n * this.scale;
}
CollisionOracle.prototype.pointInYBounds = function(p){
    return p[1] >= 0 && p[1] <= this.maze.m * this.scale;
}
CollisionOracle.prototype.pointNotInBounds = function(p){
    if(this.pointInXBounds(p)){
        return (this.pointInYBounds(p))? '' : 'y';
    }else{
        return (this.pointInYBounds(p))? 'x' : 'xy';
    }
}

var lineSlope = function(p1, p2){
    if(p2[0] == p1[0]){
        return Infinity;
    }else{
        return (p2[1] - p1[1])/(p2[0] - p1[0]);
    }
}

CollisionOracle.prototype.doesLineCollide = function(p1, p2){
    var pib = this.pointNotInBounds(p1) + this.pointNotInBounds(p2);
    if(pib.includes('x') && pib.includes('y')){
        return 'xy';
    }else if(pib.includes('x')){
        return 'x';
    }else if(pib.includes('y')){
        return 'y';
    }else{
        var total = '';
        for(var i = 0; i < this.maze.lattice.length; i++){
            var curr_line1 = [this.maze.lattice[i][0], this.maze.lattice[i][1]];
            var curr_line2 = [this.maze.lattice[i][2], this.maze.lattice[i][3]];
            if(linesIntersect(p1, p2, curr_line1, curr_line2)){
                if(lineSlope(curr_line1, curr_line2) === Infinity){
                    total += 'x';
                }else{
                    total += 'y';
                }
            }
        }
        return total;
    }
}

CollisionOracle.prototype.doesRectCollide = function(p1, p2, p3, p4){
    return this.doesLineCollide(p1, p2) + this.doesLineCollide(p2, p3)
        + this.doesLineCollide(p3, p4) + this.doesLineCollide(p4, p1);
}
