<template>
  <div class="container">
    <h1 class="title">Pedidos Realizados</h1>

    <template v-if="orders">
      <div v-for="order in orders"
        :key="order.order_at"
        class="order"
      >
        <p>Feito em: {{ formatDate(order.order_at) }}</p>

        <ul v-for="product in order.products"
          :key="`product-order-${order.order_at}-${product.name}`"
          class="products-order"
        >
          <li>
            {{ product.name }} x{{ product.qty }}
          </li>
        </ul>

        <p>Total: {{ formatPrice(order.price) }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import { orders } from '@/store/orders'
import { formatDate, formatPrice } from '@/utils/format'

export default {
  name: 'OrdersView',
  setup () {
    return {
      orders,
      formatDate,
      formatPrice
    }
  }
}
</script>

<style lang="scss" scoped>
div.order {
  padding: 20px;
  background: var(--colorBgPrimary);
  border-radius: var(--radius);

  & + div {
    margin-top: 10px;
  }
}

h1.title {
  margin-bottom: 30px;
}

ul.products-order {
  margin: 10px 0;
  padding: 0 0 0 20px;
}
</style>
