let openCart = document.querySelector(".cart-icon");
let closeCart = document.querySelector(".close-cart");
let list = document.querySelector(".list");     // full list of products (div)
let cartListSide = document.querySelector(".cart-list");  //unordered list
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity')

openCart.addEventListener('click',()=>{
    body.classList.toggle('active');
})

closeCart.addEventListener('click',()=>{
    body.classList.remove('active');  
})

let products = [
    {
        id:1,
        name:'Product 1',
        image:'1.PNG',
        price:1099
    },
    {
        id:2,
        name:'Product 2',
        image:'2.PNG',
        price:599
    },
    {
        id:3,
        name:'Product 3',
        image:'3.PNG',
        price:1079
    },
    {
        id:4,
        name:'Product 4',
        image:'4.PNG',
        price:479
    },
    {
        id:5,
        name:'Product 5',
        image:'5.PNG',
        price:499
    },
    {
        id:6,
        name:'Product 6',
        image:'6.PNG',
        price:1199
    }
]

let cartList = [];
function initApp(){
    products.forEach((value,idx) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');  //adding css
        newDiv.innerHTML = `
            <img src='images/${value.image}'/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${idx})">Add to Cart</button>
        `;
        list.appendChild(newDiv)
    });
}
initApp();

function addToCart(idx){
    if(cartList[idx] == null){
        cartList[idx] = products[idx];
        cartList[idx].quantity = 1;
    }
    reloadCart();
}

function reloadCart(){
    cartListSide.innerHTML='';
    let count = 0;
    let totalPrice = 0;
    cartList.forEach((value,idx) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;

        if(value!=null){
            let newLi = document.createElement('li');
            newLi.innerHTML = `
                <div><img src='images/${value.image}'/></div>
                <div>${value.name}</div>
                <div>${(value.quantity*value.price).toLocaleString()}</div>
                <div>
                    <button onclick='changeQuantity(${idx},${value.quantity-1})'>-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick='changeQuantity(${idx},${value.quantity+1})'>+</button>
                </div>
            `;
            cartListSide.appendChild(newLi)
        }
    });
    total.innerHTML = totalPrice.toLocaleString();
    quantity.innerHTML = count
}

function changeQuantity(idx,newQuantity){
    if(newQuantity==0){
        delete cartList[idx]
    }
    else{
        cartList[idx].quantity = newQuantity;
    }
    reloadCart();
}

