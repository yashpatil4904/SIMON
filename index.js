var buttoncolours=["red", "blue", "green", "yellow"];
var gamepattern=[];
var level=0;
var userclickedpattern=[];
var gameison=false;

function nextSequence(){
        var randomnumber=Math.floor(Math.random()*4);
        var randomchosencolour = buttoncolours[randomnumber];
        $("#"+randomchosencolour).fadeOut(100).fadeIn(100);     
        var color=new Audio("sounds/"+randomchosencolour+".mp3");
        color.play();
        gamepattern.push(randomchosencolour);
}



$(document).keypress(function(){
    if(!gameison){
        level++;
        $("#level-title").text("level "+level);
        nextSequence();
        gameison=true;
        }
        
})
$(".btn").click(function(){

    var usechosencolor=$(this).attr("id");
    userclickedpattern.push(usechosencolor);
    $("#"+usechosencolor).fadeOut(100).fadeIn(100); 
    var colour =new Audio("sounds/"+usechosencolor+".mp3");
    colour.play();
    checkans(userclickedpattern.length-1);

});
function checkans(currentlevel){
    if(userclickedpattern[currentlevel]===gamepattern[currentlevel]){
        if(userclickedpattern.length===gamepattern.length){
            setTimeout(function(){
                userclickedpattern=[];
                nextSequence();
                level++;
                $("#level-title").text("level "+level);
            }, 500);
        }
    }
    else{
        gameison=false;
        level=0;
        gamepattern=[];
        userclickedpattern=[];
        var over = new Audio("sounds/wrong.mp3");
        over.play();
        $("#level-title").text("game over,press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200)
    }
}