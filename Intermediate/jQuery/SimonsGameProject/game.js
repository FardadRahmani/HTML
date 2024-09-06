
var buttonColors= ["red", "blue", "green", "yellow"]
var gamePattern =[]

var userClickedPattern =[]

var gameHasStarted = false;
var level=0;
var winOrLose =true;

function checkAnswer(currentLevel){

   
    for (var i=0; i<currentLevel; i++){
        if(gamePattern[i] === userClickedPattern[i]){
            console.log("Success");
            winOrLose= true

            
        } else{
            console.log("Error");

            var audio= new Audio("./sounds/wrong.mp3");
            audio.play();

            $("body").addClass("game-over");
            setTimeout(function() {
                //your code to be executed after 1 second
                $("body").removeClass("game-over");
            }, 200);

            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            winOrLose= false;

        }

    }

    if(winOrLose === true){
        setTimeout(function() {
            //your code to be executed after 1 second
            nextSequence();
          }, 1500);
    }

    


    
}

function startOver(){

    gamePattern =[]

    userClickedPattern =[]

    gameHasStarted = false;
    level=0;


}


function nextSequence(){
    var randomNumber= Math.round(Math.random()*3);
    // console.log(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // $("#"+randomChosenColour).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
    animatePress(randomChosenColour);
    

    playSound(randomChosenColour);

    level++;
    $("h1").text("Level "+ level.toString());

    userClickedPattern =[]
    
    

}


$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");

    // Add clicked color to array:
    userClickedPattern.push(userChosenColour);

    // Add flash effect to Button:
    // $("#"+userChosenColour).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    
    

    if (userClickedPattern.length === gamePattern.length){
        checkAnswer(userClickedPattern.length);
            
        
    }
    
});

function playSound(colorName){

    soundFilePath="./sounds/"+colorName+".mp3"
    var audio= new Audio(soundFilePath);
    audio.play();


}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        //your code to be executed after 1 second
        $("#"+currentColor).removeClass("pressed");
      }, 100);
}




$("body").keydown(function () { 

    if (gameHasStarted === false){
        nextSequence();

        gameHasStarted= true;
        
    }
    
    
});

