package exercise;

public class PrinterExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Printer printer = new Printer();
		printer.println(10);
		printer.println(true);
		printer.println(5.7);
		printer.println("홍길동");

		// 출력할때 앞에 데코레이터를 추가해서 출력
		// println("홍길동", 1)
		// 1홍길동
		printer.println("홍길동", 1);

		// 출력할때 앞에 데코레이터를 추가해서 출력
		// println("홍길동", 1, "//")
		// 1홍길동!!
		printer.println("홍길동", 1, "!!");
	}

}
