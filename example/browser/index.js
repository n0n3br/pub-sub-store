const store = new PubSubStore({ todos: [] });
const todoList = document.getElementById('todo-list');
const newTodo = document.getElementById('new-todo');

const id = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

// auxiliary methods used to bind to interface events

const onEnterNewTodoInput = event => {
  if (event.which == 13 || event.keyCode == 13) addNewTodo();
};

const addNewTodo = () => {
  if (!newTodo.value) return;
  const todos = [...store.state.todos];
  todos.push({
    id: id(),
    description: newTodo.value,
    done: false,
  });
  store.setState({ todos });
  newTodo.value = '';
  newTodo.focus();
};

const deleteTodo = id => {
  if (!id) return;
  const todos = store.state.todos.filter(todo => todo.id !== id);
  store.setState({ todos });
};

const markTodo = id => {
  if (!id) return;
  const todos = store.state.todos.map(todo => {
    if (todo.id === id) todo.done = !todo.done;
    return todo;
  });
  store.setState({ todos });
};

// render function will be used to subscribe to store changes

const render = state => {
  const todoItems = state.todos
    .map(todo => {
      return `
    <li class='list-group-item ${todo.done ? 'list-group-item-success' : ''}' onclick='markTodo("${
        todo.id
      }")' ondblclick='deleteTodo("${todo.id}")'>
      ${todo.description}
    </li>`;
    })
    .join('');
  todoList.innerHTML = todoItems;
};

render(store.state);
newTodo.value = '';
newTodo.focus();

const configFunction = state => {
  return { todos: state.todos };
};
store.subscribe(render, configFunction);
