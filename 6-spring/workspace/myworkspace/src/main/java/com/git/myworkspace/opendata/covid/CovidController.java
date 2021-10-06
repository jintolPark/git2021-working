package com.git.myworkspace.opendata.covid;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component("covidController")
@RestController
@RequestMapping(value = "/opendata/covid")
public class CovidController {
	private CovidSidoDailyRepository repo;
	private final String cachName = "covid-current";

	@Autowired
	public CovidController(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	@Cacheable(value = cachName, key = "'all'")
	@GetMapping(value = "/sido/current")
	public List<CovidSidoDaily> getCovidSidoCurrent() {
		List<Order> orders = new ArrayList<Order>();
		orders.add(new Order(Sort.Direction.DESC, "stdDay"));
		return repo.findAll(PageRequest.of(0, 19, Sort.by(orders))).toList();
	}

	@Cacheable(value = cachName, key = "#gubun")
	@GetMapping(value = "/sido/current/{gubun}")
	public List<CovidSidoDaily> getCovidSidoCurrent(@PathVariable String gubun) {
		Pageable page = PageRequest.of(0, 14, Sort.by("stdDay").descending());
		return repo.findByGubun(page, gubun);
	}
}
