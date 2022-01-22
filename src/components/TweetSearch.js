import React from 'react';

const TweetSearch = () => {
  return (
    <div className="relative border-b justify-center">
      <input
        type="text"
        className="text-gray-700 w-full pl-16 pr-32 py-4 bg-gray-50"
        placeholder="placeholder"
      />
      <div className="absolute left-0 inset-y-0 flex items-center justify-center pl-8 pr-2">
        <slot name="icon"></slot>
      </div>
      <div className="absolute right-0 inset-y-0 flex items-center pr-8">
        <button className="rounded-full px-4 py-1  font-semibold text-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-white">
          Search
        </button>
      </div>
    </div>
  );
};

export default TweetSearch;
