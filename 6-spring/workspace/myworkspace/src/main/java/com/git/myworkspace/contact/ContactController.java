package com.git.myworkspace.contact;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.git.myworkspace.lib.TextProcesser;

@RestController
public class ContactController {

	@Autowired
	private ContactRepository repo;

	public ContactController(ContactRepository repo) {
		this.repo = repo;
	}

	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() throws InterruptedException {
//		id 역정렬
		// Sort.by("정렬컬럼").descending()
		// Sort.by("정렬컬럼").ascending()
		return repo.findAll(Sort.by("id").descending());
	}

	@GetMapping("/contacts/paging")
	public Page<Contact> getContactsPaging(@RequestParam int page, @RequestParam int size) {
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}

	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) throws InterruptedException {
		System.out.println(contact);

		if (TextProcesser.isEmptyText(contact.getName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		if (TextProcesser.isEmptyText(contact.getPhoneNum())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		if (TextProcesser.isEmptyText(contact.getEmail())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Contact contactItem = Contact.builder().name(contact.getName()).phoneNum(contact.getPhoneNum())
				.email(contact.getEmail()).description(TextProcesser.getPlainText(contact.getDescription()))
				.createdTime(new Date().getTime()).build();

		Contact contactSaved = repo.save(contactItem);

		res.setStatus(HttpServletResponse.SC_CREATED);

		System.out.println(contactItem);

		return contactSaved;
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
		Optional<Contact> contact = repo.findById(id);
		if (contact.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		repo.deleteById(id);
		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) {
		Optional<Contact> findItem = repo.findById(id);
		if (findItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		if (TextProcesser.isEmptyText(contact.getName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (TextProcesser.isEmptyText(contact.getPhoneNum())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (TextProcesser.isEmptyText(contact.getEmail())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Contact contactSave = findItem.get();

		contactSave.setName(contact.getName());
		contactSave.setPhoneNum(contact.getPhoneNum());
		contactSave.setEmail(contact.getEmail());
		contactSave.setDescription(TextProcesser.getPlainText(contact.getDescription()));

		Contact contactSaved = repo.save(contactSave);
		return contactSaved;
	}

}
