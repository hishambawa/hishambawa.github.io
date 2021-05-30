function Product(name, price, image, type){
    this.name = name;
    this.price = price;
    this.image = image;
    this.type = type;

    this.getInfo = function(){
        alert(this.name + " : " + this.price);
    }
}

var item = [];

function addProduct(product){
    item.push(product);
}

function showProducts(product){

    var productTile = `
    <div class="items `+ product.type +`">
        <div class="image">
            <img src="`+ product.image +`">
            <figcaption>`+ product.name +`</figcaption>
            <figcaption class="price">$ `+ product.price +`</figcaption>
        </div>

        <div class="cart-options">

            <div class="size">
                <input type="checkbox" name="s-size" class="s"/>
                <input type="checkbox" name="s-size" class="m"/>
                <input type="checkbox" name="s-size" class="l"/>

                <span onclick="selectSize(this)">S</span>
                <span onclick="selectSize(this)">M</span>
                <span onclick="selectSize(this)">L</span>
            </div>

            <dic class="quantity">
                <input type="button" name = "minus" value="-" onclick="changeQuantity(this)">
                <input type="text" value = 0 maxlength="2">
                <input type="button" name = "plus" value="+" onclick="changeQuantity(this)">
            </dic>

            <div class="_cart">
                <input class="add-to-cart" type="button" data-name = "`+ product.name +`" data-image = "`+ product.image +`" data-price = "`+ product.price +`" data-type = "`+ product.type +`" onclick="addToCart(this)">
            </div>

        </div>
        
    </div>`;

    document.getElementsByClassName("item-container")[0].innerHTML += productTile;
}

window.onload = function(){
    item.forEach(showProducts);
}

var i = 1;

function test(){
    showProducts(new Product("Product " + i, 25, "images/tshirt_1.jpg", "tshirt"));
    i++;
}