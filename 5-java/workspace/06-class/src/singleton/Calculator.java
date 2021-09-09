package singleton;

public class Calculator {
	private static Calculator calc = new Calculator();

	private final static double PI = 3.141592;

	private Calculator() {
	}

	public static Calculator getInstance() {
		return calc;
	}

	public int plus(int a, int b) {
		return a + b;
	}

	public double getAreaCircle(int r) {
		return r * r * PI;
	}
}
