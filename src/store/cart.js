import { reactive, watch } from 'vue'

import api from '@/services/api'
import { formatMinutes } from '@/utils/format'

const cart = reactive({
  products: [],
  total: 0
})

// const orders = reactive({

// })

export default cart

watch(
  () => cart.products,
  () => {
    cart.total = cart.products.reduce((total, product) => {
      return total + product.price * product.qty
    }, 0)
  }
)

export function add (product) {
  const found = cart.products.find((item) => item.name === product.name)

  if (found) {
    cart.products = cart.products.map((item) =>
      item.name === product.name
        ? { ...found, qty: found.qty + 1 }
        : item
    )
  } else {
    cart.products = [...cart.products, { ...product, qty: 1 }]
  }
}

export function remove (product) {
  const found = cart.products.find((item) => item.name === product.name)

  if (found.qty > 1) {
    cart.products = cart.products.map((item) =>
      item.name === product.name
        ? { ...found, qty: found.qty - 1 }
        : item
    )
  } else {
    cart.products = cart.products.filter((item) => item.name !== product.name)
  }
}

export function checkout () {
  api
    .get('order.json')
    .then((response) => {
      const data = response.data

      if (data.success) {
        console.log(`Seu pedido será entregue em ${formatMinutes(
          data.deliveryTime
        )} minutos!`)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
