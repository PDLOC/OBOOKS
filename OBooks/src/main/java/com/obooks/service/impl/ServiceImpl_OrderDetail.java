package com.obooks.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.obooks.dao.OrderDetaildao;
import com.obooks.service.Service_OrderDetail;
import com.obooks.util.XDate;

@Service
public class ServiceImpl_OrderDetail implements Service_OrderDetail{

	@Autowired private OrderDetaildao daoDetail;
	@Autowired private XDate xdate;
	
	@Override
	public Double getTodayIncome() {
		return daoDetail.findAll().stream().filter(e->e.getOrder().getCreateDate().toString().equals(xdate.convertToPattern(new Date(), "yyyy-MM-dd"))).mapToDouble(item->item.getPrice()*item.getQuantity()).sum();
	}
	@Override
	public Double getTotalIncome() {
		return daoDetail.findAll().stream().mapToDouble(item->item.getPrice()*item.getQuantity()).sum();
	}

}
