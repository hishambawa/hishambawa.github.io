function menu(){

    let menu = document.getElementById("navigation");

    if(menu.style.display == "block"){
        menu.style.display = "none";
    }

    else{
        menu.style.display = "block";
    }
}

function filter(){

    let filter = document.getElementById("filter");

    if(filter.style.display == "block"){
        filter.style.display = "none";
    }

    else{
        filter.style.display = "block";
    }
}



function openCart(){
    // document.getElementById("cart-content").style.display = "grid";
    document.getElementById("cart-content").style.top = "0";
}

function closeCart(){
    // document.getElementById("cart-content").style.display = "none";
    document.getElementById("cart-content").style.top = "-100vh";

}