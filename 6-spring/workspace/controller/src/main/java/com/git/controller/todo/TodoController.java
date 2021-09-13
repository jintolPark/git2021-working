package com.git.controller.todo;

import java.util.Collection;
//import java.util.Collections;
import java.util.Date;
//import java.util.Map;
//import java.util.TreeMap;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {
	public ConcurrentSkipListMap<Long, Todo> todoMap = new ConcurrentSkipListMap<Long, Todo>();
	public AtomicLong maxId = new AtomicLong();

	@GetMapping(value = "/todos")
	public Collection<Todo> getTodos() {
		return todoMap.descendingMap().values();

	}

	@PostMapping(value = "/todos")
	public Todo postTodo(@RequestBody Todo todo) {
		Long currentId = maxId.incrementAndGet();
		Todo todoItem = Todo.builder().id(currentId).memo(todo.getMemo()).createdTime(new Date().getTime()).build();
		todoMap.put(currentId, todoItem);
		return todoItem;

	}

}
