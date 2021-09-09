package static_;

public class Member {

//	final 을 쓰면 snake
	final static String SERVICE_NAME = "배달의 민족";
	static int memberCount = 0;
	String name;
	String id;
	String password;
	int age;

	Member(String name, String id) {
		this.name = name;
		this.id = id;
		memberCount++;
	}

	static void printServiceName() {
		System.out.println(SERVICE_NAME);
	}

	static void printNameWhithServiceName(String name) {
		System.out.println(SERVICE_NAME + ": " + name);
	}
}
