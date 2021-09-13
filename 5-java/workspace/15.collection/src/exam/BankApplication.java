package exam;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {
		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.계좌생성 | 2.계좌목록 | 3.예금 | 4.출금 | 5.종료");
			System.out.println("----------------------------------------------------------");
			System.out.print("선택> ");

			int selectNo = scanner.nextInt();

			if (selectNo == 1) {
				createAccount();
			} else if (selectNo == 2) {
				accountList();
			} else if (selectNo == 3) {
				deposit();
			} else if (selectNo == 4) {
				withdraw();
			} else if (selectNo == 5) {
				run = false;
			}
		}
		System.out.println("프로그램 종료");
	}

	// 계좌생성하기(계좌추가하기)
	private static void createAccount() {
		System.out.println("----------");
		System.out.println("계좌 생성");
		System.out.println("----------");

		System.out.println("----------");
		System.out.println("계좌 번호 :");
		String ano = scanner.next();

		System.out.println("----------");
		System.out.println("계좌 주 :");
		String owner = scanner.next();

		System.out.println("----------");
		System.out.println("초기 입금액 :");
		int balance = scanner.nextInt();

//		accounts.put(ano, new Account(ano, owner, balance));
		Account a = new Account(ano, owner, balance);
		accounts.put(ano, a);

		System.out.println("----------");
		System.out.println("계좌 생성 완료");
	}

	// 계좌목록보기
	private static void accountList() {
		System.out.println("-----------");
		System.out.println("계좌 목록 조회");
		System.out.println("-----------");
		for (String ano : accounts.keySet()) {
			String owner = accounts.get(ano).getOwner();
			int balance = accounts.get(ano).getBalance();

			System.out.println("계좌번호: " + ano + " 이름: " + owner + " 잔액: " + balance);
		}
	}

	// 예금하기(필드값수정)
	private static void deposit() {
		System.out.println("-----------");
		System.out.println("예금");
		System.out.println("-----------");

		System.out.println("-----------");
		System.out.println("계좌번호 입력");

		String ano = scanner.next();
		if (accounts.containsKey(ano)) {
			System.out.println("-----------");
			System.out.println("예금액 입력");
			int money = scanner.nextInt();
			Account b = accounts.get(ano);
			b.setBalance(b.getBalance() + money);
			System.out.println(money + "원이 입금 되었습니다.");
		} else {
			System.out.println("계좌가 존재하지 않습니다.");
		}

	}

	// 출금하기(필드값수정)
	private static void withdraw() {
		System.out.println("-----------");
		System.out.println("출금");
		System.out.println("-----------");

		System.out.println("-----------");
		System.out.println("계좌번호 입력");

		String ano = scanner.next();
		if (accounts.containsKey(ano)) {
			System.out.println("-----------");
			System.out.println("출금액 입력");
			int money = scanner.nextInt();
			Account b = accounts.get(ano);
			if ((b.getBalance() - money) >= 0) {
				b.setBalance(b.getBalance() - money);
				System.out.println(money + "원이 출금 되었습니다.");
			} else {
				System.out.println("잔액이 부족합니다.");
			}
		} else {
			System.out.println("계좌가 존재하지 않습니다.");
		}
	}
}