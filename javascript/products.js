var size;

function selectSize(element){

    // Change the color of the size label when selecting it
    var labels = document.getElementsByTagName("span");
    var i = 0;

    while(i < labels.length){
        
        if(element == labels[i]){                      
            element.style.background = "darkgray";
            size = element.innerText;
        }

        else{
            labels[i].style.background = "#ffffff";
        }
        i++;
    }
}

function changeQuantity(element){

    // Getting the Quantity value based on the button that is clicked (+/-)
    var prev = element.previousElementSibling;
    var next = element.nextElementSibling;

    if(element.name == "plus"){
        prev.value = parseInt(prev.value) + parseInt(1);
    }

    else if(element.name == "minus" && next.value != 0){
        next.value = parseInt(next.value) - parseInt(1);
    }
}

function filterItems(element){

    var items = document.getElementsByTagName("div");  
    var i = 0;

    // Show all the items that belong to the selected catagory. Hide the remaining items
    while(i < items.length){
        if(items[i].className.split(" ")[0] == "items" && items[i].className.split(" ")[1] != element.id){
            items[i].style.display = "none";
        }
        else if(items[i].className.split(" ")[0] == "items" && items[i].className.split(" ")[1] == element.id){
            items[i].style.display = "";
        }

        i++;
    }
}

function filterPrice(element){

    var items = document.getElementsByClassName("items");

    // Show all items that costs less than the selected price. Hide the items above that price
    for(var i = 1; i < items.length; i++){

        var amount = parseInt(items[i].childNodes[1].childNodes[5].innerText.split("$")[1]);

        if((element.id == "40") && (amount > 40 && items[i].className.split(" ")[0] == "items")){
            items[i].style.display = "none";
        }

        else if((element.id == "40") && items[i].className.split(" ")[0] == "items"){
            items[i].style.display = "";
        }

        if((element.id == "60") && (amount > 60 && items[i].className.split(" ")[0] == "items")){
            items[i].style.display = "none";
        }

        else if((element.id == "60") && items[i].className.split(" ")[0] == "items"){
            items[i].style.display = "";
        }

        if((element.id == "100") && (amount > 100 && items[i].className.split(" ")[0] == "items")){
            items[i].style.display = "none";
        }

        else if((element.id == "100") && items[i].className.split(" ")[0] == "items"){
            items[i].style.display = "";
        }   
    }
}

function getAll(){

    // Display all the items
    var items = document.getElementsByClassName("items");
    var i = 0;

    while(i < items.length){
        items[i].style.display = "";
        i++;
    }
}

function blurItems(){
    // Blur the items container when hovering over the cart
    document.getElementsByClassName("item-container")[0].style.filter = "blur(3px)";
}

function unblurItems(){
    // Unblur the items container when closing the cart
    document.getElementsByClassName("item-container")[0].style.filter = "blur(0)";
}

function addToCart(element, type){

    var quantity = element.parentElement.previousElementSibling.children[1].value;
    var item = element.getAttribute("data-name");
    var price = element.getAttribute("data-price");
    var image = element.getAttribute("data-image");
    var cart = document.getElementsByClassName("items")[0];
    var type = element.getAttribute("data-type");

    if(quantity == 0){
        alert("Please select the quantity");
    }
    else{
        switch(type){
            case "tshirt":
            case "shorts":
            case "shoes":
                if(size == undefined){
                    alert("Please select a size");
                }
    
                else{
                    cart.innerHTML += 
                    `<div class="cart-item">
                        <img src="`+ image + `">
                        <ul>
                            <li name="product-name">`+ item +`</li>
                            <li>Size : `+ size+`</li>
                            <li name="quantity">Quantity : `+ quantity +`</li>
                            <li name="price">`+ price +`</li>
                        </ul>
                        <img class = "delete" src = "icons/delete.svg" onclick="deleteItem(this)">
                    </div>`

                    document.getElementsByClassName("added-to-cart")[0].style.transform = "scale(1)";
                    setTimeout(function() {document.getElementsByClassName("added-to-cart")[0].style.transform = "scale(0)";}, 3000);
                }
                
                break;
            
            case "accessories":
                cart.innerHTML += 
                    `<div class="cart-item">
                        <img src="`+ image + `">
                        <ul>
                            <li name="product-name">`+ item +`</li>
                            <li name="quantity">Quantity : `+ quantity +`</li>
                            <li name="price">`+ price +`</li>
                        </ul>
                        <img class = "delete" src = "icons/delete.svg" onclick="deleteItem(this)">
                    </div>`

                document.getElementsByClassName("added-to-cart")[0].style.transform = "scale(1)";
                setTimeout(function() {document.getElementsByClassName("added-to-cart")[0].style.transform = "scale(0)";}, 3000);   
                break;
        }
    }

    // Reset the size
    size = undefined;
}

