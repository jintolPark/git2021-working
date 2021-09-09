package exercise;

public class Printer {

	public void println(int i) {
		System.out.println(i);
	}

	public void println(boolean b) {
		System.out.println(b);
	}

	public void println(double d) {
		System.out.println(d);
	}

	public void println(String string) {
		System.out.println(string);
	}

	// 출력할때 앞에 데코레이터를 추가해서 출력
	// println("홍길동", 1)s
	// 1홍길동
	public void println(String string, int index) {
		System.out.println(index + " " + string);
	}

	// 출력할때 앞에 데코레이터를 추가해서 출력
	// println("홍길동", "--")
	// --홍길동
	public void println(String string, int i, String decorate) {
		System.out.println(i + " " + string + " " + decorate);
	}
}
