function showNumberWithAnimation(i,j,randomNumber){
    var numberCell = $('#number-cell-'+i+'-'+j)
    numberCell.css('background-color',getBackgroundColor(randomNumber));
    numberCell.css('color',getTextColor(randomNumber));
    numberCell.text(randomNumber); 
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getTop(i,j),
        left:getLeft(i,j)        
    },50)
}