window.onload = function () {
  const Save = document.getElementById("p_save");

  Save.addEventListener("click", () => {
    const p_fname = document.getElementById("p_fname").value;
    const p_lname = document.getElementById("p_lname").value;
    const p_password = document.getElementById("p_password").value;
    const p_Email = document.getElementById("p_Email").value;
    const p_Phone = document.getElementById("p_phone").value;

    if (p_fname == "") {
      alert("First Name must be filled out");
      return false;
    }
    if (p_lname == "") {
      alert("Last Name must be filled out");
      return false;
    }
    if (p_Email == "") {
      alert("Email Name must be filled out");
      return false;
    }
    if (p_password == "") {
      alert("Password must be filled out");
      return false;
    }

    if (p_password.length < 10) {
      alert("Password should be 10 Digit long");
      return false;
    }

    // console.log('test')
    const data = { p_fname, p_lname, p_Email, p_password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        firstName: p_fname,
        lastName: p_lname,
        emailId: p_Email,
        password: p_password,
        phoneNumber: p_Phone,
      }),
    };
    fetch("/modifyUser", options)
      .then(function (response) {
        let json = response.json();
        console.log(json);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  const p_fname = document.getElementById("p_fname");
    const p_lname = document.getElementById("p_lname");
    const p_password = document.getElementById("p_password");
    const p_Email = document.getElementById("p_Email");
    const p_Phone = document.getElementById("p_phone");
    
    p_fname.readOnly = true;
    p_lname.readOnly = true;
    p_password.readOnly = true;
    p_Phone.readOnly = true;
};


function signOut(){

  document.cookie = "emailId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location = "/"
}

// const edit = document.getElementById("p_edit");

  function edit()
  {
    const p_fname = document.getElementById("p_fname");
    const p_lname = document.getElementById("p_lname");
    const p_password = document.getElementById("p_password");
    const p_Email = document.getElementById("p_Email");
    const p_Phone = document.getElementById("p_phone");
    
    p_fname.readOnly = false;
    p_lname.readOnly = false;
    p_password.readOnly = false;
    p_Phone.readOnly = false;

    // const editableFields = document.getElementsByClassName("editable-fields");
    // editableFields.style.border = "thick solid #000";
    
  }

  ( () => {
    /**
     * Parse a password string into a numeric value.
     *
     * @param {string} password
     * @return {number}
     */
    
  
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
  
    window.addEventListener( 'DOMContentLoaded', () => {
      // Get element refs.
      let p = document.querySelector( '.js--password' );
      let b = document.querySelector( '.js--password-bar' );
      let t = document.querySelector( '.js--password-text' );
      // let pass = document.getElementById("Signin_Password");
      let p_password = document.getElementById("p_password");
  
      // Listen for updates to password field.
      p_password.addEventListener( 'input', () => {
        // Convert current value to data.
        let data = scoreToData( evaluatePassword( p_password.value ) );
  
        // Update DOM.
        b.style.width = data.width;
        b.style.background = data.color;
        t.innerText = data.label;
      } );
    } );
  } )();
  
