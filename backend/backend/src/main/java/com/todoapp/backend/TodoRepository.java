package com.todoapp.backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
    // MongoDB operations (findAll, findById, save, deleteById) are automatically provided by Spring Data
}
