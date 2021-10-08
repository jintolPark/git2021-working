package com.git.helloproducer;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelloProducerService {

	private RabbitTemplate rabbit;

	@Autowired
	public HelloProducerService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}

	public void sendMessage(byte[] message) {
		System.out.println(message);
		rabbit.send("test.hello.1", new Message(message));
		rabbit.send("test.hello.2", new Message(message));
	}
}
