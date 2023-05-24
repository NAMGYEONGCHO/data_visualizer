const Dashboard = () => {
  return (
    <div className="flex flex-grow flex-col">
      {/* Top Row */}
      <div className="flex flex-wrap justify-between bg-gray-100 py-4 px-2">
        <div className="w-full sm:w-1/2 md:w-1/4">Column 1</div>
        <div className="w-full sm:w-1/2 md:w-1/4">Column 2</div>
        <div className="w-full sm:w-1/2 md:w-1/4">Column 3</div>
        <div className="w-full sm:w-1/2 md:w-1/4">Column 4</div>
      </div>

      {/* Center Row */}
      <div className="flex flex-wrap bg-gray-300 py-4 px-2 bg-gray-400">
        <div className="w-full sm:w-2/3 md:w-3/4 ">Column 1</div>
        <div className="w-full sm:w-1/3 md:w-1/4">Column 2</div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-wrap justify-between bg-gray-200 py-4 px-2">
        <div className="w-full sm:w-1/2 md:w-1/3">Column 1</div>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 2</div>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 3</div>
      </div>
    </div>
  );
};

export default Dashboard;
