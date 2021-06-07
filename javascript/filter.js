function filterItems(item){
    let label = document.getElementById("filter-label");
    let filter = document.getElementById("filter");

    switch(item){

        case "all":
            label.innerText = "All";
            loadProducts("all");
            filter.style.transform = "translateY(-1000px)";
            setTimeout(function(){filter.style.display = "none";}, 400);
            break;

        case "t-shirts":
            label.innerText = "T-Shirts";
            loadProducts("tshirts");
            filter.style.transform = "translateY(-1000px)";
            setTimeout(function(){filter.style.display = "none";}, 400);
            break;

        case "shorts":
            label.innerText = "Shorts";
            loadProducts("shorts");
            filter.style.transform = "translateY(-1000px)";
            setTimeout(function(){filter.style.display = "none";}, 400);
            break;

        case "shoes":
            label.innerText = "Shoes";
            loadProducts("shoes");
            filter.style.transform = "translateY(-1000px)";
            setTimeout(function(){filter.style.display = "none";}, 400);
            break;
            
        case "accessories":
            label.innerText = "Accessories";
            loadProducts("accessories");
            filter.style.transform = "translateY(-1000px)";
            setTimeout(function(){filter.style.display = "none";}, 400);
            break;
    }
}