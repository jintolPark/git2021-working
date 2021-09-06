package array;

public class CreateByNewExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
	// new 키워드를 이용하여 생성
		int[] arrInt = new int[3];
		System.out.println(arrInt[0]);
		System.out.println(arrInt[1]);
		System.out.println(arrInt[2]);
		
		for (int i = 0; i < 3; i++) {
			System.out.println(arrInt[i]);
		}
		String[] arrStr = new String[3];
		
		
		for (String str : arrStr) {
			str = "test";
			System.out.println(arrStr[0]);
			System.out.println(arrStr[1]);
			System.out.println(arrStr[2]);
		}
	}

}
