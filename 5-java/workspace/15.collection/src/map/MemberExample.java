package map;

import java.util.HashMap;
import java.util.Map;

public class MemberExample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Map<String, Member> members = new HashMap<String, Member>();

		Member hong = new Member("hong", "pas1234", "홍길동", 20);
		members.put("hong", hong);

		Member smith = new Member("john", "qwe1234", "John Smith", 30);
		members.put("jonh", smith);

		Member smith2 = new Member("john12", "abc1234", "John", 27);
		members.put("john", smith2);

		Member m = members.get("hong");
		System.out.println("------1건 조회-------");
		System.out.println(m.getName() + ", " + m.getAge());

		// 맴변수 keySet() -> 맵의 key 목록을 set형식의 자료구조로 반환
		// Set : 중복값이 없는 자료구조
		// {"hong", "john"}
		System.out.println("------목록 조회-------");
		for (String id : members.keySet()) {
			String name = members.get(id).getName();
			int age = members.get(id).getAge();

			System.out.println(id + ": " + name + ", " + age);
		}
		// 값 목록만 필요하고, 값 객체에 키값이 들어가있음.
		System.out.println("------목록 조회------");
		for (Member member : members.values()) {
			String name = member.getName();
			int age = member.getAge();

			System.out.println(member.getId() + ": " + name + ", " + age);
		}
		Member mHong = members.get("hong");
		System.out.println("------1건 조회------");
		System.out.println(mHong.getName() + ", " + mHong.getAge());

		mHong.setAge(25);
		System.out.println("------1건 수정------");
		System.out.println(mHong.getName() + ", " + mHong.getAge());

		members.remove("john");
		System.out.println("---삭제 후 목록 조회---");
		for (Member member : members.values()) {
			String name = member.getName();
			int age = member.getAge();

			System.out.println(member.getId() + ": " + name + ", " + age);
		}
		members.clear();
		System.out.println("--전체 삭제 후 목록 조회--");
		for (Member member : members.values()) {
			String name = member.getName();
			int age = member.getAge();

			System.out.println(member.getId() + ": " + name + ", " + age);
		}
	}

}
