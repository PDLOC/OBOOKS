package com.obooks.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obooks.dao.Roledao;
import com.obooks.entity.Role;
import com.obooks.service.Service_Role;

@Service
public class ServiceImpl_Role implements Service_Role{

	@Autowired private Roledao dao;

	@Override
	public List<Role> findAll() {
		return dao.findAll();
	}
	
}
