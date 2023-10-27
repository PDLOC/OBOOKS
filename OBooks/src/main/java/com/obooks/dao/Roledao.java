package com.obooks.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.obooks.entity.Role;

@Repository
public interface Roledao extends JpaRepository<Role, String>{

}
