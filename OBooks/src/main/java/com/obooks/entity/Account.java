package com.obooks.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.ToString;

@SuppressWarnings("serial")
@Data
@Entity 
@Table(name = "Accounts")
public class Account  implements Serializable{
	@Id
	@NotBlank(message = "Username is required")
	String username;
	
	@NotBlank(message = "Password is required")
	String password;
	
	@NotBlank(message = "Fullname is required")
	String fullname;
	
	@NotBlank(message = "Email is required")
	@Email
	String email;
	String photo;
	@ToString.Exclude
	@JsonIgnore
	@OneToMany(mappedBy = "account")
	List<Order> orders;
	@ToString.Exclude
	@JsonIgnore
	@OneToMany(mappedBy = "account", fetch = FetchType.EAGER)
	List<Authority> authorities;
	@ToString.Exclude
	@JsonIgnore
	@OneToMany(mappedBy = "acc")
	List<Product> products;
}
