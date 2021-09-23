package com.git.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;

import com.git.controller.contact.Contact;
import com.git.controller.contact.ContactController;

@SpringBootTest
public class TestContactController {

	@Test
	void addContact() {
		ContactController controller = new ContactController();
		Contact expected = Contact.builder().name("test").phoneNum("010-0000").email("naver").description("속성입니다.")
				.build();
		controller.addContact(expected, new MockHttpServletResponse());
		List<Contact> contacts = controller.getContacts();
		Contact actual = contacts.get(0);
		assertEquals(1, actual.getId());
		assertEquals(expected.getName(), actual.getName());
		assertEquals(expected.getPhoneNum(), actual.getPhoneNum());
		assertEquals(expected.getEmail(), actual.getEmail());
		assertEquals(expected.getDescription(), actual.getDescription());

	}

	@Test
	void removeContact() {
		ContactController controller = new ContactController();
		Contact testItem = Contact.builder().name("test").email("naver").phoneNum("010-000").description("속성입니다.")
				.build();
		controller.addContact(testItem, new MockHttpServletResponse());
		List<Contact> beforeContacts = controller.getContacts();
		assertEquals(1, beforeContacts.size());

		controller.removeContact(1, new MockHttpServletResponse());

		List<Contact> afterContacts = controller.getContacts();
		assertEquals(0, afterContacts.size());
	}

	@Test
	void modifyContact() {
		ContactController controller = new ContactController();

		Contact testItem = Contact.builder().name("test").phoneNum("010-000").email("naver").description("속성입니다.")
				.build();
		controller.addContact(testItem, new MockHttpServletResponse());

		String expectedResult = "modify test name";
		Contact modifyData = Contact.builder().name(expectedResult).phoneNum(expectedResult).email(expectedResult)
				.description(expectedResult).build();

		HttpServletResponse res = new MockHttpServletResponse();

		controller.modifyContact(1, modifyData, res);

		List<Contact> contacts = controller.getContacts();
		assertEquals(expectedResult, contacts.get(0).getName());

		Contact resultContactIdName = controller.modifyContact(2, modifyData, res);

		assertNull(resultContactIdName);

		assertEquals(HttpServletResponse.SC_NOT_FOUND, res.getStatus());

		Contact resultContactNull = controller.modifyContact(1, new Contact(), res);

		assertNull(resultContactNull);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

		Contact resultContactNameEmpty = controller.modifyContact(1, Contact.builder().name("").build(), res);
		Contact resultContactPhoneNumEmpty = controller.modifyContact(1, Contact.builder().phoneNum("").build(), res);
		Contact resultContactEmailEmpty = controller.modifyContact(1, Contact.builder().email("").build(), res);
		Contact resultContactDescriptionEmpty = controller.modifyContact(1, Contact.builder().description("").build(),
				res);

		assertNull(resultContactNameEmpty);
		assertNull(resultContactPhoneNumEmpty);
		assertNull(resultContactEmailEmpty);
		assertNull(resultContactDescriptionEmpty);

		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

	}
}
