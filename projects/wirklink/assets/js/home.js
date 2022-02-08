window.addEventListener("load",function(){
    if(window.scrollY > 100) smoothScroll("document.getElementById('#navbar').offsetTop", 1000);

    let i = 0;
    let text = "Looking for a service?";
    typeWriter(i, text);
    
    AOS.init();

    let navbar = document.getElementById("navbar");
    let stepsDivider = document.getElementById("divider").offsetTop + 25;
    let joinUsDivider = document.getElementById("join-us-divider").offsetTop + 30;

    document.onscroll = function() {
        if(window.pageYOffset > stepsDivider && window.pageYOffset < joinUsDivider) navbar.style.backgroundColor = "#dde8fb";
        else if(window.pageYOffset > joinUsDivider) navbar.style.backgroundColor = "#ecf3f7";
        else navbar.style.backgroundColor = "#f1f1f1";
    }
});

function typeWriter(i, text) {
    if (i < text.length) {
        document.getElementById("landing-txt").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100, i, text);
    }

    if(i == text.length){
        document.getElementById("landing-btn").style.opacity = "1";
    }
}