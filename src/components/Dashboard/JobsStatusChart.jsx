import React from 'react';
import { FaCircle } from 'react-icons/fa';

const JobsStatusChart = ({ data }) => {
  const totalJobs = data.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-6">Job Status Distribution</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {data.map((item, index) => {
                // Calculate the percentage and angles for the pie chart
                const percentage = (item.count / totalJobs) * 100;
                let cumulativePercentage = 0;
                
                for (let i = 0; i < index; i++) {
                  cumulativePercentage += (data[i].count / totalJobs) * 100;
                }
                
                const startAngle = (cumulativePercentage / 100) * 360;
                const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
                
                // Convert angles to radians and calculate coordinates
                const startRad = (startAngle - 90) * (Math.PI / 180);
                const endRad = (endAngle - 90) * (Math.PI / 180);
                
                const x1 = 50 + 40 * Math.cos(startRad);
                const y1 = 50 + 40 * Math.sin(startRad);
                const x2 = 50 + 40 * Math.cos(endRad);
                const y2 = 50 + 40 * Math.sin(endRad);
                
                // Determine if the arc should be drawn as a large arc
                const largeArcFlag = percentage > 50 ? 1 : 0;
                
                // Create the SVG arc path
                const pathData = `
                  M 50 50
                  L ${x1} ${y1}
                  A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
                  Z
                `;
                
                return (
                  <path 
                    key={index} 
                    d={pathData} 
                    fill={item.color} 
                    stroke="#0f172a" 
                    strokeWidth="1"
                  />
                );
              })}
              <circle cx="50" cy="50" r="25" fill="#0f172a" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalJobs}</div>
                <div className="text-xs text-[#94a3b8]">Total Jobs</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.map((item, index) => {
              const percentage = ((item.count / totalJobs) * 100).toFixed(1);
              return (
                <div 
                  key={index} 
                  className="bg-[#0f172a] p-4 rounded-lg border border-[#334155]"
                >
                  <div className="flex items-center mb-2">
                    <FaCircle className="mr-2" style={{ color: item.color }} />
                    <span className="text-white">{item.status}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{item.count}</div>
                  <div className="text-sm text-[#94a3b8]">{percentage}% of total</div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6">
            <h4 className="text-white font-medium mb-3">Job Status Breakdown</h4>
            <div className="space-y-3">
              {data.map((item, index) => {
                const percentage = (item.count / totalJobs) * 100;
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#94a3b8]">{item.status}</span>
                      <span className="text-white">{item.count} jobs</span>
                    </div>
                    <div className="w-full bg-[#0f172a] rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: item.color 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsStatusChart;