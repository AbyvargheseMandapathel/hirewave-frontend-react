import React from 'react';

const RevenueByPlan = ({ data }) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-4">Revenue by Plan</h3>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-[#0f172a]">
              Total: ${totalRevenue.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex h-4 mb-4 overflow-hidden rounded-full bg-[#0f172a]">
          {data.map((item, index) => {
            const width = (item.revenue / totalRevenue) * 100;
            return (
              <div
                key={index}
                style={{ width: `${width}%`, backgroundColor: item.color }}
                className="shadow-none flex flex-col text-center whitespace-nowrap justify-center"
              ></div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => {
            const percentage = ((item.revenue / totalRevenue) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div className="flex justify-between w-full">
                  <span className="text-[#94a3b8]">{item.plan}</span>
                  <span className="text-white">${item.revenue.toLocaleString()} ({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueByPlan;