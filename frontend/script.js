document.addEventListener('DOMContentLoaded', () => {
  const toggleThemeBtn = document.getElementById('toggle-theme-btn');
  const inputField = document.getElementById('todo-input');
  const addButton = document.getElementById('add-todo-btn');
  const todoList = document.getElementById('todo-list');
  const completedCountElement = document.getElementById('completed-count');
  const totalCountElement = document.getElementById('total-count');
  
  let completedCount = 0;
  let totalCount = 0;

  const updateCompletedCount = () => {
    completedCountElement.textContent = `Completed: ${completedCount}`;
    updateProgressBar();
  };

  const updateTotalCount = () => {
    totalCountElement.textContent = `Total: ${totalCount}`;
  };

  const updateProgressBar = () => {
    const progress = totalCount ? (completedCount / totalCount) * 100 : 0;
    document.getElementById('progress-bar').style.width = `${progress}%`;
  };

  const fetchTodos = () => {
    fetch('http://localhost:8080/api/todos')
      .then(response => response.json())
      .then(todos => {
        todoList.innerHTML = ''; // Clear the list before rendering new data
        todos.forEach(todo => createTodoItem(todo.text, todo.id, todo.completed));
      })
      .catch(error => console.error('Error fetching todos:', error));
  };

  const createTodoItem = (text, id = null, completed = false) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    totalCount++;
    updateTotalCount();
    
    if (completed) {
      todoItem.classList.add('completed');
      completedCount++;
    }
    
    const todoText = document.createElement('span');
    todoText.textContent = text;
    todoText.classList.add('todo-text');
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('todo-buttons');

    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.classList.add('complete-btn');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✖';
    deleteButton.classList.add('delete-btn');

    buttonsContainer.appendChild(completeButton);
    buttonsContainer.appendChild(deleteButton);
    
    todoItem.appendChild(todoText);
    todoItem.appendChild(buttonsContainer);
    todoList.appendChild(todoItem);

    completeButton.addEventListener('click', () => {
      todoItem.classList.toggle('completed');
      if (todoItem.classList.contains('completed')) {
        completedCount++;
      } else {
        completedCount--;
      }
      updateCompletedCount();

      // Send PUT request to update "completed" status
      fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: todoItem.classList.contains('completed') })
      });
    });

    deleteButton.addEventListener('click', () => {
      todoItem.remove();
      totalCount--;
      updateCompletedCount();
      updateTotalCount();

      // Send DELETE request to remove the todo
      fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'DELETE'
      });
    });
  };

  addButton.addEventListener('click', () => {
    const todoText = inputField.value.trim();
    if (todoText) {
      // Send POST request to add a new todo
      fetch('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: todoText, completed: false })
      })
      .then(response => response.json())
      .then(todo => {
        createTodoItem(todo.text, todo.id, todo.completed);
        inputField.value = '';
      })
      .catch(error => console.error('Error adding todo:', error));
    }
  });

  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addButton.click();
    }
  });

  // Fetch existing todos from backend on page load
  fetchTodos();

  // Theme toggle functionality
  toggleThemeBtn.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    toggleThemeBtn.textContent = document.body.dataset.theme === 'dark' ? '🌞' : '🌙';
  });
});
