var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
})

function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            var gridCell = $('#grid-cell-'+i+'-'+j)
            gridCell.css('top',getTop(i,j));
            gridCell.css('left',getLeft(i,j));
        }
        
    for(var i=0;i<4;i++){
        board[i] = new Array();
        for(var j=0;j<4;j++)
            board[i][j]=0;
    }
    updateBoardView();
}

function updateBoardView(){
    $('.number-cell').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var numberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.css('top',getTop(i,j)+50);
                numberCell.css('left',getLeft(i,j)+50);
            }
            else{
                numberCell.css('width','100px');
                numberCell.css('height','100px');
                numberCell.css('top',getTop(i,j));
                numberCell.css('left',getLeft(i,j));
                numberCell.css('background-color',getBackgroundColor(board[i][j]));
                numberCell.css('color',getTextColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber(){
    if(noSpace(board))
        return false;

    var randomX = parseInt(Math.floor(Math.random()*4));
    var randomY = parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randomX][randomY]==0){
            break;
        }
        randomX = parseInt(Math.floor(Math.random()*4));
        randomY = parseInt(Math.floor(Math.random()*4));   
    }

    var randomNumber = Math.random() < 0.5 ? 2:4;
    board[randomX][randomY] = randomNumber;
    showNumberWithAnimation(randomX,randomY,randomNumber);
    return true;
}
$(document).keydown(function(event){
    switch(event.keyCode){
        case 38:
            if(moveUp()){
                generateOneNumber();
                isGameOver();    
            }
            break;//up W
        case 40:
            if(moveDown()){
                generateOneNumber();
                isGameOver(); 
            }
            break;//down S
        case 37:
            if(moveLeft()){
                generateOneNumber();
                isGameOver(); 
            }
            break;//left A
        case 39:
            if(moveRight()){
                generateOneNumber();
                isGameOver(); 
            }
            break;//right D
        default:
            break;
    }
})

function isGameOver(){
    if(noSpace(board)&&noMove(board)){
        gameOver();
    }
}

function gameOver(){
    alert("gameOver");
    newgame();
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }

    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}