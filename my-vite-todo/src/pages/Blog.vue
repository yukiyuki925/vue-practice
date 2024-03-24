<script setup>
import { ref } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = ref(route.params.id);
console.log("watch外:", id);

watch(route, () => {
  id.value = route.params.id;
  console.log("watch内:", id.value);
});
</script>

<template>
  <p>blog Page</p>
  <p>blog id = {{ route.params.id }}</p>
</template>
