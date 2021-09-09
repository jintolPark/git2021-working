package static_;

public class MemberExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Member.printServiceName();

		Member member1 = new Member("홍길동", "hong");
		Member member2 = new Member("강자바", "java");

		Member.printNameWhithServiceName(member1.name);
		Member.printNameWhithServiceName(member2.name);

		System.out.println("회원수: " + Member.memberCount);
	}

}
