import React from 'react';
import * as d3 from 'd3';

interface PieProps {
  data: { label: string, value: number }[]
}

const Legend: React.FC<PieProps> = ({ data }) => {
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  return (
    <div className="legend overflow-auto rounded-md text-xs text-black bg-gray-200 dark:bg-gray-700 dark:text-white" style={{maxHeight: '200px', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      {data.map((d, i) => (
        <div key={i} className="legend-item flex items-center mb-2">
          <div className="legend-color mx-2 mt-2" style={{ backgroundColor: colorScale(i.toString()), width: '18px', height: '18px' }}></div>
          <div className="legend-label">{d.label}: {d.value}</div>
        </div>
      ))}
      <style>{`
        .legend::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Legend;
