// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: 'https://placehold.it/50x100',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template: `
                <div class="topBasketWrap">
                    <a href="#" class="topBasket btn-cart" type="button" @click="showCart = !showCart">
                        <img src="img/basketIcon.png" alt="miniBasket">
                    </a>
                    <div class="subMenuArrow" v-show="showCart"></div>
                    <nav class="mainSubMenusBlock" v-show="showCart">
                        <div class="subMenuBox">
                            <div class="subMenuBoxTextInfo">
                                <!--<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>-->
                                <!--<div class="cart-block" v-show="showCart">-->
                                <div class="cart-block"
                                    <ul class="subMenu">
                                        <cart-item 
                                            v-for="item of cartItems" 
                                            :key="item.id_product" 
                                            :img="imgCart" 
                                            :cart-item="item" 
                                            @remove="remove">
                                        </cart-item>
                                    </ul>
                                </div>
                            </div>        
                            <ul class="subMenu">
                                <li class="miniCartTotalItem">
                                    <div class="totalBlock">
                                        <div>TOTAL</div>
                                        <div>$500.00</div>
                                    </div>
                                    <a href="checkout.html" class="checkout button">Checkout</a>
                                    <a href="cart.html" class="goToCart button">Go to cart</a>
                                </li>
                            </ul>
                            </div>
                        </div>

                    </nav>
                </div>
                `


});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template:`<li class="miniCartItem">
                    <a href="product_detail.html" 
                        class="miniCartItemImgBlock miniCartItemImgBlock1"
                        :style="{ 'background-image': 'url(/storage/images/products/' + (cartItem.id_product) + '.png)' }">
                    </a>
                    <div class="miniCartItemInfoBlock">
                        <div class="name">{{ cartItem.product_name }}</div>
                        <div class="mark">
                            <img src="img/markStars.png" alt="markStars">
                        </div>
                        <div class="numberAndPrive del-btn">
                            {{ cartItem.quantity }} x $ {{ cartItem.price }} = $ {{cartItem.quantity*cartItem.price}}
                        </div>
                    </div>
                    <div class="miniCartItemDeleteBlock" @click="$emit('remove', cartItem)">
                        <img class="crossIcon" src="img/crossIcon.png" alt="cross">
                    </div>
                </li>`


        // `<div class="cart-item">
        //             <div class="product-bio">
        //                 <img :src="cartItem.img ? cartItem.img : img" alt="Some img">
        //                 <div class="product-desc">
        //                     <div class="product-title">{{ cartItem.product_name }}</div>
        //                     <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
        //                     <div class="product-single-price">$ {{ cartItem.price }} each</div>
        //                 </div>
        //             </div>
        //             <div class="right-block">
        //                 <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
        //                 <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
        //             </div>
        //         </div>`
})