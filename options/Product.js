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
      <span class="badge new" v-if="product.new">New</span>
      <span class="badge offer" v-if="product.offer">Offer</span>
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
      <p class="description__price">
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
      <button :disabled="product.stock === 0" @click="addToCart()">
        Add to Cart
      </button>
    </section>
  `,
  data() {
    return {
      product: {
        name: 'Camera',
        price: 450_000,
        stock: 6,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellat repudiandae at non ipsa quidem culpa tempore! Doloribus vitae   suscipit minus veritatis adipisci itaque, molestiae perferendis? Doloremque fugit commodi expedita?`,
        images: [
          {
            image: '../images/camara.jpg',
            thumbnail: '../images/camara-thumb.jpg',
          },
          {
            image: '../images/camara-2.jpg',
            thumbnail: '../images/camara-2-thumb.jpg',
          },
        ],
        new: true,
        offer: false,
        quantity: 1
      },
      activeImage: 0,
      discountCodes: ['VUE21', 'JUANCARICODEV']
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
    addToCart() {
      const prodIndex = this.cart.findIndex(prod => (
        prod.name === this.product.name
      ))

      if (prodIndex >= 0) {
        this.cart[prodIndex].quantity += 1
      } else {
        this.cart.push(this.product)
      }
      this.product.stock -= 1
    }
  }
})
