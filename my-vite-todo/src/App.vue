<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBlog = () => {
  router.push("/blog");
};
</script>

<template>
  <div class="wrap">
    <TheHeader />
    <nav>
      <router-link to="/">Home</router-link>
      | <router-link to="/about">About</router-link> |
      <span @click="goBlog">Blog</span>
      |
      <router-link :to="{ name: 'BlogDtl', params: { id: 1 } }"
        >Blog1</router-link
      >
      |
      <router-link :to="{ name: 'BlogDtl', params: { id: 2 } }"
        >Blog2</router-link
      >
    </nav>
    <main class="main"><router-view /></main>
    <TheFooter />
  </div>
</template>

<style scoped>
@import "assets/css/destyle.css";

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
}

.main {
  flex: 1;
  width: 100%;
}
</style>
