"use client";

import React, { useEffect, useState } from 'react';

const Scope1Chart: React.FC = () => {
  const [chartComponent, setChartComponent] = useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        setIsLoading(true);
        
        // Import Highcharts and HighchartsReact
        const [
          { default: Highcharts },
          { default: HighchartsReact }
        ] = await Promise.all([
          import('highcharts'),
          import('highcharts-react-official')
        ]);

        const ChartComponent = () => {
          const mainData = [
            { name: 'Stationary', y: 61.04, color: '#3b82f6' },
            { name: 'Vehicle', y: 11.84, color: '#10b981' },
            { name: 'Fugitive', y: 27.12, color: '#f59e0b' }
          ];

          const chartOptions = {
            chart: {
              type: 'column',
              backgroundColor: 'transparent',
              height: 400,
              style: {
                fontFamily: 'Inter, sans-serif'
              }
            },
            title: {
              text: 'Scope 1 Emissions by Source Category',
              style: {
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937'
              }
            },
            subtitle: {
              text: 'CO₂ equivalent (tCO₂e)',
              style: {
                fontSize: '14px',
                color: '#6b7280'
              }
            },
            xAxis: {
              type: 'category',
              labels: {
                style: {
                  fontSize: '12px',
                  color: '#6b7280'
                }
              },
              lineColor: '#e5e7eb',
              tickColor: '#e5e7eb'
            },
            yAxis: {
              title: {
                text: 'Emissions (tCO₂e)',
                style: {
                  fontSize: '12px',
                  color: '#6b7280'
                }
              },
              labels: {
                style: {
                  fontSize: '12px',
                  color: '#6b7280'
                }
              },
              gridLineColor: '#f3f4f6'
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              column: {
                colorByPoint: true,
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  format: '{point.y:.1f}%',
                  style: {
                    fontSize: '11px',
                    fontWeight: '500'
                  }
                }
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
              backgroundColor: '#ffffff',
              borderColor: '#e5e7eb',
              borderRadius: 8,
              shadow: true
            },
            series: [
              {
                name: 'Emission Sources',
                type: 'column',
                data: mainData
              }
            ],
            responsive: {
              rules: [
                {
                  condition: {
                    maxWidth: 500
                  },
                  chartOptions: {
                    chart: {
                      height: 300
                    },
                    title: {
                      style: {
                        fontSize: '16px'
                      }
                    },
                    subtitle: {
                      style: {
                        fontSize: '12px'
                      }
                    }
                  }
                }
              ]
            }
          };

          return (
            <div className="relative">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
              />
            </div>
          );
        };

        setChartComponent(() => ChartComponent);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading chart:', err);
        setError('Failed to load chart');
        setIsLoading(false);
      }
    };

    loadChart();
  }, []);

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="relative">
          <div className="flex h-96 items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Loading chart...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="relative">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      );
    }

    if (chartComponent) {
      const ChartComponent = chartComponent;
      return <ChartComponent />;
    }

    return null;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Scope 1 Emissions Analysis
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Direct emissions from owned or controlled sources
        </p>
      </div>
      
      {renderChart()}

      {/* Legend/Info Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Stationary</h4>
          </div>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            Fixed combustion sources like boilers, furnaces, and generators
          </p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Natural Gas Combustion</span>
              <span>35.2%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Coal Combustion</span>
              <span>15.8%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Oil Combustion</span>
              <span>6.1%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Biomass Combustion</span>
              <span>3.94%</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <h4 className="font-medium text-green-900 dark:text-green-100">Vehicle</h4>
          </div>
          <p className="mt-1 text-sm text-green-700 dark:text-green-300">
            Mobile combustion from company-owned vehicles and equipment
          </p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Company Fleet</span>
              <span>7.2%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Delivery Trucks</span>
              <span>2.8%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Construction Equipment</span>
              <span>1.84%</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
            <h4 className="font-medium text-amber-900 dark:text-amber-100">Fugitive</h4>
          </div>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            Intentional and unintentional releases from equipment and processes
          </p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
              <span>Equipment Leaks</span>
              <span>12.5%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Storage Tank Emissions</span>
              <span>8.3%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Process Venting</span>
              <span>4.2%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Wastewater Treatment</span>
              <span>2.12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scope1Chart;
