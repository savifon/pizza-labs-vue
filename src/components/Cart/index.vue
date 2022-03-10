<template>
  <div class="cart-box">
    <p class="text">Resumo do pedido</p>

    <template v-if="cart.products.length > 0">
      <product-item v-for="product in cart.products"
        :key="`product-cart-${product.name}`"
        :product="product"
        callOrigin="cart"
      />

      <p class="text">Total: {{ formatPrice(cart.total) }}</p>

      <button
        className="red btn-checkout"
        @click="checkout"
      >
        Confirmar pedido
      </button>
    </template>

    <template v-else>
      <p>Você ainda não escolheu nenhum item.</p>
    </template>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem'
import cart, { checkout } from '@/store/cart'

import { formatPrice } from '@/utils/format'

export default {
  name: 'CartResume',
  components: {
    ProductItem
  },
  setup () {
    return {
      checkout,
      cart,
      formatPrice
    }
  }
}
</script>

<style scoped lang="scss">
div.cart-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 320px;
  max-width: 100%;
  border-radius: var(--radius);
  background: var(--colorBgPrimary);
}

p.text {
  font-weight: bold;
}
</style>
