<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <slot></slot>
      <button class="btn" @click="close">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: #C8ACD6;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
.btn {
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
  padding: 20px;
  width: 80%;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #433D8B;
}
</style>
