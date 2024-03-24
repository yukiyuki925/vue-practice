<script setup>
import { ref } from "vue";
import { useTodoList } from "../composables/useTodoList.js";
import BaseButton from "/src/components/BaseButton.vue";
import ButtonAdd from "/src/components/ButtonAdd.vue";

const todoRef = ref("");
const isEditRef = ref(false);
const { todoListRef, add, show, edit, del, check, countFin } = useTodoList();

// クリックでタスク追加
const addTodo = () => {
  add(todoRef.value);
  todoRef.value = "";
};

const showTodo = (id) => {
  todoRef.value = show(id);
  isEditRef.value = true;
};

const editTodo = () => {
  edit(todoRef.value);
  isEditRef.value = false;
  todoRef.value = "";
};

const deleteTodo = (id) => {
  del(id);
};

const changeCheck = (id) => {
  check(id);
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
    <BaseButton color="green" @on-click="editTodo" v-if="isEditRef"
      >変更</BaseButton
    >
    <ButtonAdd @add-click="addTodo" v-else>追加</ButtonAdd>
  </div>

  <!-- todo一覧 -->
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo" :class="{ fin: todo.checked }">
        <input
          type="checkbox"
          class="check"
          @change="changeCheck(todo.id)"
          :checked="todo.checked"
        /><label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <BaseButton color="green" @on-click="showTodo(todo.id)"
          >edit</BaseButton
        >
        <BaseButton color="pink" @on-click="deleteTodo(todo.id)"
          >delete</BaseButton
        >
      </div>
    </div>
  </div>

  <div class="finCount">
    <span>完了: {{ countFin }}</span>
    <span>未完了: {{ todoListRef.length - countFin }}</span>
  </div>
</template>

<style scoped>
.finCount {
  margin-top: 8px;
  font-size: 0.8rem;
}

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

.btn.edit {
  background-color: greenyellow;
  margin-left: 15px;
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

.fin {
  text-decoration: line-through;
  background-color: #ddd;
  color: #777;
}
</style>
