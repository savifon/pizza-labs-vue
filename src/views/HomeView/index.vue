<template>
  <div class="home">
    <div class="container">
      <div class="flex-column">
        <product-list />
        <cart-resume />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import CartResume from '@/components/Cart'

import cart from '@/store/cart'

export default {
  name: 'HomeView',
  components: {
    ProductList,
    CartResume
  },
  setup () {
    return {
      cart
    }
  }
}
</script>
