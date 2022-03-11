import { reactive } from 'vue'

const modal = reactive({
  open: false,
  text: '',
  textButton: '',
  action: null
})

export default modal

export function open (payload = {}) {
  modal.open = true
  modal.text = payload.text
  modal.textButton = payload.textButton
  modal.action = payload.action ? payload.action : close
}

export function close () {
  modal.open = false
  modal.text = ''
  modal.textButton = ''
  modal.action = null
}
