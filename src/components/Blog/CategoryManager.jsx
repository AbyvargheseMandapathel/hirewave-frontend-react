import React, { useState, useEffect } from 'react';
import { fetchCategoriesApi, createCategory } from '../../services/blogApi';
import { FaPlus } from 'react-icons/fa';

const CategoryManager = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchCategoriesApi();
      // Make sure we're handling the response format correctly
      const categoriesArray = Array.isArray(data) ? data : data.results || [];
      setCategories(categoriesArray);
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
      setCategories([]); // Ensure we always have an array
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    setIsAdding(true);
    setError('');
    
    try {
      const newCategory = await createCategory({ name: newCategoryName.trim() });
      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      
      // Auto-select the new category if desired
      if (onSelectCategory) {
        onSelectCategory(newCategory.id);
      }
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.response?.data?.detail || 'Failed to create category');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-lg p-4 mb-4">
      <h3 className="text-white text-lg font-medium mb-3">Categories</h3>
      
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="text-[#94a3b8] text-sm">Loading categories...</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.length > 0 ? (
              categories.map(category => (
                <button
                  key={category.id}
                  type="button" // Add this to prevent form submission
                  onClick={() => onSelectCategory && onSelectCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category.id
                      ? 'bg-[#818cf8] text-white'
                      : 'bg-[#0f172a] text-[#94a3b8] hover:bg-[#1e293b]'
                  }`}
                >
                  {category.name}
                </button>
              ))
            ) : (
              <div className="text-[#94a3b8] text-sm">No categories found. Create one below.</div>
            )}
          </div>
          
          <form onSubmit={handleAddCategory} className="flex">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name"
              className="bg-[#0f172a] text-white flex-1 px-3 py-2 rounded-l-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent"
              disabled={isAdding}
            />
            <button
              type="submit"
              className={`bg-[#334155] text-white px-3 py-2 rounded-r-lg ${
                isAdding ? 'opacity-50' : 'hover:bg-[#475569]'
              }`}
              disabled={isAdding}
            >
              <FaPlus />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CategoryManager;