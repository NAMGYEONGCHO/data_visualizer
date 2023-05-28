import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const pieData = [{label: 'Apple', value: 12},{label: 'Pine', value: 32},{label: 'Mango', value: 22},{label: 'Berry', value: 8}]
const Dashboard = () => {
  const chartHeight200 = 200;
  const chartHeight300 = 300;
  
  return (
    <>
    <div className="flex flex-grow flex-col">
      {/* Top Row */}
      <div className={`flex flex-wrap justify-between`}>
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
            <BarChart/>
          </div>
        </div>
      </div>

      {/* Center Row */}
      <div className={`flex flex-wrap`}>
        <div className="w-full sm:w-2/3 md:w-3/4 relative p-1" style={{height: chartHeight300}}>
            <LineChart />
        </div>
        <div className="w-full sm:w-1/3 md:w-1/4 p-1" style={{ height: chartHeight300 }}>
            <BarChart/>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={`flex flex-wrap justify-between`} style={{ height: chartHeight200 }}>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 1</div>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 2</div>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 3</div>
      </div>
     
    </div>
    <div className='grid grid-cols-4 gap-2' style={{ height: chartHeight200 }}>
      <div className="bg-red-500 rounded-md shadow-xl min-h-[200] w-full">Column 1</div>
      <div className="bg-orange-500 rounded-md shadow-xl min-h-[200] w-full">Column 2</div>
      <div className="bg-yellow-500 rounded-md shadow-xl min-h-[200] w-full">Column 3</div>
      <div className="bg-purple-500 rounded-md shadow-xl min-h-[200] w-full">Column 3</div>
    </div>
    </>
  );
};

export default Dashboard;
