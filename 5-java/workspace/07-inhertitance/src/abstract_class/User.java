package abstract_class;

// 사용자

// final class 상속 불가한 클래스
//public final class User {
public class User {
	private String id;
	private String name;
	private String phone;

	// final 메서드 : 재정의 불가능한 메서드
//	public final void printUserInfo() {
	public abstract void printUserInfo();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}