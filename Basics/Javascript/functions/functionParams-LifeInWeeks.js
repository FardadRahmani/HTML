function lifeInWeeks(age) {
    
/************Don't change the code above************/    
    
    //Write your code here.
    
    var ageInDays= age*365;
    
    var totalDays= 90*365;
    
    var daysLeftToLive= totalDays - ageInDays;
    
    
    
    var ageInWeeks= age*52;
    
    var totalWeeks= 90*52;
    
    var weeksLeftToLive= totalWeeks - ageInWeeks;
    
    
    var ageInMonths= age*12;
    
    var totalMonths= 90*12;
    
    var monthsLeftToLive= totalMonths - ageInMonths;
    
    
    alert("You have "+ daysLeftToLive + " days, "+ weeksLeftToLive + " weeks, and " + monthsLeftToLive +"months left.")
    
/*************Don't change the code below**********/
}



lifeInWeeks(51);