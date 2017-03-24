var sget = require("sget");
//sleep timer
var sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
};

var wipeScreen = function () {
  return process.stdout.write('\033c');
};

var printMenu = function() {
    for (var key in mainMenuPrompts) {
      console.log(mainMenuPrompts[key]);
    }
};



var mainMenuPrompts = { 
                        welcome:         "**************************************************************************\n" + 
                                            "*         Welcome to PenguinPop!!!!            *\n" +
                                            "**************************************************************************\n"  
                                 ,
                                 
                        doMath: "Enter 'Math' or '1' to answer a math problem to earn PenguinPebbles!",
                        trick: "Enter 'Trick' or '2' to have your penguin do tricks!",
                        exit: "Enter 'Exit' or '5' to exit PenguinPop\n"
                      };


var userMessages = {
	badInput: "Please make a valid selection.",
	exit: "You've logged out of the game. See ya!"
};                      

//MAIN MENU LOGIC
var mainMenu = function() {
  wipeScreen();
  sleep(400);
  printMenu();
  sleep(400);
    var userSelection = sget("What would you like to do?").trim();
    
    if(userSelection.toLowerCase() == "math" || userSelection == 1) {
        doMath();
    } else if(userSelection.toLowerCase() == "trick" || userSelection == 2) {
        doTrick();
    } else if(userSelection.toLowerCase() == "exit" || userSelection == 3) {
        exit();
    } else {
      console.log(userMessages.badInput);
      mainMenu();
    }
};

var doMath 	= function() {};
var doTrick = function() {};





//*****CONSTRUCTOR
function penguin(penguinName, penguinGender, penguinSpecies) {
  this.penguinName = penguinName;
  this.penguinGender = penguinGender;
  this.penguinSpecies = penguinSpecies;
}
















var exit = function() {
  console.log(userMessages.exit);
  sleep(600);
};





run = function() { 
mainMenu();  
}();