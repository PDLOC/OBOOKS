package com.obooks.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obooks.dao.Categorydao;
import com.obooks.entity.Category;
import com.obooks.entity.Product;
import com.obooks.service.Service_Category;

@Service
public class ServiceImpl_Category implements Service_Category{
	@Autowired private Categorydao cateDao;

	@Override
	public List<Category> findAll() {
		return cateDao.findAll();
	}

	@Override
	public Category findById(String id) {
		// TODO Auto-generated method stub
		return cateDao.findById(id).get();
	}

	@Override
	public Category create(Category category) {
		// TODO Auto-generated method stub
		return cateDao.save(category);
	}

	@Override
	public Category update(Category category) {
		// TODO Auto-generated method stub
		return cateDao.save(category);
	}

	@Override
	public void delete(String id) {
		cateDao.deleteById(id);
		
	}
	
}
