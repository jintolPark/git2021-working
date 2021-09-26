package com.git.myworkspace.photo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// 	photo 테이블에 접근하는 객체
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
