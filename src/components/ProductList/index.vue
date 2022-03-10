<template>
  <div class="list-products">
    <template v-if="state.products">
      <product
        v-for="(product, index) in state.products"
        :key="index"
        :product="product"
      />
    </template>
    <p v-else>Você não selecionou nenhum item</p>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'

import Product from '@/components/Product'

import { rounded } from '@/utils/format'
import api from '@/services/api'

export default {
  name: 'ProductList',
  components: {
    Product
  },
  setup () {
    const state = reactive({
      products: []
    })

    const getProducts = () => {
      api
        .get('pizzas.json')
        .then((response) => {
          const items = response.data

          state.products = items.map((item) => ({
            ...item,
            price: item.price > 5 ? rounded(item.price * 0.95) : item.price,
            priceOriginal: item.price > 5 && item.price
          }))
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    onMounted(() => {
      getProducts()
    })

    return {
      state
    }
  }
}
</script>
