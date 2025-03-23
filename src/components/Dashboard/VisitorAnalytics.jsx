import React, { useState, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const VisitorAnalytics = ({ data, title = "Visitor Analytics", daysToShow = 7 }) => {
  const [timeRange, setTimeRange] = useState('7days');
  const [chartOffset, setChartOffset] = useState(0);
  const chartContainerRef = useRef(null);
  
  const handlePrevious = () => {
    if (chartOffset > 0) {
      setChartOffset(chartOffset - 1);
    }
  };

  const handleNext = () => {
    if (chartOffset < data.length - daysToShow) {
      setChartOffset(chartOffset + 1);
    }
  };

  // Get max value for scaling
  const maxVisitors = Math.max(...data.map(d => d.visitors));
  
  // Visible data based on offset
  const visibleData = data.slice(chartOffset, chartOffset + daysToShow);
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <select 
          className="bg-[#0f172a] text-[#94a3b8] border border-[#334155] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#818cf8]"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
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
              Showing {chartOffset + 1}-{Math.min(chartOffset + daysToShow, data.length)} of {data.length} days
            </div>
            <button 
              onClick={handleNext} 
              disabled={chartOffset >= data.length - daysToShow}
              className={`p-1 rounded ${chartOffset >= data.length - daysToShow ? 'text-gray-600' : 'text-[#818cf8] hover:bg-[#334155]'}`}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
        
        <div 
          ref={chartContainerRef}
          className="relative h-64 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-end justify-between">
            {visibleData.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full flex-1">
                <div className="w-full flex justify-center items-end h-[calc(100%-30px)]">
                  <div 
                    className="w-6 bg-[#818cf8] rounded-t-sm mx-0.5 transition-all duration-500" 
                    style={{ height: `${(item.visitors / maxVisitors) * 100}%` }}
                  >
                    <div className="text-xs text-white text-center mt-[-20px]">{item.visitors}</div>
                  </div>
                </div>
                <div className="text-[#94a3b8] text-xs mt-2">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto mt-4">
        <table className="w-full">
          <thead>
            <tr className="text-[#94a3b8] border-b border-[#334155]">
              <th className="pb-2 text-left font-medium">Date</th>
              <th className="pb-2 text-right font-medium">Visitors</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item, index) => (
              <tr key={index} className="border-b border-[#334155] text-white">
                <td className="py-2 text-left text-[#94a3b8]">{item.date}</td>
                <td className="py-2 text-right">{item.visitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorAnalytics;