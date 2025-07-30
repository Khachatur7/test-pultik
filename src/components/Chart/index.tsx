import React, { useRef, useEffect, useMemo } from "react";
import { Chart } from "chart.js";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

interface ChartOptions {
  responsive: boolean;
}

const LineChart: React.FC<{ data: ChartData; options?: ChartOptions }> = ({
  data,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();
  const createChart = useMemo(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: data,
        options: {
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              title: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
            y: {
              title: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    }
    return chartInstance.current;
  }, [data]);
  createChart;
  useEffect(() => {
    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return <canvas style={{ height: "100%", width: "100%",position:"absolute",top:"0",left:"0" }} ref={chartRef} />;
};

export default LineChart;
