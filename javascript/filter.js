function filterItems(item){
    let label = document.getElementById("filter-label");

    switch(item){

        case "all":
            label.innerText = "All";
            break;
        case "t-shirts":
            label.innerText = "T-Shirts";
            break;
        case "shorts":
            label.innerText = "Shorts";
            break;
        case "shoes":
            label.innerText = "Shoes";
            break;
        case "accessories":
            label.innerText = "Accessories";
            break;
    }
}