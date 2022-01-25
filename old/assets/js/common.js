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

// Show / Hide the "Back to Top" icon on scroll
window.addEventListener("scroll", function(event){
    if(window.scrollY > 300){
        document.getElementById("top").style.display = "block"; // Show the back to top button
    }
    else{
        document.getElementById("top").style.display = "none";  // Hide the back to top button
    }
});

window.addEventListener("load", function(){
    // Show not supported dialog on IE
    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    if(isIE){
        document.getElementById("incompatible").style.display = "flex";
        document.getElementById("edge-url").href = "microsoft-edge:" + document.URL;
    } 

    // Animate on Scroll
    AOS.init({once: true});
});