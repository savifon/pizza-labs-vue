import { ref, readonly } from 'vue'
import { cloneDeep } from 'lodash'

const initialOrders = []

const _orders = ref(cloneDeep(initialOrders))
const orders = readonly(_orders)
export default orders

const actions = {
  add (order) {
    _orders.value = [..._orders.value, order]
    window.localStorage.setItem('orders', JSON.stringify(_orders.value))
  }
}

export { orders, actions }
