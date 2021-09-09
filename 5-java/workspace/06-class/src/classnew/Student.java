package classnew;

public class Student {
// 	필드(field) 생성
	String name;
	int age;
	int semester;
	String major;
	
//	생성자
//	생성자를 임의로 만들면, 기본생성자는 제거됨 
//	객체 생성시 초기화 역할 담당
	Student(){	
//	초기화
	}
	
	Student(String name, int age) {
		this.name = name;
		this.age = age;
	}
	
//	메서드
//	객체의 기능에 해당하는 함수
	void joinCorse() {
//		수강신청 처리
	}
	
	}

