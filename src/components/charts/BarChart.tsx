
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { useTheme } from '../../ThemeContext';
import useMeasure from 'react-use-measure';
import { TooltipWithBounds, useTooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { TouchEvent, MouseEvent } from 'react';
import { Line } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import {Group} from '@visx/group';
import {AxisLeft } from '@visx/axis';
import {Bar} from '@visx/shape';
import { timeFormat } from 'd3-time-format';

// Define default styles for tooltip
const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#161434",
  color: "#ADADD3",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

// Mock data to be used for the chart
const data = appleStock.slice(0, 10)

// Dimensions and margin for the chart
const margin = 32;
const defaultWidth = 100;
const defaultHeight = 100; 

// Getter functions to extract x and y values from data points
const getXValue = (d: AppleStock) => d.date;
const getYValue = (d: AppleStock) => d.close;

// The main BarChart component
function BarChart() {
  // Hooks for measuring the SVG dimensions and managing tooltip state
  const [ ref, bounds ]  = useMeasure();
  const { nightMode } = useTheme();
  
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<AppleStock>();

  // Bar color based on current theme
  const barColor = nightMode === 'dark' ? 'orange' : '#2569c3';

  // Dimensions for the chart area
  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width - margin;
  const innerHeight = height - margin;

  // Scales for positioning elements along x and y axis
  const xScale = scaleBand<string>({
    range: [margin, innerWidth],
    domain: data.map(getXValue),
    padding: 0.2
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight , margin ],
    domain: [
      Math.min(...data.map(getYValue)) - 1,
      Math.max(...data.map(getYValue)) + 1,
    ],
    
  })

  // Return SVG with Bar elements and Axes
  return (
    <>
    <svg
      ref={ref}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      className={`relative rounded-md text-black bg-gray-200 dark:bg-gray-700 dark:text-white`}
    >
    <Group>{data.map((d) => {
      const xValue = getXValue(d);
      const barWidth = xScale.bandwidth();
      const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);

      const barX = xScale(xValue);
      const barY = innerHeight - barHeight;

      return (
        // Draw each bar with respective height, width, position, and color
        <Bar 
          key={`bar-${xValue}`}
          x={barX}
          y={barY}
          width={barWidth}
          height={barHeight}
          fill={barColor}
          // Show tooltip when mouse hovers over the bar
          onMouseMove={(
            event: TouchEvent<SVGRectElement>|MouseEvent<SVGRectElement>)=> {
              const point = localPoint(event);
              if(!point) return;

              showTooltip({
                tooltipData: d,
                tooltipLeft: point.x,
                tooltipTop: point.y,
              });
            }}
            // Hide tooltip when mouse leaves the bar
          onMouseLeave={() => hideTooltip()}  
        /> 

        
      )
    })}
      Bottom
      </Group>
      
      <Group>
        {/* Draw the y-axis with labels */}
        <AxisLeft 
          left={margin}
          hideAxisLine 
          scale={yScale} 
          tickStroke={nightMode === 'dark' ? 'white' : 'black'}
          tickLabelProps={() => ({
            fill: nightMode === 'dark' ? 'white' : 'black',
            fontSize: 10,
            textAnchor: 'end',
            dy: '0.33em',
          })}/>
          {/* Draw a line for the y-axis */}
          <Line
            from={{ x: margin, y: margin }} 
            to={{ x: margin, y: innerHeight }} 
            stroke={nightMode === 'dark' ? 'white' : 'black'}
          />
      </Group>
    </svg>
    {/* Show a tooltip when a bar is hovered over */}
    {tooltipData ? (
      <TooltipWithBounds
        key={Math.random()}
        top={tooltipTop}
        left={tooltipLeft}
        style={tooltipStyles}
      >
        <b>{`${timeFormat("%b %d, %Y")(
              new Date(getXValue(tooltipData))
            )}`}</b>
            : ${getYValue(tooltipData)}
      </TooltipWithBounds>
    ): null}
    </>
  );
}

export default BarChart;
