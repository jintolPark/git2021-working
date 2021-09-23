package com.git.controller.contact;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
	public SortedMap<Long, Contact> contacts = Collections
			.synchronizedSortedMap(new TreeMap<Long, Contact>(Collections.reverseOrder()));
	public AtomicLong maxId = new AtomicLong();

	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() {

		return new ArrayList<Contact>(contacts.values());
	}

	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) {
//		Thread.sleep(1000); // 임시
		System.out.println(contact);

		if (contact.getName() == null || contact.getName().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String name = getPlainText(contact.getName());
		if (name.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (contact.getPhoneNum() == null || contact.getEmail().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String phoneNum = getPlainText(contact.getPhoneNum());
		if (phoneNum.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String email = getPlainText(contact.getEmail());
		if (email.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (contact.getDescription() == null || contact.getDescription().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String descriotion = getPlainText(contact.getDescription());
		if (descriotion.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Long currentId = maxId.incrementAndGet();

		Contact contactItem = Contact.builder().id(currentId).name(name).name(contact.getName()).phoneNum(phoneNum)
				.phoneNum(contact.getPhoneNum()).email(email).email(contact.getEmail()).description(descriotion)
				.description(contact.getDescription()).createdTime(new Date().getTime()).build();

		contacts.put(currentId, contactItem);

		res.setStatus(HttpServletResponse.SC_CREATED);

		System.out.println(contactItem);

		return contactItem;
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) {
		Contact contact = contacts.get(Long.valueOf(id));
		if (contact == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		contacts.remove(Long.valueOf(id));
		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) {
		Contact findItem = contacts.get(Long.valueOf(id));
		if (findItem == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		if (contact.getName() == null || contact.getName().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String name = getPlainText(contact.getName());
		if (name.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (contact.getPhoneNum() == null || contact.getPhoneNum().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String phoneNum = getPlainText(contact.getPhoneNum());
		if (phoneNum.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String email = getPlainText(contact.getEmail());
		if (email.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (contact.getDescription() == null || contact.getDescription().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		String description = getPlainText(contact.getDescription());
		if (description.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		findItem.setName(name);
		findItem.setPhoneNum(phoneNum);
		findItem.setEmail(email);
		findItem.setDescription(description);

		return findItem;
	}

	// html 태그를 제거하는 메서드
	private String getPlainText(String text) {
		return text.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}
}
