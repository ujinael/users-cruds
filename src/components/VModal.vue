<template>
  <transition name="fade">
    <div class="v-modal__wrapper" v-if="value" @click="onCloseModal">
      <div class="v-modal__content" @click.stop>
        <button class="v-modal__close_btn" @click.stop="onCloseModal">
          &times;
        </button>
        <div class="v-modal__body">
          <slot> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  title?: string;
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const value = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit("update:modelValue", v);
  },
});
const onCloseModal = () => {
  value.value = false;
};
</script>
<style scoped lang="scss">
@import "@/assets/transition.animations.scss";
@import "@/assets/main.scss";

.v-modal{
&__wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  background-color: rgba(147, 180, 199, 0.391);
  z-index: var(--z_index-modal);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(6px);
  display: grid;
  justify-content: center;
  align-content: center;
  background-clip: border-box;

}
&__content {
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  box-sizing: border-box;
  background-clip: border-box;
  position: relative;
  border-radius: var(--common_border_radius);
}

&__close_btn {

  display: inline-block; 
  padding: 0;
  color: white;
  margin: auto;
  line-height: 1.25rem; 
  font-family:'Times New Roman', Times, serif;
  font-size: 26px;
  font-weight: lighter;
  background-color: var(--accent-color);
  border-radius: 50%;
  border: 2px solid var(--accent-color);
  height: 45px;
  width: 45px;
  transition: all 0.2s ease;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

&__close_btn:hover {
  background-color: var(--card-color);
  color: var(--accent-color);
  transition: all 0.2s ease;
}
}
@media (min-width: 599px) {
  .v-modal__close_btn {
    top: 0;
    right: 50%;
    transform: translate(50%, -50%);
  }
  .v-modal__close_btn:hover {
    transition: all 0.2s ease;
  }
 
  .v-modal__content {
    height: fit-content;
    width: fit-content;
  }
}

</style>
