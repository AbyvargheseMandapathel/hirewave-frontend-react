import React, { useState, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const RevenueChart = ({ data, title, timeRange, onTimeRangeChange }) => {
  const [chartOffset, setChartOffset] = useState(0);
  const chartContainerRef = useRef(null);
  
  const handlePrevious = () => {
    if (chartOffset > 0) {
      setChartOffset(chartOffset - 1);
    }
  };

  const handleNext = () => {
    if (chartOffset < data.length - 7) {
      setChartOffset(chartOffset + 1);
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <select 
          className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="alltime">All Time Stats</option>
        </select>
      </div>
      
      <div className="mb-6 bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
        {timeRange !== '7days' && (
          <div className="flex justify-between mb-2">
            <button 
              onClick={handlePrevious} 
              disabled={chartOffset === 0}
              className={`p-1 rounded ${chartOffset === 0 ? 'text-gray-600' : 'text-[#818cf8] hover:bg-[#334155]'}`}
            >
              <FaArrowLeft />
            </button>
            <div className="text-[#94a3b8] text-sm">
              Showing {chartOffset + 1}-{Math.min(chartOffset + 7, data.length)} of {data.length} days
            </div>
            <button 
              onClick={handleNext} 
              disabled={chartOffset >= data.length - 7}
              className={`p-1 rounded ${chartOffset >= data.length - 7 ? 'text-gray-600' : 'text-[#818cf8] hover:bg-[#334155]'}`}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
        
        <div ref={chartContainerRef} className="h-60 w-full relative">
          <svg className="w-full h-full" viewBox={`0 0 ${(timeRange === '7days' ? data.length : 7) * 60} 200`} preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="150" x2="100%" y2="150" stroke="#334155" strokeWidth="1" />
            <line x1="0" y1="100" x2="100%" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
            <line x1="0" y1="50" x2="100%" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
            
            {/* Chart bars */}
            {(timeRange === '7days' ? data : data.slice(chartOffset, chartOffset + 7)).map((item, index) => {
              const maxValue = Math.max(...data.map(d => d.value), 500);
              const barHeight = (item.value / maxValue) * 150;
              const barWidth = 40;
              const barX = index * 60 + 10; // 60px per bar with spacing
              const barY = 150 - barHeight;
              
              return (
                <g key={index}>
                  {/* Bar */}
                  <rect 
                    x={barX} 
                    y={barY} 
                    width={barWidth} 
                    height={barHeight} 
                    fill="#818cf8" 
                    rx="2"
                    className="transition-all duration-300 hover:fill-[#a5b4fc]"
                  />
                  
                  {/* Value text */}
                  <text 
                    x={barX + barWidth/2} 
                    y={barY - 5} 
                    textAnchor="middle" 
                    fontSize="10" 
                    fill="#94a3b8"
                  >
                    ${item.value}
                  </text>
                  
                  {/* Date text */}
                  <text 
                    x={barX + barWidth/2} 
                    y="170" 
                    textAnchor="middle" 
                    fontSize="10" 
                    fill="#94a3b8"
                  >
                    {item.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-64">
        <table className="w-full text-[#94a3b8]">
          <thead>
            <tr className="border-b border-[#334155]">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-[#334155] hover:bg-[#334155]">
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">${item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueChart;