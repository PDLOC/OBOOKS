package com.obooks.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.obooks.entity.Order;
import com.obooks.service.Service_Order;

@CrossOrigin("*")
@RestController
@RequestMapping("rest/orders")
public class OrderRest {
	@Autowired private Service_Order ordertService;
	
	@PostMapping()
	public Order create(@RequestBody JsonNode orderData) {
		return ordertService.create(orderData);
	}
}
