<script setup>
import { ref } from "vue";
const todoRef = ref("");
const todoListRef = ref([]);
const addTodo = () => {
  const id = new Date().getTime();
  todoListRef.value.push({ id: id, task: todoRef.value });
  localStorage.todoList = JSON.stringify(todoListRef.value);
  todoRef.value = "";
};
</script>

<template>
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todoRef"
      placeholder="+ TODOを入力"
    />
    <button class="button" @click="addTodo">追加</button>
  </div>
</template>

<style scoped>
.box_input {
  margin-top: 20px;
}

.todo_input {
  width: 450px;
  padding: 13px;
  border-radius: 10px;
  border: 1px solid gray;
}

.button {
  margin-left: 15px;
  background-color: #beedff;
}
</style>
