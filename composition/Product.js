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

      <badges :product="product" ></badges>

      <p class="description__status" v-if="product.stock <= 5 && product.stock >1">
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
  setup(props, context) {
    const productState = reactive({
      activeImage: 0,

      // Second way of implementing a Computing Property
      // This way the c.p. don't need to be returned from setup()
      price__color: computed(() => {
        if (props.product.stock <= 1) {
          return 'rgb(180, 30, 67)'
        } else if (props.product.stock <= 5 && props.product.stock > 1) {
          return 'rgb(214, 89, 5)'
        }

        return 'rgb(104, 104, 209)'
      })
    })

    // //There are two ways of using computing props.
    // // First one
    // const price__color = computed(() => {
    //   // If something changes inside the condition, the computed property is recalculated
    //   if (props.product.stock <= 1) {
    //     return 'rgb(180, 30, 67)'
    //   } else if (props.product.stock <= 5 && props.product.stock > 1) {
    //     return 'rgb(214, 89, 5)'
    //   }

    //   return 'rgb(104, 104, 209)'
    // })

    function sendToCart() {
      context.emit('sendtocart', props.product)
    }

    const discountCodes = ref(['VUE21', 'JUANCARICODEV'])
    function applyDiscount(event) {
      const discountCodeIndex = discountCodes.value.indexOf(event.target.value)

      if (discountCodeIndex >= 0) {
        props.product.price *= 50 / 100
        discountCodes.value.splice(discountCodeIndex, 1)
      }
    }

    watch(
      () => productState.activeImage,

      (val, oldVal) => {
        console.log(val, oldVal)
      }
    )

    // watch(
    //   () => props.product.stock,

    //   stock => {
    //     if (stock <= 1) {
    //       productState.price__color = 'rgb(180, 30, 67)'
    //     } else if (stock <= 5 && stock > 1) {
    //       productState.price__color = 'rgb(214, 89, 5)'
    //     }
    //   }
    // )

    return {
      ...toRefs(productState),

      applyDiscount,

      sendToCart,

      // price__color
    }
  }
})
