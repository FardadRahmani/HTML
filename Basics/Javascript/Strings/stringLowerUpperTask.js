//Set the entered Name back to firstLetter uppercase

var yourName= prompt("what is your name?");
yourName= yourName.slice(0,1).toUpperCase() + yourName.slice(1,).toLowerCase();
alert("Hello "+ yourName)
