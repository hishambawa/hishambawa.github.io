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

    filter.style.transform = "translateX(0)";

    if(filter.style.display == "block"){
        filter.style.display = "none";
    }

    else{
        filter.style.display = "block";
    }
}



function openCart(){

    let windowWidth = window.innerWidth;

    document.getElementById("cart-content").style.top = "0";

    // if(windowWidth > 1024){
    //     document.getElementById("cart-content").style.top = "25%";
    // }

    // else{
    //     document.getElementById("cart-content").style.top = "0";
    // }
}

function closeCart(){
    // document.getElementById("cart-content").style.display = "none";
    document.getElementById("cart-content").style.top = "-100vh";

}

function loadProducts(catagory){

    let container = document.getElementById("content");

    container.innerHTML = "";

    for(var i in items){

        if(catagory == "all" || items[i].catagory == catagory){
            container.innerHTML += 
            `
            <div class="item" id=" `+ items[i].code +`">
                <img src="https://dummyimage.com/600x600/f6f6f6/000" class="item-image" alt="product image">
                <p class="item-name">`+ items[i].name +`</p>
                <p class="item-price">$`+ items[i].price +`</p>
            </div>
            `;

        }
    }
}

let items =
[
    {
        code:"001",
        name:"Item Tshirt",
        price:"25",
        catagory:"tshirts"
    },

    {
        code:"002",
        name:"Item Shorts",
        price:"40",
        catagory:"shorts"
    },

    {
        code:"003",
        name:"Item Shoes",
        price:"15",
        catagory:"shoes"
    },

    {
        code:"004",
        name:"Item Accessories",
        price:"50",
        catagory:"accessories"
    },
]