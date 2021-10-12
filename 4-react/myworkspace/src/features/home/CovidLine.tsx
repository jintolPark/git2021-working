import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import barData from "./covidBarData"

const CovidLine = () => {
  const [chartData, setChartData] = useState<
  {
    option: ApexOptions;
    series: {
      name: string;
      data: number[];
    }[];
  }>();

  const gubunRef = useRef<HTMLSelectElement>(null);

const getData = async () => {
  const result = await axios.get<
  {
    gubun: string;
    stdDay: string;
    // 해외 발생수
    overFlowCnt: number;
    // 지역 발생수
    localOccCnt: number;
  }[]
  >(`http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/opendata/covid/sido/current/${gubunRef.current?.value}`);

  const data = result.data;

const option: ApexOptions = {
  xaxis: {
  categories: data
  .map((item) => item.stdDay)
  .sort()
  .map((item)=> item.substr(11, 5)),
},
};
const series = [
  {
    name: "지역발생",
    data: data.map((item) => item.localOccCnt),
  },
  {
    name: "해외유입",
    data: data.map((item) => item.overFlowCnt),
  },
];
setChartData({ option, series });
};
useEffect(() => {
  getData();
}, []);

return(
  <div>
   {chartData && (
        <>
          <div
            style={{ width: "1000px" }}
            className="d-flex justify-content-end"
          >
            <select
              className="form-select form-select-sm me-2"
              style={{ width: "110px" }}
              onChange={() => {
                getData();
              }}
              ref={gubunRef}
            >
              {barData
                .map((item) => item.gubun)
                .map((gubun) => (
                  <option value={gubun}>{gubun}</option>
                ))}
            </select>
          </div>
          <Chart
            options={chartData.option}
            series={chartData.series}
            type="line"
            width="1000"
            height="300"
          />
        </>
      )}
  </div>
)
}


export default CovidLine;