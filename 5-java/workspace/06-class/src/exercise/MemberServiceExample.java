package exercise;

public class MemberServiceExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		MemberService memberService = new MemberService();

		Member member = new Member("홍길동", "hong");
		member.password = "12345";

		boolean result = memberService.login(member);
		if (result) {
			System.out.println("로그인 되었습니다.");
			memberService.logout("hong");
		} else {

		}

	}
}
