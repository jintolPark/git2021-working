package com.git.myworkspace.photo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Photo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String title;
	@Column(columnDefinition = "VARCHAR(1000)")
	private String description;
	@Column(columnDefinition = "TEXT")
	private String photoUrl;
	private String fileType;
	private String fileName;
	private long createdTime;
}