function deleteItem(element){
    
    var itemList = element.parentElement.parentElement;
    var item = element.parentElement;

    item.classList.add("deleted");

    // delete items after delete transition effect is over (effect is added in the deleted class)
    setTimeout(function(){
        var removedItems = document.getElementsByClassName("deleted");

        // delete item from checkout tab
        for(var i = 0; i < removedItems.length; i++){
            removedItems[i].parentElement.removeChild(removedItems[i]);
        }

        // update cart after deleting items from the checkout tab
        document.getElementsByClassName("items")[0].innerHTML = itemList.innerHTML;

        // Update the Quantity and Total in the checkout tab after removing an item
        getQuantity();
        getTotal();
    },500);
    
}

function clearCart(element){

    var cart = element.parentElement.previousElementSibling;
    
    // Added deleted class to show an effect when removing all the elements
    for(var i = 0; i < cart.childNodes.length; i++){
        cart.childNodes[i].classList.add("deleted");
    }

    // Remove all the items in the cart after the transition effect is complete
    setTimeout(function(){cart.innerHTML = "";}, 500);
}

function showModal(action){
    
    var modal = document.getElementById("popup-modal");
    var all = document.getElementsByTagName("div");
    var modalBody = document.getElementById("modal-body");
    var title = document.getElementById("modal-title");

    // Blur all the elements in the container except the checkout modal and hide the scrollbar
    for(var i = 0; i < all.length; i++){

        if(all[i].id != "popup-modal" && all[i].className != "container" && all[i].className != "cart-item"  && all[i].id != "item-list" && all[i].id != "bill" && all[i].id != "modal-body"){
            all[i].style.filter = "blur(10px)";
            document.body.style.overflow = "hidden";
        } 
    }


    if(action == "showCart"){

        title.innerText = "Cart";

        modalBody.innerHTML = 
        `<div id="item-list" style="width: 50%;"></div>

        <div id="bill">
            <span>Summary</span>
            <ul>
                <li id="checkout-quantity">Items : </li>
                <li id="checkout-total">Total : </li>
            </ul>

            <input type="button" id="btn-checkout" value="Checkout" onclick="showModal('showInvoiceForm')">

        </div>`

        // Set the items in the cart to the checkout modal
        document.getElementById("item-list").innerHTML = document.getElementsByClassName("items")[0].innerHTML;
        getQuantity();  // Update the Quantity
        getTotal();     // Update the Total Price
    }

    else if(action == "showInvoiceForm"){
       
        // Check if the cart is empty
        if(document.getElementById("checkout-quantity").innerText ==  "Items : 0"){
            alert("Cart is Empty");
        }

        else{

            // Change the text in the Modal Button
            var button = document.getElementById("btn-checkout");
            button.value = "Place Order";

            // Change the onclick action of the Button
            button.setAttribute( "onclick", "javascript: placeOrder()" )

            var container = document.getElementById("popup-modal");
            var itemList = document.getElementById("item-list");
            
            container.style.height = "40%";

            title.innerText = "Confirm Order";

            itemList.innerHTML = `

                <form>
                    <div class = "input-group">
                        <label for = "fullName" class = "invoice-label">Full Name : </label>
                        <input type = "text" id = "fullName" class = "invoice-input" placeholder="Enter your Full Name">
                    </div>
                    <div class = "input-group">
                        <label for = "email" class = "invoice-label">Email : </label>
                        <input type = "email" id = "email" class = "invoice-input" placeholder = "Enter your Email Address">
                    </div>
                    <div class = "input-group">
                        <label for = "number" class = "invoice-label">Contact No. : </label>
                        <input type = "tel" id = "number" class = "invoice-input" maxlength = 10 placeholder = "Enter your Phone Number">
                    </div>
                </form>`;
        }
    }

    // Show the Modal
    modal.style.transform = "scale(1)";
    modal.style.zIndex = "11";
}

function hideModal(){

    var modal = document.getElementById("popup-modal");
    var modalBody = document.getElementById("modal-body");
    var all = document.getElementsByTagName("div");

    // Unblur the container and show the scrollbar
    for(var i = 0; i < all.length; i++){
        if(all[i].id != "popup-modal" && all[i].className != "container"){
            all[i].style.filter = "blur(0px)";
            document.body.style.overflow = "auto";
        }
         
    }

    // Revert the Modal Size
    modal.classList.remove("invoice-modal");
    modalBody.style.height = "70%";

    // Hide the checkout modal
    modal.style.transform = "scale(0)";
    modal.style.zIndex = "0";
}

