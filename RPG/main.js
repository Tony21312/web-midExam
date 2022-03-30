let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
//mapArray : decide every element on map
//ctx : for Html5 canvas
//currentImgMainX, currentImgMainY : decide the see(座標) of lead
//imgMountain, imgMain, imgEnemy : obstacle, lead, enemy
const gridLength = 200;
//after loading the site completing initiation
$(function(){
    mapArray = [// 0 : can pass, 1 : obstacle, 2 : finish spot, 3 : enemy
        [0,1,1],
        [0,0,0],
        [3,1,2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x" : 0,
        "y" : 0,
    };
    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    }
    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    if(mapArray[x][y]==1){
                        ctx.drawImage(imgMountain, 32, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
                    }
                    else if(mapArray[x][y]==3){
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y*gridLength, x*gridLength,gridLength,gridLength);
                    }
                }
            }
        }
    }
});
$(document).on("keydown", function(event){
    let targetImg, targetBlock, cutImagePositionX;//cutImagePositionX decide lead face which direction
    targetImg = {//lead's target position
        "x":-1,
        "y":-1
    }
    targetBlock = {//lead's target position (two-dimensional)
        "x":-1,
        "y":-1
    }
    event.preventDefault();//keep keyboard from doing the default behavior, for example scroll, zoom...

    //determine the user press which button, and compute the target position
    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//lead face left side
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y- gridLength;
            cutImagePositionX= 355;//lead face up side
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//lead face right side
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//lead face down side
            break;
        default:
            return;
    }

    if(targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
        case 0: // 一般道路(可移動)
            $("#talkBox").text("");
            currentImgMain.x = targetImg.x;
            currentImgMain.y = targetImg.y;
            break;
        case 1: // 有障礙物(不可移動)
            $("#talkBox").text("有山");
            break;
        case 2: // 終點(可移動)
            $("#talkBox").text("抵達終點");
            currentImgMain.x = targetImg.x;
            currentImgMain.y = targetImg.y;
            break;
        case 3: // 敵人(不可移動)
            $("#talkBox").text("哈摟");
            break;
        }
        }
        else{
        $("#talkBox").text("邊界");
        }
        //重新繪製主角
        ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});