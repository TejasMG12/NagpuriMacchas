import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts (Fix SSR issue)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface HealthChartProps {
  data: { value: number }[];
  color: string;
}

const HealthChart: React.FC<HealthChartProps> = ({ data, color }) => {
  const series = [{ name: "Health Data", data: data.map((item) => item.value) }];

  const options = {
    chart: {
      type: "area",
      animations: { easing: "easeout", speed: 500 }, // Smoother animation
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth", // Make the line more fluid
      width: 2, // Thin line
    },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.3, opacityFrom: 0.4, opacityTo: 0.1 },
    },
    markers: {
      size: 0, // Remove points
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    colors: [color],
  };

  return <Chart options={options} series={series} type="area" height={100} />;
};

export default HealthChart;
