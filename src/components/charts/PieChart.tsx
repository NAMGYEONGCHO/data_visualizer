import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';
import * as d3 from 'd3';
import useMeasure from 'react-use-measure';

interface PieProps {
  data: { label: string, value: number }[]
}

const PieChart: React.FC<PieProps> = ({ data }) => {
  const [ref, { width, height }] = useMeasure();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { nightMode } = useTheme();

  const textColor = nightMode === 'dark' ? 'white' : 'black';

  useEffect(() => {
    if (!width || !height || !svgRef.current) return; // Skip if width, height, or svgRef are not yet set

    const svg = d3.select(svgRef.current);

    // Clear any previous rendering
    svg.selectAll('*').remove();

    const group = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pieGenerator = d3.pie<{ label: string, value: number }>()
      .value(d => d.value);

    const arcGenerator = d3.arc<{ label: string, value: number }>()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2);

    // Create pie
    group
      .selectAll('path')
      .data(pieGenerator(data))
      .join('path')
      .attr('d', arcGenerator as any) // There is currently an issue with d3 type definitions for arc generators
      .style("fill", (_, i) => colorScale(i.toString()));

  }, [data, width, height, textColor]);

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