function getTotal(){
    var itemDetails = document.getElementById("item-list").getElementsByTagName("li");
    var total = 0;
    var quantity = 0;

    // Get the total price
    for(var i = 0; i < itemDetails.length; i++){
        if(itemDetails[i].getAttribute("name") == "price"){
            // Get the quantity of each item
            quantity = parseInt(itemDetails[i].previousElementSibling.innerText.split(":")[1]);
            total += (parseInt(itemDetails[i].innerText.split("$")[1])) * quantity;
        }
    }

    document.getElementById("checkout-total").innerText = "Total : $" + total;
}

function getQuantity(){
    var itemDetails = document.getElementById("item-list").getElementsByTagName("li");
    var quantity = 0;

    // Get the total quantity
    for(var i = 0; i < itemDetails.length; i++){
        if(itemDetails[i].getAttribute("name") == "quantity"){
            quantity += parseInt(itemDetails[i].innerText.split(":")[1])
        }
    }

    document.getElementById("checkout-quantity").innerText = "Items : " + quantity;
}

function placeOrder(){
    var name = document.getElementById("fullName");
    var email = document.getElementById("email");
    var phoneNumber = document.getElementById("number");

    var modal = document.getElementById("popup-modal");
    var modalBody = document.getElementById("modal-body");
    var title = document.getElementById("modal-title");

    var date = new Date();
    var nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000)

    var orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate 6 digit random number
    var orderDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(); 
    var deliveryDate = nextWeek.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(); 

    var valid = validate(name,email,phoneNumber);

    if(valid){
        // Resize the Modal
        modal.classList.add("invoice-modal");
        modalBody.style.height = "100%";

        title.innerText = "Invoice";

        // Adding the contents of the Invoice
        modalBody.innerHTML = 
        `<div id = "invoice-header">
            <div class = "customer-info" style="float:left; width:50%">
                <ul>
                    <li>`+ name.value +`</li>
                    <li>`+ email.value +`</li>
                    <li>`+ phoneNumber.value +`</li>
                </ul>
            </div>
            <div id = "order-info" style="float:right; width:50%">
                <ul>
                    <li> Order Number : `+ orderNumber +`</li>
                    <li> Date : `+ orderDate +`</li>
                    <li> Delivery Date : `+ deliveryDate +`</li>
                </ul>
            </div>
            <hr>
        </div>

        <div id = "invoice-body">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody id = "invoice-items"></tbody>
            </table>
        </div>

        <div id = "invoice-footer">
            <span id = "invoice-total"></span>
        </div>`;

        var cart = document.getElementsByClassName("cart-item");
        var productsTable = document.getElementById("invoice-items");

        var name = document.getElementsByName("product-name");
        var price = document.getElementsByName("price");
        var quantity = document.getElementsByName("quantity");
        var total = document.getElementById("invoice-total");
        var totalAmount = 0;

        // Show the items in the invoice
        for(var i = 0; i < cart.length; i++){
            totalAmount += parseInt(price[i].innerText.split("$")[1]);
            productsTable.innerHTML += 
            `<tr>
                <td>`+ name[i].innerText +`</td>
                <td>`+ quantity[i].innerText.split(":")[1] +`</td>
                <td>`+ price[i].innerText +`</td>
            </tr>`;
        }

        // Set the total amount in the Invoice
        total.innerText = "Total : $" + totalAmount;
    }
}

function validate(name,email,phoneNumber){

    // Validate the Name
    if(name.value == "" || name.value.split(" ")[1] == null){
        alert("Please enter your Full Name");
        return false;
    }
    else if(name.value.match(/\d/g)){   // Regex to check if the String has a digit
        alert("Please enter a valid Name");
        return false;
    }

    // Validate the Email Address
    if(email.value == ""){
        alert("Please enter your Email Address");
        return false;
    }
    else if((email.value.indexOf("@") < 1) || (email.value.indexOf(".") == email.value.length-1 || email.value.indexOf(".") < 1)){
        alert("Please enter a valid Email Address");
        return false;
    }

    // Validate the Phone Number
    if(phoneNumber.value == ""){
        alert("Please enter your Phone Number");
        return false;
    }
    else if(isNaN(Number(phoneNumber.value)) || phoneNumber.value.length < 10){
        alert("Please enter a valid Phone Number");
        return false;
    }

    return true;
}