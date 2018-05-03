$('.form-add-product').on('click',function(event){
    event.preventDefault();
    var name=$("#form-product-name").val();
    var price=$("#form-product-price").val();
    var url=$("#form-image-url").val();
    addToItemsForSellArray(name,price,url);
    renderItems();
  })

function addToItemsForSellArray(name,price,url)
{
  var i=0;
  for( ; i<itemsForSell.length && itemsForSell[i].name!==name; i++);
  
  itemsForSell.splice(i,1,{name:name , price:price, url:url});
  
  
}
  console.log(cart);