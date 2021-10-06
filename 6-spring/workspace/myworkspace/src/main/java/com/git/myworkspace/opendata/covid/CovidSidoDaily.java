package com.git.myworkspace.opendata.covid;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(name = "idx_covid_service_day_1", columnList = "gubun"))
@IdClass(CovidSidoDailyId.class)
public class CovidSidoDaily {
	@Id
	private String createDt;
	@Id
	private String gubun;
	@Id
	private String stdDay;
	private String localOccCnt;
	private String deathCnt;
	private String defCnt;
	private String inDec;
	private String isolClearCnt;
	private String isolIngCnt;
	private String overFlowCnt;
}
