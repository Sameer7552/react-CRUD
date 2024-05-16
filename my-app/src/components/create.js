//create.js
import React, { useState } from 'react';

function CreateItem({ onItemCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [priorityValue, setPriorityValue] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !datetime) {
      setError('All fields are required');
      return;
    }
    const newItem = {
      title,
      description,
      datetime,
      priority: getPriorityLabel(),
    };
    onItemCreated(newItem);
    setTitle('');
    setDescription('');
    setDatetime('');
    setPriorityValue(1);
    setError('');
  };

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriorityValue(value);
  };

  const getPriorityLabel = () => {
    switch (priorityValue) {
      case 1: return "Very Low";
      case 2: return "Low";
      case 3: return "Medium";
      case 4: return "High";
      case 5: return "Very High";
      default: return "";
    }
  };

  const getColorClass = () => {
    switch (priorityValue) {
      case 1: return "text-emerald-500";
      case 2: return "text-lime-500";
      case 3: return "text-yellow-500";
      case 4: return "text-orange-500";
      case 5: return "text-red-500";
      default: return "";
    }
  };

  return (
    <form className="container mx-auto px-2" onSubmit={handleSubmit}>
      
      <div>
        <label className="block text-lg font-bold leading-6 text-gray-900">Title</label>
        <div className="mt-2">
          <input
            type="text"
            className="block w-full px-4 py-2 rounded-md border mt-4 border-gray-300 shadow-lg"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-lg font-bold leading-6 text-gray-900">Description</label>
        <div className="mt-2">
          <textarea
            rows={3}
            className="block w-full px-4 py-2 rounded-md border mt-4 border-gray-300 shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-lg font-bold leading-6 text-gray-900 ">Select Date and Time:</label>
        <input
          type="datetime-local"
          className='block w-full px-4 py-2 mt-4 rounded-md border border-gray-300 shadow-sm'
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
      </div>
      

      <div className="mt-8">
        <label className="block text-lg font-bold leading-6 text-gray-900">Priority</label>
        <div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={priorityValue}
            onChange={handleRangeChange}
            className="appearance-none w-full h-3 mt-4 bg-gray-200 rounded-full outline-none bg-gradient-to-r from-green-500 from-0% via-yellow-500 via-50% to-red-500 to-100%"
          />
          <p className={`mt-2 text-center text-lg font-bold ${getColorClass()}`}>
            {getPriorityLabel()}
          </p>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-10 rounded-full text-lg transition duration-300 mt-5">Submit</button>
    </form>
  );
}

export default CreateItem;
