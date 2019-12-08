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
        case 87:
            if(moveUp()){
                generateOneNumber();
                isGameOver();    
            }
            break;//up W
        case 83:
            if(moveDown()){
                generateOneNumber();
                isGameOver(); 
            }
            break;//down S
        case 65:
            if(moveLeft()){
                generateOneNumber();
                isGameOver(); 
            }
            break;//left A
        case 68:
            if(moveRight()){
                generateOneNumber();
                isGameOver(); 
            }
            break;//right D
        default:
            break;
    }
})

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
    return true;
}