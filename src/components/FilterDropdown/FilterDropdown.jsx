import React, { useState } from 'react';

const FilterDropdown = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    onFilter({ ...filters, [name]: value });
  };

  return (
    <div className="bg-[#1e293b] rounded-lg p-4 shadow-lg border border-[#334155]">
      <div className="space-y-2">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full bg-[#0f172a] text-[#94a3b8] rounded-lg p-2 focus:outline-none"
        >
          <option value="">Select Category</option>
          <option value="Career Advice">Career Advice</option>
          <option value="Resume Tips">Resume Tips</option>
          <option value="Workplace">Workplace</option>
          <option value="Technology">Technology</option>
          <option value="Social Media">Social Media</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full bg-[#0f172a] text-[#94a3b8] rounded-lg p-2 focus:outline-none"
        >
          <option value="">Select Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Scheduled">Scheduled</option>
        </select>
        <input
          type="text"
          name="author"
          placeholder="Filter by Author"
          value={filters.author}
          onChange={handleChange}
          className="w-full bg-[#0f172a] text-[#94a3b8] rounded-lg p-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default FilterDropdown;