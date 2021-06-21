var playing = false;
var score;
var trialsLeft;
var action; //used for set interval function
var fruits =['apple','banana','cherry','grapes','guava','orange','peach','pineapple','water'];
var step;
$(function(){
    //click on start reset button
    $("#startreset").click(function(){
      //we are playing
        if(playing==true){
            //reload page
            location.reload();
            }else{
                playing== true; //game initiated
                score =0;
                $("#scorevalue").html(score);
                //show trials left
                $("#trialsLeft").show();
                trialsLeft=3;
                addHearts();
                
                //hide game over box
               $("#gameOver").hide();
                
                //change button text to reset
                $("#startreset").html("Reset Game");
                
                //stsart sending fruits
                startAction();
            }
    });

    
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);
    
//    document.getElementById("#slicesound").play();
    $("#slicesound")[0].play();
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    
$("#fruit1").hide("explode",500); //slice fruit
    
    //send new fruit
    setTimeout(startAction,500);
});
    

//functions
function addHearts(){
$("#trialsLeft").empty();
for(i=0; i< trialsLeft; i++){
    $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}
function startAction(){
//geenrate a fruit
 $("#fruit1").show();
chooseFruit(); //choose a random fruit
$("#fruit1").css({'left':Math.round(550*Math.random()),top : -50});
//random position

//generate a random step
step= 1+Math.round(5*Math.random()); //change step

//move fruit down every 10ms
action = setInterval(function(){
    $("#fruit1").css('top',$("#fruit1").position().top + step);

    //check if fruit is too low
    if($("#fruit1").position().top > $("#fruitContainer").height()){
        //check if any trails left
        if(trialsLeft >1){
          //generate a fruit
 $("#fruit1").show();
chooseFruit(); //choose a random fruit
$("#fruit1").css({'left':Math.round(550*Math.random()),top : -50});
//random position

//generate a random step
step= 1+Math.round(5*Math.random()); //change step
  //reduce trails by one
            trialsLeft --;

            //populate trailsLEFT box
            addHearts();
        }else{ //game over
          playing = false;
            $("#startreset").html("Start Game");
            $("#gameOver").show();
            $("#gameOver").html("<p>GAME OVER!</p><p> Your Score is "+ score + '</p>');
            stopAction();

        }
    }
},10);
}

//generate a random fruit

function chooseFruit(){
    $("#fruit1").attr('src','images/' + fruits[Math.round(8*Math.random())] + '.png');
}
//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
    $("#trialsLeft").html("No Life");
}
    });