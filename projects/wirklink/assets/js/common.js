const TOKEN = localStorage.getItem("token");

// const API_URL = "https://api.wirklink.com/api/";
const API_URL = "https://api.wirklink.com/development/";
 
$(document).ready(function() {
    $("#navbar").load("projects/wirklink/assets/fragments/navbar.html", getUserDetails);
});

// Show "Please Wait" modal while waiting for a server response
$(document).on({
    ajaxStart:function(){
        $("#container").addClass("loading");
        $(".loading-screen").addClass("loader-active");
    },
    ajaxStop: function(){
        $("#container").removeClass("loading");
        $(".loading-screen").removeClass("loader-active");
    }  
});

window.addEventListener("load", function() {

    $("#footer").load("projects/wirklink/assets/fragments/footer.html");
    $("#loaders").load("projects/wirklink/assets/fragments/loaders.html");
    $("#modals").load("projects/wirklink/assets/fragments/modals.html");

    if(!navigator.cookieEnabled){
        alert("Please enable cookies");
        window.location.href = "projects/wirklink/index.html";
    }
});

document.addEventListener("click", function(e) {
    const navbarUserMobile = e.target.closest("#navbar-icon-user");
    const navbarMenuMobile = e.target.closest("#navbar-icon-menu");

    if(e.target){
        switch(e.target.id){
            case "navbar-login":                            // Open login form when selecting the login option in the navbar
            case "navbar-mobile-login": 
                loginModal(1);
                break;
            case "close-login":                             // Close the login modal by clicking the X
            case "login-modal":                             // Hide login modal when clicking outside the modal
                loginModal();
                break;
            case "login-btn":                               // Attempt a login after clicking the login button in the modal
                login();
                break;

            case "navbar-signup":                           // Open signup form when selecting the signup option in the navbar
            case "navbar-mobile-signup": 
                signupModal(1);
                break;
            case "close-modal-signup":                      // Close signup when clicking the "x" in the signup form
            case "signup-modal":                            // Hide signup modal when clicking outside the modal
                signupModal();
                break;
            case "signup-btn":                              // Attempt a signup after clicking the signup button
                signup();
                break;

            case "forgot-modal":
            case "close-forgot":
                forgotModal(0);
                break;
            case "forgot-btn":
                sendPasswordReset();
                break;

            case "navbar-dashboard":                        // Go to the dashboard in mobile
                window.location.href = "/dashboard.html";
                break;
            case "dashboard-link":
                checkLogin();
                break;
            
            case "edit-profile":
            case "navbar-edit":
                location.href = "/edit.html"
                break;
            case "navbar-logout":                           // Log out of the page
            case "navbar-mobile-logout":
                logout();
                break;

            case "user-category-i":                         // Select account type as individual in sign up modal
                showFields("individual");
                break;
            case "user-category-company":                   // Select account type as company in sign up modal
                showFields("company");
                break;
        }

        if(navbarUserMobile){                               // Open and close the user actions on mobile
            if(document.getElementById("navbar-links").style.display == "block") $("#navbar-links").hide();
            $("#navbar-user-actions").slideToggle("fast");
        }

        else if(navbarMenuMobile){                          // Open and close the menu on mobile
            if(document.getElementById("navbar-user-actions").style.display == "block") $("#navbar-user-actions").hide();
            $("#navbar-links").slideToggle("fast");
            $("#navbar").toggleClass("navbar-open");
        }
    }
});

// Open and close the signup modal.
function signupModal(action){

    document.getElementById('user-type').style.display = "block";
    document.getElementById('user-category').style.display = "none";
    document.getElementsByClassName('user-details')[0].style.display = "none";
    document.getElementById("signup-error").style.display = "none";

    if(action == 1){
        $("#navbar-user-actions").slideUp("slow");
        $("#signup-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");
    }
    else{
        $("#signup-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");

        $("#signup-btn").hide()

        resetFields();
    }
}

