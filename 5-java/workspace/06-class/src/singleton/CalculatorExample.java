package singleton;

public class CalculatorExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Calculator calc = Calculator.getInstance();
		System.out.println(calc);
		calc.getAreaCircle(5);

		Calculator calc1 = Calculator.getInstance();
		System.out.println(calc1);
		calc.getAreaCircle(10);
//		객체를 생성하는데 큰 의미가 없음
//		Calculator calc = new Calculator();
	}

}
