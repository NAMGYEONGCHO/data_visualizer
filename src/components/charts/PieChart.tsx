import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';
import * as d3 from 'd3';
import useMeasure from 'react-use-measure';

// Define the type of props expected by the PieChart component
interface PieProps {
  data: { label: string, value: number }[]
}

// Define the PieChart component
const PieChart: React.FC<PieProps> = ({ data }) => {
  // Use the useMeasure hook to measure the size of the container div
  const [ref, { width, height }] = useMeasure();
  // Create a ref to the SVG element for D3 to manipulate
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Use the custom useTheme hook to get the current theme
  const { nightMode } = useTheme();

  // Decide the text color based on the current theme
  const textColor = nightMode === 'dark' ? 'white' : 'black';
  
  // Use an effect hook to update the SVG whenever the data, size, or theme changes
  useEffect(() => {
    if (!width || !height || !svgRef.current) return; // Skip if width, height, or svgRef are not yet set

    // Select the SVG element
    const svg = d3.select(svgRef.current);

    // Clear any previous rendering
    svg.selectAll('*').remove();

    // Append a group element to the SVG, and translate it to the center
    const group = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create a color scale for the pie slices
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create a pie generator
    const pieGenerator = d3.pie<{ label: string, value: number }>()
      .value(d => d.value);

    // Create an arc generator
    const arcGenerator = d3.arc<{ label: string, value: number }>()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2);

    // Create the pie chart by appending path elements for each data point
    group
      .selectAll('path')
      .data(pieGenerator(data))
      .join('path')
      .attr('d', arcGenerator as any) // There is currently an issue with d3 type definitions for arc generators
      .style("fill", (_, i) => colorScale(i.toString()));

  }, [data, width, height, textColor]);

  // Render the component
  return (
    <div ref={ref} className="relative w-full h-full">
      <svg 
        ref={svgRef} 
        viewBox={`0 0 ${width} ${height}`} 
        className={`relative rounded-md text-xs text-white bg-gray-200 dark:bg-gray-700 dark:text-white`}
      />
    </div>
  );
}

export default PieChart;
