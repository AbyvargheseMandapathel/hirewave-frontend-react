import React from 'react';

const PlanDistribution = ({ plans }) => {
  const total = plans.reduce((sum, plan) => sum + plan.count, 0);
  
  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6">
      <h3 className="text-lg font-medium text-white mb-4">Premium Plan Distribution</h3>
      
      <div className="space-y-4">
        {plans.map((plan, index) => {
          const percentage = Math.round((plan.count / total) * 100);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8]">{plan.name}</span>
                <span className="text-white font-semibold">{plan.count} ({percentage}%)</span>
              </div>
              <div className="w-full bg-[#0f172a] rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: plan.color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanDistribution;