xmax = 1000;
ymax = 600;
pointList = [];
rmin = 2;
var state = false;

function startPause(){
    if(state){
        document.getElementById("start").textContent = "Start";
        state = false;
    }else{
        document.getElementById("start").textContent = "Pause";
        state = true;
    }
}

function reset(){
    pointList = []
    state = false;    
    document.getElementById("qnt").textContent = 0;  
    document.getElementById("back").innerHTML = ""; 
    document.getElementById("start").textContent = "Start";    
}

function getRandomColor() {

    var letters = '0123456789ABCDEF'.split('');

    var color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function getRandomRadius(cord, xmax, ymax, rmin, rmax){
    var x = cord[0];
    var y = cord[1];
    var r = Math.floor(Math.random()*(rmax - rmin) + rmin);
    return [x,y,r];
}

function getRandomPoint(xmax, ymax){
    var x = Math.floor(Math.random()*xmax);
    var y = Math.floor(Math.random()*ymax);
    return [x,y];
}

function distanceList(p, pointList){
    var x = p[0];
    var y = p[1];
    var dist_list = [x, y, xmax - x, ymax - y];

    for(var i=0; i<pointList.length;i++){
        var p2 = pointList[i]
        var dist = Math.pow(Math.pow((x - p2[0]), 2) + Math.pow((y - p2[1]), 2), 0.5);
        var dist = dist - p2[2];
        dist_list.push(dist);
    }

    return Math.min.apply(Math,dist_list);
}

function DrawCircles(){
    if(!state){
        return 0;
    }
    var cord = getRandomPoint(xmax,ymax);
    var distance = distanceList(cord, pointList);
    if(distance >= rmin){
        var point = getRandomRadius(cord, xmax, ymax, rmin, distance);
        pointList.push(point);
        var color = getRandomColor()
        var circle = document.createElement("div");
        circle.classList.add("circle");                
        circle.style.cssText = 'width:' + point[2]*2 + 'px; height:' + point[2]*2 + 'px; top:' + (point[1] - point[2]) + 'px; left:' + (point[0] - point[2]) + 'px; background-color: ' + color;
        document.getElementById("back").appendChild(circle)
        document.getElementById("qnt").textContent = pointList.length
    }
}

setInterval(DrawCircles,200);


