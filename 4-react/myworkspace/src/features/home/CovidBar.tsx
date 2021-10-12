import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const CovidBar = () => {
  const [chartData, setChartData] = useState<
  {
    option: ApexOptions;
    series: {
      name: string;
      data: number[];
    }[];
  }>();

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
  >(`http://ec2-54-180-117-20.ap-northeast-2.compute.amazonaws.com:8080/opendata/covid/sido/current`);

  const data = result.data;

const option: ApexOptions = {
  title: {
    text: `코로나 발생현황 (${result.data[0].stdDay})`,
  },
  xaxis: {
    categories: data.map((item) => item.gubun),
  },
  fill: {
    colors: [
      ({value, seriesIndex}: { value: number; seriesIndex: number }) => {
        // seriseIndex: 0, localOccCnt
        // seriseIndex: 1, overFlowCnt
        console.log(value);
        console.log(seriesIndex);

        let color = "";

        if (seriesIndex === 0) {
          // localOccCnt
          if (value <= 100) color = "rgb(107, 102, 255)";
          else color = "rgb(241, 95, 95)";
        } else {
          // overFlowCnt
          if (value <= 30) color = "rgb(255, 224, 140)";
          else color = "rgb(204, 114, 61)";
        }
        return color;
      },
    ],
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
        <Chart
          options={chartData?.option}
          series={chartData?.series}
          type="bar"
          width="1000"
          height="400"
        />
      )}
  </div>
)
}


export default CovidBar;