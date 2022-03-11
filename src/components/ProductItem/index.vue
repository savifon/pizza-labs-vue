<template>
  <div class="product-card">
    <div class="cover"></div>

    <div class="details">
      <p class="title">
        {{ product.name }}
        <span class="ingredients">{{ formatArray(product.ingredients) }}</span>
      </p>

      <p class="price">
        <span v-if="product.priceOriginal"
          class="old-price"
        >
          {{ formatPrice(product.priceOriginal) }}
        </span>
        {{ formatPrice(product.price) }}
      </p>

      <div class="group-buttons">
        <button v-if="callOrigin === 'cart'"
          @click="remove(product)"
        >
          -
        </button>

        <input v-if="callOrigin === 'cart'"
          class="qty"
          type="text"
          disabled
          :value="product.qty"
        />

        <button
          className="red"
          :disabled="canAdd(product, callOrigin)"
          @click="add(product)"
        >
          <template v-if="callOrigin === 'cart'">+</template>
          <template v-else>Adicionar</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { cart, actions } from '@/store/cart'
import { formatPrice, formatArray } from '@/utils/format'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true
    },
    callOrigin: {
      type: String,
      required: false,
      default: 'list'
    }
  },
  setup () {
    function canAdd (product, callOrigin) {
      return cart.products.find(
        (item) => item.name === product.name && callOrigin !== 'cart'
      )
    }

    return {
      formatPrice,
      formatArray,
      canAdd,
      cart,
      add: actions.add,
      remove: actions.remove
    }
  }
}
</script>

<style scoped lang="scss">
div.product-card {
  display: flex;
  gap: 10px;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
}

div.details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

p.title {
  font-weight: bold;
}

span.ingredients {
  font-weight: normal;
  font-size: 0.8rem;
}

p.price {
  color: var(--colorSecondary);
  font-weight: bold;
}

span.old-price {
  font-weight: normal;
  text-decoration: line-through;
  color: var(--colorBgSecondary);
  margin-right: 10px;
}

div.group-buttons {
  display: flex;
  gap: 3px;
}

input.qty {
  border: none;
  background: white;
  width: 30px;
  border-radius: 10px;
  height: 28px;
  text-align: center;
  cursor: default;
}

div.cover {
  flex: none;
  width: 85px;
  height: 85px;
  border-radius: var(--radius);
  background: var(--colorBgSecondary);
  background-image: linear-gradient(
    130deg,
    var(--colorBgPrimary),
    var(--colorBgSecondary)
  );
}
</style>
