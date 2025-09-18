"use strict";

/* Dark & Light Mode Toggle */

// selects button used for dark/light mode toggle
let toggleButton = document.querySelector(".theme-toggle");

// stores body element to toggle background
let background = document.body;

// grabs elements changed depending on mode
let logo = document.getElementById("logo");
let heartIcon = document.getElementById("heart-icon");
let userIcon = document.getElementById("user-icon");
let shoppingIcon = document.getElementById("shopping-icon");

// adds event listener to toggle button
toggleButton.addEventListener("click", function() {

    // toggles dark mode class on body
    background.classList.toggle("dark-theme");

    // updates icon depending on mode
    toggleButton.textContent = background.classList.contains("dark-theme") ? "☀️" : "🌙";

    // updates logo color depending on mode
    logo.src = background.classList.contains("dark-theme") ? "Images/Logo/Colourpop-white.svg" : "Images/Logo/Colourpop.svg";

    // updates utility icon depending on mode
    heartIcon.src = background.classList.contains("dark-theme") ? "Images/Icons/heart-alt-svgrepo-com-white.svg" : "Images/Icons/heart-svgrepo-com.svg"
    userIcon.src = background.classList.contains("dark-theme") ? "Images/Icons/user-circle-svgrepo-com-white.svg" : "Images/Icons/user-circle-svgrepo-com.svg";
    shoppingIcon.src = background.classList.contains("dark-theme") ? "Images/Icons/bag-4-svgrepo-com-white.svg" : "Images/Icons/bag-4-svgrepo-com.svg";
});

/* Guessing Game */

/* Section Sparkles */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".promotion");
  const layer   = section?.querySelector(".sparkle-layer");
  const content = section?.querySelector(".promo-content");
  const image   = section?.querySelector(".promo-image");
  if (!section || !layer || !content || !image) return;

  const COUNT = 30; // total sparkles
  const MARGIN = 24; // keep-out padding around content/image
  const EDGE_PAD = 36; // padding inside edges to avoid clipping
  const glyphs = ["★","✦","✧","✩","✨","☾","♡"];
  const colors = ["#ffffff","#FFE08A","#FFD1E8","#E2D6F9","#F9B3D1","#FDE68A"];
  const rand = (min, max) => Math.random() * (max - min) + min;

  // get bounding box for section
  const sec = section.getBoundingClientRect();
  const rel = r => ({
    left:   r.left - sec.left,
    top:    r.top  - sec.top,
    right:  r.right - sec.left,
    bottom: r.bottom - sec.top
  });

  // forbidden areas: text + image zones
  const forbidden = [
    rel(content.getBoundingClientRect()),
    rel(image.getBoundingClientRect())
  ];

  const inside = (x, y, rect, pad = 0) =>
    x > rect.left - pad && x < rect.right + pad &&
    y > rect.top  - pad && y < rect.bottom + pad;

  // clear previous sparkles
  layer.innerHTML = "";

  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.color = colors[Math.floor(Math.random() * colors.length)];

    // random size + animation timing
    s.style.setProperty("--size",  `${rand(14, 30).toFixed(0)}px`);
    s.style.setProperty("--dur",   `${rand(1.4, 2.6).toFixed(2)}s`);
    s.style.setProperty("--delay", `${rand(0, 1.8).toFixed(2)}s`);

    // pick position that doesn't overlap forbidden zones OR clip off edges
    let tries = 0, x, y;
    do {
      x = rand(EDGE_PAD, sec.width  - EDGE_PAD);
      y = rand(EDGE_PAD, sec.height - EDGE_PAD);
      tries++;
      if (tries > 40) break; // failsafe
    } while (forbidden.some(rect => inside(x, y, rect, MARGIN)));

    s.style.left = `${x}px`;
    s.style.top  = `${y}px`;
    layer.appendChild(s);
  }
});

// selects form elements and output display
let form = document.getElementById("guessing-form");
let label = document.getElementById("guessing-label");
let input = document.getElementById("luckyNumber");
let resultOutput = document.getElementById("result-message");

// list of possible discount codes
let availableCodes = ["COSMIC3", "PRISM5", "GALAXY9", "VENUS6"];

// randomly selects discount code from list
function getDiscountCode(){ // generates discount codes

    let index = Math.floor(Math.random() * availableCodes.length);
    return availableCodes[index];
}

// listens for form submission
form.addEventListener("submit", function(e){

    // prevents page from refreshing
    e.preventDefault();

    // gets user input and generates random number
    let userInput = parseInt(input.value);
    let randomNumber = Math.floor(Math.random() * 10) + 1;

    // checks if users input matches random number
    if (userInput === randomNumber) {

        // hides input label when user correctly guesses
        label.style.display ="none";

        // generates discount code
        let discountCode = getDiscountCode();

        // displays winning message and discount code
        resultOutput.innerHTML = `You guessed ${userInput} and the number was ${randomNumber}.<br>You win 25% off!<br>Your discount code is: <strong>${discountCode}</strong>`;

    } else {

        //if wrong, prompt user to try try again
        resultOutput.innerHTML = `You guessed ${userInput} but the number was ${randomNumber}.<br>Please guess again!`;
    }

    // clears input after each guess
    input.value = "";
});

