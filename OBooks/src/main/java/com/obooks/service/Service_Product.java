package com.obooks.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.obooks.entity.Product;

public interface Service_Product{

	Page<Product> findAll(Pageable pageable);
	
	Page<Product> findByCategoryID(String cid,Pageable pageable);
	
	List<Product> findAll();

	Product findById(Integer productID);

	List<Product> findByCategoryID(String cid);

	Product create(Product product);

	Product update(Product product);

	void delete(Integer id);

	Long getAvailable();

	Long getTotalProduct();

	List<Object[]> numberOfProductSoldByType();

	List<Object[]> getPercentByCate();

	List<Object[]> availableRate();

	List<Object[]> top10Product();

	List<Product> findByUsername(String username);

}
