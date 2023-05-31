import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import useMeasure from 'react-use-measure';
import { useTheme } from '../../ThemeContext';

// Define the type of props expected by the ScatterPlot component
interface ScatterProps {
  data: { x: number, y: number }[]
}

// Define the ScatterPlot component
const ScatterPlot: React.FC<ScatterProps> = ({ data }) => {
  // Use the useMeasure hook to measure the dimensions of the div
  const [ref, { width, height }] = useMeasure();
  // Use the useRef hook to create a reference to the SVG element
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Get the nightMode value from the theme
  const { nightMode } = useTheme();
  // Set the color of the scatter plot based on the nightMode
  const plotColor = nightMode === 'dark' ? 'steelblue': 'purple';

  // Use the useEffect hook to draw the scatter plot
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
      
    // Append a group to the SVG and translate it to account for the margins
    const group = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
      // Draw axes
      group.append('g')
      .attr('transform', `translate(0,${innerHeight })`)
      .call(xAxis);

      group.append('g')
      .call(yAxis);

    // Draw the points of the scatter plot
    group.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 3)
      .attr('fill', plotColor);
  // Re-render the scatter plot if the data, width, height, or plotColor changes
  }, [data, width, height, plotColor]);

  // Return the SVG element inside a div
  return (
    <div ref={ref} className="relative w-full h-full">
      <svg 
        ref={svgRef} 
        className={`absolute top-0 left-0 rounded-md w-full h-full text-black bg-gray-200 dark:bg-gray-700 dark:text-white`} 
        viewBox={`0 0 ${width} ${height}`} />
    </div>
  );
}

export default ScatterPlot;
