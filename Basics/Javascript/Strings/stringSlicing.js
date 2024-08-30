var maxAmount=140;
var text= prompt("tweet away!");
var length= text.length;
text= text.slice(0, 140);
alert("You have written " +length + "sliced Version: "+ text);