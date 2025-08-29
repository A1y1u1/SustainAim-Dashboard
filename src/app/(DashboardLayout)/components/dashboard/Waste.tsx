"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface WasteData {
  type: string;
  value: number;
  color: string;
}

interface WasteProps {
  height?: number | string;
  width?: string;
  chartHeight?: number;
}

const Waste: React.FC<WasteProps> = ({ 
  height = 'auto', 
  width = "100%", 
  chartHeight = 300 
}) => {
  // Sample waste generation data by state of matter
  const wasteData: WasteData[] = [
    {
      type: "Solid Waste",
      value: 65,
      color: "#3B82F6", // Blue
    },
    {
      type: "Waste Water",
      value: 35,
      color: "#10B981", // Green
    },
  ];

  // Chart configuration for hollow semi-circle
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: chartHeight,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: "75%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
              offsetY: 10,
              formatter: (val: string) => `${val}%`,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total Waste",
              fontSize: "12px",
              fontWeight: 400,
              color: "#6B7280",
              formatter: () => "100%",
            },
          },
        },
      },
    },
    series: wasteData.map((item) => item.value),
    labels: wasteData.map((item) => item.type),
    colors: wasteData.map((item) => item.color),
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      enabled: true,
      theme: "light",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: Math.max(chartHeight * 0.8, 200),
          },
          plotOptions: {
            pie: {
              donut: {
                size: "70%",
                labels: {
                  name: {
                    fontSize: "12px",
                  },
                  value: {
                    fontSize: "20px",
                  },
                  total: {
                    fontSize: "10px",
                  },
                },
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: Math.max(chartHeight * 0.7, 180),
          },
          plotOptions: {
            pie: {
              donut: {
                size: "65%",
                labels: {
                  name: {
                    fontSize: "10px",
                  },
                  value: {
                    fontSize: "18px",
                  },
                  total: {
                    fontSize: "9px",
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div 
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900 flex flex-col"
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height,
        width: width,
        minHeight: '485px'
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Waste Generation by Type
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Distribution by state of matter
        </p>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="donut"
              height={chartHeight}
            />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        {/* Legend */}
        <div className=" space-y-1">
          {wasteData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Primary Type
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Solid Waste
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total Types
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {wasteData.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waste;
