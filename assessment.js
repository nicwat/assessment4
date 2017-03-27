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

var penguinPebbles = 0;
var yourPenguin = [];



var mainMenuPrompts = { 
                        welcome:         "**************************************************************************\n" + 
                                            "*         Welcome to PenguinPop!!!!            *\n" +
                                            "**************************************************************************\n"  
                                 ,
                                 
                        doMath: "Enter 'Math' or '1' to answer a math problem to earn PenguinPebbles!",
                        trick: "Enter 'Trick' or '2' to have your penguin do tricks! You must have at least 20 PenguinPebbles before you have access to tricks.",
                        exit: "Enter 'Exit' or '3' to exit PenguinPop\n"
                      };


var userMessages = {
	invalidNum: "This is an invalid number.",
	firstNum: "Please enter the first number",
	secondNum: "Please enter the second number",
	singleNum: "Please enter a number",
	badInput: "Please make a valid selection.",
	exit: "You've logged out of the game. See ya!"
};                      

//MAIN MENU LOGIC
var mainMenu = function() {
  wipeScreen();
  sleep(400);
  printMenu();
  sleep(400);
  viewPebbles();
    var userSelection = sget("What would you like to do, " + name + " ?").trim();
    
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

var doMath 	= function() {
console.log( "Let's do some addition!");
var autoHand = Math.floor((Math.random() * 9) + 0);
var autoHand2 = Math.floor((Math.random() * 9) + 0);
console.log(" " + autoHand+ "  +  " + autoHand2 + "  =  ???\n" );
sum = autoHand+autoHand2;
var userSum = sget("What is the sum of this equation?").trim();
		if (userSum == sum) {
			console.log("Good job!!! +5 PenguinPebbles");
			penguinPebbles +=5;	
			var returnToMenu = sget("Please hit enter to return to the main menu").trim();
			mainMenu();

		} else {
			console.log("Sorry wrong answer... -5 PenguinPebbles");
			penguinPebbles -=5;
			sleep(2000);
			mainMenu();
}				
};



var doTrick = function() {
	if (penguinPebbles >19) {
		var trickChoice = sget ("Please pick a trick for " + yourPenguin[0].penguinName + " to do, " +name + ":\n1) Slide (-15 PenguinPebbles)\n2) Backflip(-10 PenguinPebbles)\n3) Sing (-20 PenguinPebbles)\n(Please enter a number.)").trim();
		if (trickChoice == 1) {
			console.log("" + yourPenguin[0].penguinName+ " is slipping and sliding across the way!");
      sleep(1000);
			penguinPebbles -=15;
      console.log("15 PenguinPebbles have been deducted.");
      sleep(2000);
      mainMenu();
		} else if (trickChoice == 2) {
			console.log(""+ yourPenguin[0].penguinName+" has done a backflip!");
      sleep(1000);
			penguinPebbles -=10;
      console.log ("10 PenguinPebbles have been deducted.");
      sleep(2000);
      mainMenu();
		} else if (trickChoice == 3) {
			console.log("" +yourPenguin[0].penguinName+ "is singing you a song....opera style!");
      sleep(1000);
			penguinPebbles -=20;
      console.log("20 PenguinPebbles have been deducted.");
      sleep(2000);
      mainMenu();
		} else {
      		console.log(userMessages.badInput);
      		doTrick();

		}
	}
	else {console.log("Sorry. You do not have enough PenguinPebbles to do any tricks at this time.");
		var returnToMenu = sget("Please hit enter to return to the main menu").trim();
		mainMenu();
	}

};





//*****CONSTRUCTOR
function penguin(penguinName, penguinGender, penguinSpecies) {
  this.penguinName = penguinName;
  this.penguinGender = penguinGender;
  this.penguinSpecies = penguinSpecies;
}







var userNamePrompt =function() {
          var userName = sget("Welcome to PenguinPop! Please enter your name.").trim();
          name = userName;
          if (name.length <1) {
            console.log("That's definitely not a name, please enter something.\n");
            sleep(600);
            userNamePrompt();
         }
};








var namePrompt = function () {
  var pname = sget("Thanks " +name + ". How about your penguin? What is your penguin's name?").trim();
      penguinName = pname;
      if (penguinName.length === 0) {
        console.log ("Please enter an animal name.");
        namePrompt();
      }
};

var genderPrompt = function(){
 var gender = sget("Is your penguin 'male' or 'female'? ").trim();
   penguinGender = gender;
    var lowercaseGender = penguinGender.toLowerCase();
     if (lowercaseGender !== "male" && lowercaseGender !== "female") {
      console.log ("Please type out Male or Female");
      genderPrompt();
   }
};

 var speciesPrompt = function() {
    var species = sget("What species is your penguin (please type out species) ?\n - Emperor\n - Gentoo\n - Rockhopper").trim();
    penguinSpecies = species;
    var lowercaseSpecies = penguinSpecies.toLowerCase();
     if (lowercaseSpecies !== "emperor" && lowercaseSpecies !== "gentoo"&& lowercaseSpecies !== "rockhopper"){
      console.log("Please enter a valid species!");
      speciesPrompt();
  }

    
  };  

var addPenguin = function() { 
      namePrompt();
       genderPrompt();
       speciesPrompt();      
    var newPenguin = new penguin(penguinName, penguinGender, penguinSpecies);
    yourPenguin.push(newPenguin);
    console.log("Thanks " +name + ". " + yourPenguin[0].penguinName+" has been created.");
            sleep(2000);
            mainMenu();
    
  };


var viewPebbles = function () {
  console.log("PenguinPebble Balance: " + penguinPebbles + "\n");
};



var exit = function() {
  console.log(userMessages.exit);
  sleep(600);
  process.exit();
};





run = function() { 
userNamePrompt();
addPenguin();
mainMenu();  
}();