import { reactive, readonly, watch } from 'vue'
import { cloneDeep } from 'lodash'
import api from '@/services/api'
import { actions as orderActions } from './orders'
import { formatMinutes, rounded } from '@/utils/format'
import { open as openModal, close as closeModal } from '@/hooks/useModal'

const initialCart = {
  products: [],
  total: 0
}

const _cart = reactive(cloneDeep(initialCart))

let cart = readonly(_cart)

watch(
  () => (_cart.products),
  () => {
    _cart.total = _cart.products.reduce((total, product) => {
      return total + product.price * product.qty
    }, 0)
    window.localStorage.setItem('cart', JSON.stringify(_cart.products))
  }
)

const actions = {
  add (product) {
    const found = _cart.products.find((item) => item.name === product.name)

    if (found) {
      _cart.products = _cart.products.map((item) =>
        item.name === product.name
          ? { ...found, qty: found.qty + 1 }
          : item
      )
    } else {
      _cart.products = [..._cart.products, { ...product, qty: 1 }]
    }
  },
  remove (product) {
    const found = _cart.products.find((item) => item.name === product.name)

    if (found) {
      _cart.products = _cart.products.filter((item) => item.name !== product.name)
    }
  },
  async checkout () {
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
      openModal({
        text: `Seu pedido será entregue em ${formatMinutes(checkout.deliveryTime)} minutos!`,
        textButton: 'Voltar ao início',
        action: closeModal
      })

      const order = {
        status: checkout.success,
        products: _cart.products,
        price: rounded(_cart.total),
        order_at: new Date()
      }
      orderActions.add(order)

      actions.reset()
    }
  },
  reset () {
    _cart.products = []
    cart = readonly(_cart)
  }
}

export { cart, actions }
