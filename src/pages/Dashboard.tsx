const Dashboard = () => {
  const body_colorset = "text-black bg-gray-100 dark:bg-gray-500 dark:text-white ";
  const body_colorset2 = "text-black bg-white-500 dark:bg-gray-700 dark:text-white ";
  return (
    <div className="flex flex-grow flex-col">
      {/* Top Row */}
      <div className={`${body_colorset} flex flex-wrap justify-between py-4 px-2`}>
        <div className="w-full sm:w-1/2 md:w-1/4">Column 1</div>
        <div className="w-full sm:w-1/2 md:w-1/4">Column 2</div>
        <div className="w-full sm:w-1/2 md:w-1/4">Column 3</div>
        <div className="w-full sm:w-1/2 md:w-1/4">Column 4</div>
      </div>

      {/* Center Row */}
      <div className={`${body_colorset2} flex flex-wrap py-4 px-2`}>
        <div className="w-full sm:w-2/3 md:w-3/4 ">Column 1</div>
        <div className="w-full sm:w-1/3 md:w-1/4">Column 2</div>
      </div>

      {/* Bottom Row */}
      <div className={`${body_colorset} flex flex-wrap justify-between py-4 px-2`}>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 1</div>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 2</div>
        <div className="w-full sm:w-1/2 md:w-1/3">Column 3</div>
      </div>
    </div>
  );
};

export default Dashboard;
