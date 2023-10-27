package com.obooks.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.obooks.entity.Category;

@Repository
public interface Categorydao extends JpaRepository<Category, String>{

}
