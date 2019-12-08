function getTop(i,j){
    return 20+i*120;
}

function getLeft(i,j){
    return 20+j*120;    
}

function getBackgroundColor(number){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67e5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        default:return "black";break;
    }
}

function getTextColor(number){
    if(number <= 4)
        return "#776a65";
    else
        return "white";
}

function noSpace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0)
                return false;
        }
    }
    return true;
}

function canMoveLeft(board){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0)
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true;
        }
    }
    return false;
}

function noBlockHorizontal(i,k,j,board){
    for(var a=k+1;a<j;a++){
        if(board[i][a]!=0){
            return false;
        }
    }
    return true;
}