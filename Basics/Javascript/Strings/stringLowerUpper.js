var maxAmount=140;
var text= prompt("tweet away!");
var length= text.length;
text= text.slice(0, 140);
alert("You have written " +length + "sliced Version: "+ text);
var bigText= text.toUpperCase();
alert("You have written in upper " + bigText);

var smallText= text.toLowerCase();

alert("You have written in lower " + smallText);