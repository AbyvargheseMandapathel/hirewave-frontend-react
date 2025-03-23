import React, { useState, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ActivityChart = ({ data, title, timeRange, onTimeRangeChange }) => {
  const [chartOffset, setChartOffset] = useState(0);
  const chartContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
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
  
  // Mouse events for dragging the chart
  const handleMouseDown = (e) => {
    if (timeRange !== '7days') {
      setIsDragging(true);
      setStartX(e.pageX - chartContainerRef.current.offsetLeft);
      setScrollLeft(chartContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - chartContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    chartContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Get max values for scaling
  const maxApplications = Math.max(...data.map(d => d.applications));
  const maxInterviews = Math.max(...data.map(d => d.interviews));
  const maxHires = Math.max(...data.map(d => d.hires));
  const maxValue = Math.max(maxApplications, maxInterviews, maxHires);
  
  // Visible data based on offset
  const visibleData = data.slice(chartOffset, chartOffset + 7);
  
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
        
        <div 
          ref={chartContainerRef}
          className="relative h-64 overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0 flex items-end justify-between">
            {visibleData.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full flex-1">
                <div className="w-full flex justify-center items-end h-[calc(100%-30px)]">
                  <div 
                    className="w-3 bg-[#60a5fa] rounded-t-sm mx-0.5" 
                    style={{ height: `${(item.applications / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="w-3 bg-[#818cf8] rounded-t-sm mx-0.5" 
                    style={{ height: `${(item.interviews / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="w-3 bg-[#a5b4fc] rounded-t-sm mx-0.5" 
                    style={{ height: `${(item.hires / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="text-[#94a3b8] text-xs mt-2">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#60a5fa] rounded-sm mr-2"></div>
          <span className="text-[#94a3b8] text-sm">Applications</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#818cf8] rounded-sm mr-2"></div>
          <span className="text-[#94a3b8] text-sm">Interviews</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#a5b4fc] rounded-sm mr-2"></div>
          <span className="text-[#94a3b8] text-sm">Hires</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;