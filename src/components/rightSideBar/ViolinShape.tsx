import * as d3 from "d3";
import { scaleLinear, quantile } from 'd3';
import React, { useState, useEffect, useRef } from "react";

type VerticalViolinShapeProps = {
  data: number[];
  binNumber: number;
  xScale: d3.ScaleLinear<number, number, never>;
  height: number;
  targetValue: number | number[] | null;
};

const ViolinShape = ({
  data,
  xScale,
  height,
  binNumber,
  targetValue
}: VerticalViolinShapeProps) => {
  const min = Math.min(...data);
  const max = Math.max(...data);

  const binBuilder = d3
    .bin()
    .domain([min, max])
    .thresholds(xScale.ticks(binNumber))
    .value((d) => d);
  const bins = binBuilder(data);

  const biggestBin = Math.max(...bins.map((b) => b.length));

  const wScale = d3
    .scaleLinear()
    .domain([-biggestBin, biggestBin])
    .range([0, height]);

  const areaBuilder = d3
    .area<d3.Bin<number, number>>()
    .y0((d) => wScale(-d.length))
    .y1((d) => wScale(d.length))
    .x((d) => xScale(d.x0 || 0))
    .curve(d3.curveBumpY);

  const areaPath = areaBuilder(bins);

  const noTarget = (targetValue: number | number[] | null) => {
    if (targetValue === null) {
      return true
    }

    else if (Array.isArray(targetValue)) {
      if (targetValue.some(item => item == null)) {
        return true
      }
    }

    return false
  }

  if (noTarget(targetValue)) {
    return (
      <>
        <path
          d={areaPath || undefined}
          opacity={1}
          stroke="#9a6fb0"
          fill="#9a6fb0"
          fillOpacity={0.1}
          strokeWidth={2}
        />
      </>
    )
  } else if (Array.isArray(targetValue)) {
    return (
      <>
        <path
          d={areaPath || undefined}
          opacity={1}
          stroke="#9a6fb0"
          fill="#9a6fb0"
          fillOpacity={0.1}
          strokeWidth={2}
        />
        <line
          key={targetValue[1]}
          x1={xScale(targetValue[1])}
          y1={0}
          x2={xScale(targetValue[1])}
          y2={height}
          stroke="red"
        />

        <rect x={xScale(targetValue[0])} y={0} width={xScale(targetValue[2]) - xScale(targetValue[0])} height={height} fill="red" fillOpacity={0.1} strokeWidth={1} stroke="red" ></rect>
      </>
    )
  }

  return (
    <>
      <path
        d={areaPath || undefined}
        opacity={1}
        stroke="#9a6fb0"
        fill="#9a6fb0"
        fillOpacity={0.1}
        strokeWidth={2}
      />
      {
        !Array.isArray(targetValue) && targetValue !== null && (
          <line
            x1={xScale(targetValue)}
            y1={0}
            x2={xScale(targetValue)}
            y2={height}
            stroke="red"
          />
        )
      }
    </>
  );
};

type CityData = {
  [key: string]: string[];
};

type ViolinPlotProps = {
  city_data: CityData | null;
  width: number;
  height: number;
  plotKey: string;
  targetValue: number | null | number[];
};

const ViolinPlot = ({ city_data, width, height, plotKey, targetValue }: ViolinPlotProps) => {
  // Render the ViolinPlot component using the provided data and xScale

  const [data, setData] = useState<number[] | null>(null);
  const [xScale, setXScale] = useState(() => scaleLinear());

  useEffect(() => {

    if (city_data != undefined) {
      const valueArray = city_data;

      if (valueArray != undefined) {
        // Convert string array to number array
        let numericArray = valueArray.map(Number);

        // Calculate the 0.05 and 0.95 percentiles
        let p5 = quantile(numericArray.sort((a, b) => a - b), 0.05);
        let p95 = quantile(numericArray, 0.95);


        if (p5 !== undefined && p95 !== undefined) {

          const yS = scaleLinear().domain([p5, p95]).range([0, width * 0.8]);

          setData(valueArray);
          setXScale(() => yS);
        }
      }
    }
  }, [city_data])

  if (!data || !xScale) {
    return <div>Loading...</div>;
  }

  return (
    <svg style={{ width: width, height: height * 2 }}>
      <g transform={`translate(${width * 0.1}, ${height})`}>
        <ViolinShape
          height={height}
          xScale={xScale}
          data={data}
          binNumber={25}
          targetValue={targetValue}
        />
      </g>
    </svg >
  );
}

export default ViolinPlot;