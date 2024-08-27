import React from 'react';



const Highlight = ({ children, color = 'yellow' }) => {
  const highlightColors = {
    yellow: 'from-yellow-200 to-yellow-100 dark:from-yellow-500 dark:to-yellow-400',
    green: 'from-green-200 to-green-100 dark:from-green-500 dark:to-green-400',
    blue: 'from-blue-200 to-blue-100 dark:from-blue-500 dark:to-blue-400',
    red: 'from-red-200 to-red-100 dark:from-red-500 dark:to-red-400',
    purple: 'from-purple-200 to-purple-100 dark:from-purple-500 dark:to-purple-400',
  };

  const highlightClass = highlightColors[color] || highlightColors.yellow;

  return (
    <span className="relative inline-block">
      <span className={`
        absolute 
        inset-0
        bg-gradient-to-br ${highlightClass}
        opacity-80
        transform 
        -rotate-2 
        -skew-x-6
        rounded-sm
      `} style={{
        clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0 100%)',
      }}></span>
      <span className="relative">{children}</span>
    </span>
  );
};

export default Highlight;

