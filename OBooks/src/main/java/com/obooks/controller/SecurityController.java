package com.obooks.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.obooks.entity.Account;
import com.obooks.service.Service_Account;

@Controller
@RequestMapping("security")
public class SecurityController {
	@Autowired
	Service_Account service_Account;
	
	
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
		StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
	}
	
	@GetMapping("login/form")
	public String loginForm(Model model) {
		model.addAttribute("message", "Vui lòng đăng nhập!");
		return "security/login";
	}
	
	@GetMapping("login/success")
	public String loginSuccess(Model model) {
		model.addAttribute("message", "Đăng nhập thành công!");
		return "security/login";
	}
	
	@GetMapping("login/error")
	public String loginError(Model model) {
		model.addAttribute("message", "Sai thông tin đăng nhập!");
		return "security/login";
	}
	
	@GetMapping("unauthorized")
	public String unauthorized(Model model) {
		model.addAttribute("message", "Không có quyền truy xuất!");
		return "security/login";
	}
	
	@GetMapping("logoff/success")
	public String logoffSuccess(Model model) {
		model.addAttribute("message", "Bạn đã đăng xuất!");
		return "security/login";
	}
	
	@GetMapping("register/form")
	public String registerForm(Model model) {
		Account account = new Account();
		model.addAttribute("acc", account);
		return "security/register";
	}
	
	@PostMapping("register/create")
	public String save(@Valid  @ModelAttribute("acc") Account acc, BindingResult result, Errors errors, Model model) {
		if(result.hasErrors()) {
			model.addAttribute("message", "Đăng ký thất bại");			
			return "security/register";
		}else {
			service_Account.create(acc);
			model.addAttribute("message", "Đăng ký thành công");
			Account account = new Account();
			account.setUsername("");
			account.setPassword("");
			account.setEmail("");
			account.setFullname("");
			model.addAttribute("acc", account);
			return "security/register";
		}
	}
}
