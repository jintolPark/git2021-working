package exercise;

public class ShopService {
	private static ShopService instance;

	private ShopService() {

	}

	public static ShopService getInstance() {
		// null 일때 (초기상태) 일떄만
		// 객체를 한번 생성함
		// 그다음 부터는 이전에 생성된 객체를 반환
		if (instance == null) {
			instance = new ShopService();
		}
		return instance;
	}

}
