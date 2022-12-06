function resetPassword(){
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var search = window.location.search;
    var emailId = search.substring(
        search.indexOf("email=") + 6, 
        search.lastIndexOf("&hash")
    );

    if(password == confirmPassword){
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              emailId: emailId,  
              password: password,
            }),
        };
        fetch("/resetPassword", options)
        .then(function (response) {
          console.log(response);
      }).catch(function (error) {
          console.log(error);
        });
    }else{
        return false;
    }
}




  ( () => {
    /**
     * Parse a password string into a numeric value.
     *
     * @param {string} password
     * @return {number}
     */
    
    console.log("TESTING EXECUTION")
  
    let evaluatePassword = ( strPassword ) => {
    var m_strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var m_strLowerCase = "abcdefghijklmnopqrstuvwxyz";
    var m_strNumber = "0123456789";
    var m_strCharacters = "!@#$%^&*?_~";
    
      var nScore = 0;
  
    // Password length
    // -- Less than 4 characters
    if (strPassword.length < 5) {
      nScore += 5;
    }
    // -- 5 to 7 characters
    else if (strPassword.length > 4 && strPassword.length < 8) {
      nScore += 10;
    }
    // -- 8 or more
    else if (strPassword.length > 7) {
      nScore += 25;
    }
  
    // Letters
    var nUpperCount = countContain(strPassword, m_strUpperCase);
    var nLowerCount = countContain(strPassword, m_strLowerCase);
    var nLowerUpperCount = nUpperCount + nLowerCount;
    // -- Letters are all lower case
    if (nUpperCount == 0 && nLowerCount != 0) {
      nScore += 10;
    }
    // -- Letters are upper case and lower case
    else if (nUpperCount != 0 && nLowerCount != 0) {
      nScore += 20;
    }
  
    // Numbers
    var nNumberCount = countContain(strPassword, m_strNumber);
    // -- 1 number
    if (nNumberCount == 1) {
      nScore += 10;
    }
    // -- 3 or more numbers
    if (nNumberCount >= 3) {
      nScore += 20;
    }
  
    // Characters
    var nCharacterCount = countContain(strPassword, m_strCharacters);
    // -- 1 character
    if (nCharacterCount == 1) {
      nScore += 10;
    }
    // -- More than 1 character
    if (nCharacterCount > 1) {
      nScore += 25;
    }
  
    // Bonus
    // -- Letters and numbers
    if (nNumberCount != 0 && nLowerUpperCount != 0) {
      nScore += 2;
    }
    // -- Letters, numbers, and characters
    if (nNumberCount != 0 && nLowerUpperCount != 0 && nCharacterCount != 0) {
      nScore += 3;
    }
    // -- Mixed case letters, numbers, and characters
    if (nNumberCount != 0 && nUpperCount != 0 && nLowerCount != 0
        && nCharacterCount != 0) {
      nScore += 5;
    }
  
    return nScore;
  }
  
  // Checks a string for a list of characters
  function countContain(strPassword, strCheck) {
    // Declare variables
    var nCount = 0;
  
    for (i = 0; i < strPassword.length; i++) {
      if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
        nCount++;
      }
    }
  
    return nCount;
  
    };
  
    /**
     * Convert a numeric score into an object of 'DOM update' data.
     *
     * @param {number} score
     * @return {Object}
     */
    let scoreToData = ( score ) => {    
      if ( score >= 75 ) {
        return {
          width: '100%',
          color: '#26de81',
          label: 'Strong',
        };
      } else if ( score >= 50 ) {
        return {
          width: '66%',
          color: '#fd9644',
          label: 'Medium',
        };
      } else {
        return {
          width: '33%',
          color: '#fc5c65',
          label: 'Weak',
        };
      }
    };

    console.log("")
  
    window.addEventListener( 'DOMContentLoaded', () => {
      // Get element refs.
      let p = document.querySelector( '.js--password' );
      let b = document.querySelector( '.js--password-bar' );
      let t = document.querySelector( '.js--password-text' );
      let pass = document.getElementById("password");

      console.log("PASS", pass)
  
      // Listen for updates to password field.
      pass.addEventListener( 'input', () => {
        // Convert current value to data.
        let data = scoreToData( evaluatePassword( pass.value ) );

        console.log("DATA");
  
        // Update DOM.
        b.style.width = data.width;
        b.style.background = data.color;
        t.innerText = data.label;
      } );
    } );
  } )();


// }