<script setup>
// 親からプロパティ :colorを取得
const props = defineProps({ color: String });
const emit = defineEmits(["on-click"]);
const onClick = () => {
  emit("on-click");
};
</script>

<template>
  <button class="btn" :class="props.color" @click="onClick()">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 10px;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  margin-left: 10px;
  width: 70px;
}

.blue {
  background-color: #03a9f4;
}

.green {
  background-color: #00c853;
}

.pink {
  background-color: #ff4081;
}
</style>
