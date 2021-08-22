Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: '/imgs/default.png'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="products featuredItemsBlock">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="imgProduct"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template:
        `<div class="featureItem">
            <a class="featureItemLink" href="product_detail.html">
                <div class="featureItemImgBlock featureImg1"
                    :style="{ 'background-image': 'url(/storage/images/products/' + (product.id_product) + '.png)' }"
                ></div>
                <div class="featureItemInfoBlock">
                    <div class="featureItemTitleBlock">{{product.product_name}}</div>
                    <div class="featureItemPriceBlock">$ {{product.price}}</div>
                </div>
            </a>
            <div class="addTobasketLinkWrap">
                <a class="addTobasketLink buy-btn button" href="#" @click="$emit('add-product', product)">
                    <img class="whiteBasketIcon" src="img/whiteBasketIcon.png" alt="white basket icon">
                        Add to Cart
                </a>
            </div>
        </div>`


    //     `
    //         <div class="product-item">
    //             <img :src="product.img ? product.img : img" alt="Some img">
    //             <div class="desc">
    //                 <h3>{{product.product_name}}</h3>
    //                 <p>{{product.price}}</p>
    //                 <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
    //             </div>
    //         </div>
    // `
})