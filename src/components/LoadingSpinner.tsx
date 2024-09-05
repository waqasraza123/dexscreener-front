import React from 'react';
import { ReactComponent as LoadingSpinnerIcon } from '../utils/loading_spinner.svg';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <LoadingSpinnerIcon className="w-16 h-16" />
    </div>
  );
};

export default LoadingSpinner;
