/* By Justin Black
 * OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  
/**
* Display phrase on game board
*/
  addPhraseToDisplay() {
    const displayPhrase = this.phrase;
    let phraseUL = document.getElementById("phrase").querySelector("ul");
  
  //changed background color of main game container.
    document.querySelector(".main-container").style.backgroundColor = "#ffd35c"; 
  
  //Creates div to display message when user loses life. 
    const span = document.createElement("section"); 
    span.textContent = "";
    span.id = "warning";
    span.style.textTransform = "uppercase";
    span.style.fontWeight = 900;
    span.style.fontSize = "1.5rem";
    span.style.color = "#f76262";
   // -----------------------------------------------------
  
    for ( let i = 0; i < displayPhrase.length; i++) {
      const letter = displayPhrase.charAt(i);
    
      if ( letter.toUpperCase() != letter.toLowerCase()) {
        const li = document.createElement("li");
        li.textContent = letter;
        li.className = "hide letter " + letter;
  
        //Extra Credit #2 - changed background color of hidden tiles.
        li.style.backgroundColor = "#636159";  
        phraseUL.appendChild(li);
      } else if ( letter === " ") {
        const li = document.createElement("li");
        li.textContent = letter;
        li.className = "space";
        phraseUL.appendChild(li);
      }
    };
    document.getElementById("phrase").appendChild(span);
  }

  /**
  * Checks if passed letter is in phrase
  * @param (string) letter - Letter to check
  * @return {boolean} True if there is a match, False if no match
  */
  checkLetter(letter) {
    const str = this.phrase;
    if (str.includes(letter)) {
      return true;
    } else {
      return false; 
    }
  }

  /**
  * Checks if passed letter is in phrase
  * @param (string) letter - Letter to be display;
  */
  showMatchedLetter(letter) {
    const correctLetter = document.querySelectorAll(`.${letter}`);
    
    for ( let i = 0; i < correctLetter.length; i++ ) {
      correctLetter[i].className = "show letter " + letter;
      
      //Extra Credit #2: capitalized matched letter text.
      correctLetter[i].textContent = letter.toUpperCase();  
    }
  }
}
