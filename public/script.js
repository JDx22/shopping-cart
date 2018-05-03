// an array with all of our cart items
var cart = [];
var itemsForSell=[
  {name: "glass" ,price: 68 ,url: 'http://ecx.images-amazon.com/images/I/31AOX24ATKL.jpg' },
  {name: "pencils" ,price: 3 ,url: 'http://ecx.images-amazon.com/images/I/51YFEe%2BCYbL.jpg' },
  {name: "kinfolk",price: 21 ,url: 'http://ecx.images-amazon.com/images/I/41m0VhULItL.jpg'},
  {name: "book",price: 25 ,url: 'http://ecx.images-amazon.com/images/I/41uyfSEwr0L.jpg'},
  {name: "pipe",price: 124,url: 'http://ecx.images-amazon.com/images/I/41TvbxcZpZL.jpg' },
  {name: "stool" ,price: 92 ,url: 'http://ecx.images-amazon.com/images/I/41NZO5GovmL.jpg'},

];

var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
  $(".cart-list").empty();
  var i=0, cartTotal=0;
  for (i=0;i<cart.length;i++)
  {
    $(".cart-list").append('<p data-name="'+cart[i].name+'"> '+cart[i]['name']+' - '+cart[i]['price']+'$ x'+cart[i].quantity+'   <button type="button" class="btn btn-danger remove-button">Remove</button></p>');
    cartTotal+=cart[i]['price']*cart[i].quantity;
  }
  
  localStorage.clear();
  localStorage.setItem('cart',JSON.stringify(cart));
  
  
  var $total=$(".shopping-cart  .total") ;
  $total.empty();
  $total.append(cartTotal);
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
$('.cart-list').on('click','.remove-button',function(){
  var name=$(this).closest('p').data().name;
  var i=0;
  for(; i< cart.length && cart[i].name!==name;i++);
  if(i!==cart.length) //not necessery, but just in case there is  a bug
    cart.splice(i,1);
  updateCart();

})

function addToCartClickHandler(  _this) {
  // TODO: get the "item" object from the page
  var $item = $( _this).closest(".item");
  var item = {  name: $item.data().name, 
                price: $item.data().price                 };
  addItem(item);
  updateCart();
};

$('.clear-cart').on('click', function () {
  clearCart();
});

function renderItems()
{
  //ans will be the concated 
  //string containing all the html (rows and columns),
  // after the loop I will append it to the shopping-cart-container class
  var i,stringToRender="";
  for(i=0;i<itemsForSell.length; i++)
  {

    if (i%3===0 )
      stringToRender+='<row>' 
    
    stringToRender+='<div class="col-md-4">\
      <div class="card-container">\
        <div class="card item" data-name="'+itemsForSell[i].name+'" data-price="'+itemsForSell[i].price+'">\
          <div class="pricebox">\
            <p class="price"> $'+itemsForSell[i].price+'</p>\
          </div>\
          <div class="buybox">\
            <p class="add-to-cart" onclick="addToCartClickHandler(this)"> ADD TO CART </p>\
          </div>\
          <div class="card-inner">\
            <img src="'+itemsForSell[i].url+'" class="proimage">\
          </div>\
        </div>\
      </div>\
    </div>';
  if(i%3===2)
    stringToRender+='</row>';

    
  }
  console.log(stringToRender);
  $(".shopping-cart-items").empty();
  $(".shopping-cart-items").append(stringToRender);
  

}

$(".shop-front").on("click",function(){
  $(".shopping-cart-page").css("display",function (index,oldVal)
  { 
    return "block";
  });

  $(".add-item-page").css("display",function(index,oldVal){
    return "none";
  });

  $(this).closest('ul').find('li').removeClass("active");
  $(this).closest("li").addClass("active");

})
$(".add-to-stock").on("click",function(){
  $(".shopping-cart-page").css("display",function (index,oldVal)
  { 
    return "none";
  });

  $(".add-item-page").css("display",function(index,oldVal){
    return "block";
  });
  $(this).closest('ul').find('li').removeClass("active");
  $(this).closest("li").addClass("active");
})

function loadCart()
{
  var oldCart=localStorage.getItem('cart');
  if (oldCart!==null)
  {   
     cart= JSON.parse(oldCart);
  }
}
//loading cart items from localStorge 
//, the first time user comes back to the page
loadCart();
// update the cart as soon as the page loads!
updateCart();

//render items on the grid
renderItems();

