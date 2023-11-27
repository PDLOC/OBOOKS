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

import com.obooks.entity.Category;
import com.obooks.entity.Product;
import com.obooks.service.Service_Category;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/categories")
public class CategoryRest {
	@Autowired private Service_Category cateService;
	
	@GetMapping()
	public List<Category> findAll() {
		return cateService.findAll();
	}
	
	@GetMapping("{id}")
	public Category getOne(@PathVariable("id")String id) {
		return cateService.findById(id);
	}
	
	@PostMapping
	public Category create(@RequestBody Category category) {
		return cateService.create(category);
	}
	
	@PutMapping("{id}")
	public Category update(@RequestBody Category category,@PathVariable("id")String id) {
		return cateService.update(category);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id")String id) {
		cateService.delete(id);
	}
}
