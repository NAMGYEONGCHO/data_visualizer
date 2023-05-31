import browserUsage, { BrowserUsage } from '@visx/mock-data/lib/mocks/browserUsage';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import ScatterPlotChart from '../components/charts/ScatterPlotChart';
import PieChartLegent from '../components/charts/PieChartLegent';
import { Box } from 'react-feather';

const transformData = (data: BrowserUsage) => {
  const { date, ...rest } = data;
  const transformed = Object.entries(rest).map(([label, value]) => {
    return { label, value: parseFloat(value) };
  });

  return transformed;
};

const pieData = transformData(browserUsage[0]); /* [transformData(browserUsage[0])] */;

const scatterPlotData = [{x: 12, y: 13},{x: 14, y: 15},{x: 10, y: 12},{x: 4, y: 8},{x: 23, y: 12},{x: 24, y: 45},{x: 23, y: 54},{x: 23, y: 34}];

const Dashboard = () => {
  const chartHeight200 = 200;
  const chartHeight300 = 300;
  
  return (
    <main>
      <section className="flex flex-grow flex-col">
        {/* Top Row */}
        <article className={`flex flex-wrap justify-between`}>
          <div className={`w-full sm:w-1/2 md:w-1/4 rounded-md relative p-1`}>
            <div style={{height: chartHeight200}}>
              <LineChart/>
            </div>
          </div>
          <div className={`w-full sm:w-1/2 md:w-1/4 rounded-md relative p-1`}>
            <div style={{height: chartHeight200}}>
              <BarChart/>
            </div>
          </div>
          <div className={`w-full sm:w-1/2 md:w-1/4 rounded-md relative p-1`}>
            <div style={{height: chartHeight200}}>
              <PieChart data={pieData} />
            </div>
          </div>
          <div className={`w-full sm:w-1/2 md:w-1/4 rounded-md relative p-1`}>
            <div style={{height: chartHeight200}}>
              <PieChartLegent data={pieData} />
            </div>
          </div>
        </article>

        {/* Center Row */}
        <article className={`flex flex-wrap`}>
          <div className="w-full sm:w-2/3 md:w-3/4 relative p-1">
            <div style={{height: chartHeight300}}>
              <LineChart />
            </div>
          </div>
          <div className={`w-full sm:w-1/3 md:w-1/4 rounded-md relative p-1`}>
            <div style={{height: chartHeight300}}>
            <ScatterPlotChart data={scatterPlotData}/>
            </div>
          </div>
        </article>

        {/* Bottom Row */}
        <article className={`flex flex-wrap justify-between`} style={{ height: chartHeight200 }}>
          <div className="bg-green-500 rounded-md w-full sm:w-1/2 md:w-1/3">Column 1</div>
          <div className="bg-blue-500 rounded-md w-full sm:w-1/2 md:w-1/3">Column 2</div>
          <div className="bg-cyan-500 rounded-md w-full sm:w-1/2 md:w-1/3">Column 3</div>
        </article>
      </section>
      <Box height={4}/>
      <section className='grid grid-cols-4 gap-2' style={{ height: chartHeight200 }}>
        <div className="bg-red-500 rounded-md shadow-xl min-h-[200] w-full">Column 1</div>
        <div className="bg-orange-500 rounded-md shadow-xl min-h-[200] w-full">Column 2</div>
        <div className="bg-yellow-500 rounded-md shadow-xl min-h-[200] w-full">Column 3</div>
        <div className="bg-purple-500 rounded-md shadow-xl min-h-[200] w-full">Column 3</div>
      </section>
    </main>
  );
};

export default Dashboard;
