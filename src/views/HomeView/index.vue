<template>
  <div class="home">
    <div class="container">
      <div class="flex-column">
        <product-list />
        <!-- <Cart></Cart> -->
        <div>
          <div>
            <p>Carrinho: {{ cart.products }}</p>
          </div>
          <div>
            <p>Total: {{ cart.total }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'

import cart from '@/store/cart'

export default {
  name: 'HomeView',
  components: {
    ProductList
  },
  setup () {
    return {
      cart
    }
  }
}
</script>
