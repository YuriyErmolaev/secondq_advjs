const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

document.querySelector('.btn-cart').addEventListener( 'click', ()=>{
    document.querySelector('.subMenuArrow').classList.toggle('none');
    document.querySelector('.mainSubMenusBlock').classList.toggle('none');
});

function addToCartHandler(e){

    let button = e.target,
        productHtmlEl = button.closest('.product-item');


    // productId = productHtmlEl.data.id;
    // console.log(productId);
    // productElData = getProductElData( productHtmlEl ),
    // productId = productElData[0],
    // productObj;

    // //create or get product object
    // if( !(productId in productsObj)  ){
    //     productObj = new Product (...productElData);
    //     productsObj[productId] = productObj;
    // } else {
    //     productObj = productsObj[productId];
    //     productObj.addNum();
    // }
    //
    //
    // //create product cart element if does not exist and add handler for delete
    // if( !getProductCartEl(cartEl, productId) ){
    //     let newCartItemMarkup = getCartItemMarkup(productObj);
    //     cartEl.insertAdjacentHTML( 'afterbegin', newCartItemMarkup );
    //     document.querySelector( `.itemCart_${productId} .crossIcon` )
    //         .addEventListener( 'click', delFromCartHandler);
    // }
    //
    // let productCartEl = getProductCartEl(cartEl, productId);
    // productCartEl.querySelector('.num').innerHTML = productObj.num;
    // productCartEl.querySelector('.sum').innerHTML = productObj.sum;
    //
    // updateCartTotal(
    //     1,
    //     productObj.price
    // );

}

class ProductsList {
    constructor(
        data,
        container = '.products',
        arProductsName = null
    ){
        this.data = data;
        this.container = container;
        this.arProductsName = arProductsName;
        this.goods = this.arProductsName ? [ ...this.data[arProductsName] ] : [...this.data];
        this.render();
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            //this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
            document.querySelector( `.product-item_${productObj.id} .buy-btn` )
                .addEventListener('click', addToCartHandler);
        }
    }
}
class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item product-item_${this.id}" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Cart extends ProductsList  {
    constructor(
        data,
        container = '.subMenu',
        arProductsName = 'contents'
    ){
        super(data, container, arProductsName);
        this.sum = this.data.amount;
        this.num = this.data.countGoods;
        this.updateHtmlSumNum()
    }
    updateHtmlSumNum(){
        const cartSummEl = document.querySelector( '.cartSumm' );
        cartSummEl.innerHTML = this.sum;
        const goodsNumEl = document.querySelector( '.goodsNum' );
        goodsNumEl.innerHTML = this.num;
    }
    render(){
        const block = document.querySelector(this.container);
        for (let cartproduct of this.goods){
            const cartproductObj = new CartProductItem(cartproduct);
            block.insertAdjacentHTML("afterbegin", cartproductObj.render());
            // document.querySelector( `.product-item_${productObj.id} .buy-btn` )
            //     .addEventListener('click', this.deleteFromCartHandler);
        }
    }
    updateCartTotal(num, sum){

    }
    deleteFromCartHandler(){
    }
}
class CartProductItem extends ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150', goodsList = [] ){
        super( product, img );
        this.num = product.quantity;
        this.sum = this.price * this.num;
    }
    render(){
        return `<li class="miniCartItem itemCart_${this.id}">
                    <a href="product_detail.html" style="background-image: url('${this.img}')" class="miniCartItemImgBlock miniCartItemImgBlock1"></a>
                    <div class="miniCartItemInfoBlock">
                        <div class="name">${this.title}</div>
                        <div class="mark">
                            <img src="img/markStars.png" alt="markStars">
                        </div>
                        <div class="numberAndPrive">
                            <span class="num">${this.num}</span>
                                x $
                            <span class="price">${this.price}</span>
                             =
                            <span class="sum">${this.sum}</span>
                        </div>
                    </div>
                    <div class="miniCartItemDeleteBlock">
                        <img class="crossIcon" src="img/crossIcon.png" alt="cross">
                    </div>
                </li>`
    }
    addNum() {
        this.num += 1;
        this.sum = this.price * this.num;
    }
    resetNum() {
        this.num = 0;
        this.sum = 0;
    }
}

const classes = {ProductsList, Cart};
class DynamicClass {
    constructor (className, opts) {
        return new classes[className](opts);
    }
}

function createObj( className, endpoint ){
    return fetch(`${API}/${endpoint}`)
        .then(result => result.json())
        .catch(error => {
            console.log(error);
        })
        .then(data => { //data - object js
            new DynamicClass(className, data);
        });
}

const plP = createObj( 'ProductsList', 'catalogData.json' );
const cP = createObj( 'Cart', 'getBasket.json' );



