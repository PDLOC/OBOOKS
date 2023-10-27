package com.obooks.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.obooks.entity.Student;
import com.obooks.service.Service_Student;



@CrossOrigin("*")
@RestController
@RequestMapping("/rest/student")
public class StudentRest {
	@Autowired
	Service_Student service_Student;
	
	@GetMapping
	public List<Student> getAll() {
		return service_Student.findAll();
	}
	
	
	
	@GetMapping("{username}")
	public Student getOne(@PathVariable("username") String username) {
		return service_Student.findById(username);
	}
	
	@PostMapping
	public Student post(@RequestBody Student st) {
		service_Student.create(st);
		return st;
	}
	@PutMapping("{username}")
	public Student put(@PathVariable("username") String username, @RequestBody Student st) {
		return service_Student.update(st);
	}
	@DeleteMapping("{username}")
	public void delete(@PathVariable("username") String username) {
		service_Student.delete(username);
	}
}
