package exercise;

public class MemberService {

	boolean login(Member member) {
		if (member.id == "hong" && member.password == "12345") {
			return true;
		}
		return false;
	}

	boolean login(String id, String password) {
		if (id == "hong" && password == "12345") {
			return true;
		} else {
			return false;
		}
	}

	void logout(String id) {
		System.out.println("로그아웃 되었습니다.");
	}
}
