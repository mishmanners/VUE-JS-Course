var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            true: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
               <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <!-- <p v-if="instock && inventory > 0">Get it while it's hot</p> -->
                <p v-if="inStock">In Stock</p>
                <!--  <p v-else-if="inventory < 10  && inventory > 0">Almost sold out</p> -->
                <p v-else>Sold out</p>
                <p>Shipping: {{ shipping }}</p>
                
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>    
                </ul>

                <div v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    class="color-box"
                    :style="{backgroundColor: variant.variantColour }"
                    @mouseover="updateProduct(index)">
                </div>

                <p>Available sizes:</p>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>    
                </ul>

                <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to cart</button>
                <!-- <button @click="removeCart">Remove from cart</button> -->
            </div>

            <!-- <h2>Reviews</h2> -->

            <product-tabs :reviews="reviews"></product-tabs>
        </div>
    `,
    data() {
        return {
            product: 'Hoodie',
            brand: 'Donut',
            description: 'MishManners hoodie with the most delicious donut ever. Guaranteed to make you hungry all the time.',
            selectedVariant: 0,
            details: ['machine washable', 'cotton/polyester blend fleece', 'Gender neutral', 'lightweight hoodie', 'essence of Mish', 'guaranteed to make you awesome'],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            variants: [
            {
                variantId: 2234,
                variantColour: "#424242",
                variantImage: './product-images/dark-hoodie.png',
                variantQuantity: 3
            },
    
            {
                variantId: 2235,
                variantColour: "#F5F5F5",
                variantImage: './product-images/light-hoodie.png',
                variantQuantity: 7
            },
    
            {
                variantId: 2235,
                variantColour: "#8B0000",
                variantImage: './product-images/red-hoodie.png',
                variantQuantity: 0
            }
        ],
        reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        removeCart() {
            this.cart -= 1
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping () {
            if (this.premium) {
                return "Free"

            }
            return 5.99
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form"@submit.prevent="onSubmit">
        
        <!-- <p class="error" v-if="errors.length">
            <b>Please fix the following stuff(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p> -->

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5 stars</option>
            <option>4 stars</option>
            <option>3 stars</option>
            <option>2 stars</option>
            <option>1 stars</option>
          </select>
        </p>
            
        <p>
          <input type="submit" value="Submit">  
        </p>    
      
    </form>
    `,
    data () {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    review: this.rating,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("You must have a name!")
                if(!this.review) this.errors.push("Say something about the product")
                if(!this.rating) this.errors.push("Give it a rating")
            }
        }

    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <ul>
                <span class="tabs"
                    :class="{ activeTab: selectedTab === tab}"
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click="selectedTab = tab">
                    {{ tab }}</span>
                </ul>
    
        <div v-show="selectedTab === 'Reviews'">    
            <p v-if="!reviews.length">There are no reviews yet. Add one below.</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Add a Review'">
            <product-review></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Add a Review'],
            selectedTab: 'Reviews'
        }
    }
})

var app = new Vue ({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart (id) {
            this.cart.push(id)
        }
    }    
})