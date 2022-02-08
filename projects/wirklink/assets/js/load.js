document.addEventListener('DOMContentLoaded',function() {
    loader(1);
});

window.addEventListener('load',function() {
    loader(0);
});

function loader(action){
    if(action == 1){
        $("#container").addClass("site-loading");
        $(".loading-screen").addClass("site-load-active");
    }

    else{
        $("#container").removeClass("site-loading");
        $(".loading-screen").removeClass("site-load-active");
    }
}