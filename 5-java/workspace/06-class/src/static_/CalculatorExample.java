package static_;

public class CalculatorExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		System.out.println(Calculator.PI);
		System.out.println(Calculator.plus(10, 5));

		System.out.println(Calculator.getAreaCircle(5));

		// static 변수값은 수정 가능함
		// 수정을 못하게 하고싶음
		// final을 이용하여 고정된 값만 사용함
//		Calculator.pi = 3.14;

//		객체를 생성하는데 큰 의미가 없음
//		Calculator calc = new Calculator();
	}

}
