"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import React, { useEffect, useRef } from 'react';

interface GchartProps {
  className?: string;
  title?: string;
  description?: string;
}

const Gchart: React.FC<GchartProps> = ({ 
  className = "",
  title = "GHG Emissions by Scope",
  description = "Comprehensive overview of key performance metrics across different departments"
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    // Remove amCharts logo - safe way
    try {
      if (root._logo) {
        root._logo.dispose();
      }
    } catch (error) {
      console.warn("Could not dispose logo:", error);
    }

    // Try to load theme dynamically
    const loadTheme = async () => {
      try {
        const { default: am5themes_Animated } = await import("@amcharts/amcharts5/themes/Animated");
        root.setThemes([am5themes_Animated.new(root)]);
      } catch (error) {
        console.warn("Could not load animated theme:", error);
        // Continue without theme
      }
    };

    loadTheme();

    // Create chart
    const chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      innerRadius: am5.percent(20),
      startAngle: -90,
      endAngle: 180
    }));

    // Data with proper typing
    const data = [
      {
        category: "Scope 1 Emissions",
        value: 80,
        full: 100,
        columnSettings: {
          fill: chart.get("colors")?.getIndex(0) || am5.color("#3b82f6")
        }
      },
      {
        category: "Scope 2 Emissions",
        value: 35,
        full: 100,
        columnSettings: {
          fill: chart.get("colors")?.getIndex(1) || am5.color("#10b981")
        }
      },
      {
        category: "Scope 3 Emissions",
        value: 92,
        full: 100,
        columnSettings: {
          fill: chart.get("colors")?.getIndex(2) || am5.color("#f59e0b")
        }
      }
    ];

    // Add cursor
    const cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
      behavior: "zoomX"
    }));

    cursor.lineY.set("visible", false);

    // Create axes and their renderers
    const xRenderer = am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 50
    });

    xRenderer.labels.template.setAll({
      radius: 10
    });

    xRenderer.grid.template.setAll({
      forceHidden: true
    });

    const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      tooltip: am5.Tooltip.new(root, {})
    }));

    const yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20
    });

    yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 18,
      templateField: "columnSettings"
    });

    yRenderer.grid.template.setAll({
      forceHidden: true
    });

    const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer
    }));

    yAxis.data.setAll(data);

    // Create series
    const series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "full",
      categoryYField: "category",
      fill: root.interfaceColors.get("alternativeBackground")
    }));

    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
    });

    series1.data.setAll(data);

    const series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "value",
      categoryYField: "category"
    }));

    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings"
    });

    series2.data.setAll(data);

    // Animate chart and series in
    try {
      series1.appear(1000);
      series2.appear(1000);
      chart.appear(1000, 100);
    } catch (error) {
      console.warn("Animation error:", error);
    }

    // Additional logo removal after chart is rendered
    const removeLogo = () => {
      try {
        const logoElements = chartRef.current?.querySelectorAll('.am5-logo-group, [aria-label*="amCharts"]');
        logoElements?.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
          }
        });
      } catch (error) {
        console.warn("Logo removal error:", error);
      }
    };

    // Try to remove logo after animations complete
    const timeoutId = setTimeout(removeLogo, 1100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (rootRef.current) {
        try {
          rootRef.current.dispose();
        } catch (error) {
          console.warn("Cleanup error:", error);
        }
      }
    };
  }, []);

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}>
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {/* Chart Section */}
      <div className="p-6">
        <div 
          ref={chartRef} 
          className="h-96 w-full"
          style={{
            position: 'relative'
          }}
        />
      </div>
    </div>
  );
};

export default Gchart;
