package com.git.myworkspace.photo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.git.myworkspace.lib.TextProcesser;

@RestController
public class PhotoController {

	@Autowired
	private PhotoRepository repo;

	public PhotoController(PhotoRepository repo) {
		this.repo = repo;
	}

	@GetMapping(value = "/photos")
	public List<Photo> getPhotos() throws InterruptedException {
		return repo.findAll();
	}

	@PostMapping(value = "/photos")
	public Photo addPhoto(@RequestBody Photo photo, HttpServletResponse res) throws InterruptedException {

		// 타이틀이 빈값
		if (TextProcesser.isEmptyText(photo.getTitle())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 파일URL이 빈값
		if (TextProcesser.isEmptyText(photo.getPhotoUrl())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 객체 생성
		Photo photoItem = Photo.builder().title(photo.getTitle())
				.description(TextProcesser.getPlainText(photo.getDescription())).photoUrl(photo.getPhotoUrl())
				.fileType(photo.getFileType()).fileName(photo.getFileType()).createdTime(new Date().getTime()).build();

		Photo photoSaved = repo.save(photoItem);
		// 리소스 생성됨
		res.setStatus(HttpServletResponse.SC_CREATED);

		// 추가된 객체를 반환
		return photoSaved;
	}

	@DeleteMapping(value = "/photos/{id}")
	public boolean removePhotos(@PathVariable long id, HttpServletResponse res) throws InterruptedException {

		// id에 해당하는 객체가 없으면
		Optional<Photo> photo = repo.findById(id);
		if (photo.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 삭제 수행
		repo.deleteById(id);

		return true;
	}

	@PutMapping(value = "/photos/{id}")
	public Photo modifyPhotos(@PathVariable long id, @RequestBody Photo photo, HttpServletResponse res) {

		// id에 해당하는 객체가 없으면
		Optional<Photo> photoItem = repo.findById(id);
		if (photoItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		// 타이틀이 빈값
		if (TextProcesser.isEmptyText(photo.getTitle())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 파일URL이 빈값
		if (TextProcesser.isEmptyText(photo.getPhotoUrl())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Photo photoToSave = photoItem.get();

		photoToSave.setTitle(photo.getTitle());
		photoToSave.setDescription(TextProcesser.getPlainText(photo.getDescription()));
		photoToSave.setPhotoUrl(photo.getPhotoUrl());
		photoToSave.setFileType(photo.getFileType());
		photoToSave.setFileName(photo.getFileType());

		Photo photoSaved = repo.save(photoToSave);

		return photoSaved;
	}
}