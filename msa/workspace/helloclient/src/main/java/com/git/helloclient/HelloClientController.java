package com.git.helloclient;

import org.springframework.beans.factory.annotation.Autowired;

public class HelloClientController {
	private HelloClientService service;

	@Autowired
	public HelloClientController(HelloClientService service) {
		this.service = service;
	}
}
