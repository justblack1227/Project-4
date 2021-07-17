/* By Justin Black
 * OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.activePhrase = null;
    this.phrases = [{"phrase" : "To infinity and beyond"},
                   {"phrase" : "Say hello to my little friend"},
                   {"phrase" : "Hakuna Matata"},
                   {"phrase" : "I love you three thousand"},
                   {"phrase" : "Whatcha talking about Willis"}];
  }
  
  /**
  * Begins game by selecting a random phrase and displaying it to user
  */
  startGame() {
    document.getElementById("overlay").style.display = "none";
    this.activePhrase = this.getRandomPhrase().phrase;
    new Phrase(this.activePhrase).addPhraseToDisplay();
  }

/**
* Selects random phrase from phrases property
* @return {Object} Phrase object chosen to be used
*/
  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomNumber];
  }

  /**
  * Handles onscreen keyboard button clicks
  * @param {HTMLButtonElement} button - The clicked button element
  */
  handleInteraction(btnClicked) {
    const btnKeys = document.querySelectorAll(".key");
    const p = new Phrase(this.activePhrase);
    
    if (p.checkLetter(btnClicked.textContent)) {
      p.showMatchedLetter(btnClicked.textContent);
      btnClicked.className = "key chosen";
      btnClicked.disabled = true;
      
      // Extra Credit #2: Changed style of keyboard text when clicked. 
      btnClicked.style.textTransform = "capitalize"; 
      // Extra Credit #2: Changed style of keyboard text when clicked. 
      document.getElementById("warning").textContent = "";
    } else {
      this.removeLife();
      btnClicked.className = "key wrong"
      btnClicked.disabled = true;
      
      // Extra Credit #2: Changed style of keyboard text when clicked. 
      btnClicked.style.textTransform = "capitalize"; 
    }
    
    if (this.checkForWin()) {
     this.gameOver(true);
    } 
  }

  /**
  * Increases the value of the missed property
  * Removes a life from the scoreboard
  * Checks if player has remaining lives and end ends game if player is out
  */
  removeLife() {
    const img = document.querySelectorAll(".tries img")[this.missed];
    img.setAttribute("src", "images/lostHeart.png");
    this.missed += 1;
    
    // EXTRA CREDIT #2: This conditional determines what message to output in the warning section. 
    if (this.missed == 1) {
     document.getElementById("warning").textContent = "That was not right.";
    } else if (this.missed == 2) {
      document.getElementById("warning").textContent = "Strike Two";
    } else if (this.missed == 3) {
      document.getElementById("warning").textContent = "Looks like you're stumped.";
    } else if (this.missed == 4) {
      document.getElementById("warning").textContent = "Woah, that's four. You got this.";
    }
    
    if (this.missed >= 5) {
        this.gameOver(false) 
    }
  }

  /**
  * Checks for winning move
  * @return {Boolean} True if game has been woon, false if the game wasn't won
  */
  checkForWin() {
    const btnKeys = document.querySelectorAll(".letter");
    const shownKeys = document.querySelectorAll(".show");
    
    if (btnKeys.length === shownKeys.length ) {
      return true;
    } else {
      return false; 
    }
  }

  /**
  * Displays game over message
  * @param {Boolean} gameWon - whether or not the user won the game
  */
  gameOver(gameWon) {
    const overlay = document.getElementById("overlay");
    const gameMessage = document.getElementById("game-over-message");
    if (gameWon) {
      overlay.className = "win";
      gameMessage.textContent = "You won the game. You guessed:  " + this.activePhrase; 
      overlay.style.display = "";      
    } else {
      overlay.className = "lose";
      overlay.style.display = "";
      gameMessage.textContent = "Oh Oh. Looks like you lost. Try again?"
    }
  }

  /**
  * Resets the game after game is over. 
  */
  reset() {
    const img = document.querySelectorAll(".tries img");
    const ul = document.createElement("ul");
    const keys = document.querySelectorAll(".key");
    document.querySelector("#phrase").querySelector("ul").remove();
    document.querySelector("#phrase").appendChild(ul);
    this.missed = 0;
    
     // Removes warning message div
    document.querySelector("#warning").remove(); 
    
    
    for ( let i = 0; i < img.length; i++) {
      img[i].setAttribute("src", "images/liveHeart.png");
    }
    
    for ( let i = 0; i < keys.length; i++) {
      keys[i].style.textTransform = "lowercase";
      keys[i].disabled = false;
      keys[i].className = "key";
    } 
  }
}
