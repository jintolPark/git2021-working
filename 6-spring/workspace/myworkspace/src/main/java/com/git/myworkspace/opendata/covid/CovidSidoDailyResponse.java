package com.git.myworkspace.opendata.covid;

import java.util.List;

import lombok.Data;

@Data
public class CovidSidoDailyResponse {
	private Response response;

	@Data
	public class Response {
		private Header header;
		private Body body;
	}

	@Data
	public class Header {
		private String resultCode;
		private String resultMsg;
	}

	@Data
	public class Body {
		private Items items;
	}

	@Data
	public class Items {
		private List<Item> item;
	}

	@Data
	public class Item {
		private String createDt;
		private String deathCnt;
		private String defCnt;
		private String gubun;
		private String inDec;
		private String isolClearCnt;
		private String isolIngCnt;
		private String localOccCnt;
		private String overFlowCnt;
		private String seq;
		private String stdDay;
	}
}

//<response>
//<header>
//<resultCode>00</resultCode>
//<resultMsg>NORMAL SERVICE.</resultMsg>
//</header>
//<body>
//<items>
//<item>
//<createDt>2021-09-25 10:49:42.516</createDt>
//<deathCnt>14</deathCnt>
//<defCnt>6049</defCnt>
//<gubun>검역</gubun>
//<gubunCn>隔離區</gubunCn>
//<gubunEn>Lazaretto</gubunEn>
//<incDec>8</incDec>
//<isolClearCnt>5844</isolClearCnt>
//<isolIngCnt>191</isolIngCnt>
//<localOccCnt>0</localOccCnt>
//<overFlowCnt>8</overFlowCnt>
//<qurRate>-</qurRate>
//<seq>12321</seq>
//<stdDay>2021년 09월 25일 00시</stdDay>
//<updateDt>null</updateDt>
//</item>