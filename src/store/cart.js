import { reactive, watch } from 'vue'

const cart = reactive({
  products: [],
  total: 0
})

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
