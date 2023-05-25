import React, { useRef, useEffect } from 'react';
import useMeasure from "react-use-measure";
import * as d3 from 'd3';

const data = [
  { name: "Apple", value: 20 },
  { name: "Banana", value: 12 },
  { name: "Cherry", value: 15 },
  { name: "Dates", value: 25 },
  { name: "Elderberry", value: 18 },
];

function BarChart() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);

      // Define scales
      const xScale = d3.scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, 160])
        .padding(0.2);
      
      const yScale = d3.scaleLinear()
        .domain([0, 30]) // ideally use max(data, d => d.value)
        .range([150, 0]); // 150 is the height of the graph

      // Draw the bars
      svg
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d) => xScale(d.name) ?? 0)  // default to 0 if xScale(d.name) is undefined
        .attr('y', (d) => yScale(d.value) ?? 0) // default to 0 if yScale(d.value) is undefined
        .attr('height', (d) => 150 - (yScale(d.value) ?? 150))
        .attr('width', xScale.bandwidth())
        .attr('class', 'fill-current dark:text-red-500 text-purple-500');

        // Draw the axes
        // create axis generators
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", `translate(0,150)`)
            .call(xAxis)
            .attr("class", "x-axis");

        svg.append("g")
            .attr("transform", `translate(0,0)`)
            .call(yAxis)
            .attr("class", "y-axis");
    }
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-200 h-full">
      <svg ref={ref} style={{ background: '#eee' }} width={'100%'} height={200}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

export default BarChart;
