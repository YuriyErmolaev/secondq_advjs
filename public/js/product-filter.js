Vue.component('ProductFilter', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="searchBlock search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                        <details>
                            <summary class="button searchSelect">Browse &#9660;</summary>
                            <div class="subMenuArrow"></div>
                            <nav class="mainSubMenusBlock">
                                <div class="subMenuBox">
                                    <div class="subMenuBoxTextInfo">
                                        <div class="subMenuBoxTitle">COMPANY</div>
                                        <ul class="subMenu">
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Shop</a></li>
                                            <li><a href="#">About</a></li>
                                            <li><a href="#">How It Works</a></li>
                                            <li><a href="#">Contact</a></li>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Shop</a></li>
                                            <li><a href="#">About</a></li>
                                            <li><a href="#">How It Works</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="subMenuBox">
                                    <div class="subMenuBoxTextInfo">
                                        <div class="subMenuBoxTitle">INFORMATION</div>
                                        <ul class="subMenu">
                                            <li><a href="#">Tearms & Condition</a></li>
                                            <li><a href="#">Privacy Policy</a></li>
                                            <li><a href="#">How to Buy</a></li>
                                            <li><a href="#">How to Sell</a></li>

                                        </ul>
                                    </div>
                                </div>

                            </nav>
                        </details>
                        <input type="text" class="searchInputTest search-field" placeholder="Search for item..." v-model="userSearch">
                        <button class="searchSubmit" type="submit">
                            <img src="img/loupeIcon.png" alt="loupe">
                        </button>
                    </form>`
})