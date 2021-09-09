package static_;

public class Calculator {
//final 키워드를 주면 수정불가함
	// js: const
	// 꼭 static에 넣는건 아님, 주로 static 변수에 사용
	// static 변수를 사용한다는 것은 공용적인 사용임
	final static double PI = 3.141592;

	static int plus(int a, int b) {
		return a + b;
	}

	static double getAreaCircle(int r) {
		return r * r * PI;
	}
}
