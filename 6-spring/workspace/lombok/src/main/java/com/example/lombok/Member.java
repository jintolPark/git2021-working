package com.example.lombok;

import lombok.Data;

// 롬북 플러그인
// 롬북 어노테이션들(예-@Data) 이 있는 클래스/인터페이스 탐색
// getter, setter, equals/hashcode, toString 메서드를
// 컴파일되는 class파일에 추가해줌
@Data
public class Member {
	private int id;
	private String name;
}
