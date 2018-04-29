// an array with all of our cart items
var cart = [];


var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
  $(".cart-list").empty();
  var i=0, cartTotal=0;
  for (i=0;i<cart.length;i++)
  {
    $(".cart-list").append('<p> '+cart[i]['name']+' - '+cart[i]['price']+'$ x'+cart[i].quantity+'</p>');
    cartTotal+=cart[i]['price']*cart[i].quantity;
  }
  
  var $total=$(".shopping-cart  .total") ;
  $total.empty();
  $total.append(cartTotal)
}


var addItem = function (item) {
  // TODO: Write this function. Remember this function has nothing to do with display. 
  // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
  var i=0;
  for (;i<cart.length && cart[i].name!==item.name;i++);
  if (i===cart.length)
    cart.push( {name: item.name, price: item.price , quantity: 1 } );
  else //incase item already on cart 
    cart[i].quantity++;
}

var clearCart = function () {
  // TODO: Write a function that clears the cart ;-)
  cart.length=0; //empty cart array
  updateCart();
}
  //  hide/show the shopping cart!
$('.view-cart').on('click', function () {
  $(".shopping-cart").css("display",function (index,oldVal)
  {
    var newVal;
    if(oldVal==="none")
      newVal="block";
    else
      newVal="none";
    
    return newVal;
  })
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  var $item = $(this).closest(".item");
  var item = {  name: $item.data().name, 
                price: $item.data().price                 };
  addItem(item);
  updateCart();
});

$('.clear-cart').on('click', function () {
  clearCart();
});

// update the cart as soon as the page loads!
updateCart();
