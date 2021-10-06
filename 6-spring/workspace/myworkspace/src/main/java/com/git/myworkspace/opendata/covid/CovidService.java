package com.git.myworkspace.opendata.covid;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class CovidService {

	private final String SERVICE_KEY = "vpk2JF%2BIdAY5xEW1b4zpj%2Bk0YFYtFKpp7NppWvJfnfhRG%2BZYxkO0DCBeDINkXk1J0rXRbZbTr87hLlsofn6RPg%3D%3D";

	private CovidSidoDailyRepository repo;

	@Autowired
	public CovidService(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	public String today() {
		Calendar cal = new GregorianCalendar();
		LocalTime now = LocalTime.now();
		int hour = now.getHour();

		if (hour <= 10) {
			cal.add(Calendar.DATE, -1);
			SimpleDateFormat simple = new SimpleDateFormat("yyyyMMdd");
			String yesterday = simple.format(cal.getTime());
			return yesterday;
		} else {
			cal.add(Calendar.DATE, 0);
			SimpleDateFormat simple = new SimpleDateFormat("yyyyMMdd");
			String today = simple.format(cal.getTime());
			return today;
		}
	}

//	@Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	@Scheduled(cron = "0 5 10 * * *")
	@CacheEvict(value = "covid-current", allEntries = true)
//	@SuppressWarnings("deprecation")
	public void requestCovidConfirmed() throws IOException {
		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi");
		builder.append("/service/rest/Covid19");
		builder.append("/getCovid19SidoInfStateJson");
		builder.append("?serviceKey=" + SERVICE_KEY);
		builder.append("&pageNo=1");
		builder.append("&numOfRows=10");
		builder.append("&startCreateDt=20210901" + today());
		builder.append("&endCreateDt=20211006" + today());
		System.out.println(builder.toString());

		URL url = new URL(builder.toString());

		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		byte[] result = con.getInputStream().readAllBytes();

		String data = new String(result, "UTF-8");

		System.out.println(data);

		JSONObject jsonObj = XML.toJSONObject(data);
		System.out.println(jsonObj);

		String json = jsonObj.toString(2);

		CovidSidoDailyResponse response = new Gson().fromJson(json, CovidSidoDailyResponse.class);
		System.out.println(response);

		List<CovidSidoDaily> list = new ArrayList<CovidSidoDaily>();

		for (CovidSidoDailyResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			CovidSidoDaily record = CovidSidoDaily.builder().stdDay(item.getStdDay())
					.localOccCnt(item.getLocalOccCnt().isEmpty() ? null : Integer.valueOf(item.getLocalOccCnt()))
					.overFlowCnt(item.getOverFlowCnt().isEmpty() ? null : Integer.valueOf(item.getOverFlowCnt()))
					.gubun(item.getGubun()).build();
			list.add(record);
//			CovidSidoDaily record = CovidSidoDaily.builder().createDt(item.getCreateDt()).stdDay(item.getStdDay())
//					.isolClearCnt(item.getIsolClearCnt()).deathCnt(item.getDeathCnt()).inDec(item.getInDec())
//					.defCnt(item.getDefCnt()).gubun(item.getGubun()).isolIngCnt(item.getIsolIngCnt())
//					.localOccCnt(item.getLocalOccCnt()).overFlowCnt(item.getOverFlowCnt()).build();
//			list.add(record);
		}
		repo.saveAll(list);
	}
}