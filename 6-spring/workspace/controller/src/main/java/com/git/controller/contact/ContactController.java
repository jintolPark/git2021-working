package com.git.controller.contact;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.SortedMap;
import java.util.TreeMap;
//import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
	public SortedMap<Long, Contact> contacts = Collections
			.synchronizedSortedMap(new TreeMap<Long, Contact>(Collections.reverseOrder()));
	public AtomicLong maxId = new AtomicLong();

	@GetMapping(value = "/contacts")
	public Collection<Contact> getContacts() {

		return contacts.values();
	}

	@PostMapping(value = "/contacts")
	public Contact postContact(@RequestBody Contact contact) {
		Long currentId = maxId.incrementAndGet();
		Contact contactItem = Contact.builder().id(currentId).name(contact.getName()).phoneNum(contact.getPhoneNum())
				.email(contact.getEmail()).createdTime(new Date().getTime()).build();
		contacts.put(currentId, contactItem);
		return contactItem;

	}
}
