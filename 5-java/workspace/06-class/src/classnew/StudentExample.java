package classnew;

public class StudentExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		new클래스명()
//		:인스턴스를 생성
//		-> 클래스 구조의 메모리 공간을 생성
//		인스턴스 -> 객체

//		
		
		Student s1 = new Student();
		s1.name = "홍길동";
		s1.age = 20;
		s1.semester = 2;
		s1.major = "컴퓨터공학";
		System.out.println(s1.name + " " + s1.age);
		s1.joinCorse();
		
		Student s2 = new Student();
		s2.name = "Jhon Smith";
		s2.age = 20;
		s2.semester = 3;
		s2.major = "경역학";
		System.out.println(s2.name + " " + s2.age);
		s2.joinCorse();
	}

}
