package com.obooks.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.obooks.entity.Role;


@Service
public interface Service_Role {
	List<Role> findAll();
}
