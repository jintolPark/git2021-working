package polymorphism;

public class UserExample2 {

	public static void main(String[] args) {
		User user = new User();
		user.setId("hong");
		user.setName("홍길동");
		user.setPhone("01012345678");
		user.printUserInfo();

		sendMessage(user);

		user = new Admin();
		user.setId("john");
		user.setName("John Smith");
		user.setPhone("0212345678");
		user.printUserInfo();

		sendMessage(admin);

		user = new Member();
		user.setId("kim");
		user.setName("김쿠팡");
		user.setPhone("01009876543");
		user.printUserInfo();
		sendMessage(member);
	}

	public static void sendMessage(User user) {
		System.out.println("");
		System.out.println(user.getPhone() + ": 공지사항 메세지를 보냅니다.");
	}

}
