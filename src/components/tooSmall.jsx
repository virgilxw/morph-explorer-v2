import React from 'react';

const TooSmall = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mt-8">Viewport Too Small</h1>
      <p className="text-lg mt-4">Sorry, the viewport size is too small to display the content.</p>
    </div>
  );
};

export default TooSmall;