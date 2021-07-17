/* By Justin Black 
 * OOP Game App
 * app.js */


const game = new Game();
const mainBtn = document.getElementById("btn__reset");
const keyboard = document.querySelector("#qwerty");
const overlayDiv = document.querySelector("#overlay");

/**
* This function filters through and find out what letter was clicked.
* param {Event Object} - this event will be filtered to determine if it was an letter  
* on the virtual or physical keyboard.
* param {Object Array} - list of keys on keyboard
*/
function keyboardHandling(event, arr) {
  for ( let i = 0; i < arr.length; i++) {
    if ( event === arr[i].textContent ) {
      game.handleInteraction(arr[i]);
    }
  }
}

/**
* Event listener for start button
*/
mainBtn.addEventListener("click", () => {
  if (overlayDiv.classList.contains("win") || overlayDiv.classList.contains("lose")) {
    game.reset(); 
  }
  game.startGame(); 
});


/**
* Event listener for on-screen Keyboard
*/
keyboard.addEventListener("click", (e) => {
  const btnClicked = e.target.textContent;
  const buttonKeys = keyboard.querySelectorAll(".key");
  
  for ( let i = 0; i < buttonKeys.length; i++) {
    if ( btnClicked === buttonKeys[i].textContent ) {
      game.handleInteraction(buttonKeys[i]);
    }
  }
  
//  keyboardHandling(btnClicked, buttonKeys); Disabled because grading instruction asked for handleInteraction() to be called in event listener. 
});

/**
* Event listener for physical Keyboard
* Added keyboard functionality
*/
document.addEventListener("keydown", (e) => {
  const btnClicked = e.key;
  const buttonKeys = keyboard.querySelectorAll(".key");
  
  keyboardHandling(btnClicked, buttonKeys);
});


