$(document).ready(function () {
	$(".navbar-burger").click(function () {
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
	});

	$("#dark-mode").click(function () {
		setTheme();
	});

	let dark = window.matchMedia("(prefers-color-scheme: dark)");

	dark.addEventListener("change", function () {
		if (dark.matches) goDark();
		else goLight();
	});

	goDark(); // Load dark mode by default

	// if (dark.matches) goDark();
	// else goLight();

	greeting();
});

function setTheme() {
	if ($("body").hasClass("is-dark")) goLight();
	else goDark();
}

function goDark() {
	$("body").addClass("is-dark");
	$("#dark-mode").text("Go Light");
	$("#logo").attr("src", "assets/images/logo-dark.png");
}

function goLight() {
	$("body").removeClass("is-dark");
	$("#dark-mode").text("Go Dark");
	$("#logo").attr("src", "assets/images/logo.png");
}

function greeting() {
	// Wrap every letter in a span
	var textWrapper = document.querySelector("#line-1");
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	textWrapper.innerHTML += "<span class='letter wave'>&#128075;&#127996;</span>";

	var textWrapper = document.querySelector("#line-2");
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

	var textWrapper = document.querySelector("#line-3");
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='letter'>$&</span>");

	anime.timeline({ loop: false }).add({
		targets: ".animate .letter",
		scale: [4, 1],
		opacity: [0, 1],
		translateZ: 0,
		easing: "easeOutExpo",
		duration: 2000,
		delay: (el, i) => 70 * i,
	});
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