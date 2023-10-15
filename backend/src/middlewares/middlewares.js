/**
 * Function to check wether given email is valid email or not.
 * @param {string} req.body.email we are requesting only email from the body and check if email is valid or not.
 * @param {response} res to send response to browser.
 * @param {function} next to send to next function.
 * @returns {function} it will send req to next funciton that its valid else it will stop all requests.
 */
const validateEmail = (req, res, next) => {
  const emailAddress = req.body.email;
  console.log(emailAddress)
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log(regexEmail.test(emailAddress))
  if (regexEmail.test(emailAddress)) {
    next()
  }
  else {
    res
      .status(406)
      .send("Email is Invalid")
    next("route")
  }
}

/**
 * single line arrow function to check wether given string contains a Upper letter or not
 * @param {string} string
 * @returns {boolean} if string is valid returns true else false.
*/
const checkUpperCase = (string) => /[A-Z]/.test(string);

/**
 * single line arrow function to check wether given string contains a Lower letter or not
 * @param {string} string
 * @returns {boolean} if string is valid returns true else false.
*/
const checkLowerCase = (string) => /[a-z]/.test(string);

/**
 * Function to check wether given string having a symbol or not.
 * @param {string} string
 * @returns {boolean} if string is valid returns true else false.
*/
const checkSymbol = (string) =>
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(string);
const checkNum = (string) => /\d/.test(string);

/**
 * Funciton to check weather given password is valid or not
 * @param {string} req.body.password accesing password form request body
 * @param {response} res sending response to browser
 * @param {function} next sending signal to next function that this function is valid or not
 * @returns {function} it will send response to next funciton that its working
 * or it will raise error and stops every thing.
 */
const validatePassword = (req, res, next) => {
  const password = req.body.password;
  if (
    password.length >= 8 &&
    checkUpperCase(password) &&
    checkLowerCase(password) &&
    checkSymbol(password) &&
    checkNum(password)
  ) {
    next()
  } else {
    res
      .status(415)
      .send("Passowrd is not a valid password")
  }
}

/**
 * Funciton to check weather given password is valid or not
 * @param {string} req.body.originalprice,req.body.offerprice accesing original price,offerprice form request body
 * @param {response} res sending response to browser
 * @param {function} next sending signal to next function that this function is valid or not
 * @returns {function} it will send response to next funciton that its working
 * or it will raise error and stops every thing.
 */

const validateCost=(req,res,next)=>{
  const originalprice= req.body.originalPrice;
  const offerprice= req.body.offerPrice;
  console.log(originalprice)
  console.log(offerprice)
  if(Number(originalprice)>Number(offerprice))
  {
    next()
  }
  else
  {
    res.status(406).send("Original price should be greater than offer price")
  }
}

//Exporting all funcitons.
module.exports = {
  validateEmail,
  validatePassword,
  validateCost
}