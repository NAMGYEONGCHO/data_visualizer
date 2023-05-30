import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import useMeasure from 'react-use-measure';
import { useTheme } from '../../ThemeContext';

interface ScatterProps {
  data: { x: number, y: number }[]
}

const ScatterPlot: React.FC<ScatterProps> = ({ data }) => {
  const [ref, { width, height }] = useMeasure();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { nightMode } = useTheme();

  const plotColor = nightMode === 'dark' ? 'steelblue': 'purple';

  useEffect(() => {
    if (!width || !height || !svgRef.current) return; // Skip if width, height, or svgRef are not yet set

    const svg = d3.select(svgRef.current);

    // Clear any previous rendering
    svg.selectAll('*').remove();

    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x) as [number, number])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y) as [number, number])
      .range([innerHeight, 0]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
      
    const group = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
      // Draw axes
      group.append('g')
      .attr('transform', `translate(0,${innerHeight })`)
      .call(xAxis);

      group.append('g')
      .call(yAxis);

    // Draw points
    group.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 3)
      .attr('fill', plotColor);

  }, [data, width, height, plotColor]);

  return (
    <div ref={ref} className="relative w-full h-full">
      <svg 
        ref={svgRef} 
        className={`absolute top-0 left-0 rounded-md w-full h-full text-white bg-white dark:bg-gray-700 dark:text-white`} 
        viewBox={`0 0 ${width} ${height}`} />
    </div>
  );
}

export default ScatterPlot;
