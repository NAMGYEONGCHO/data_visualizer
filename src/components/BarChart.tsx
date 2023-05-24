import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

  type DataPoint = {
    label: string;
    value: number;
  };
  
  type BarChartProps = {
    data: DataPoint[];
    width: number;
    height: number;
    barColor: string;
  };
  
  const BarChart: React.FC<BarChartProps> = ({ data, width, height, barColor }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.2);

      const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

      svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label) ?? 0)
      .attr('y', (d) => yScale(d.value) ?? 0)
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - (yScale(d.value) ?? 0))
      .attr('fill', barColor);
    
  }, [data, width, height, barColor]);

  return <div ref={chartRef}></div>;
};

export default BarChart;
