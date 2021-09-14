package com.git.controller.todo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {
	// HashMap 정렬이 안 됨: get(key) -> O(1)
	// ConcurrentSkipListMap 키 기준으로 정렬이 되었있음: get(key) -> O(logn)
	private SortedMap<Long, Todo> todos = Collections
			.synchronizedSortedMap(new TreeMap<Long, Todo>(Collections.reverseOrder()));
	// id값 생성에 사용할 변수
	private AtomicLong maxId = new AtomicLong();

	// todo 목록조회
	// GET /todos
	@GetMapping(value = "/todos")
	public List<Todo> getTodos() {
		// 맵 값목록
		return new ArrayList<Todo>(todos.values());
	}

	// todo 1건 추가
	// POST /todos {"memo":"테스트입니다"}
	@PostMapping(value = "/todos")
	public Todo addTodo(@RequestBody Todo todo, HttpServletResponse res) {

		if (todo.getMemo() == null || todo.getMemo().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// id값을 생성
		Long currentId = maxId.incrementAndGet();

		Todo todoItem = Todo.builder().id(currentId)
//								.memo(todo.getMemo().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
				.memo(todo.getMemo()).createdTime(new Date().getTime()).build();
		// todo 목록객체 추가
		todos.put(currentId, todoItem);

		res.setStatus(HttpServletResponse.SC_CREATED);

		// 추가된 객체를 반환
		return todoItem;
	}

	// todo 1건 삭제
	@DeleteMapping(value = "/todos/{id}")
	public boolean removeTodo(@PathVariable long id, HttpServletResponse res) {

		Todo todo = todos.get(Long.valueOf(id));
		if (todo == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 삭제 수행
		todos.remove(Long.valueOf(id));

		return true;
	}

	// todo 1건 수정
	// PUT /todos/1 {"memo":"..."}
	// id값이 path variable로
	@PutMapping(value = "/todos/{id}")
	public Todo modifyTodo(@PathVariable long id, @RequestBody Todo todo, HttpServletResponse res) {
		// 해당 id의 데이터 1건을 가져옴
		Todo findItem = todos.get(Long.valueOf(id));
		// 해당 id의 데이터가 없으면
		if (findItem == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		// 데이터 검증 로직
		// 메모값이 없으면 에러처리함
		if (todo.getMemo() == null || todo.getMemo().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 데이터 변경
		findItem.setMemo(todo.getMemo());

		return findItem;
	}

}