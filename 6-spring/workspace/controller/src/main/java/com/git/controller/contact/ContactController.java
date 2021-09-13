package com.git.controller.contact;

import java.util.Collection;
import java.util.Date;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
	public ConcurrentSkipListMap<Long, Contact> contactMap = new ConcurrentSkipListMap<Long, Contact>();
	public AtomicLong maxId = new AtomicLong();

	@GetMapping(value = "/contacts")
	public Collection<Contact> getContacts() {
		return contactMap.descendingMap().values();
	}

	@PostMapping(value = "/contacts")
	public Contact postContact(@RequestBody Contact contact) {
		Long currentId = maxId.incrementAndGet();
		Contact contactItem = Contact.builder().id(currentId).name(contact.getName()).phoneNum(contact.getPhoneNum())
				.email(contact.getEmail()).createdTime(new Date().getTime()).build();
		contactMap.put(currentId, contactItem);
		return contactItem;

	}
}
