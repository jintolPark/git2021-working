package com.git.helloclient;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class HelloClientService {

	// 수신쪽은 자신의 번호
	@RabbitListener(queues = "test.hello.3")
	public void receiveMassage(String message) {
		System.out.println("-- test.hello.3--");
		System.out.println(message);
	}
}
