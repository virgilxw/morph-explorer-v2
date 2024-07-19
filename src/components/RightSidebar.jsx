import React from 'react';

const RightSidebar = ({ isVisible, toggleVisibility }) => {
  return (
    <aside className={`transition-all duration-300 ${isVisible ? 'w-1/6' : 'w-0'} bg-gray-200 p-4 overflow-hidden`}>
      <button onClick={toggleVisibility} className="mb-2">
        {isVisible ? 'Collapse' : 'Expand'}
      </button>
      {isVisible && <p>Right Sidebar Content</p>}
    </aside>
  );
};

export default RightSidebar;
