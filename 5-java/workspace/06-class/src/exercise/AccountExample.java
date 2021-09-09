package exercise;

public class AccountExample {

	public static void main(String[] args) {
//		test case -> 코드로 짜면 -> 테스트코드
		// 단위 테스트에서 수행 -> 대상 코드의 메서드를 테스트

		// given - 테스트 환경 준비(테스트용 데이터, 테스트용 객체)
		Account account = new Account();

		// when - 테스트 데이터로 테스트케이스 실행

		account.setBalance(10000);
		// than - 예상결과(expected result) 와 실제결과(actual result) 를 비교
		if (account.getBalance() == 10000) {
			System.out.println("케이스 통과 - pass");
		} else {
			System.out.println("케이스 실패 - fail");
		}

		System.out.println("현재잔고: " + account.getBalance());

		account.setBalance(-100);
		System.out.println("현재잔고: " + account.getBalance());

		account.setBalance(2000000);
		System.out.println("현재잔고: " + account.getBalance());

		account.setBalance(300000);
		System.out.println("현재잔고: " + account.getBalance());
	}

}