// Open and close the login modal.
function loginModal(action){

    $("#login-error").css("display", "none");

    if(action == 1){
        $("#navbar-user-actions").slideUp("slow");
        $("#login-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");
    }
    else{
        $("#login-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

// Open and close the forgot password modal.
function forgotModal(action){
    if(action == 1){

        loginModal(0);

        $("#forgot-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");
    }
    else{
        $("#forgot-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

function blurBackground(action){
    const content = $("#content");
    const navbar = $("#navbar");
    const footer = $("#footer");

    if(action == 1){
        content.addClass("modal-active");
        navbar.addClass("modal-active");
        footer.addClass("modal-active");
    }

    else if(action == 0){
        content.removeClass("modal-active");
        navbar.removeClass("modal-active");
        footer.removeClass("modal-active");
    }
}

function getUserDetails(){
    activeNavbar();

    if(TOKEN != null){
        $.ajax({
            type:"GET",
            url: API_URL + "info",
            headers:
            {
                "Authorization": TOKEN
            },
            success:function(response) {

                let name;
                if(response.serviceProvider != null) name = response.serviceProvider.name.split(" ")[0];
                else if(response.productProvider != null) name = response.productProvider.name.split(" ")[0];
        
                document.getElementById("navbar-user-actions").innerHTML =
                    `<p id="user-actions-welcome">Welcome `+ name +`</p>\n
                     <p id="navbar-dashboard">Dashboard</p>\n
                     <p id="navbar-edit">Edit Details</p> \n
                     <p id= "navbar-mobile-logout">Log out </p>`;

                document.getElementById("navbar-account-actions").innerHTML =
                    `<li id="navbar-username">Hi `+ name +`!</li>\n
                    <li id="navbar-logout">Logout</li>`;
            },
            error:function(xhr) {
                // If token is expired, logout
                if(xhr.status == 401 || xhr.status == 403) logout();
                else ERROR("An error occurred");
            }
        });
    }
}

// Open login modal if the user is not logged in when clicking the dashboard.
function checkLogin(){
    if(TOKEN != null && TOKEN != "null") window.location.href = "/dashboard.html";
    else loginModal(1);
}

//#region Tools

// Create DOM Elements
function el(tagName, attrs = {}, children = []) {
    const newElement = document.createElement(tagName);
    for ([key, value] of Object.entries(attrs)) {
      newElement.setAttribute(key, value);
    }
    newElement.append(...children);
    return newElement;
}

// Check if field is empty
function emptyField(field){
    if(field == null || field == "" || field == " " || field == undefined) return true;
    else return false;
}

// Scroll to a specific div smoothly. Similar to scroll-behaviour: smooth, and works on all browsers.
function smoothScroll(pos, time){
    var currentPos = window.pageYOffset;
    var start = null;
    if(time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        var progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}

/** Show the success animation and reload the page in 3 seconds */
function SUCCESS(){
    $(".success-animation").css("display", "block");
    setTimeout(function(){
        $(".success-animation").css("display", "none"); 
        window.location.reload();
    }, 3000);
}

/** Show the error animation and reload the page in 3 seconds.
 *  @param {String} message Error message to be displayed
 * @param {Boolean} redirect Redirect to error page or not
 */
function ERROR(message, redirect){
    $(".error-animation").css("display", "block");
    $("#error-message").text(message);

    setTimeout(function(){
        $(".error-animation").css("display", "none"); 
        if(redirect != false) window.location.href = "/error/error.html";
    }, 3000);
}

//#endregion

window.onscroll = function() {stickNavbar()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickNavbar() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("navbar-sticky");
  } 
  else {
    navbar.classList.remove("navbar-sticky");
  }
}

function activeNavbar(){
    let url = window.location.pathname.split(".")[0];

    switch(url){
        case "/":
        case "/index":
            document.getElementById("navbar-home").classList.add("navbar-active");
            break;
        case "/catalog":
        case "/service":
        case "/services":
            document.getElementById("navbar-services").classList.add("navbar-active");
            break;
        case "/competitions":
            document.getElementById("navbar-competitions").classList.add("navbar-active");
            break;
        case "/contact":
            document.getElementById("navbar-contact").classList.add("navbar-active");
            break;
        case "/dashboard":
            document.getElementById("navbar-dashboard").classList.add("navbar-active");
            break;
    }
}