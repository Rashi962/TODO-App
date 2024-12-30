package com.todoapp.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(String id, Todo updatedTodo) {
        return todoRepository.findById(id)
            .map(todo -> {
                todo.setText(updatedTodo.getText());
                todo.setCompleted(updatedTodo.isCompleted());
                return todoRepository.save(todo);
            })
            .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    public void deleteTodo(String id) {
        todoRepository.deleteById(id);
    }
}
