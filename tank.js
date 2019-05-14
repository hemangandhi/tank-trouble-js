function Tank(color, position, key_list, speed, shooter){
    this.color = color;
    this.position = position;
    this.key_list = key_list;
    this.speed = speed;
    this.shooter = shooter;
}

Tank.prototype.update = function(){
    var trans = 0;
    if(key_set[this.key_list['up']]){
        trans += this.speed;
    }
    if(key_set[this.key_list['down']]){
        trans -= this.speed;
    }

    var rot = 0;
    if(key_set[this.key_list['left']]){
        rot -= this.speed / 3;
    }
    if(key_set[this.key_list['right']]){
        rot += this.speed / 3;
    }

    this.position = [
        this.position[0] + trans * Math.cos(this.position[2]),
        this.position[1] + trans * Math.sin(this.position[2]),
        this.position[2] + rot
    ];

    if(this.position[2] > Math.PI * 2){
        this.position[2] -= Math.PI * 2;
    }else if(this.position[2] < 0){
        this.position[2] += Math.PI * 2;
    }

    if(key_set[this.key_list['shoot']]){
        this.shooter.shoot(this.position);
    }
}

Tank.prototype.render = function(ctx, scaling){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.position[0], this.position[1], 0.25 * scaling, 0.125 * scaling, this.position[2], 0, 3 * Math.PI / 2);
    ctx.stroke();
}

