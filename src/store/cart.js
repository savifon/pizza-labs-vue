import { reactive, ref, watch } from 'vue'

import { open as openModal, close as closeModal } from '@/hooks/useModal'
import api from '@/services/api'
import { formatMinutes, rounded } from '@/utils/format'

const cart = reactive({
  products: [],
  total: 0
})

const orders = ref([])

export default cart

watch(
  () => cart.products,
  () => {
    cart.total = cart.products.reduce((total, product) => {
      return total + product.price * product.qty
    }, 0)
    window.localStorage.setItem('cart', JSON.stringify(cart.products))
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

export async function checkout () {
  let checkout = {}

  await api
    .get('order.json')
    .then((response) => {
      checkout = response.data
    })
    .catch(function (error) {
      console.log(error)
    })

  if (checkout.success) {
    console.log(`Seu pedido será entregue em ${formatMinutes(
      checkout.deliveryTime
    )} minutos!`)
    openModal({
      text: `Seu pedido será entregue em ${formatMinutes(checkout.deliveryTime)} minutos!`,
      textButton: 'Voltar ao início',
      action: closeModal
    })

    setOrders([
      ...orders.value,
      {
        status: checkout.success,
        products: cart.products,
        price: rounded(cart.total),
        order_at: new Date()
      }
    ])

    cart.products = []
    cart.total = 0
  }
}

export function setOrders (newOrders) {
  orders.value = newOrders
  window.localStorage.setItem('orders', JSON.stringify(newOrders))
}

export function getOrders () {
  return orders.value
}
