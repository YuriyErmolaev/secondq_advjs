class ProductList {
    constructor(containter='.products') {
        this.container = containter;
        this.goods = [];
        this._fetchProducts();
        this.render();
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50}
        ];
    }
    render(){
        const block = document.querySelector(this.container);
        block.innerHTML = this.goods.map(product => new ProductItem(product).render()).join('');
    }
    summ(){
        return this.goods.reduce( (summ, product) => summ += product.price, 0 );
    }

}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}


const productsList = new ProductList();

console.log( 'Produts summ: ', productsList.summ() );


class Cart {
    constructor(itemList, summ) {
        this.itemList = [];
        this.summ = 0
    }
    itemExist(){
    }
    addItem(){
    }
    removeItem(){
    }
    updateSumm(){
    }
    render(){

    }
}

class CartItem {
    constructor(product, num, summ) {
    }
    changeNum(){
    }
    updateSumm(){
    }
    render(){
    }
}


class Hamburger{
    constructor(
        size,
        fill,
        above
    ) {
        this.props = {};
        this.renderHamProps();
        this.inputParameters = {'size':size, 'fill':fill, 'above':above};
        this.summ = 0;
        this.callories = 0;
        this.getSummAndCallories();
    }
    getSummAndCallories() {
        for (const [propName, propValue] of Object.entries(this.inputParameters)) {
            this.summ +=  this.props[propName][propValue].price;
            this.callories +=  this.props[propName][propValue].cal;
        }
    }
    renderHamProps(){
        let sizeProp = new HamburgerProp('big', 'small');
        sizeProp.fillProp( 'big', 100, 40  );
        sizeProp.fillProp( 'small', 50, 20  );
        this.props.size = sizeProp;

        let fillProp = new HamburgerProp('cheese', 'salad', 'potatoes');
        fillProp.fillProp( 'cheese', 10, 20  );
        fillProp.fillProp( 'salad', 20, 5  );
        fillProp.fillProp( 'potatoes', 15, 10 );
        this.props.fill = fillProp;

        let aboveProp = new HamburgerProp('flavor', 'mayonnaise');
        aboveProp.fillProp( 'flavor', 15, 0  );
        aboveProp.fillProp( 'mayonnaise', 20, 5 );
        this.props.above = aboveProp;
    }

}

class HamburgerProp{
    constructor( ...propVariants ){
        propVariants.forEach((propVariant)=>{
          this[propVariant] = {price:0, cal:0}
        })
    }
    fillProp(propVarName, price, cal){
        this[propVarName].price = price;
        this[propVarName].cal = cal;
    }
}

const hamburger = new Hamburger('big', 'salad', 'flavor');

console.log( 'Hamburger summ: ', hamburger.summ );
console.log( 'Hamburger callories:', hamburger.callories );