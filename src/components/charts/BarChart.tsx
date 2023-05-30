
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { useTheme } from '../../ThemeContext';
import useMeasure from 'react-use-measure';
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { TouchEvent, MouseEvent } from 'react';
import { Line } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import {Group} from '@visx/group';
import {AxisLeft } from "@visx/axis";
import {Bar} from "@visx/shape";
import { timeFormat } from 'd3-time-format';

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#161434",
  color: "#ADADD3",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};
const data = appleStock.slice(0, 10)

const margin = 32;
const defaultWidth = 100;
const defaultHeight = 100; 

const getXValue = (d: AppleStock) => d.date;
const getYValue = (d: AppleStock) => d.close;

function BarChart() {
  const [ ref, bounds ]  = useMeasure();
  const { nightMode } = useTheme();
  
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<AppleStock>();

  const barColor = nightMode === 'dark' ? 'orange' : '#2569c3';

  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width - margin;
  const innerHeight = height - margin;

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

  return (
    <>
    <svg
      ref={ref}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      className={`relative rounded-md text-black bg-white dark:bg-gray-700 dark:text-white`}
    >
    <Group>{data.map((d) => {
      const xValue = getXValue(d);
      const barWidth = xScale.bandwidth();
      const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);

      const barX = xScale(xValue);
      const barY = innerHeight - barHeight;

      return (
        <Bar 
          key={`bar-${xValue}`}
          x={barX}
          y={barY}
          width={barWidth}
          height={barHeight}
          fill={barColor}
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
          onMouseLeave={() => hideTooltip()}  
        /> 

        
      )
    })}
      Bottom
      </Group>
      
      <Group>
        <AxisLeft 
          left={margin}
          hideAxisLine 
          scale={yScale} 
          tickStroke={nightMode === 'dark' ? '#fff' : '#000'}
          tickLabelProps={() => ({
            fill: nightMode === 'dark' ? '#fff' : '#000',
            fontSize: 10,
            textAnchor: 'end',
            dy: '0.33em',
          })}/>
          <Line
            from={{ x: margin, y: margin }} 
            to={{ x: margin, y: innerHeight }} 
            stroke={nightMode === 'dark' ? '#fff' : '#000'}
          />
      </Group>
    </svg>
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
