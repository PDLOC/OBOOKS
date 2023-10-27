package com.obooks.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obooks.dao.Accountdao;
import com.obooks.dao.Authoritydao;
import com.obooks.entity.Account;
import com.obooks.entity.Authority;
import com.obooks.service.Service_Authority;

@Service
public class ServiceImpl_Authority implements Service_Authority{
	
	@Autowired private Authoritydao authdao;
	@Autowired private Accountdao accdao;
	
	@Override
	public List<Authority> findAuthoritiesOfAdministrators() {
		List<Account> accounts = accdao.getAdministrators();
		return authdao.authoritiesOf(accounts);
	}

	@Override
	public List<Authority> findAll() {
		return authdao.findAll();
	}

	@Override
	public Authority create(Authority auth) {
		return authdao.save(auth);
	}

	@Override
	public void delete(Integer id) {
		authdao.deleteById(id);
	}

	@Override
	public List<Authority> getOneByRole(String username) {
		return authdao.getOneByRole(username);
	}

	@Override
	public void deleteByUsername(String username) {
		authdao.deleteByUserName(username);
	}

	/*Summary*/
	@Override
	public Long getTotalCustomer() {
		return authdao.findAll().stream().filter(e->e.getRole().getName().equals("Customers")).count();
	}
	
}
