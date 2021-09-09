package exercise;

import constructor.sub.Student;
// 다름 패키지의 같은 클래스명을 가진 클래스는 import불가함
//import constructor.Student;

public class MemberExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Member member1 = new Member("홍길동", "hong");
		Member member2 = new Member("강자바", "java");

		Student student = new Student();

//		constructor.sub.Student student2 = new constructor.Student();

		System.out.println(member1.name + " " + member1.id);
		System.out.println(member2.name + " " + member2.id);
	}

}
