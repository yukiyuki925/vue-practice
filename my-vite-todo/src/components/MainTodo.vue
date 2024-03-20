<template>
  <div class="box_input">
    <input type="text" class="todo_input" placeholder="+ TODOを入力" />
    <button class="button">追加</button>
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
