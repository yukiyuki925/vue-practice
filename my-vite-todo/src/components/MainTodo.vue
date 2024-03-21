<script setup>
import { ref } from "vue";
const todoRef = ref("");
const todoListRef = ref([]);
const ls = localStorage.todoList;
todoListRef.value = ls ? JSON.parse(ls) : [];
const addTodo = () => {
  const id = new Date().getTime();
  todoListRef.value.push({ id: id, task: todoRef.value });
  localStorage.todoList = JSON.stringify(todoListRef.value);
  todoRef.value = "";
};
</script>

<template>
  <!-- todo追加 -->
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      v-model="todoRef"
      placeholder="+ TODOを入力"
    />
    <button class="button" @click="addTodo">追加</button>
  </div>

  <!-- todo一覧 -->
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" /><label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green">edit</button>
        <button class="btn red">delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.check {
  transform: scale(1.6);
  margin: 0 16px 2px 6px;
  display: inline-block;
}

.btn.red {
  margin-left: 5px;
  background-color: red;
}

.btn.green {
  background-color: greenyellow;
}

.btns {
  display: flex;
  margin-left: 10px;
}

.todo {
  width: 400px;
  background-color: aquamarine;
  padding: 10px;
  border-radius: 8px;
}

.todo_list {
  display: flex;
  width: 560px;
  margin: 10px auto 0;
  text-align: left;
  align-items: center;
}

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
