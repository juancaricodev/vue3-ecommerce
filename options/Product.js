app.component('product', {
  template: /* vue-html */ `
    <section class="product">
      <div class="product__thumbnails">
        <div
          v-for="(image, index) in product.images"
          :key="image.thumbnail"
          class="thumb"
          :class="{ active: activeImage === index }"
          :style="{ backgroundImage: 'url(' + product.images[index].thumbnail + ')' }"
          @click="activeImage = index"
        ></div>
      </div>

      <div class="product__image">
        <img :src="product.images[activeImage].image" :alt="product.name" />
      </div>
    </section>

    <section class="description">
      <h4>
        {{ product.name.toUpperCase() }} {{ product.stock === 0 ? '😭' : '😎' }}
      </h4>

      <badge :product="product"></badge>

      <p class="description__status" v-if="product.stock <= 5 && product.stock > 1">
        There are just a few items left!
      </p>
      <p class="description__status" v-else-if="product.stock === 1">
        This is the last unit!
      </p>
      <p class="description__status" v-else-if="product.stock === 0">
        We are sorry! There are not units left.
      </p>
      <p class="description__status" v-else>
        There are a lot of units available!
      </p>
      <p class="description__price" :style="{ color: price__color }">
        $ {{ new Intl.NumberFormat('es-CO').format(product.price) }}
      </p>
      <p class="description__content">{{ product.content }}</p>
      <div class="discount">
        <span>Discount Code:</span>
        <input
          type="text"
          placeholder="Entere your code"
          @keyup.enter="applyDiscount($event)"
        />
      </div>
      <button :disabled="product.stock === 0" @click="sendToCart()">
        Add to Cart
      </button>
    </section>
  `,
  props: ['product'],
  emits: ['sendtocart'],
  data() {
    return {
      activeImage: 0,
      discountCodes: ['VUE21', 'JUANCARICODEV'],
      price__color: 'rgb(104, 104, 209)'
    }
  },
  methods: {
    applyDiscount(event) {
      const discountCodeIndex = this.discountCodes.indexOf(event.target.value)

      if (discountCodeIndex >= 0) {
        this.product.price *= 50 / 100
        this.discountCodes.splice(discountCodeIndex, 1)
      }
    },
    sendToCart() {
      this.$emit('sendtocart', this.product)
    }
  },
  watch: {
    activeImage(value, oldValue) {
      console.log(value, oldValue)
    },
    'product.stock'(stock) {
      if (stock <= 1) {
        this.price__color = 'rgb(180, 30, 67)'
      } else if (stock <= 5 && stock > 1) {
        this.price__color = 'rgb(214, 89, 5)'
      }
    }
  }
})
