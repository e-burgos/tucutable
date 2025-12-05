import React from 'react';

export const StoryContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center border border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 rounded-lg w-full h-full min-w-[90%]! min-h-[500px] p-8 overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default StoryContainer;
