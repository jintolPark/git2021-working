package com.git.hello;

import org.springframework.boot.SpringApplication;
//import org.springframework.boot.SpringBootConfiguration;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.ComponentScan;

//@SpringBootConfiguration: 의존성 주입을 할 수 있도록 설정해줌
//@EnableAutoConfiguration: 사용하는 라이브러리에 따라서 자동으로 환경을 구성함
// -> spring-boot-starter-web: mebede Tomcat 웹서버를 구동함, 8080포트 응답대기
// -> spring-boot-devtools: 코드를 고치면 서버를 다시 구동해줌
//@ComponentScan: 컴포넌트를 검색하여 싱글턴으로 객체생성을 함
// -> Spring Framework에서 컴포넌트(예-@Controller) 이노테이션이 있는 클래스들을 검색함
// -> Spring Framework에서 싱글턴으로 객체를 생성함
@SpringBootApplication
public class HelloApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelloApplication.class, args);
	}

}
