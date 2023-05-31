import { useTheme } from '../../ThemeContext';
import { TouchEvent, MouseEvent } from 'react';
import useMeasure from 'react-use-measure';
import { TooltipWithBounds, useTooltip, defaultStyles } from '@visx/tooltip';
import { timeFormat } from 'd3-time-format';
import { Group } from '@visx/group';
import { scaleLinear, scaleTime } from '@visx/scale';
import { localPoint } from '@visx/event';
import { bisector, extent } from 'd3-array';
import { Bar, Line, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { usePrices } from '../../services/queries/Dashboard';
import { Data } from '../../types/ApiTypes'

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const getXValue = (d: Data) => new Date(d[0]);
const getYValue = (d: Data) => d[1];
const bisectDate = bisector<Data, Date>(getXValue).left;

const tooltipStyles = {
  ...defaultStyles,
  position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    right: 'auto',
    bottom: 'auto',
  borderRadius: 4,
  background: "#161434",
  color: "#ADADD3",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

const Chart = () => {
  const { data, error, isLoading } = usePrices();
  const [ref, { width, height }] = useMeasure();
  const { nightMode } = useTheme();
  
  const strokeColor = nightMode === 'dark' ? 'white' : '#2569c3';

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<Data>();

  if (isLoading) return <>loading</>;

  if (error) return <>error</>;

  if (!data) return null;

  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, getXValue) as [Date, Date],
  });

  const yScale = scaleLinear<number>({
    range: [height, 0],
    round: true,
    domain: [
      Math.min(...data.map(getYValue)),
      Math.max(...data.map(getYValue)),
    ],
    nice: true,
  });
  
  return (
    <>
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className={`relative rounded-md text-black bg-gray-200 dark:bg-gray-700 dark:text-white`}
      >
        <Group>
          <LinePath<Data>
            key={nightMode}
            data={data}
            x={(d) => xScale(getXValue(d)) ?? 0}
            y={(d) => yScale(getYValue(d)) ?? 0}
            stroke={strokeColor}
            strokeWidth={2}
            curve={curveMonotoneX}
          />
        </Group>

        <Group>
          <Bar
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={(
              event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>
            ) => {
              const { x } = localPoint(event) || { x: 0 };
              const x0 = xScale.invert(x);
              const index = bisectDate(data, x0, 1);
              const d0 = data[index - 1];
              const d1 = data[index];
              let d = d0;
              if (d1 && getXValue(d1)) {
                d =
                  x0.valueOf() - getXValue(d0).valueOf() >
                  getXValue(d1).valueOf() - x0.valueOf()
                    ? d1
                    : d0;
              }
              showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: yScale(getYValue(d)),
              });
            }}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>

        {tooltipData ? (
          <Group>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: height }}
              stroke="#59588D"
              strokeWidth={1}
              pointerEvents="none"
              strokeDasharray="5, 5"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={8}
              fill="#FF4DCA"
              fillOpacity={0.5}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="#FF4DCA"
              pointerEvents="none"
            />
          </Group>
        ) : null}
      </svg>

      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={height}
          left={0}
          style={tooltipStyles}
        >
          {`${timeFormat("%b %d %H:%M ")(new Date(getXValue(tooltipData)))}`}:{" "}
          <b>{formatter.format(getYValue(tooltipData))}</b>
        </TooltipWithBounds>
      ) : null}
    </>
  );
};

export default Chart;