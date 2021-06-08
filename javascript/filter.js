function filterItems(item){
    let label = document.getElementById("filter-label");
    let filter = document.getElementById("filter");

    switch(item){

        case "all":
            label.innerText = "All";
            loadProducts("all");
            // filter.style.transform = "translateY(-1000px)";
            // setTimeout(function(){filter.style.display = "none";}, 400);
            hideFilter();
            break;

        case "t-shirts":
            label.innerText = "T-Shirts";
            loadProducts("tshirts");
            hideFilter();
            break;

        case "shorts":
            label.innerText = "Shorts";
            loadProducts("shorts");
            hideFilter();
            break;

        case "shoes":
            label.innerText = "Shoes";
            loadProducts("shoes");
            hideFilter();
            break;
            
        case "accessories":
            label.innerText = "Accessories";
            loadProducts("accessories");
            hideFilter();
            break;
    }
}

function hideFilter(){
    let windowWidth = window.innerWidth;
    let filter = document.getElementById("filter");

    if(parseInt(windowWidth) <= 768){
        filter.style.transform = "translateY(-1000px)";
        setTimeout(function(){filter.style.display = "none";}, 400)
    }
}