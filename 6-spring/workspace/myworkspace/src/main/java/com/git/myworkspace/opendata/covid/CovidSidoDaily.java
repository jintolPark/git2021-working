package com.git.myworkspace.opendata.covid;

import javax.persistence.Column;
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
@Table(indexes = @Index(name = "idx_covid_service_day_1", columnList = "gubun, overFlowCnt, localOccCnt"))
@IdClass(CovidSidoDailyId.class)
public class CovidSidoDaily {
	@Id
	@Column(columnDefinition = "varchar(255) collate \"ko_KR.utf8\"")
	private String gubun;
	@Id
	private String stdDay;
	private Integer overFlowCnt;
	private Integer localOccCnt;
//	private String deathCnt;
//	private String defCnt;
//	private String inDec;
//	private String isolClearCnt;
//	private String isolIngCnt;
//	private String createDt;

}
