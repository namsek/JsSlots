var coins = 0;
var bet =  0;
var priorBet = 0;
var win = false;
var winRow = [];
var payout = 0;
var snd = new Audio("audio/ohyeah.wav"); // buffers automatically when created

var sIcons = {};

sIcons.cherry = {
    id: 1,
    value: .5, 
    imgsrc: "<img src=img/cherry.png>"
};
sIcons.bar = {
	id: 2,
    value: 1,
    imgsrc: "<img src=img/bar.png>"
};
sIcons.horseshoe = {
	id: 3,
    value: 1.50,
    imgsrc: "<img src=img/whoreshoe.png>"
};
sIcons.diamond = {
	id: 4,
    value: 2,
    imgsrc: "<img src=img/diamond.png>"
};
sIcons.seven = {
  	id: 5,
    value: 5,
    imgsrc: "<img src=img/seven.png>"
};
sIcons.dollar = {
    id: 6,
    value: 6,
    imgsrc: "<img src=img/dollar.png>"
};
sIcons.whoreshoe = {
    id: 7,
    value: 7,
    imgsrc: "<img src=img/whoreshoe.png>"
};
sIcons.lemon = {
    id: 8,
    value: 8,
    imgsrc: "<img src=img/lemon.png>"
};
 
var sOut = [[],[],[]];
var sIn = [];
sIn[0] = sIcons.cherry;
sIn[1] = sIcons.bar;
sIn[2] = sIcons.horseshoe;
sIn[3] = sIcons.diamond;
sIn[4] = sIcons.seven;
sIn[5] = sIcons.dollar;
sIn[6] = sIcons.whoreshoe;
sIn[7] = sIcons.lemon;

function spin() {
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            sOut[y][x] = sIn[Math.floor(Math.random() * 8)];
        }
    }
}

function intro() {
    spin();
    validateResults();
    document.getElementById('prompt').innerHTML = 'Welcome To Slots. Insert Coins';
    document.getElementById('button').innerHTML = 'Insert';
    document.getElementById('button').setAttribute("onClick", "main()");
  //  return;
}

function main() {
    coins = document.getElementById('input').value
    validateInput();
    document.getElementById('coins').innerHTML = coins;
    document.getElementById('prompt').innerHTML = 'Please place bet below';  
    document.getElementById('button').innerHTML = 'PLAY';
    document.getElementById('input').value = 0;
    document.getElementById('button').setAttribute("onClick", "play()");
}

function play() {
        bet = document.getElementById('input').value;
        win = false;
        winRow = [];
        payout = 0;
        validateInput();
        coins = coins - bet       
        document.getElementById('coins').innerHTML = coins;
        spin();
        validateResults();
        validateWin();
    
}

function validateWin() {
    if (win) {
        for (i = 0; i < winRow.length; i++) {
           payout =  Math.round(payout + (bet * sOut[(winRow[i])][1].value));       
        }
		coins = coins + payout;
        document.getElementById('coins').innerHTML = coins;
        document.getElementById('prompt').innerHTML = 'HOORAY! You Won ' + payout + ' Coins!'; 
    }   
}


function validateResults() {
    //show results of spin
    for (var i = 0; i < 3; i++) {
        if (((sOut[i][0].id === sOut[i][1].id) && (sOut[i][1].id === sOut[i][2].id))||
            ((sOut[0][0].id === sOut[1][1].id) && (sOut[1][1].id === sOut[2][2].id))||
            ((sOut[0][2].id === sOut[1][1].id) && (sOut[1][1].id === sOut[2][0].id))) {
            document.getElementById(i + '_0').innerHTML = sOut[i][0].imgsrc;
            document.getElementById(i + '_1').innerHTML = sOut[i][1].imgsrc;
            document.getElementById(i + '_2').innerHTML = sOut[i][2].imgsrc;
            win = true;
            winRow.push(i);
            snd.play();
        } else {
            document.getElementById(i + '_0').innerHTML = sOut[i][0].imgsrc;
            document.getElementById(i + '_1').innerHTML = sOut[i][1].imgsrc;
            document.getElementById(i + '_2').innerHTML = sOut[i][2].imgsrc;
            document.getElementById('prompt').innerHTML = 'Sorry, please try again!'; 

        }        
     }

}

function validateInput() {
   var testVal = null;
   if(isNaN(coins)){
    testVal = coins;
     testMe(testVal);
     coins = 0;
   }

   if (isNaN(bet)) {
       testVal = bet;
       testMe(testVal);
       bet = 0;
    }   

    if(bet > coins){
      bet = coins
      //'Max Bet! Ballsy move... ';
       document.getElementById('input').value = bet; 
    }
}

function testMe(tVal){
      switch(tVal){
        case "winrow":
          bet = 100;  //just to give a value for winning computation. Otherwise coins value becomes isNaN
          spin();
          sOut[1][1] = sOut[1][0];
          sOut[1][2] = sOut[1][0];
          validateResults();
          validateWin();
          exit();
          
        case "windiag":
          bet = 100;
          spin();
          sOut[1][1] = sOut[0][0];
          sOut[2][2] = sOut[0][0];
          validateResults();
          validateWin();
          exit();
        default:
           document.getElementById('prompt').innerHTML = 'Dude...Come on...'; 
           //some dick  entered an NaN so stop the presses
           document.getElementById('input').value = 0;
    //       intro();
           exit();
        }
}

function exit(){
 throw new Error('This is not an error. This is just to abort javascript');
}


window.onload = function(){
  document.body.setAttribute("class", "loaded");
}

intro();

if (coins <= 0) {
    console.log("You have no more coins, sorry!");
} else if (bet === 'no' || bet === null){
    console.log("Thanks for playing!");
}