/* Product Display */

// selects all category buttons and product articles
let productButtons = document.querySelectorAll(".categories button");
let productArticles = document.querySelectorAll(".featured-products article");

// loops through each button and assigns event
productButtons.forEach(function(button, index) {

    // button click hides all products
    button.addEventListener("click", function() {
        productArticles.forEach(function (article) {
            article.classList.add("hiddenItem");
    });

    // matching product is displayed
    let selectedArticle = document.getElementById(`featured-item${index + 1}`);
    if (selectedArticle) {
        selectedArticle.classList.remove("hiddenItem");
        }
    });
});

/* Contact Form Validation */
document.addEventListener("DOMContentLoaded", function() {
    // selects form element
    let form = document.getElementById("contact-form");

    // adds submit event to form
    form.addEventListener("submit", function(e){

        //prevent default form submission
        e.preventDefault();

        //boolean variable used to track form validity
        let isValid = true;

        //grabs all inputs
        let firstNameInput = document.getElementById("first-name");
        let lastNameInput = document.getElementById("last-name");
        let emailInput = document.getElementById("email-address");
        let phoneInput = document.getElementById("phone-number");
        let contactMethod = document.querySelector('input[name="option"]:checked').id;
        let commentInput = document.getElementById("comment");

        //clears all error messages
        let errorMessage = document.querySelectorAll(".message");
        for (let i = 0; i < errorMessage.length; i++) {
            errorMessage[i].classList.remove("show");
        }

        // removes previous error styles from all fields
        let userInputs = [firstNameInput, lastNameInput, phoneInput, commentInput];
        for (let i = 0; i <userInputs.length; i++) {
            userInputs[i].classList.remove("errorInput");
        }

        // highlights inputs and shows error message
        function displayError (input) {
            input.classList.add("errorInput");
            
            let errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains("message")) {
                errorSpan.classList.add("show");
            }

            isValid = false;
        }

        // checks required fields (first name, last name, and comment)
        if (firstNameInput.value.trim() === "") {
            displayError(firstNameInput);
        }

        if (lastNameInput.value.trim() === "") {
            displayError(lastNameInput);
        }

        if (commentInput.value.trim() === "") {
            displayError(commentInput);
        }

        // regular expression matching email address and phone number
        let emailRegex = /^\S+@\S+\.\S+$/;
        let phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

        // clears prior state for both contact methods
        emailInput.classList.remove("errorInput");
        phoneInput.classList.remove("errorInput");

        let emailError = emailInput.nextElementSibling;
        let phoneError = phoneInput.nextElementSibling;

        if (emailError && emailError.classList.contains("message")){
            emailError.classList.remove("show");
        }

        if (phoneError && phoneError.classList.contains("message")){
            phoneError.classList.remove("show");
        }

        // validate only selected contact method
        if (contactMethod === "email") {
            if (!emailRegex.test(emailInput.value.trim())) {
                displayError(emailInput);
            }
        }
        
        if (contactMethod === "phone") {
            if (!phoneRegex.test(phoneInput.value.trim())) {
                displayError(phoneInput);
            }
        }

        //if valid, creates customer object to store user info
        if (isValid) {
            let customer = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                comment: commentInput.value.trim(),
                preferredContact: contactMethod
            };

            //clears form inputs
            this.reset();

            //clears any existing confirmation messages
            let existingMessage = document.querySelector(".confirmation-message");
            if (existingMessage) {
                existingMessage.remove();
            }

            //creates and styles confirmation message
            let confirmationMessage = document.createElement("div");
            confirmationMessage.classList.add("confirmation-message");
            confirmationMessage.style.width = "475px";
            confirmationMessage.style.textAlign = "center";
            confirmationMessage.style.lineHeight = "35px";
            confirmationMessage.style.marginTop = "30px";
            confirmationMessage.style.padding = "25px";
            confirmationMessage.style.backgroundColor = "#E2D6F9";
            confirmationMessage.style.border = "1px solid #893BB7";
            confirmationMessage.style.color = "#893BB7";
            confirmationMessage.style.borderRadius = "10px";

            // generates message with user info
            confirmationMessage.innerHTML =
            "Thank you for signing up for our newsletter, <strong>" + customer.firstName + " " + customer.lastName + "</strong>!<br>" +
            "We’ll be sure to contact you with the latest collabs via <strong>" + customer.preferredContact + "</strong> at " +
            (customer.preferredContact === "email" ? customer.email : customer.phone) + ".<br>" +
            "<strong>Your message:</strong> <em>" + customer.comment + "</em>" + ".";

            //adds confirmation message below form
            document.querySelector(".contact-right").appendChild(confirmationMessage);
        }
    });
});
