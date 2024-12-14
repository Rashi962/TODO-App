document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    
    toggleThemeBtn.addEventListener('click', () => {
      // Toggle the theme between 'dark' and 'light'
      document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';

      // Update the button text based on the current theme
      toggleThemeBtn.textContent = document.body.dataset.theme === 'dark' ? '🌞' : '🌙';
    });
  
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
  
    const createTodoItem = (text) => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      totalCount++;
      updateTotalCount();
  
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
  
      const editButton = document.createElement('button');
      editButton.textContent = '✎';
      editButton.classList.add('edit-btn');
      
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(completeButton);
      buttonsContainer.appendChild(deleteButton);
  
      todoItem.appendChild(todoText);
      todoItem.appendChild(buttonsContainer);
      todoList.appendChild(todoItem);
  
      editButton.addEventListener('click', () => {
        const newText = prompt('Edit your task:', todoText.textContent);
        if (newText) todoText.textContent = newText.trim();
      });
  
      completeButton.addEventListener('click', () => {
        todoItem.classList.toggle('completed');
        if (todoItem.classList.contains('completed')) {
          completedCount++;
        } else {
          completedCount--;
        }
        updateCompletedCount();
      });
  
      deleteButton.addEventListener('click', () => {
        if (todoItem.classList.contains('completed')) {
          completedCount--;
        }
        todoItem.remove();
        totalCount--;
        updateCompletedCount();
        updateTotalCount();
      });
    };
  
    addButton.addEventListener('click', () => {
      const todoText = inputField.value.trim();
      if (todoText) {
        createTodoItem(todoText);
        inputField.value = '';
      }
    });
  
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addButton.click();
      }
    });
  });
  