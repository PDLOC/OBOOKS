package com.obooks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PayController {

	@RequestMapping("/home/payment")
	public String home() {
		return "/pay/form";
	}
}
