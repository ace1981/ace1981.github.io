
//0 empty 1 wall 2 floor 3 box 4 targetedbox 5 targetedfloor 6 man 7 targetedman
function CSSSTYLE(type) {
    var css = "verticle-align:middle;text-align:center;border-radius:3px;height:24px;width:24px;";
    var color = "background-color:";
    switch (type) {
        case 0:
            color += "transparent";
            break;
        case 1:
            color += "rgb(193,193,193)";
            break;
        case 2:
            color += "rgb(247,247,249)";
            break;
        case 3:
            color += "rgb(255,206,68)";
            break;
        case 4:
            color += "rgb(255,206,68)";
            break;
        case 5:
            color += "rgb(247,247,249)";
            break;
        case 6:
            color += "rgb(221,80,68)";
            break;
        case 7:
            color += "rgb(221,80,68)";
            break;
    }
    return css + color;
}

var map = [
    [0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 2, 2, 1, 0],
    [1, 1, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 1],
    [1, 2, 2, 2, 1, 2, 1],
    [1, 1, 1, 2, 2, 2, 1],
    [0, 0, 1, 1, 1, 1, 1],
];

var start = [5, 1];

var box = [
    [3, 2],
    [5, 2],
    [2, 4]
];

var target = [
    [3, 3],
    [5, 3],
    [4, 5]
];

var htmlElement;

var cbox;
var man;
var gameOver;

function init(ele) {
	htmlElement = ele;
    gameOver = false;
    cbox = [];
    man = [];
    man = start.concat();
    box.forEach(e => {cbox.push(e.concat())})
    document.addEventListener("keydown", onKeyDown);
    render();
}

function render() {
    htmlElement.innerHTML = "";

    //init html
    var table = document.createElement("table");
    //init table
    var current = [];
    for (var i = 0; i < map.length; i++)
        current[i] = [];

    current[man[0]][man[1]] = 6;

    cbox.forEach(e => {current[e[0]][e[1]] = 3;})

    target.forEach(e => {
        if(current[e[0]][e[1]] == 3 ){
            current[e[0]][e[1]] = 4;
        }else{
            if(current[e[0]][e[1]] == 6)
                current[e[0]][e[1]] = 7;
            else
                current[e[0]][e[1]] = 5;
        }
    })

    for (var i = 0; i < map.length; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < map[0].length; j++) {
            var td = document.createElement("td");
            var type = current[i][j] ? current[i][j] : map[i][j];
            current[i][j] = type;
            td.style.cssText = CSSSTYLE(type);
            if (type == 4 || type == 5 || type == 7)
                td.innerHTML = 'X';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    htmlElement.prepend(table);

    if(check()){
        alert('congratulations!');
        gameOver = true;
    }

    if(dead(current)){
        gameOver = true;
        setTimeout(function(){
            if(confirm('you lose!')){
                restart();
            }
        })
    }
}

function restart(){
    gameOver = false;
    cbox = [];
    man = [];
    man = start.concat();
    box.forEach(e => {cbox.push(e.concat())})
    render();
}

function onKeyDown(e) {
    if(gameOver)return;

    var next = man.concat(),nextnext = man.concat();

    var moveBoxIndex , moveIndex , change,
        oneBox = false,blocked = false;

    switch (e.keyCode) {
        case 38:
            moveIndex = 0;
            change = -1;
            break;
        case 40:
            moveIndex = 0;
            change = 1;
            break;
        case 37:
            moveIndex = 1;
            change = -1;
            break;
        case 39:
            moveIndex = 1;
            change = 1;
            break;
    }

    next[moveIndex] += change;
    nextnext[moveIndex] += 2*change;

    if (map[next[0]][next[1]] == 2){

        cbox.forEach((box, i) => {
            if(box[0] ==  next[0] && box[1] == next[1]){
                moveBoxIndex = i;
                oneBox = true;
            }

            if (box[0] == nextnext[0] && box[1] == nextnext[1])
                blocked = true;
        })

        if(oneBox){
            if(!blocked){
                if(map[nextnext[0]][nextnext[1]] == 2){
                    cbox[moveBoxIndex] = nextnext;
                    man=next;
                }
            }
        }else{
            man = next;
        }
    }

    render();
}

function check() {
    return target.every(t=>{
        return cbox.some(c=>{
            return c[0]==t[0]&&c[1]==t[1];
        })
    })
}

function dead(map) {
    function isBlocked(type){
        return type == 0 || type == 1 || type == 3 || type == 4;
    }

    return cbox.every(c=>{
        return (isBlocked(map[c[0]-1][c[1]]) && isBlocked(map[c[0]][c[1]+1])) ||
                    (isBlocked(map[c[0]][c[1]+1]) && isBlocked(map[c[0]+1][c[1]])) ||
                     (isBlocked(map[c[0]+1][c[1]]) && isBlocked(map[c[0]][c[1]-1])) ||
                      (isBlocked(map[c[0]][c[1]-1]) && isBlocked(map[c[0]-1][c[1]]));
    })
}