import { ref } from "vue";

export const useTodoList = () => {
  const ls = localStorage.todoList;
  const todoListRef = ref([]);
  todoListRef.value = ls ? JSON.parse(ls) : [];

  // task追加
  const add = (task) => {
    const id = new Date().getTime();
    todoListRef.value.push({ id: id, task: task, checked: false });
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // todoリストからIDを元にTODO情報を取得
  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };

  // todoリストからIDを元にindexを取得
  const findIndexId = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  // editボタンが押された時
  const editId = ref(-1);
  const show = (id) => {
    const todo = findById(id);
    editId.value = id;
    return todo.task;
  };

  // 変更ボタンが押された時
  const edit = (task) => {
    const todo = findById(editId.value);
    const idx = findIndexId(editId.value);
    todo.task = task;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
    editId.value = -1;
  };

  // 削除ボタンが押された時
  const del = (id) => {
    const todo = findById(id);
    const delMsg = "「" + todo.task + "」を削除しますか";
    if (!confirm(delMsg)) return;

    const idx = findIndexId(id);
    todoListRef.value.splice(idx, 1);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  // チェック押された時
  const check = (id) => {
    const todo = findById(id);
    const idx = findIndexId(id);
    todo.checked = !todo.checked;
    todoListRef.value.splice(idx, 1, todo);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  return { todoListRef, add, show, edit, del, check };
};
