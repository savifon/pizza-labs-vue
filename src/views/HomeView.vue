<template>
  <div class="home">
    <div class="container">
      <div class="flex-column">
        <product-list />
        <!-- <Cart></Cart> -->
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  name: 'HomeView',
  components: {
    ProductList
  },
  setup () {
    return {
    }
  }
}
</script>
