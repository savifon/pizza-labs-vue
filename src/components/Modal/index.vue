<template>
  <teleport to="body">
    <div v-if="modal.open" class="modal-container">
      <div class="modal-box">
        <p class="title">{{ modal.text }}</p>

        <button className="green" @click="modal.action">
          {{ modal.textButton }}
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
import modal from '@/hooks/useModal'

export default {
  name: 'ModalComponent',
  setup () {
    return {
      modal
    }
  }
}
</script>

<style>
div.modal-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}

div.modal-box {
  padding: 50px 20px;
  border-radius: var(--radius);
  box-shadow: 0px 5px 10px var(--colorBgSecondary);
  border: 1px solid var(--colorBgSecondary);
  background: white;
  width: 80vw;
  max-width: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

p.title {
  font-weight: bold;
}
</style>
