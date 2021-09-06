package array;

public class CreateByValuesExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		정수형 배열 선언 및 초기화
//		배열타입[] 배열변수명 = {..초기화 목록}
		int [] score = { 83, 90, 87 };
		
		System.out.println(score[0]);
		System.out.println(score[1]);
		System.out.println(score[2]);
		
//	 	배열 요소의 추가, 삭제 불가능함
		System.out.println("----값 변경----");
		score[0] = 100;
		System.out.println(score[0]);
		System.out.println(score[1]);
		System.out.println(score[2]);
		score[0] = 0;  // 기본형 데이터 타입은 null 처리가 불가능함.
		
//	String[] languages = { "java", "Typescript", "HTML", "CSS", "ECMAScript"};
	}

}
