package com.obooks.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.obooks.entity.Student;



public interface Studentdao extends JpaRepository<Student, String> {

}
