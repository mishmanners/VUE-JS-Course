var app = new Vue ({
    el: '#app',
    data: {
        product: 'Donut Hoodie',
        description: 'MishManners hoodie with the most delicious donut ever. Guaranteed to make you hungry all the time.',
        image: './product-images/dark-hoodie.png',
        inventory: 9000,
        inStock: true,
        onsale: false,
        details: ['machine washable', 'cotton/polyester blend fleece', 'Gender neutral', 'lightweight hoodie', 'essence of Mish', 'guaranteed to make you awesome'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        variants: [
        {
            variantId: 2234,
            variantColour: "#424242",
            variantImage: './product-images/dark-hoodie.png'
        },

        {
            variantId: 2235,
            variantColour: "#F5F5F5",
            variantImage: './product-images/light-hoodie.png',
        }
    ],
    cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (variantImage) {
            this.image = variantImage
        },
        removeCart: function () {
            this.cart -= 1
        }
    }
})