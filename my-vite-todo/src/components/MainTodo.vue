<script setup>
import { ref } from "vue";
const todoRef = ref("");
const todoListRef = ref([]);
const ls = localStorage.todoList;
todoListRef.value = ls ? JSON.parse(ls) : [];

// クリックでタスク追加
const addTodo = () => {
  const id = new Date().getTime();
  todoListRef.value.push({ id: id, task: todoRef.value });
  localStorage.todoList = JSON.stringify(todoListRef.value);
  todoRef.value = "";
};

const isEditRef = ref(false);
let editId = -1;

// クリックで編集
const showTodo = (id) => {
  // findのtodoには配列の要素が順番に入る
  const todo = todoListRef.value.find((todo) => todo.id === id);
  // 取得した要素からtaskを取り出す
  todoRef.value = todo.task;
  isEditRef.value = true;
  editId = id;
};

// 条件分岐によってボタンを変化
const editTodo = () => {
  // 編集対象となるTODOを取得
  const todo = todoListRef.value.find((todo) => todo.id === editId);

  // todoリストから編集対象のインデックスを取得
  const idx = todoListRef.value.findIndex((todo) => todo.id === editId);

  // taskを編集後のtodoで置き換え
  todo.task = todoRef.value;

  // splice関数で配列から対象のvalueを置き換える
  todoListRef.value.splice(idx, 1, todo);

  // ローカルストレージに保存
  localStorage.todoList = JSON.stringify(todoListRef.value);
  isEditRef.value = false;
  editId = -1;
  todoRef.value = "";
};

// クリックで削除
const deleteTodo = (id) => {
  const todo = todoListRef.value.find((todo) => todo.id === id);
  const idx = todoListRef.value.findIndex((todo) => todo.id === id);

  const delMsg = "「" + todo.task + "」を削除しますか";
  if (!confirm(delMsg)) return;

  // 配列から要素を削除
  todoListRef.value.splice(idx, 1);
  localStorage.todoList = JSON.stringify(todoListRef.value);
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
    <button class="btn edit" @click="editTodo" v-if="isEditRef">変更</button>
    <button class="button" @click="addTodo" v-else>追加</button>
  </div>

  <!-- todo一覧 -->
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" /><label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="showTodo(todo.id)">edit</button>
        <button class="btn red" @click="deleteTodo(todo.id)">delete</button>
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
</style>
